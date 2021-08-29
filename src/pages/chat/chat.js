import * as Handlebars from "handlebars";
import chatPageTemplate from "./chat.tmpl";
import { notSelectedChat } from "./modules/notSelectedChat";
import { chatSelected } from "./modules/chatSelected";
import { routes } from "../../utils";
import { Input } from "../../components/input";
import avatarIcon from "../../../static/assets/avatar-icon.svg";
import "./chat.scss";

export function chatPage(route) {
    const template = Handlebars.compile(chatPageTemplate);
    const currentChatArea = route == routes.chatSelected ? chatSelected : notSelectedChat;

    const context = {
        currentChatArea, 
        profileTitle: "Профиль",
        emptyChatTitle: "Выберите чат чтобы отправить сообщение",
        searchInput: Input({
            label: "Поиск",
            inputClassName: "input__search",
            name: "search",
            type: "text",
            inputContainerClassName: "input__container-gray"
        }),
        contacts: [
            {name: "Ann", message: "Hi! I lost my ...", id: "1952", avatarIcon} , 
            {name: "Dan", message: "Have you seen...", id: "1953", avatarIcon} , 
            {name: "Mary", message: "Good night!", id: "1954", avatarIcon}
        ],
    };

    return template(context);
}