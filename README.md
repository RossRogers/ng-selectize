This is an Angular.js directive for Brian Reavis's selectize jQuery plugin (http://brianreavis.github.io/selectize.js/).

# Info #

Module: 'clientApp'

Directive: 'selectize'

## Using: ##


    <select 
      name="" 
      selectize="{
        delimiter: ',',
        persist: false 
      }" 
      [selectize-options-ng-model="MyAngularJSDataToWatch"]
      [selectize-value-ng-model="SelectedValue"]
      [selectize-inst-ref="data.place_to_put_selectize_object_reference[42]"]
    >


### Attributes: ###

* `selectize` - this attribute is passed directly to [selectize.js](https://github.com/brianreavis/selectize.js/blob/master/docs/api.md)
    whose parameters are defined in [`selectize.js's` documentation.](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#options)
    
    This parameter can have references to functions and objects on your `$scope`
    as they will be automatically resolved to the object reference itself 
    through use of the [`$scope.$eval`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$eval)
    
* `selectize-options-ng-model` - tells the AngularJS `selectize` directive to
    listen for any changes to the specified data *array* in the current
    [`$scope`](https://docs.angularjs.org/guide/scope) and then to update the
    options in the selectize widget with any new options in the updated array.
    
    `selectize.js` will grab the fields in each element of the array according
    to the JSON `labelField` and `valueField` parameters that are the values of
    the element's `selectize` attribute.  Defaults for those parameters may be
    seen in the [`selectize.js` options documentation](https://github.com/brianreavis/selectize.js/blob/master/docs/usage.md#options)

* `selectize-value-ng-model` - location that the selected value will be placed
    when the user sets it and a way to set the selected value which will 
    propagate to the selectize inst.
    
* `selectize-inst-ref` - a variable name under `$scope` where a reference to
    the 
    [`selectize` object](https://github.com/brianreavis/selectize.js/blob/master/docs/api.md)
    is placed.
