export default
    `<div class="{{inputContainerClassName}}">
        <input class="{{inputClassName}}" type="{{type}}" name="{{name}}" value="{{value}}" placeholder="{{label}}" required={{required}} />
        <div class="input__error-message hidden">{{errorMessage}}</div>
    </div>`;