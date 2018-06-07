$(document).ready(function(){
    
	var loginFormCheck = (function(){
		
		var _form = $('#login-form');
		var _valid = false;	
		var _formValidator = new FormValidator(_form);	
 
		var init = function(){
			_setUpListeners();  
		}

		var _setUpListeners = function(){

			_form.on('submit', function(event){
				_formValidate(event);
			});

			_form.find('.button--login').on('click', function(event){
				event.preventDefault();
				_form.submit();
			});
		}

		var _formValidate = function (event) {
    		event.preventDefault();
    		_formValidator.tools.hideErrors();
			_valid = _formValidator.validateForm()

    		if(_valid){
    			var _name_val = _form.find('input[name="name"]').val();
    			var _password_val = _form.find('input[name="password"]').val();

    			if(_name_val != 'mail@mail.com' || _password_val != '123')
    			{
    				_valid = false;    				
    				_formValidator.tools.addError('Неверный email или пароль',
    							`<p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля,
    							 </a>чтобы войти на сайт.</p>`); 				
    			}

    		}

    		if(_valid){
    			_form.unbind('submit').submit();
    		} 		
		}

		isValid = function(){
			return _valid;
		}

		return {
			init,
			isValid
		}
	
	}());
  
	loginFormCheck.init();

});