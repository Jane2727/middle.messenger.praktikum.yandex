import * as Handlebars from "handlebars";
import loginTemplate from "./login.tmpl.js";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import "./login.scss";

export function login() {
    const template = Handlebars.compile(loginTemplate);

    const context = {
        loginInput: Input({
            name: "login",
            label: "Логин",
            type: "text",
            required: true,
            errorMessage: "Неверный логин"
        }),
        passwordInput: Input({
            name: "password",
            label: "Пароль",
            type: "password",
            required: true,
            errorMessage: "Неверный пароль"
        }),
        button: Button({
            title: "Авторизоваться",
        }),
        linkTitle: "Нет аккаунта?"
    };

    return template(context);
}