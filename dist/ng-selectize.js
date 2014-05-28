"use strict";

angular.module('clientApp').directive("selectize", ['$timeout',function($timeout) {
  return {
    restrict: "AE",
    link: function(scope, element, attrs) {
      
      var selectize_inst = null
      
      var load_angularjs_data = function() {
        if (selectize_inst === null || !attrs.selectizeData) {
          return
        }
        var data_array = scope.$eval(attrs.selectizeData)
        if (!$.isArray(data_array)) {
          return
        }
        for (var i in data_array) {
          selectize_inst.addOption(data_array[i])
        }
      }
      
      if (attrs.selectizeData) {
        scope.$watch(attrs.selectizeData,load_angularjs_data)
      }
      return $timeout(function() {
        var selectize_opts = scope.$eval(attrs.selectize);
        var result = $(element).selectize(scope.$eval(attrs.selectize))
        selectize_inst = result[0].selectize
        if (attrs.selectizeInstRef) {
          scope.__selectize_directive_tmp = selectize_inst
          scope.$eval(attrs.selectizeInstRef+" = __selectize_directive_tmp")
          delete scope.__selectize_directive_tmp
        }
        load_angularjs_data()
        return result
      });
    }
  };
}]);