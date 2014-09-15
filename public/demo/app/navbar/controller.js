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
    .controller('NavbarCtrl', [
      '$scope',
      'AuthService',

      function ($scope, Auth) {
        var set = function () {
          $scope.hasAuth = Auth.hasAuth()
          $scope.user = Auth.getCurrentUser()
        }

        $scope.$on('user.auth-changed', function () {
          set()
        })

        set()
      }
    ])
}(angular)
