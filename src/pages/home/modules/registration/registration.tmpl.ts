export default
`<div class="registration">
        <div class="registration__form">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        </div>
        <div class="registration__buttons-panel">
                {{{button}}}
            <a class="registration__login-link" href="/notSelectedChat">
                <span class="registration__login-link-title">{{linkTitle}}</span>
            </a>
        </div>
    </div>`;
