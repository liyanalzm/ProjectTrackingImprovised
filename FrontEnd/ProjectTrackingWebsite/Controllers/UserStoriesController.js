(function () {
    var UserStoriesController = function ($scope, $log, $location, $routeParams, userStoriesService, projectService) {
        var userStories = function (data) {
            $scope.Stories = data;
        };
        var errorDetails = function (serviceResp) {
            $scope.Error = "Something went wrong ??";
        };
        var singleUserStory = function (data) {
            $scope.userStory = data;

            $log.info(data);
        };

        $scope.init = function () {
            userStoriesService.singleUserStory($routeParams.userStoryID)
                .then(singleUserStory, errorDetails);
        };
        var userStory = {
            story: null,
            projectID: null
        };

        $scope.userStory = userStory;

        var errorDetails = function (serviceResp) {
            $scope.Error = "Something went wrong ??";
        };

        projectService.projects().then(function (projects) {
            $scope.projects = projects;
        });

        $scope.addUserStory = function () {
            
            userStoriesService.addUserStory({ projectID: $scope.userStory.projectSelected.projectID, story: $scope.userStory.story })
                .then(function (data) {
                            $location.path("/UserStories");
                });
           // $log.info(projectID);
        };
        $scope.modifyUserStory = function (userStory) {
            $log.info(userStory);
            userStoriesService.modifyUserStory(userStory)
                .then(function () {
                    $location.path("/UserStories");
                }, errorDetails);
        };
        $scope.deleteUserStory = function (userStory) {
            $log.info(userStory);
            userStoriesService.deleteUserStory(userStory)
                .then(userStories, errorDetails);
        };
        
        var refresh = function () {
            userStoriesService.userStories()
                .then(userStories, errorDetails);
        };

        refresh();
        $scope.Title = "User Stories Page";
    };
    app.controller("UserStoriesController", ["$scope", "$log", "$location", "$routeParams", "userStoriesService", "projectService", UserStoriesController]);
}());