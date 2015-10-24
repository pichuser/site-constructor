angular.module('App.controllers', [])
    .controller('MainController', ['$scope', function($scope){
        $scope.styles = [];
        var style = document.getElementById('test').style;
        window.ssss = style;
        for(key in style){
            $scope.styles.push({name: key, val: style[key]});
        }
        $scope.enterCss = function(obj){
            document.getElementById('test').style[obj.name] = obj.val;
        }
    }]);
