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
    .factory('NotificationService', [
      '$rootScope',
      '$interpolate',

      function ($rootScope, $interpolate) {
        var notifications = {
            STICKY: [],
            ROUTE_CURRENT: [],
            ROUTE_NEXT: []
          },

          NotificationService = {},

          /*
           * @docblock
           */
          prepareNotification = function (message, type, interpolateParams) {
            return message
              ? {
                  type: type || 'danger',
                  data: angular.isObject(message) ? message : {
                    message: $interpolate(message)(interpolateParams)
                  }
                }
              : null
          },

          /*
           * @docblock
           */
          addNotifications = function (notificationsArray, notificationObj) {
            notificationObj && notificationsArray.push(notificationObj)

            return notificationObj
          }

        $rootScope.$on('$stateChangeSuccess', function () {
          notifications.ROUTE_CURRENT.length = 0
          notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT)
          notifications.ROUTE_NEXT.length = 0
        })

        /*
         * @docblock
         */
        NotificationService.pushSticky = function (notification, type, interpolateParams) {
          return addNotifications(
            notifications.STICKY,
            prepareNotification(notification, type, interpolateParams)
          )
        }

        /*
         * @docblock
         */
        NotificationService.pushForCurrentRoute = function (notification, type, interpolateParams) {
          return addNotifications(
            notifications.ROUTE_CURRENT,
            prepareNotification(notification, type, interpolateParams)
          )
        }

        /*
         * @docblock
         */
        NotificationService.pushForNextRoute = function (notification, type, interpolateParams) {
          return addNotifications(
            notifications.ROUTE_NEXT,
            prepareNotification(notification, type, interpolateParams)
          )
        }

        /*
         * @docblock
         */
        NotificationService.getCurrent = function () {
          return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT)
        }

        /*
         * @docblock
         */
        NotificationService.remove = function (notification) {
          angular.forEach(notifications, function (notificationsByType) {
            var idx = notificationsByType.indexOf(notification)

            if (idx > -1) {
              notificationsByType.splice(idx, 1)
            }
          })
        }

        /*
         * @docblock
         */
        NotificationService.removeAll = function () {
          angular.forEach(notifications, function (notificationsByType) {
            notificationsByType.length = 0
          })
        }

        return NotificationService
      }
    ])
    .run([
      '$rootScope',
      'NotificationService',

      function ($rootScope, notifications) {
        $rootScope.notifications = notifications
      }
    ])
}(angular)
