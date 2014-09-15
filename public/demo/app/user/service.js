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
    .service('User', [
      '$resource',

      function ($resource) {
        return $resource('../users/:id?', null)
      }
    ])
}(angular)
