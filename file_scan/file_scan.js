(function ($) {
  Drupal.behaviors.NameOfYourTheme = {

    attach: function (context, settings) {
		 
         $("#tab").click(function(){
			 alert('Clicked');return false;
			if( this.value == 'Agent'){
				$('.form-item.form-type-select.form-item-field-my-channel-manager').show();
			}else{
				$('.form-item.form-type-select.form-item-field-my-channel-manager').hide();
			}
		}); 
    }
  }
})(jQuery);
