export default
    `<div class="login">
        <div class="login__form">
            {{{loginInput}}}
            {{{passwordInput}}}
        </div>
        <div class="login__buttons-panel">
            <a href="./notSelectedChat">
                {{{button}}}
            </a>
            <a class="login__registration-link" href="./registration">
                <span lass="login__registration-link-title">{{linkTitle}}</span>
            </a>
        </div>
    </div>`;