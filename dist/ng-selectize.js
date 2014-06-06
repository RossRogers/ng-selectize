"use strict";

angular.module('clientApp').directive("selectize", ['$timeout','$log',function($timeout,$log) {
  return {
    restrict: "AE",
    link: function(scope, element, attrs) {
      
      var selectize_inst = null
      
      var load_scope_value = function() {
        if (selectize_inst === null || !attrs.selectizeValueNgModel) {
          return
        }
        var value = scope.$eval(attrs.selectizeValueNgModel)
        var val_type = typeof value
        if ("string" !== val_type && "boolean" !== val_type && "number" !== val_type) {
          return
        }
        if (selectize_inst.getValue() != value) {
          selectize_inst.mask_scope_value_update = true
          selectize_inst.setValue(String(value))
          selectize_inst.mask_scope_value_update = false
        }
      }
      
      if (attrs.selectizeValueNgModel) {
        scope.$watch(attrs.selectizeValueNgModel,load_scope_value)
      }
      
      var load_scope_options = function() {
        if (selectize_inst === null || !attrs.selectizeOptionsNgModel) {
          return
        }
        var options_array = scope.$eval(attrs.selectizeOptionsNgModel)
        if (!$.isArray(options_array)) {
          return
        }
        for (var i in options_array) {
          selectize_inst.addOption(options_array[i])
        }
        load_scope_value()
      }
      
      if (attrs.selectizeOptionsNgModel) {
        scope.$watch(attrs.selectizeOptionsNgModel,load_scope_options)
      }
      
      return $timeout(function() {
        var selectize_opts = scope.$eval(attrs.selectize)
        var result = $(element).selectize(selectize_opts)
        selectize_inst = result[0].selectize
        if (attrs.selectizeInstRef) {
          scope.__selectize_directive_tmp = selectize_inst
          scope.$eval(attrs.selectizeInstRef+" = __selectize_directive_tmp") 
          delete scope.__selectize_directive_tmp
        }
        load_scope_options()
        // load_scope_value() is done at the end of load_scope_options
        if (attrs.selectizeValueNgModel) {
          selectize_inst.on('change',function(value) {
            if (selectize_inst.mask_scope_value_update) {
              return
            }
            scope.$apply(function(){
              $log.log("setting ng model to value=",value)
              scope.__selectize_value_tmp = value
              scope.$eval(attrs.selectizeValueNgModel+" = __selectize_value_tmp")
              delete scope.__selectize_value_tmp
            })
          })
          scope.$watch(attrs.selectizeValueNgModel,load_scope_value)
        }
        return result
      });
    }
  };
}]);