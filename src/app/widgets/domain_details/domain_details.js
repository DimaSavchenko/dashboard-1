(function() {
    'use strict';

    var domainDetailsModule = angular.module('qorDash.widget.domain_details');

    var domainDetailsController = angular.createAuthorizedController('DomainDetailsController', ['$scope', '$rootScope', '$compile', '$modal', function($scope, $rootScope, $compile, $modal) {

        var list = $('#details-dropdown').children().children('ul');
        var detailsText = $('#details-text');

        $scope.showLogs = function(title, url) {
            var modalInstance;
            var modalScope = $scope.$new();


            modalScope.title = title;
            modalScope.url = url;

            modalScope.cancel = function () {
                modalInstance.dismiss('cancel');
                $('.domains-layout').css({'visibility' : 'visible'});
            };

            modalInstance = $modal.open({
                    template: '<terminal-modal></terminal-modal>',
                    scope: modalScope
                }
            );

            modalInstance.result.then(function () {}, function () {

            });
        };

        $rootScope.$on('details:showLogs', function(event, data) {
            var logs = data.logs;

            list.text('');
            detailsText.text('');

            for (var log in logs) {
                list.append($compile('<li><a ng-click="showLogs(\''+log+'\', \''+logs[log]+'\')">' + log + '</a></li>')($scope));
            }

            $('#details-dropdown').removeAttr('hidden');
        });

        $rootScope.$on('details:showDetails', function(event, data) {
            var details = data;

            list.text('');
            $('#details-dropdown').attr('hidden', '');

            detailsText.text(details.name);
        });
    }]);


    domainDetailsModule.directive('terminalModal', function() {
        return {
            restrict: 'E',
            templateUrl: 'TerminalModal.html',
            controller: function ($scope) {

            }
        };
    });


    domainDetailsModule.controller(domainDetailsController);
})();