(function () {
    'use strict';

    angular
        .module('qorDash.auth.permissions')
        .service('permissions', permissionsService);

    function permissionsService($q, auth, USER_HAS_NO_ACCESS) {

        var userPermissions = (function createPermissionsMap() {
            var token = auth.getParsedToken();
            var permissions = {};
            for (var prop in token) {
                if ((/^((?!passport|redpill).)*\/@scopes$/i).test(prop)){
                    var app = prop.split('/')[0];
                    var scopes = token[prop];
                    permissions[app] = scopes;
                }
            }
            console.log(permissions);
            return permissions;
        })();

        function hasAccess(state, action) {
            var app = state.split('.')[1];
            action = action || 'read';
            var hasPermission = userPermissions[app] && userPermissions[app].indexOf(action) >= 0;
            return !!hasPermission;
        }

        function resolveState(state){
            return hasAccess(state) || $q.reject(USER_HAS_NO_ACCESS);
        }

        return {
            userPermissions: userPermissions,
            resolveState: resolveState,
            hasAccess: hasAccess
        };
    }
})();
