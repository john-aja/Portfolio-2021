class SearchView {
    _parentEl = document.querySelector('.search_field');

    getQuery() {
        const query = this._parentEl.querySelector('.input-recipe').value;
        this._clearInput();
        return query;
    }
    _clearInput() {
        this._parentEl.querySelector('.input-recipe').value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}


export default new SearchView();

