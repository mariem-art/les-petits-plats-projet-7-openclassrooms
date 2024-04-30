document.addEventListener("DOMContentLoaded", function() {
  let uniqueTags = [];
  const selectTag = document.querySelector(".filter");

  // Fonction de recherche dans la barre de recherche
  function searchBar(recipes, inputValue) {
      const messageError = document.querySelector(".message-error");
      const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
      if (!regex.test(inputValue) && inputValue) {
          messageError.textContent = "Le champ doit contenir uniquement des lettres.";
      } else {
          const searchResults = recipes.filter(recipe => {
              return (
                  recipe.name.toLowerCase().includes(inputValue) ||
                  recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
                  recipe.ustensils.some(utensil => utensil.toLowerCase().includes(inputValue)) ||
                  recipe.appliance.toLowerCase().includes(inputValue)
              ) && (
                  uniqueTags.every(tag =>
                      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) ||
                      recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) ||
                      recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                  )
              );
          });

          if (searchResults.length === 0) {
              messageError.textContent = "Aucune recette trouvée pour cette recherche.";
          } else {
              messageError.textContent = "";
              const recipeNames = searchResults.map(recipe => recipe.name);
              displaySearchResults(recipeNames, "choix-recette");
              afficherListes("", searchResults);
          }
      }
  }

  // Fonction pour afficher les résultats de la recherche
  function displaySearchResults(results, containerClass) {
      const container = document.querySelector("." + containerClass);
      if (container) {
          while (container.firstChild) {
              container.removeChild(container.firstChild);
          }

          if (containerClass === "choix-recette") {
              for (let i = 0; i < results.length; i++) {
                  const result = results[i];
                  const recipe = recipes.find(recipe => recipe.name === result);
                  if (recipe) {
                      const recipeCard = recettTemplate(recipe);
                      const userCardDOM = recipeCard.getUserCardDOM();
                      container.appendChild(userCardDOM);
                  }
              }

              const recipeCountElement = document.getElementById('nb');
              recipeCountElement.textContent = results.length;
          } else {
              const defaultRecipeCount = 50;
              const recipeCountElement = document.getElementById('nb');
              recipeCountElement.textContent = defaultRecipeCount;
          }
      }
  }

  const btnSearch = document.getElementById('btn-search');
  if (btnSearch) {
      btnSearch.addEventListener('click', function() {
          const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
          searchBar(recipes, inputValue);
      });
  }

  afficherListes("", recipes);

  function afficherListes(term, recipes) {
      const ingredientsUniques = new Set();
      const appareilsUniques = new Set();
      const ustensilesUniques = new Set();

      for (let i = 0; i < recipes.length; i++) {
          const recipe = recipes[i];
          if (recipe.name.toLowerCase().includes(term)) {
              for (let j = 0; j < recipe.ingredients.length; j++) {
                  ingredientsUniques.add(recipe.ingredients[j].ingredient.toLowerCase());
              }
              appareilsUniques.add(recipe.appliance.toLowerCase());
              for (let k = 0; k < recipe.ustensils.length; k++) {
                  ustensilesUniques.add(recipe.ustensils[k].toLowerCase());
              }
          }
      }

      afficherListesUniques(Array.from(ingredientsUniques), Array.from(ustensilesUniques), Array.from(appareilsUniques));
  }

  function clearResults(containerClass) {
      const listContainer = document.querySelector(containerClass);
      if (listContainer) {
          const ulElements = listContainer.querySelectorAll("ul");
          ulElements.forEach(ul => ul.remove());
      }
  }

  function updateFilteredResults(elements, containerClass) {
      const listContainer = document.querySelector(containerClass);
      if (listContainer) {
          clearResults(containerClass);
          const searchText = event.target.value.trim().toLowerCase();
          const elements = new Set();
          elements.forEach((element) => {
              const listItem = document.createElement("li");
              listItem.classList.add("liste");
              listItem.textContent = element;
              listItem.addEventListener("click", function(event) {
                  event.stopPropagation();
                  listItem.classList.add("highlight");
                  const isDifferent = !uniqueTags.includes(element);
                  if (isDifferent) {
                      uniqueTags.push(element);
                      const filterElement = document.createElement("div");
                      filterElement.classList.add("tag");
                      const btnX = document.createElement("i");
                      btnX.className = "fa-solid fa-xmark close-tag";
                      btnX.addEventListener("click", function(event) {
                          event.stopPropagation();
                          closetag(btnX);
                          updateSearchResults();
                      });
                      filterElement.textContent = element;
                      filterElement.classList.add("tag", "highlight");
                      selectTag.appendChild(filterElement);
                      filterElement.appendChild(btnX);
                      const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
                      searchBar(recipes, inputValue);
                  }
              });
              listContainer.appendChild(listItem);
          });
      }
  }

  const inputIng = document.getElementById("myInput-ing");
  inputIng.addEventListener("input", function(event) {
      const searchText = event.target.value.trim().toLowerCase();
      const filteredIngredients = filterElements(Array.from(ingredientsUniques), searchText);
      afficherListeUnique(filteredIngredients, '.liste-choix-Ing', 'myInput-ing');
      updateFilteredResults(filteredIngredients, ".option-choix-Ing");
  });

  const inputApp = document.getElementById("myInput-app");
  inputApp.addEventListener("input", function(event) {
      const searchText = event.target.value.trim().toLowerCase();
      const filteredAppliances = filterElements(Array.from(appareilsUniques), searchText);
      afficherListeUnique(filteredAppliances, '.liste-choix-App', 'myInput-app');
      updateFilteredResults(filteredAppliances, ".option-choix-App");
  });

  const inputUst = document.getElementById("myInput-ust");
  inputUst.addEventListener("input", function(event) {
      const searchText = event.target.value.trim().toLowerCase();
      const filteredUtensils = filterElements(Array.from(ustensilesUniques), searchText);
      afficherListeUnique(filteredUtensils, '.liste-choix-Ust', 'myInput-ust');
      updateFilteredResults(filteredUtensils, ".option-choix-Ust");
  });

  function afficherListesUniques(ingredients, ustensiles, appareils) {
      afficherListeUnique(ingredients, '.liste-choix-Ing', 'myInput-ing');
      afficherListeUnique(appareils, '.liste-choix-App', 'myInput-app');
      afficherListeUnique(ustensiles, '.liste-choix-Ust', 'myInput-ust');
  }

  function afficherListeUnique(elements, containerClass, inputElement) {
      const listContainer = document.querySelector(containerClass);
      if (listContainer && inputElement) {
          let resultList = listContainer.querySelector("ul");
          if (!resultList) {
              resultList = document.createElement("ul");
              listContainer.appendChild(resultList);
          } else {
              resultList.innerHTML = '';
          }

          elements.forEach((element) => {
              const listItem = document.createElement("li");
              listItem.classList.add("liste");
              listItem.textContent = element;
              listItem.addEventListener("click", function(event) {
                  event.stopPropagation();
                  listItem.classList.add("highlight");
                  const isDifferent = !uniqueTags.includes(element);
                  if (isDifferent) {
                      uniqueTags.push(element);
                      const filterElement = document.createElement("div");
                      filterElement.classList.add("tag");
                      const btnX = document.createElement("i");
                      btnX.className = "fa-solid fa-xmark close-tag";
                      btnX.addEventListener("click", function(event) {
                          event.stopPropagation();
                          closetag(btnX);
                          updateSearchResults();
                      });
                      filterElement.textContent = element;
                      filterElement.classList.add("tag", "highlight");
                      selectTag.appendChild(filterElement);
                      filterElement.appendChild(btnX);
                      const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
                      searchBar(recipes, inputValue);
                  }
              });
              resultList.appendChild(listItem);
          });
          listContainer.appendChild(resultList);
      }
  }

  function closetag(btnX) {
      const tag = btnX.parentNode.textContent.trim();
      const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
      btnX.parentNode.remove();
      const index = uniqueTags.indexOf(tag);
      if (index !== -1) {
          uniqueTags.splice(index, 1);
      }
      searchBar(recipes, inputValue);
      updateSearchResults();
  }

  function updateSearchResults() {
      const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
      searchBar(recipes, inputValue);
  }

  const ingredients = [];
  const appliances = [];
  const utensils = [];
  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      recipe.ingredients.forEach(ingredient => {
          if (!ingredients.includes(ingredient.ingredient)) {
              ingredients.push(ingredient.ingredient);
          }
      });
      if (!appliances.includes(recipe.appliance)) {
          appliances.push(recipe.appliance);
      }
      recipe.ustensils.forEach(utensil => {
          if (!utensils.includes(utensil)) {
              utensils.push(utensil);
          }
      });
  }
});
