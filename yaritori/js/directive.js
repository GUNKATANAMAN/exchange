angular.module('exchangeApp').directive('toggleInput', function() {
  return {
    restrict : 'A',
    link : function(scope, element, attrs, ngModel) {

      element.find('input').blur(function() {
        element.find('.text').removeClass('hidden');
        element.find('.input-group').addClass('hidden');
      });

      element.find('.text').click(function() {
        element.find('.text').addClass('hidden');
        element.find('.input-group').removeClass('hidden');
        element.find('input').focus();
      });

    }
  }
})