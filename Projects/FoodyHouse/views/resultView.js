import View from './view.js';


class ResultView extends View {
  _parentElement = document.querySelector('.preview-sec');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {

    return this._data.map(this._generateMarkupPreview).join('');
  }


  _generateMarkupPreview(result) {
    return `<li class="preview">
                    <a href="#${result.id}">
                        <div class="recipe-result result-1">
                            <img class="recipe-image" src="${result.image}" />
                            <div>
                                <h4 class="item-name">${result.title}</h4>
                                <p class="shop-name">${result.publisher}</p>
                            </div>
                              <svg class="self-icon ${result.key ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
            class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
                        </div>
                    </a>
                </li>`
  }

}

export default new ResultView();
