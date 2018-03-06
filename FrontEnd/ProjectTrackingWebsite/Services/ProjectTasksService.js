(function () {
    var projectTasksService = function ($http, $q, $log) {
        var cachedProjectTasks;
        var projectTasks = function () {
            if (cachedProjectTasks)
                return $q.when(cachedProjectTasks);
            return $http.get("http://localhost:2464/api/ptprojecttasks")
                        .then(function (serviceResp) {
                            return serviceResp.data;
                        });
        };
        var singleTask = function (id) {
            return $http.get("http://localhost:2464/api/ptprojecttasks/" + id)
                .then(function (serviceResp) {
                    return serviceResp.data;
                });
        };
        var addProjectTask = function (task) {
            return $http.post("http://localhost:2464/api/ptprojecttasks", task)
                        .then(function (response) {
                            return response.data;
                        });
        };

        var modifyTask = function (task) {
            return $http.put("http://localhost:2464/api/ptprojecttasks/" + task.projectTaskID, task)
                .then(function (result) {
                    //$log.info("Update Successful");
                    cachedProjectTasks = result.data;
                    return result.data;
                });
        };
        var deleteTask = function (task) {
            return $http.delete("http://localhost:2464/api/ptprojecttasks/" + task.projectTaskID)
                .then(function (result) {
                    $log.info("Delete Successful");
                    cachedProjectTasks = result.data;
                    return result.data;
                });
        };
        return {
            projectTasks: projectTasks,
            addProjectTask: addProjectTask,
            modifyTask: modifyTask,
            singleTask: singleTask,
            deleteTask: deleteTask
        };
    };
    var module = angular.module("ProjectTrackingModule");
    module.factory("projectTasksService", ["$http", "$q", "$log",  projectTasksService]);
}());