export default
    `<div class="view-profile">
        <div class="view-profile__form">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        </div>
        <div class="profile__buttons-panel">
            <a class="profile__change-data-link" href="./editProfileData">
                <span>{{changeData}}</span>
            </a> 
            <a class="profile__change-password-link" href="./editProfilePassword">
                <span>{{changePassword}}</span>
            </a> 
            <a class="profile__back-link" href="./notSelectedChat">
                <span>{{back}}</span>
            </a> 
        </div>
    </div>`;