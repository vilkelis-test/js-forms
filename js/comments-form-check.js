$(document).ready(function() {

	commentFormCheck = (function(){

		var _form = $('#comment-form');
		var _textarea = _form.find('textarea');
		var _error = _form.find('.error');
		var _button = _form.find('.button');

		var init = function(){
			_setUpListeners(); 		
		}

		var _setUpListeners = function () {

			_form.on('submit', function(event){
				_formValidate(event);
			});

			_button.on('click', function(event){
				_submitForm(event);
			});

			_textarea.on('keypress',function(event){
				_textareaChange(event);
			});

		}

		var _formValidate = function(event) {
			event.preventDefault(); 		 
			if (_textarea.val().trim().length === 0 ){
				_error.removeClass('hide');
			} 
			else {
				_error.addClass('hide');
				_form.unbind('submit').submit();
			}
		}

		var _textareaChange = function(event){
			_error.addClass('hide');			
		}

		var _submitForm = function(event){
			event.preventDefault();
			_form.submit();
		}

		return {
			init
		}

	}());

	commentFormCheck.init();

});
