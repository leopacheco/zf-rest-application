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
    .config([
      '$routeProvider',

      function($routeProvider) {
        $routeProvider
          .when('/users', {
            controller: 'UserCtrl',
            templateUrl: 'app/user/partials/list.html'
          })
          .when('/users/new', {
            controller: 'UserCtrl',
            templateUrl: 'app/user/partials/form.html'
          })
          .when('/users/:id/edit', {
            controller: 'UserCtrl',
            templateUrl: 'app/user/partials/form.html'
          })
          .when('/users/:id/delete', {
            controller: 'UserCtrl',
            template: ''
          })
      }
    ])
}(angular)
