import * as Handlebars from "handlebars";
import profileTemplate from "./profile.tmpl";
import { viewProfile } from "./modules/viewProfile";
import { editProfile } from "./modules/editProfile";
import { routes } from "../../utils/constants";
import "./profile.scss";
import avatarIcon from "../../../static/assets/avatar-icon.svg";


export function profilePage(route: string) {
    const template = Handlebars.compile(profileTemplate);

    const content = route == routes.viewProfile ? viewProfile : editProfile(route);

    const context = {
        header: "John",
        avatarIcon,
        content,
        isViewMode: route == routes.viewProfile
    };

    return template(context);
}