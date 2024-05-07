document.addEventListener("DOMContentLoaded", function() {
  let uniqueTags =[];//creer un tableau pour mettre les resultas tags
  const selectTag = document.querySelector(".filter");
  //**************************************************************************//
                  //function search bar/
  //**************************************************************************//
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
             //chaque tags soit dans ing ou app ou ust 
             uniqueTags.every(tag=>recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) ||
             recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) ||
             recipe.appliance.toLowerCase().includes(tag.toLowerCase()))
            ) 
          });
          if (searchResults.length === 0) {
             messageError.textContent = "Aucune recette trouvée pour cette recherche.";
            } else {
            messageError.textContent = "";
           const recipeNames = searchResults.map(recipe => recipe.name);
           displaySearchResults(recipeNames, "choix-recette");
           afficherListes("",searchResults);
          }
      }
    }
   //***********************************************************//
              //function displaySearchResults//
   //***********************************************************//
   function displaySearchResults(results, containerClass) {
      // Récupérer le conteneur pour les résultats
      const container = document.querySelector("." + containerClass);
      //  Vérifier si le conteneur existe
      if (container) {
         //  Supprimer tous les éléments enfants du conteneur
          while(container.firstChild) {
             container.removeChild(container.firstChild);
            }
         //  Vérifier la classe du conteneur pour décider quoi afficher
       if (containerClass === "choix-recette") {
         //  Parcourir les résultats et créer les cartes de recette
            results.forEach(result => {
                const recipe = recipes.find(recipe => recipe.name === result);
                if (recipe) {
                    const recipeCard = recettTemplate(recipe);
                    const userCardDOM = recipeCard.getUserCardDOM();
                    container.appendChild(userCardDOM);
                  }
              });
         // Mettre à jour le nombre de recettes affichées
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = results.length;
          } else {
          //Afficher un nombre par défaut si aucun résultat n'est trouvé
            const defaultRecipeCount = 50;
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = defaultRecipeCount;
          }
        }
    }
    //function search 
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
       btnSearch.addEventListener('click', function() {
       const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
         searchBar(recipes, inputValue);
        });
      }
    //**************************************************************************//
               // Appeler la fonction avec le terme de recherche ""//
    //**************************************************************************//
    afficherListes("",recipes);
    //****************************************************************//
    // Fonction pour afficher les listes d'ingrédients et d'appareils //
    //correspondant au terme de recherche//
    //**************************************************************************//
    function afficherListes(term,recipes) {
      // Créer des ensembles pour stocker les ingrédients, les appareils et les ustensiles uniques
       const ingredientsUniques = new Set();
       const appareilsUniques = new Set();
       const ustensilesUniques = new Set();
      
      // Parcourir les recettes pour extraire les ingrédients, les appareils et les ustensiles correspondant au terme de recherche
      recipes.forEach(recipe => {
        if (recipe.name.toLowerCase().includes(term)) {
            recipe.ingredients.forEach(ingredient => ingredientsUniques.add(ingredient.ingredient.toLowerCase())); // Convertir en minuscules ici
            appareilsUniques.add(recipe.appliance.toLowerCase()); // Convertir en minuscules ici
            recipe.ustensils.forEach(utensil => ustensilesUniques.add(utensil.toLowerCase())); // Convertir en minuscules ici
        }
      });
      //**************************************************************************//
      // Utilisation de la fonction pour afficher les listes uniques
      //**************************************************************************//
      afficherListesUniques(Array.from(ingredientsUniques), Array.from(ustensilesUniques), Array.from(appareilsUniques));
      //***************************************************************************//
      // Nettoyer les anciens résultats
      //***************************************************************************//
      function clearResults(containerClass) {
       const listContainer = document.querySelector(containerClass);
       if (listContainer) {
          const ulElements = listContainer.querySelectorAll("ul");
          ulElements.forEach(ul => ul.remove()); // Supprimer uniquement les éléments <ul>
        }
      }
      //***************************************************************************//
      // Mettre à jour les résultats filtrés
      //***************************************************************************//
      function updateFilteredResults(elements, containerClass) {
        const listContainer = document.querySelector(containerClass);
        const searchText = event.target.value.trim().toLowerCase()
        if (listContainer) {
          searchText.innerHTML='';
          clearResults(containerClass); // Nettoyer les anciens résultats
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
                  updateFilteredResults();
                  clearResults();
                });
                filterElement.textContent = element;
                filterElement.classList.add("tag", "highlight");
                selectTag.appendChild(filterElement);
                filterElement.appendChild(btnX);
                const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
                searchBar(recipes, inputValue);
              }
            });
           listContainer.appendChild(listItem); // Ajouter chaque élément filtré à la liste
          });
        }
      }
      //**************************************************************************// 
      //filtrer a travers inputs 
      //**************************************************************************//
      function filterElements(elements, searchText) {
       const normalizedSearchText = searchText.toLowerCase();
       return elements.filter(element => element.toLowerCase().includes(normalizedSearchText));
      }
     // Écouteur d'événements pour l'input Ing
     const inputIng = document.getElementById("myInput-ing");
     inputIng.addEventListener("input", function(event) {
       const searchText = event.target.value.trim().toLowerCase();
       const filteredIngredients = filterElements(Array.from(ingredientsUniques), searchText);
       // Display the filtered results
       afficherListeUnique(filteredIngredients, '.liste-choix-Ing', 'myInput-ing');
       updateFilteredResults(filteredIngredients, ".option-choix-Ing");
      });
     // Écouteur d'événements pour l'input App
     const inputApp = document.getElementById("myInput-app");
     inputApp.addEventListener("input", function(event) {
       const searchText = event.target.value.trim().toLowerCase();
       // Filter appliances based on the search
       const filteredAppliances = filterElements(Array.from(appareilsUniques), searchText);
       afficherListeUnique(filteredAppliances, '.liste-choix-App', 'myInput-app');
       updateFilteredResults(filteredAppliances, ".option-choix-App");
      });
     // Écouteur d'événements pour l'input Ust
     const inputUst = document.getElementById("myInput-ust");
     inputUst.addEventListener("input", function(event) {
        const searchText = event.target.value.trim().toLowerCase();
       // Filter utensils based on the search
       const filteredUtensils = filterElements(Array.from(ustensilesUniques), searchText);
       afficherListeUnique(filteredUtensils, '.liste-choix-Ust', 'myInput-ust');
       updateFilteredResults(filteredUtensils, ".option-choix-Ust");
      });
     //***************************************************************************//
     //appeler les functions ingredientsUniques,appareilsUniques, pour l'afficher//
     //**************************************************************************//
     function afficherListesUniques(ingredients, ustensiles, appareils) {
      afficherListeUnique(ingredients,'.liste-choix-Ing','myInput-ing');//er 
      afficherListeUnique(appareils,'.liste-choix-App','myInput-ust');
      afficherListeUnique(ustensiles,'.liste-choix-Ust','myInput-ust');
     }
     //***************************************************************************//
     // function pour mettre les listes dans les classes
     //**************************************************************************//
     function afficherListeUnique(elements, containerClass, inputElement) {
       const listContainer = document.querySelector(containerClass);
       if (listContainer && inputElement) {
        // Vérifier si une balise ul existe déjà
         let resultList = listContainer.querySelector("ul");
         if (!resultList) {
            // Si <ul> n'existe pas, créer une nouvelle balise ul
            resultList = document.createElement("ul");
            listContainer.appendChild(resultList);
          } else {
            //Si <ul> existe, effacer son contenu
            resultList.innerHTML = '';
          }
        // Ajouter chaque élément de la liste comme un élément <li>
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
                //updateFilteredResults();
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
     // Utilisation de la fonction pour afficher les listes uniques
     afficherListesUniques(Array.from(ingredientsUniques), Array.from(ustensilesUniques), Array.from(appareilsUniques));
     //***********************************************************//
              //fuction pour fermeture//
     //***********************************************************//
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
      //**************************************************************************//
      // Fonction pour réinitialiser les résultats de recherche en fonction des tags sélectionnés
      //**************************************************************************//
      function updateSearchResults() {
       const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
       searchBar(recipes, inputValue);
      }
      //***********************************************************//
      //fuction pour eliminer la repitition dans le filter//
     //***********************************************************//
     const ingredients = [];
     const appliances = [];
     const utensils = [];
     recipes.forEach(recipe => {
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
      });
  }
});
