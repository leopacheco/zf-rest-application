/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

!function (angular) {
  'use strict'

  angular
    .module('zf-rest', [
      'ngResource',
      'ngRoute',
      'ngCookies',
      'pasvaz.bindonce',
      'angular-loading-bar'
    ])
    .config([
      '$httpProvider',

      function ($httpProvider) {
        var interceptor = function (config) {
          return {
            request: function (config) {
              config.headers['X-Preferred-Locale'] = 'en'
              config.headers['X-Context'] = 1
  
              return config
            }
          }
        }

        $httpProvider
          .interceptors
          .push([interceptor])
      }
    ])
    .directive('loading', [
      function() {
        return {
          link: function(scope, elem) {
            elem.removeClass('loading')
          },
          restrict: 'C'
        }
      }
    ])

}(angular)
