var cornucopia = angular.module('cornucopia', [])
    .controller('CornucopiaCtrl', ['$scope', function($scope){
        $scope.lines = 0;
        $scope.lineSeparator = "\\n";
        $scope.separator = ",";
        $scope.panel = "Lumbergh, Bill, Initech\r\nWaddams, Milton, Initech\r\nGibbons, Peter, Initech\r\nBolton, Michael, Initech";
        $scope.pattern = "To: $1.$0@$2.com\nHello $1 $0,\nI'm sorry to inform you of a terrible accident at $2.\n---";
        $scope.results = "";

        function interpret(input) {
            //convert the literal string '\r' into a carriage return (\r). ditto for '\n' and '\t'
            return input.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        }

        $scope.execute = function(){

            var ls = interpret($scope.lineSeparator);
            var lines = $scope.panel.split(ls);
            var lenLines = lines.length;
            $scope.lines = lenLines;
            var result = "";
            lines.forEach(function(line){
                var elements = line.split($scope.separator);
                var copyPattern = String($scope.pattern);
                for(var i in elements) {
                    var repStr = new String('\\$' + i);
                    var re = new RegExp(repStr, 'gim');
                    copyPattern = copyPattern.replace(re, elements[i].trim());
                }
                copyPattern += "\r\n";
                result += copyPattern;
            });

            $scope.results = result;
        };
}]);
