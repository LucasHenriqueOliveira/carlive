(function () {
    'use strict';

    angular
        .module('app')
        .factory('PartService', PartService);

    PartService.$inject = ['$http', '$rootScope', '$localstorage'];
    function PartService($http, $rootScope, $localstorage) {
        var service = {};
        var currentPart = {};
        var baseURL = 'http://localhost:8080/api/v1/';

        service.getParts = getParts;
        service.getById = getById;
        service.create = create;
        service.update = update;
        service.removePart = removePart;
        service.activePart = activePart;
        service.setCurrentPart = setCurrentPart;
        service.getCurrentPart = getCurrentPart;

        return service;

        function getParts() {
            var id = $localstorage.getObject('company');
            return $http.get(baseURL + 'stock-parts/' + id).then(handleSuccess, handleError('Error getting all parts'));
        }

        function getById(id) {
            return $http.get(baseURL + 'part/' + id).then(handleSuccess, handleError('Error getting part by id'));
        }

        function create(part) {
            return $http.post(baseURL + 'part', part).then(handleSuccess, handleError('Error creating part'));
        }

        function activePart(id, part) {
            return $http.put(baseURL + 'active-part/' + id, part).then(handleSuccess, handleError('Error active part'));
        }

        function removePart(id, part) {
            return $http.put(baseURL + 'remove-part/' + id, part).then(handleSuccess, handleError('Error remove part'));
        }

        function update(part) {
            return $http.put(baseURL + 'part/' + part.id, part).then(handleSuccess, handleError('Error updating part'));
        }

        function setCurrentPart(part) {
            currentPart = part;
        }

        function getCurrentPart() {
            return currentPart;
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();