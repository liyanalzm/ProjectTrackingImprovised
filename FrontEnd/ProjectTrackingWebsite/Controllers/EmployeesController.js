(function () {
    var EmployeesController = function ($scope, employeeService, $log, $routeParams, $location) {
       
        var employees = function (data) {
           $scope.Employees = data;
            $log.info(data);
        };

        var singleEmployee = function (data) {
            $scope.existingEmployee = data;
            $log.info(data);
        };

        $scope.init = function () {
            employeeService.singleEmployee($routeParams.employeeID)
                .then(singleEmployee, errorDetails);
        };

        $scope.searchEmployees = function (employeeName) {
            employeeService.searchEmployees(employeeName)
            .then(employees, errorDetails);
            $log.info("Found Employee which contains - " + employeeName);
        };


        var employee = {
            employeeID: null,
            employeeName: null,
            designation: null,
            managerID: null,
            contactNo: null,
            emailID: null,
            skillSets: null
        };

        $scope.employee = employee;

        var errorDetails = function (serviceResp) {
            $scope.Error = "Something went wrong ??";
        };

        $scope.insertEmployee = function (employee) {
            employeeService.insertEmployee(employee)
                .then(function (data) {
                    console.log(data);
                    $location.path("/Employees");
                });
        };

        $scope.modifyEmployee = function (existingEmployee) {
            employeeService.modifyEmployee(existingEmployee)
                .then(function () {
                    $location.path("/Employees");
                }, errorDetails);
        };

        $scope.deleteEmployee = function (employee) {
            $log.info(employee);
            employeeService.deleteEmployee(employee)
                .then(employees, errorDetails);
        };

        var refresh = function () {
            employeeService.employees()
                .then(employees, errorDetails);
        };

        refresh();
        $scope.Title = "Employee Details Page";
    };
    app.controller("EmployeesController", ["$scope", "employeeService", "$log", "$routeParams", "$location", EmployeesController]);
}());