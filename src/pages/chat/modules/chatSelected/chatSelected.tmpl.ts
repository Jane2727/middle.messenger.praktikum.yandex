export default
`<div class="current-chat-area__selected">
        <div class="current-chat__header">
            <div class="current-chat__header-image">
                <img src="{{avatarIcon}}" class="current-chat__header-icon">
            </div>
            <div class="current-chat-name">{{chatTitle}}</div>
            <div class="chat-settings">
                <img src="{{chatSettingsIcon}}" class="chat-settings__icon">
            </div>
        </div>
        <div class="current-chat__main">
        {{{createUser}}}
        {{#each users}}
            {{{this}}}
        {{/each}}
        <div class="user-form hidden" id="user-form">
            <div class="user-form-title">{{newUserTitle}}</div>
            {{{userForm}}}
        </div>
        </div>
        <div class="current-chat__footer">
            <div class="add-file-button">
                <img src="{{addFileIcon}}" class="add-file-button__icon">
            </div>
            <div class="message-input">
                {{{message}}}
            </div>
            <div class="send-button">
                <img src="{{sendIcon}}" class="send-button__icon">
            </div>
        </div>
    </div>`;
