export default
`<div class="current-chat-area__selected">
        <div class="current-chat__header">
            <div class="current-chat__header-image">
                <img src="{{avatarIcon}}" class="current-chat__header-icon">
            </div>
            <div class="current-chat-name">{{chatTitle}}</div>
            <div class="chat-settings">
                <div class="chat-settings__icon"></div>
            </div>
        </div>
        <div class="current-chat__main">
            {{{createUser}}}
            <div class="users-list">
            {{#each users}}
                <div class="user-item">
                    {{{this}}}
                </div>
            {{/each}}
            </div>
            <div class="messages__container">
            </div>
        <div class="user-form hidden" id="user-form">
            <div class="user-form-title">{{newUserTitle}}</div>
            {{{userForm}}}
        </div>
        </div>
        <div class="current-chat__footer">
            <div class="add-file-button">
                <div class="add-file-button__icon"></div>
            </div>
            <div class="message-input">
                {{{message}}}
            </div>
            <div class="send-button">
                {{{sendButton}}}
            </div>
        </div>
    </div>`;
