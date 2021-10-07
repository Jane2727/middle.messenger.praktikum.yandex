export default
`<div class="profile-page">
        <div class="profile-page__container">
            <div class="profile-page__header">
                <div class="profile-page__image">
                    {{{avatar}}}
                </div>
                {{#if isViewMode}}
                    <span class="profile-page__user-name">{{header}}</span>
                {{/if}}
            </div>
            {{{content}}}
        </div>
    </div>`;
