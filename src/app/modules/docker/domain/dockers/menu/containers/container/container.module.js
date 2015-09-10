(function () {
    'use strict';

    var module = angular.module('qorDash.docker.domain.dockers.menu.containers.container', [
        'ui.router'
    ]);

    module.config(appConfig);

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider
            .state('app.docker.domain.dockers.menu.containers.container', {
                url: '/:containerId',
                templateUrl: 'app/modules/docker/domain/dockers/menu/containers/container/container.html',
                controller: 'ContainerController',
                authenticate: true
            })
    }
})();