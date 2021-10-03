export default
`<div class="view-profile">
        <div class="view-profile__form">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        </div>
        <div class="profile__buttons-panel">
            <a class="profile__change-data-link" href="/settings-edit-data">
                <span>{{changeData}}</span>
            </a> 
            <a class="profile__change-password-link" href="/settings-edit-password">
                <span>{{changePassword}}</span>
            </a> 
            <div class="profile__back-link">
                <span>{{{back}}}</span>
            </div> 
        </div>
    </div>`;
