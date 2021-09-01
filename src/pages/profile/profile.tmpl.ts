export default
`<div class="profile-page">
        <div class="profile-page__container">
            <div class="profile-page__header">
                <div class="profile-page__image">
                    <img src="{{avatarIcon}}" class="profile-page__image__icon">
                </div>
                {{#if isViewMode}}
                    <span class="profile-page__user-name">{{header}}</span>
                {{/if}}
            </div>
            {{{content}}}
        </div>
    </div>`;
