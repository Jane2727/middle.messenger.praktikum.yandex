import { Dictionary } from './block';

const showWarningMessage = (input: HTMLInputElement, isError: boolean) => {
  const parent = input.parentNode || input.parentElement;
  const messageElement = parent && (parent.querySelector('.input__error-message') || parent.querySelector('.input-profile__error-message'));

  if (messageElement) {
    if (isError) {
      messageElement.classList.remove('hidden');
    } else {
      messageElement.classList.add('hidden');
    }
  }
};

const checkLoginField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const regexp = /^[\w\d]*$/ig;
    const { value } = input;
    isError = !value.match(regexp) || (value.length < 3 || value.length > 20);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPasswordField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const regexp = /^[\w\d]*$/ig;
    const { value } = input;
    isError = !value.match(regexp) || (value.length < 8 || value.length > 40);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPhoneNumberField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const regexp = /^(\+7|7|8)[0-9]{10}$/;
    const { value } = input;
    isError = !value.match(regexp) || (value.length < 10 || value.length > 15);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMailField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const regexp = /^[\w\d.-]*@[\w\d.-]*$/;
    const { value } = input;
    isError = !value.match(regexp);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkNameField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const regexp = /^\w+$/;
    const { value } = input;
    isError = !value.match(regexp);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMessageField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = value === '';
  }
  return isError;
};

export const checkValidation = (data: {event?: Event | null, input?: HTMLInputElement}): boolean => {
  const input = data.event?.target as HTMLInputElement || data.input;
  const type = input.getAttribute('data-type') || 'text';

  switch (type) {
    case ('password'):
      return checkPasswordField(input);
    case 'login':
      return checkLoginField(input);
    case 'email':
      return checkMailField(input);
    case 'name':
      return checkNameField(input);
    case 'phone':
      return checkPhoneNumberField(input);
    case 'message':
      return checkMessageField(input);
    default:
      return false;
  }
};

const getFormModel = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');

  if (!inputs || inputs?.length === 0) {
    return;
  }

  const data: Dictionary = [...inputs].reduce((model: Dictionary, input: HTMLInputElement) => {
    const { name, value } = input;
    model[name] = value;
    return model;
  }, {});

  console.log(data);
};

const checkAllInputsFields = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  return [...inputs].map((input) => checkValidation({ input })).every((isError) => isError === false);
};

export const checkAndCollectData = (event: Event, nextRoute: string) => {
  const form = event.target as HTMLFormElement;
  if (form && checkAllInputsFields(form)) {
    getFormModel(form);
    if (nextRoute) window.location.href = nextRoute;
  }
};
