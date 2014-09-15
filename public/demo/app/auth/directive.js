/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

!function (angular) {
  'use strict'

  angular
    .module('zf-rest')
    .directive('btnLogin', [
      '$rootScope',
      'NotificationService',
      'AuthService',

      function ($rootScope, notifications, Auth) {
        return {
          link: function (scope, element, attrs) {
            element.bind('click', function () {
              notifications
                .removeAll()

              Auth
                .login(scope.username, scope.password)

              scope.username = null
              scope.password = null
            })
          },

          restrict: 'A'
        }
      }
    ])

    .directive('btnLogout', [
      '$rootScope',
      'NotificationService',
      'AuthService',

      function ($rootScope, notifications, Auth) {
        return {
          link: function (scope, element, attrs) {
            element.bind('click', function () {
              notifications
                .removeAll()

              Auth
                .logout()
            })
          },

          restrict: 'A'
        }
      }
    ])
}(angular)
