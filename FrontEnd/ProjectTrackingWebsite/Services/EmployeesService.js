(function () {
    var employeeService = function ($http, $q, $log) {
        var cachedEmployees;
        var employees = function () {
            if (cachedEmployees)
                return $q.when(cachedEmployees);
            return $http.get("http://localhost:2464/api/ptemployees")
                        .then(function (serviceResp) {
                            return serviceResp.data;
                        });
        };
        var singleEmployee = function (id) {
            return $http.get("http://localhost:2464/api/ptemployees/" + id)
                .then(function (serviceResp) {
                    return serviceResp.data;
                });
        };
        var searchEmployees = function (employeeName) {
            return $http.get("http://localhost:2464/api/ptemployees/" + employeeName)
            .then(function (serviceResp) {
                return serviceResp.data;
            });
        };
        var insertEmployee = function (employee) {
            return $http.post("http://localhost:2464/api/ptemployees/", employee)
                .then(function (result) {
                    //$log.info("Insert Successful");
                    cachedEmployees = result.data;
                    return result;
                });
        };
        var modifyEmployee = function (employee) {
            return $http.put("http://localhost:2464/api/ptemployees/" + employee.employeeID, employee)
                .then(function (result) {
                    cachedEmployees = result.data;
                    return result;
                });
        };
        var deleteEmployee = function (employee) {
            return $http.delete("http://localhost:2464/api/ptemployees/" + employee.employeeID)
                .then(function (result) {
                    $log.info("Delete Successful");
                    cachedEmployees = result.data;
                    return result.data;
                });
        };
        return {
            employees: employees,
            singleEmployee: singleEmployee,
            searchEmployees: searchEmployees,
            insertEmployee: insertEmployee,
            modifyEmployee: modifyEmployee,
                deleteEmployee : deleteEmployee
        };
    };
    var module = angular.module("ProjectTrackingModule");
    module.factory("employeeService", ["$http", "$q", "$log", employeeService]);
}());