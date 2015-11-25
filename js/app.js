var cornucopia = angular.module('cornucopia', [])
    .controller('CornucopiaCtrl', ['$scope', function($scope){
        $scope.lines = 0;
        $scope.lineSeparator = "\\n";
        $scope.separator = ",";
        $scope.panel = "";
        $scope.pattern = "";
        $scope.results = "";

        function interpret(input) {
            //convert the literal string '\r' into a carriage return (\r). ditto for '\n' and '\t'
            return input.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        }

        $scope.execute = function(){
            console.log($scope.pattern);
            console.log($scope.separator);
            console.log($scope.results);

            var ls = interpret($scope.lineSeparator);
            var lines = $scope.panel.split(ls);
            var lenLines = lines.length;
            lines.forEach(function(line){
                var elements = line.split($scope.separator);
                console.log(elements);

                var pat = $scope.pattern;
                pat.replace();

            });

        };
}]);
