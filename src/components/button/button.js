import * as Handlebars from "handlebars";
import buttonTemplate from "./button.tmpl.js";
import { isClassDefined } from "../../utils";
import "./button.scss";

const template = Handlebars.compile(buttonTemplate);

export function Button({ title, buttonClassName }) {
    const context = {
        title,
        buttonClassName: `button ${isClassDefined(buttonClassName)}`,
    }

    return template(context);
}