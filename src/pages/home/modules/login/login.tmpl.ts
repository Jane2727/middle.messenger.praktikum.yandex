export default
`<div class="login">
        <div class="login__form">
            {{#each inputs}}
                <div data-component="input" data-key="{{@index}}">{{{this}}}</div>
            {{/each}}
        </div>
        <div class="login__buttons-panel">
                {{{button}}}
            <a class="login__registration-link" href="/registration">
                <span class="login__registration-link-title">{{linkTitle}}</span>
            </a>
        </div>
    </div>`;
