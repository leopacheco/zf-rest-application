/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

!function () {
  'use strict'

  angular
    .module('zf-rest')
    .config([
      '$httpProvider',

      function ($httpProvider) {
        $httpProvider
          .interceptors
          .push('AuthInterceptor')
      }
    ])
    .factory('AuthInterceptor', [
      '$cookieStore',

      function ($cookieStore) {
        return {
          request: function (config) {
            var token = $cookieStore.get('token')

            if (token) {
              config.headers.Authorization = 'Bearer ' + token
            }

            return config
          }
        }
      }
    ])
    .factory('AuthService', [
      '$rootScope',
      '$http',
      '$cookieStore',
      '$q',
      'AuthUser',
      'NotificationService',

      function auth($rootScope, $http, $cookieStore, $q, user, notifications) {
        var currentUser = {}

        if ($cookieStore.get('token')) {
          currentUser = user.get()
        }

        return {
          login: function (username, password, callback) {
            var cb = callback || angular.noop,
              deferred = $q.defer()

            $http
              .post('../oauth/login', {
                username: username,
                password: password
              })
              .success(function (data) {
                $cookieStore.put('token', data.access_token)
                currentUser = user.get()
                deferred.resolve(data)

                $rootScope.$broadcast('user.auth-changed')
                return cb()
              })
              .error(function (err) {
                  this.logout()
                  deferred.reject(err)

                  return cb(err)
                }.bind(this)
              )

            return deferred.promise
          },

          logout: function () {
            $cookieStore.remove('token')
            currentUser = {}

            $rootScope.$broadcast('user.auth-changed')
          },

          getCurrentUser: function () {
            return currentUser
          },

          hasAuth: function () {
            return !!($cookieStore.get('token'))
          },

          isLoggedInAsync: function (cb) {
            if (currentUser.hasOwnProperty('$promise')) {
              currentUser
                .$promise
                .then(function () {
                  cb(true)
                })
                .catch(function () {
                  cb(false)
                })
            } else if (currentUser.hasOwnProperty('admin')) {
              cb(true)
            } else {
              cb(false)
            }
          },

          isAdmin: function () {
            return 1 === currentUser.admin
          },

          getToken: function () {
            return $cookieStore.get('token')
          }
        }
      }
    ])
    .factory('AuthUser', [
      '$resource',

      function ($resource) {
        return $resource('../users/:id', {
          id: '@id'
        }, {
          get: {
            method: 'GET',
            params: {
              id: 'me'
            }
          }
        })
      }
    ])
}()
