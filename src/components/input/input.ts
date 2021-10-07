import { v4 as uuidv4 } from 'uuid';
import inputProfileTemplate from './inputProfile.tmpl';
import inputTemplate from './input.tmpl';
import { isClassDefined, classIfElse } from '../../utils';
import './input.scss';
import './inputProfile.scss';
import Block from '../../utils/block';

export type TInput = {
  isProfileInput?: boolean;
  type: string;
  errorMessage?: string;
  label: string;
  name: string;
  required?: boolean;
  value?: string | number;
  disabled?: boolean;
  inputContainerClassName?: string;
  inputClassName?: string;
  dataType?: string;
}

export default class Input extends Block {
  constructor(context: TInput, events = {}) {
    super('div', {
      context: {
        ...context,
        disabledInput: context.disabled,
        inputContainerClassName: `${classIfElse(context.isProfileInput, 'input-profile__container', 'input__container')} 
          ${isClassDefined(context.inputContainerClassName)}`,
        inputClassName: `${classIfElse(context.isProfileInput, 'input-profile__input', 'input')} ${isClassDefined(context.inputClassName)}`,
        id: uuidv4()
      },
      template: context.isProfileInput ? inputProfileTemplate : inputTemplate,
      events
    });
  }
}
