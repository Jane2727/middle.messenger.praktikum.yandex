import * as Handlebars from 'handlebars';
import selectedTemplate from './chatSelected.tmpl';
import { Input } from '../../../../components/input/input';
import sendIcon from '../../../../../static/assets/arrow-send.svg';
import chatSettingsIcon from '../../../../../static/assets/chat-settings.svg';
import addFileIcon from '../../../../../static/assets/add-file.svg';
import avatarIcon from '../../../../../static/assets/avatar-icon.svg';
import './chatSelected.scss';
import { checkValidation } from '../../../../utils';

export function chatSelected() {
  const template = Handlebars.compile(selectedTemplate);

  const message = new Input({
    label: 'Сообщение',
    inputClassName: 'input__message',
    name: 'message',
    type: 'text',
    dataType: 'message',
    inputContainerClassName: 'input__container-gray',
  },
  {
    focus: (event: Event) => {
      checkValidation({ event });
    },
    blur: (event: Event) => {
      checkValidation({ event });
    },
  });

  const context = {
    avatarIcon,
    sendIcon,
    chatSettingsIcon,
    addFileIcon,
    chatTitle: 'Выбранный чат',
    message: message.transformToString(),
  };

  return template(context);
}
