var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	$scope.urls = {'Angular':'https://docs.angularjs.org/tutorial',
					'Bootstrap':'http://getbootstrap.com/css/',
					'jQuery':'https://api.jquery.com/'};
	
});

app.directive("welcomeMessage", function() {
	var content = "<h1><span class='glyphicon glyphicon-thumbs-up'></span>Angular, Bootstrap &amp; jQuery</h1>"
	   content += "<p>Dive into <%= name %>.js and get creative!</p>"
    return {
        template : content
    };
});