import * as Handlebars from "handlebars";
import buttonTemplate from "./button.tmpl.js";
import { isClassDefined } from "../../utils";
import "./button.scss";

export function Button({ title, buttonClassName }) {
    const template = Handlebars.compile(buttonTemplate);

    const context = {
        title,
        buttonClassName: `button ${isClassDefined(buttonClassName)}`,
    }

    return template(context);
}