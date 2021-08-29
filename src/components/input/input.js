import Handlebars from "handlebars";
import inputTemplate from "./input.tmpl.js";
import inputProfileTemplate from "./inputProfile.tmpl.js";
import { isClassDefined } from "../../utils";
import "./input.scss";
import "./inputProfile.scss";

export function Input(params) {
    const { 
        isProfileInput, 
        required = false, 
        value = null, 
        disabled = false, 
        inputContainerClassName, 
        inputClassName 
    } = params;

    const template = Handlebars.compile(isProfileInput ? inputProfileTemplate : inputTemplate);

    const baseContainerClassName = isProfileInput ? "input-profile__container" : "input__container" ;
    const baseInputClassName = isProfileInput ? "input-profile__input" : "input";

    const context = { 
        ...params, 
        required, 
        value, 
        disabledInput: disabled,
        inputContainerClassName: `${baseContainerClassName} ${isClassDefined(inputContainerClassName)}`,
        inputClassName: `${baseInputClassName} ${isClassDefined(inputClassName)}`,
    };

    return template(context);
}