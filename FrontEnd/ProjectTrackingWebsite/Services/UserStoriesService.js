(function () {
    var userStoriesService = function ($http, $q, $log) {
        var cachedUserStories;
        var userStories = function () {
            if (cachedUserStories)
                return $q.when(cachedUserStories);
            return $http.get("http://localhost:2464/api/ptuserstories")
                        .then(function (serviceResp) {
                            return serviceResp.data;
                        });
        };
        var singleUserStory = function (id) {
            return $http.get("http://localhost:2464/api/ptuserstories/" + id)
                .then(function (serviceResp) {
                    return serviceResp.data;
                });
        };
        var addUserStory = function (userStory) {
            return $http.post("http://localhost:2464/api/ptuserstories",userStory)
                .then(function (result) {
                    $log.info("Insert Successful");
                        cachedUserStories = result.data;
                        return result;
                        });
        };
        var modifyUserStory = function (userStory) {
            return $http.put("http://localhost:2464/api/ptuserstories/" + userStory.userStoryID, userStory)
                .then(function (result) {
                    $log.info("Update Successful");
                    cachedUserStories = result.data;
                    return result.data;
                });
        };
        var deleteUserStory = function (userStory) {
            return $http.delete("http://localhost:2464/api/ptuserstories/" + userStory.userStoryID)
                .then(function (result) {
                    $log.info("Delete Successful");
                    cachedUserStories = result.data;
                    return result.data;
                });
        };
        return {
            userStories: userStories,
            singleUserStory: singleUserStory,
            addUserStory: addUserStory,
            modifyUserStory: modifyUserStory,
            deleteUserStory: deleteUserStory
        };
    };
    var module = angular.module("ProjectTrackingModule");
    module.factory("userStoriesService", ["$http", "$q", "$log",  userStoriesService]);
}());