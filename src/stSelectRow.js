ng.module('smart-table')
  .directive('stSelectRow', ['stConfig', function (stConfig) {
    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRow'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || stConfig.select.mode;
        element.bind('click', function ($event) {
          scope.$apply(function () {
            ctrl.select(scope.row, mode, $event.shiftKey ? 1 : ($event.ctrlKey ? 2 : 0));
          });
        });

        scope.$watch('row.isSelected', function (newValue) {
          if (newValue === true) {
            element.addClass(stConfig.select.selectedClass);
          } else {
            element.removeClass(stConfig.select.selectedClass);
          }
        });
      }
    };
  }])
  .directive('stSelectRowCtrl', ['stConfig', function (stConfig) {
    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRowCtrl'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || stConfig.select.mode;
        if (mode == 'multiple2') {
          element.bind('click', function ($event) {
            $event.stopPropagation();
            scope.$apply(function () {
              ctrl.select(scope.row, mode, 2);
             });
          });

          scope.$watch('row.isSelected', function (newValue) {
            if (newValue === true) {
              element.addClass(stConfig.select.selectedClass);
            } else {
              element.removeClass(stConfig.select.selectedClass);
            }
          });
        }

      }
    };
  }]);
