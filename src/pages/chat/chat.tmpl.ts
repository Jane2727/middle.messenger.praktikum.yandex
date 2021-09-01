export default
`<div class="chat-page">
        <div class="chat-page__container">
            <div class="chat-list-area">
                <div class="profile">
                    <a class="profile__link" href="/viewProfile">
                        <span class="profile__link-title">{{profileTitle}}</span>
                    </a>
                </div>
                <div class="search-input">
                    {{{searchInput}}}
                </div>
                <ul class="chat-list">
                    {{#each contacts}}
                        <a class="profile__link" href="/chatSelected">
                            <li class="chat-list__item">
                                <div class="chat-list__item-image">
                                    <img src="{{avatarIcon}}" class="chat-list__item-icon">
                                </div>
                                <div class="chat-list__item-data">
                                    <div class="chat-list__item-name">{{this.name}}</div>
                                    <div class="chat-list__item-message">{{this.message}}</div>
                                </div>
                            </li>
                        </a>
                    {{/each}}
                </ul>
            </div>
            {{{currentChatArea}}}
        </div>
    </div>`;
