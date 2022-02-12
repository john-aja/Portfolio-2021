import * as model from './views/model.js';
import { MODAL_CLOSE_SEC } from './views/config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime'

if (module.hot) {
    module.hot.accept();
}


/////////////////////////////////////////////////////////////////////////////


const controlRecipe = async function () {

    try {

        //  Message //

        recipeView.renderMessage()

        const id = window.location.hash.slice(1);

        if (!id) return;

        //  Loading spinner //

        recipeView.renderSpinner();

        //  Loading recipe //

        await model.loadRecipe(id);

        //  Rendering Recipe //

        recipeView.render(model.state.recipe);



        controlServings(4)
    }
    catch (err) {
        console.log(err)
        recipeView.renderError()
    }
};


const controlSearchResults = async function () {
    try {
        resultView.renderSpinner();

        //  get search query //
        const query = searchView.getQuery();
        if (!query) return;

        // load search results //
        await model.loadSearchResults(query);

        resultView.renderError()
        // console.log(model.state.search.results);
        // resultView.render(model.state.search.results);
        resultView.render(model.getSearchResultsPage());

        // render initial pagination button
        paginationView.render(model.state.search)
    }
    catch (err) {
        console.error(err)
    }
}

const controlPagination = function (goToPage) {

    // render new result
    resultView.render(model.getSearchResultsPage(goToPage));

    // render pagination button
    paginationView.render(model.state.search)
}

const controlServings = function (newServings) {

    model.updateServings(newServings)

    recipeView.render(model.state.recipe);
}



const controlAddBookmark = function () {
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    console.log(model.state.recipe);
    recipeView.render(model.state.recipe)
}







const controlAddRecipe = async function (newRecipe) {
    try {

        // Show loading spinner
        addRecipeView.renderSpinner();

        // Upload the new recipe data
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        // Render recipe
        recipeView.render(model.state.recipe);
        // resultView.render(model.newRecipe);

        // Success message
        addRecipeView.renderMessage();

        // Render bookmark view
        // bookmarksView.render(model.state.bookmarks);

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // Close form window
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000);
    }
    catch (err) {
        console.error('💥', err);
        addRecipeView.renderError(err.message);
    }
};


const init = function () {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();