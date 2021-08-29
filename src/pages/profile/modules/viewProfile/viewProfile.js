import * as Handlebars from "handlebars";
import viewProfileTemplate from "./viewProfile.tmpl.js";
import { Input } from "../../../../components/input";
import "./viewProfile.scss";

export function viewProfile() {
    const template = Handlebars.compile(viewProfileTemplate);

    const context = {
        inputs: [
            Input({
                value: "pochta@yandex.ru",
                name: "mail",
                label: "Почта",
                type: "text",
                required: true,
                disabled: true,
                isProfileInput: true,
            }),
            Input({
                value: "john",
                name: "login",
                label: "Логин",
                type: "text",
                required: true,
                disabled: true,
                isProfileInput: true,
            }),
            Input({
                value: "john",
                name: "name",
                label: "Имя",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
            }),
            Input({
                value: "doe",
                name: "lastName",
                label: "Фамилия",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
            }),
            Input({
                value: "7777777",
                name: "phone",
                label: "Телефон",
                type: "text",
                required: false,
                disabled: true,
                isProfileInput: true,
            }),
            Input({
                value: "john",
                name: "nickname",
                label: "Имя в чате",
                type: "text",
                disabled: true,
                isProfileInput: true,
            })
        ],
        changeData: "Изменить данные",
        changePassword: "Изменить пароль",
        back: "Выйти"
    };

    return template(context);
}