import View from './view.js';



class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);




        // page 1
        if (curPage === 1 && numPages > 1) {
            return `<button data-goto="${curPage + 1}" class="page-navi page-nxt btn--inline pagination__btn--next"><span
            class="page-forward"> Page ${curPage + 1}</span> &#8594; </button>`;
        }

        // last page
        if (curPage === numPages && numPages > 1) {
            return `<button data-goto="${curPage - 1}" class="page-navi page-prev btn--inline pagination__btn--prev"> &#8592; <span
            class="page-backward"> Page ${curPage - 1}</span></button>`
        }

        // other page
        if (curPage < numPages) {
            return `<button data-goto="${curPage - 1}" class="page-navi page-prev btn--inline pagination__btn--prev"> &#8592; <span
                     class="page-backward"> Page ${curPage - 1}</span></button>
                    <button data-goto="${curPage + 1}" class="page-navi page-nxt btn--inline pagination__btn--next"><span
                     class="page-forward"> Page ${curPage + 1}</span> &#8594; </button>`
        }

        return '';
    }
}



export default new PaginationView()