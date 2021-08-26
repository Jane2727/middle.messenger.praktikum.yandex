export default
    `<div class="edit-profile">
        <div class="edit-profile__form">
            {{#each inputs}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="edit-profile__buttons-panel">
            <a class="edit-profile__save-link" href="./viewProfile">
                {{{save}}}
            </a> 
            <a class="editProfile__back-link" href="./viewProfile">
                {{{back}}}
            </a> 
        </div>
    </div>`;