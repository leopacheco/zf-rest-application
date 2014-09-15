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
    .controller('UserCtrl', [
      '$scope',
      '$routeParams',
      '$location',
      'NotificationService',
      'User',

      function ($scope, $routeParams, $location, notifications, User) {
        User
          .query(function (response) {
            $scope.collection = response
          })

        $scope.getErrMessage = getErrMessage
        $scope.saveUser = saveUser
        $scope.deleteUser = deleteUser

        if ($routeParams.id) {
          User
            .get({ id: $routeParams.id })
            .$promise
            .then(function (user) {
              $scope.model = user
            })
            .catch(function (response) {
              handleError(response)
            })
        }

        return;

        function saveUser(form, userId) {
          notifications.removeAll()

          if (form.$invaild) {
            return notifications.pushForCurrentRoute('ERR.VALIDATION_INVALID')
          }

          User
            .save({ id: userId }, $scope.model)
            .$promise
            .then(function (response) {
              notifications.pushForCurrentRoute('MSG.RECORD_SAVED', 'success')
              $location.path('/users')
            })
            .catch(function (response) {
              handleError(response)
            })
        }

        function deleteUser(modalIndex, userId) {
          var modal = $('#modal-' + modalIndex)

          modal.modal('hide')
          notifications.removeAll()
          $scope.username = null

          User
            .delete({ id: userId })
            .$promise
            .then(function (response) {
              notifications.pushForCurrentRoute('MSG.RECORD_DELETED', 'info')

              User
                .query(function (response) {
                  $scope.collection = response
                })
            })
            .catch(function (response) {
              handleError(response)
            })
        }

        function getErrMessage(type) {
          return {
            date:       'ERR.INVALID_DATE',
            email:      'ERR.INVALID_EMAIL',
            max:        'ERR.INVALID_MAX',
            maxlength:  'ERR.INVALID_MAXLENGTH',
            min:        'ERR.INVALID_MIN',
            minlength:  'ERR.INVALID_MINLENGTH',
            number:     'ERR.INVALID_NUMBER',
            pattern:    'ERR.INVALID_PATTERN',
            required:   'ERR.REQUIRED',
            time:       'ERR.INVALID_TIME',
            url:        'ERR.INVALID_URL'
          }[type]
        }

        function handleError(errorData) {
          if (errorData.data) {
            if (errorData.data.errors) {
              angular.forEach(errorData.data.errors, function (error) {
                notifications.pushForCurrentRoute(error)
              })
            } else {
              notifications.pushForCurrentRoute(errorData.data)
            }
          }
        }
      }
    ])
}(angular)
