(function() {
	'use strict';

	angular
		.module('app', [
			'ui.router'
		])
		.config(config)

		config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

		function config($stateProvider, $urlRouterProvider, $locationProvider){
			$stateProvider
				.state('main', {
					url: '/',
					templateUrl: '../partials/main.html',
					controller: 
						function($scope, $http){
							$scope.item = {};
							$scope.scrapePostForm = true;
							$scope.showScrapeDetails = false;
							$scope.loading = false;
							$scope.gotScrapeResults = false;
							$scope.aleartContainer = false;

							//Watch for changes to URL, Scrape & Display the image
							$scope.$watch('item.link', function(newVal, oldVal){
								if(newVal.length > 5){
									$scope.loading = true;
									$http.post('/api/scrape',{
										url: $scope.item.link
									})
									.then(function(data){
										console.log(data);
										$scope.showScrapeDetails = true;
										$scope.gotScrapeResults = true;
										$scope.item.location = data.data.location;
										$scope.item.summary = data.data.summary;
										$scope.item.companyName = data.data.companyName;
										$scope.item.jobTitle = data.data.jobTitle;
									}, function(error) {
										console.log('failed to return from scraping');
										$scope.loading = false;
										$scope.item.link = "";
										$scope.gotScrapeResults = false;
									})
									.finally(function(){
										$scope.loading = false;
										$scope.uploaditemForm = false;
									});
								}
							});
						}
				});
				$urlRouterProvider.otherwise('/');
				$locationProvider.html5Mode(true);
		}
})();