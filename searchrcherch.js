document.addEventListener("DOMContentLoaded", function () {
    const selectedTags = [];
    const filterValues = [];
    let uniqueTags = [];

    const selectTag = document.querySelector(".filter");
    const searchInputElement = document.getElementById("searchInput"); 
    const listItems = document.querySelectorAll(".listItems");

    function closetag(btnX) {
        const tag = btnX.parentNode.textContent.trim();
        btnX.parentNode.remove();
        const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
        searchBar(recipes, inputValue);
        reactiverTag(tag);
        afficherListeUnique(elements, containerClass, inputElement);
        const index = selectedTags.indexOf(tag);
        if (index !== -1) {
            selectedTags.splice(index, 1);
        }
    }

    function searchBar(recipes, inputValue) {
        const messageError = document.querySelector(".message-error");
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
        if (!regex.test(inputValue) && inputValue) {
            messageError.textContent = "Le champ doit contenir uniquement des lettres.";
        } else {
            const searchResults = recipes.filter((recipe) => {
                return (
                    (recipe.name.toLowerCase().includes(inputValue) ||
                        recipe.ingredients.some((ingredient) =>
                            ingredient.ingredient.toLowerCase().includes(inputValue)
                        ) ||
                        recipe.ustensils.some((utensil) =>
                            utensil.toLowerCase().includes(inputValue)
                        ) ||
                        recipe.appliance.toLowerCase().includes(inputValue)) &&
                    uniqueTags.every(
                        (tag) =>
                            recipe.ingredients.some((ingredient) =>
                                ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                            ) ||
                            recipe.ustensils.some((utensil) =>
                                utensil.toLowerCase().includes(tag.toLowerCase())
                            ) ||
                            recipe.appliance.toLowerCase().includes(tag.toLowerCase())
                    )
                );
            });
            if (searchResults.length === 0) {
                messageError.textContent = "Aucune recette trouvée pour cette recherche.";
            } else {
                messageError.textContent = "";
                const recipeNames = searchResults.map((recipe) => recipe.name);
                displaySearchResults(recipeNames, "choix-recette");
                afficherListes("", searchResults);
            }
        }
    }
    function searchInput(inputElement, result) {
        const inputValue = inputElement.value.trim().toLowerCase();
        const searchResults = result.filter((item) =>
            item.toLowerCase().includes(inputValue)
        );
        afficherListesUniques(searchResults, inputElement.resultset.container);
    }

    const inputs = document.querySelectorAll(".search-input");
    if (inputs) {
        inputs.forEach((input) => {
            input.addEventListener("keyup", function () {
                let result;
                if (input.resultset.type === "ingredients") {
                    result = ingredients;
                } else if (input.resultset.type === "appliances") {
                    result = appliances;
                } else if (input.resultset.type === "utensils") {
                    result = utensils;
                }
                searchInput(input, result);
            });
        });
    }
   
    searchInputElement.addEventListener("input", function () {
        const searchTerm = searchInputElement.value.toLowerCase();
        listItems.forEach(function (item) {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });

    function filterDropdownList(inputElement, inputs) {
        const searchText = inputElement.value.toLowerCase();
        const listItems = document.querySelectorAll(`#${inputs} li`);
        listItems.forEach((element) => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchText)) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });
    }

    function displaySearchResults(results, containerClass) {
        const container = document.querySelector("." + containerClass);
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            if (containerClass === "choix-recette") {
                results.forEach((result) => {
                    const recipe = recipes.find((recipe) => recipe.name === result);
                    if (recipe) {
                        const recipeCard = recettTemplate(recipe);
                        const userCardDOM = recipeCard.getUserCardDOM();
                        container.appendChild(userCardDOM);
                    }
                });
                const recipeCountElement = document.getElementById("nb");
                recipeCountElement.textContent = results.length;
            } else {
                const defaultRecipeCount = 50;
                const recipeCountElement = document.getElementById("nb");
                recipeCountElement.textContent = defaultRecipeCount;
            }
        }
    }

    const btnSearch = document.getElementById("btn-search");
    if (btnSearch) {
        btnSearch.addEventListener("click", function () {
            const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
            searchBar(recipes, inputValue);
        });
    }

    afficherListes("", recipes);

    function afficherListes(term, recipes) {
        const ingredientsUniques = new Set();
        const appareilsUniques = new Set();
        const ustensilesUniques = new Set();
        recipes.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(term)) {
                recipe.ingredients.forEach((ingredient) => ingredientsUniques.add(ingredient.ingredient));
                appareilsUniques.add(recipe.appliance);
                recipe.ustensils.forEach((utensil) => ustensilesUniques.add(utensil));
            }
        });
       
     // Sélectionner les éléments input pour les ingrédients, les appareils et les ustensiles
    const inputIng = document.querySelector(".liste-choix-Ing input.search-butt");
    const inputApp = document.querySelector(".liste-choix-App input.search-butt");
    const inputUst = document.querySelector(".liste-choix-Ust input.search-butt");


    // Ajouter des écouteurs d'événements pour filtrer les résultats lors de la saisie
    // inputIng.addEventListener("input", function(event) {
    //     const searchText = event.target.value.trim().toLowerCase();
    //     const filteredIngredients = ingredients.filter(ingredient => ingredient.toLowerCase().includes(searchText));
    //     afficherListeUnique(filteredIngredients, ".liste-choix-Ing", ".option-choix-Ing");
    //     filterDropdownList(inputIng, 'liste-choix-Ing');
    // });

    // inputApp.addEventListener("input", function(event) {
    //     const searchText = event.target.value.trim().toLowerCase();
    //     const filteredAppliances = appliances.filter(appliance => appliance.toLowerCase().includes(searchText));
    //     afficherListeUnique(filteredAppliances, ".liste-choix-App", ".option-choix-App");
    //     afficherListeUnique(filteredUtensils, ".liste-choix-Ust", ".option-choix-Ust");
    //     filterDropdownList(inputApp, 'liste-choix-App');
    // });

    // inputUst.addEventListener("input", function(event) {
    //     const searchText = event.target.value.trim().toLowerCase();
    //     const filteredUtensils = utensils.filter(utensil => utensil.toLowerCase().includes(searchText));
    //     filterDropdownList(inputUst, 'liste-choix-Ust');
    //     filterDropdownList(inputApp, 'liste-choix-App');
    // });

        function afficherListesUniques(ingredients, ustensiles, appareils) {
            afficherListeUnique(ingredients, ".liste-choix-Ing", ".option-choix-Ing");
            afficherListeUnique(ustensiles, ".liste-choix-Ust", ".option-choix-Ust");
            afficherListeUnique(appareils, ".liste-choix-App", "option-choix-App")
        }

        function afficherListeUnique(elements, containerClass, inputElement) {
            const listContainer = document.querySelector(containerClass);
            if (listContainer) {
                const resultList = document.createElement("ul");
                elements.forEach((element) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("liste");
                    listItem.textContent = element;
                    resultList.appendChild(listItem);
                    listItem.addEventListener("click", function () {
                        listItem.classList.add("highlight");
                        const isDifferent = !uniqueTags.includes(element) && !selectedTags.includes(element);
                        if (isDifferent) {
                            uniqueTags.push(element);
                            selectedTags.push(element);
                            const filterElement = document.createElement("div");
                            filterElement.classList.add("tag");
                            const btnX = document.createElement("i");
                            btnX.className = "fa-solid fa-xmark close-tag";
                            btnX.addEventListener("click", function (event) {
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

        function updateSearchResults() {
            const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
            searchBar(recipes, inputValue);
        }
        const ingredients = [];
        const appliances = [];
        const utensils = [];
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (!ingredients.includes(ingredient.ingredient)) {
                    ingredients.push(ingredient.ingredient);
                }
            });
            if (!appliances.includes(recipe.appliance)) {
                appliances.push(recipe.appliance);
            }
            recipe.ustensils.forEach((utensil) => {
                if (!utensils.includes(utensil)) {
                    utensils.push(utensil);
                }
            });
        });
    }
});