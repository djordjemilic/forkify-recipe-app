import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe, state } from '../model/model';
import recipeView from '../view/recipeView.js';

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    ///////////// Loading Recipe /////////////
    await loadRecipe(id);
    ///////////// Rendering Recipe /////////////
    recipeView.render(state.recipe);
  } catch (e) {
    console.log(e);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
