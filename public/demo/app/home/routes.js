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
          .when('/', {
            templateUrl: 'app/home/partials/home.html'
          })

          .otherwise({
            templateUrl: 'app/home/partials/404.html'
          })
      }
    ])
}(angular)
