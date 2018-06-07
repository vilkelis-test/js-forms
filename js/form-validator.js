/*Универсальный валидатор форм

 -- Проверка полей input на пустое значение
 Для проверки заполненности необходимо задать для input атрибут data-error-text-empty
 в который поместить сообщение об ошибке в случае пустого значения.
 Пример: <input class="input" data-error-text-empty="Введите пароль"/>
 
 -- Проверка полей input на соответствие регулярному выражению
 Для проверки  необходимо:
  1. задать для input атрибут data-error-text-format
 в который поместить сообщение об ошибке в случае несоответствия шаблону;
  2. задать для input атрибут data-valid-format
 в который поместить шаблон регулярного выражения. 
 Если в качестве значения указано слово email, то будет производиться валидация значения согласно шаблону для электронной почты.
 Пример: <input data-error-text-format="Неверный формат email" data-valid-format="email"/>

*/
var FormValidator = function(form){

	var _form = form;

	var addError = function(errorText, errorDescription){

		var _el = _form.find('.error, .error-description').last();

		if(_el.length === 0){
			_el = _form.find('.plate__heading');
		}

		if(errorDescription){	
			_el.after(`<div class="error-description">${errorDescription}</div>`);
			_el.after(`<div class="error error--with-desc">${errorText}</div>`);					
		}
		else{
			_el.after(`<div class="error">${errorText}</div>`);	
		}			
	}

	var hideErrors = function(){
		_form.find('.error').remove();
		_form.find('.error-description').remove();
	};

	var strToRegExp = function(inputstring){

		var _flags = inputstring.replace(/.*\/([gimy]*)$/, '$1');
		var _pattern = inputstring.replace(new RegExp('^/(.*?)/'+_flags+'$'), '$1');

		return new RegExp(_pattern, _flags);
	}


	var validateForm = function () {
		hideErrors();
		var _valid = true;
		var _inputs = _form.find('input');

		$.each(_inputs,function(index, val){
					
			input = $(val);

			if(input.attr('data-error-text-empty') && input.val().trim().length === 0 ){
				 _valid = false;
				 addError(input.attr('data-error-text-empty'));
			}
			else if(input.attr('data-valid-format')){

				var _pattern;

			   	if(input.attr('data-valid-format') === 'email'){
			   		_pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			   	}
			   	else{
			   		_pattern = _strToRegExp(input.attr('data-valid-format'));
			   	}

			   	if(_pattern){
			   		if( !_pattern.test(input.val()) ){
			   			_valid = false;
			   			addError(input.attr('data-error-text-format'));
			   		} 
			   	}

			}

		});

		return(_valid);
	}

	return ({
		tools:{ addError,
				hideErrors,
				strToRegExp},
		validateForm
	});
};