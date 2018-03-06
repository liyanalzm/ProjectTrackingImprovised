(function () {
    var ProjectTasksController = function ($scope, $log, $location, $routeParams, projectTasksService, userStoriesService, employeeService) {
        var tasks = function (data) {
            $scope.Tasks = data;
            $log.info(data);
        };

        function convertDateToBindable(date) {
            var dateObj = new Date(date);

            return dateObj.getFullYear() + "-" + getTwoDigitString(dateObj.getMonth() + 1) + "-" + getTwoDigitString(dateObj.getDate());
        }

        function getTwoDigitString(number) {
            if (number.toString().length === 1)
                return "0" + number;
            return number;
        }
        var singleTask = function (data) {
            $scope.task = data;
            $scope.task.taskStartDate = convertDateToBindable($scope.task.taskStartDate);
            $scope.task.taskEndDate = convertDateToBindable($scope.task.taskEndDate);

           // $log.info(data);
        };
        $scope.init = function () {
            projectTasksService.singleTask($routeParams.projectTaskID)
                .then(singleTask, errorDetails);
        };
        var task = {
            projectTaskID: null,
            assignedTo: null,
            taskStartDate: null,
            taskEndDate: null,
            taskCompletion: null,
            userStoryID: null
        };

        $scope.task = task;
        
        var errorDetails = function (serviceResp) {
            $scope.Error = "Something went wrong!!";
        };

        userStoriesService.userStories().then(function (userStories) {
            $scope.userStories = userStories;
        });

        employeeService.employees().then(function (employees) {
            $scope.employees = employees;
        });

        $scope.assignTask = function () {
        //$log.info(task);
        projectTasksService.addProjectTask({ assignedTo: $scope.task.employeeSelected.employeeID, taskStartDate: $scope.task.taskStartDate, taskEndDate: $scope.task.taskEndDate, taskCompletion: $scope.task.taskCompletion, userStoryID: $scope.task.userStorySelected.userStoryID })
                .then(function (data) {
                    $location.path("/Tasks");
                });
        };
        $scope.modifyTask = function (task) {
           // $log.info(task);
            projectTasksService.modifyTask(task)
                .then(function () {
                    $location.path("/Tasks");
                }, errorDetails);
        };
        $scope.deleteProjectTask = function (task) {
            //$log.info(project);
            projectTasksService.deleteTask(task)
                .then(tasks, errorDetails);
        };
        var refresh = function () {
            projectTasksService.projectTasks()
                .then(tasks, errorDetails);
        };

        refresh();
        $scope.Title = "Project Tasks Page";
    };
    app.controller("ProjectTasksController", ["$scope", "$log", "$location", "$routeParams", "projectTasksService", "userStoriesService", "employeeService", ProjectTasksController]);
}());