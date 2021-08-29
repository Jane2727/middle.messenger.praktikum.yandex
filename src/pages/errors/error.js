import * as Handlebars from "handlebars";
import errorPageTemplate from "./error.tmpl";
import { routes } from "./../../utils";
import "./error.scss";

export function errorPage(route) {
    const template = Handlebars.compile(errorPageTemplate);
    const isNotFoundPageError = route == routes.notFound;
    
    const context = {
        code: isNotFoundPageError ? "404" : "500",
        title: isNotFoundPageError ? "Не туда попали" : "Мы уже фиксим",
        linkTitle: "Назад к чатам"
    };

    return template(context);
}