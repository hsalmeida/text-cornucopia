var cornucopia = angular.module('cornucopia', [])
    .controller('CornucopiaCtrl', ['$scope', function($scope){
        $scope.lines = 0;
        $scope.lineSeparator = "\\n";
        $scope.separator = ",";
        $scope.panel = "Name, Bill, 10\r\nName, Milton, 11\r\nLastName, Peter, 12\r\nName, Michael, 13";
        $scope.pattern = "UPDATE User SET $0 = '$1' WHERE UserId = $2";
        $scope.results = "";
        $scope.chAuto = false;
        $scope.panelLines = 0;
        $scope.patternLines = 0;
        var lineSep = interpret($scope.lineSeparator);
        $scope.panelLines = $scope.panel.split(lineSep).length;
        $scope.patternLines = $scope.pattern.split(lineSep).length;

        function interpret(input) {
            //convert the literal string '\r' into a carriage return (\r). ditto for '\n' and '\t'
            return input.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        }

        $scope.auto = function(){
            if($scope.chAuto && $scope.panel.length < 10000) {
                $scope.execute();
            }
            var ls = interpret($scope.lineSeparator);
            $scope.panelLines = $scope.panel.split(ls).length;
            $scope.patternLines = $scope.pattern.split(ls).length;
        };

        $scope.execute = function(){
            var ls = interpret($scope.lineSeparator);
            var lines = $scope.panel.split(ls);
            $scope.lines = lines.length;
            var result = "";
            lines.forEach(function(line){
                var elements = line.split($scope.separator);
                var copyPattern = String($scope.pattern);
                for(var i = 0; i < elements.length ; i++) {
                    var repStr = '\\$' + i;
                    var re = new RegExp(repStr, 'gim');
                    copyPattern = copyPattern.replace(re, elements[i].trim());
                }
                copyPattern += "\r\n";
                result += copyPattern;
            });

            $scope.results = result;
        };
}]);
