import { Fraction } from 'fractional';
import View from './view.js';

class RecipeView extends View {

    _parentElement = document.querySelector('.recipeee');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = 'Start by searching for a recipe or an ingredient. Have fun!';


    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;
            const { updateTo } = btn.dataset;
            if (+updateTo > 0) handler(+updateTo);
        });
    }


    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            handler();
        })
    }




    _generateMarkup() {
        return `<div class="recipe-details response-1">
        <img class="recipe-detail-image" src="${this._data.image}" />
        <h1 class="recipe-title"><span>${this._data.title}</span>
        </h1>
        <div class="recipe-cook">
            <div class="cook-info">
                <svg class="cook-icon time-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="bi bi-clock" viewBox="0 0 16 16">
                    <path
                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                <span class="cook time"><b>${this._data.cookingTime}</b> minutes</span>
            </div>
            <div class="cook-info">
                <svg class="cook-icon serving-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="bi bi-people" viewBox="0 0 16 16">
                    <path
                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
                <span class="cook serving-num"><b>${this._data.servings}</b> SERVINGS</span>
                
                <button><svg class="cook-icon reduce-serving btn--update-servings" data-update-to="${this._data.servings - 1
            }" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                          class="bi bi-dash-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg></button>
                      <button><svg class="cook-icon add-serving btn--update-servings" data-update-to="${this._data.servings + 1
            }" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                              class="bi bi-plus-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path
                                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg></button>

            </div>
            
        
            <svg class="cook-icon ${this._data.key ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        

            <div class="cook-info">
                <button class="btn--bookmark"><svg class="bookmark-icon bookmarked-${this._data.bookmarked ? 'success' : ''}" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    class="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
                </svg></button>
            </div>
        </div>

        <div class="cooking-instruction">
            <div class="ingredients-color">
                <h1 class="cooking-title">RECIPE INGREDIENTS</h1>
                <div class="ingredient-section">
                    <ul class="ingredient-details">
                        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
                     </ul>
                  </div>
                </div>
            </div>

            <div class="how-to">
                <h1 class="how-to-cook">How to cook it</h1>
                <p class="how-to-instruction">This recipe was carefully designed and tested by <b>${this._data.publisher}</b>.
                    Please check out directions at their website.</p>
            </div>
        </div>

        <div class="direction">
            <a href="${this._data.sourceUrl}" class="direction-btn">Direction &#8594;</a>
        </div>
    </div> `;
    }

    _generateMarkupIngredient(ing) {
        return `<li class="points">
                    <svg class="point-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         class="bi bi-check2" viewBox="0 0 16 16">
                         <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <span class="ingredient">${ing.quantity ? new Fraction(ing.quantity).toString() : ''} ${ing.unit} ${ing.description}</span>
                </li>`
    }
}

export default new RecipeView();