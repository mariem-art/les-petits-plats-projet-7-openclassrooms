document.addEventListener("DOMContentLoaded", function () {
  const selectedTags = []; //creer un tableau pour mettre les resultas de buttons
  const filterValues = []; //pour mettre les valeur filtre
  let uniqueTags = []; //creer un tableau pour mettre les resultas tags
  const selectTag = document.querySelector(".filter");
  const searchInput = document.getElementById("searchInput");
  const listItems = document.querySelectorAll(".listItems");
  //***********************************************************//
    // Fonction pour rétablir le tag dans la liste correspondante
    //***********************************************************//
    // Fonction pour réactiver un tag supprimé
    function reactiverTag(tag) {
      // Vérifier le type de tag et l'ajouter à la liste appropriée
      if (ingredients.includes(tag)) {
        const listIng = document.querySelector(".liste-choix-Ing");
        updateSearchResults(tag, listIng);
      } else if (appliances.includes(tag)) {
        const listApp = document.querySelector(".liste-choix-App");
        updateSearchResults(tag, listApp);
      } else if (utensils.includes(tag)) {
        const listUst = document.querySelector(".liste-choix-Ust");
        updateSearchResults(tag, listUst);
      }
    }
  //***********************************************************//
  // Modifier la fonction closetag pour fermeture les tags//
  //***********************************************************//
  function closetag(btnX) {
    const tag = btnX.parentNode.textContent.trim();
    btnX.parentNode.remove();
    const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
    searchBar(recipes, inputValue);
    reactiverTag(tag); // Appel de la fonction reactiverTag(tag)
    afficherListeUnique(elements, containerClass, inputElement);
  
    // Supprimer le tag du tableau selectedTags
    const index = selectedTags.indexOf(tag);
    if (index !== -1) {
      selectedTags.splice(index, 1);
    }
  }
  //**************************************************************************//
  //function search bar/
  //**************************************************************************//
  function searchBar(recipes, inputValue) {
    const messageError = document.querySelector(".message-error");
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(inputValue) && inputValue) {
      messageError.textContent =
        "Le champ doit contenir uniquement des lettres.";
    } else {
      const searchResults = recipes.filter((recipe) => {
        console.log(
          //chaque tags soit dans ing ou app ou ust
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
        return (
          (recipe.name.toLowerCase().includes(inputValue) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(inputValue)
            ) ||
            recipe.ustensils.some((utensil) =>
              utensil.toLowerCase().includes(inputValue)
            ) ||
            recipe.appliance.toLowerCase().includes(inputValue)) &&
          //chaque tags soit dans ing ou app ou ust
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
      console.log(searchResults);
      console.log(uniqueTags);
      if (searchResults.length === 0) {
        messageError.textContent =
          "Aucune recette trouvée pour cette recherche.";
      } else {
        messageError.textContent = "";
        const recipeNames = searchResults.map((recipe) => recipe.name);
        displaySearchResults(recipeNames, "choix-recette");
        afficherListes("", searchResults);
      }
    }
  }
  //**************************************************************************//
  //fuction pour les inputs ing/app/ust
  //**************************************************************************//
  // function searchInput(inputElement, result) {
  //   const inputValue = inputElement.value.trim().toLowerCase();
  //   const searchResults = result.filter((item) =>
  //     item.toLowerCase().includes(inputValue)
  //   );
  //   afficherListesUniques(searchResults, inputElement.resultset.container);
  // }
  const inputs = document.querySelectorAll(".search-input");
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener("keyup", function () {
        let result; // Variable pour stocker le résultat
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
  // searchInput.addEventListener("input", function() {
  //   const searchTerm = searchInput.value.toLowerCase();

  //   listItems.forEach(function(item) {
  //       const text = item.textContent.toLowerCase();
  //       if (text.includes(searchTerm)) {
  //           item.style.display = ""; // Afficher l'élément si le terme de recherche est trouvé dans son texte
  //       } else {
  //           item.style.display = "none"; // Masquer l'élément sinon
  //       }
  //   });
  // });
  //**************************************************************************//
  //fuction pour les inputs ing/app/ust  faire l'écoute
  //**************************************************************************//
  function filterDropdownList(inputElement, inputs) {
    const searchText = inputElement.value.toLowerCase();
    const listItems = document.querySelectorAll(`#${inputs} li`);

    listItems.forEach((element) => {
      const text = element.textContent.toLowerCase();
      if (text.includes(searchText)) {
        element.style.display = ""; // Affiche les éléments correspondants
      } else {
        element.style.display = "none"; // Cache les éléments non correspondants
      }
    });
  }
  //***********************************************************//
               //function displaySearchResults//
  //***********************************************************//
  function displaySearchResults(results, containerClass) {
    const container = document.querySelector("." + containerClass);
    if (container) {
      // Supprimer uniquement les éléments enfants de container
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
        // Mettre à jour le nombre de recettes affichées
        const recipeCountElement = document.getElementById("nb");
        recipeCountElement.textContent = results.length;
      } else {
        // Si aucun résultat n'est trouvé, afficher le nombre par défaut (0 ou autre valeur souhaitée)
        const defaultRecipeCount = 50;
        const recipeCountElement = document.getElementById("nb");
        recipeCountElement.textContent = defaultRecipeCount;
      }
    }
  }
  //function search
  const btnSearch = document.getElementById("btn-search");
  if (btnSearch) {
    btnSearch.addEventListener("click", function () {
      const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
      searchBar(recipes, inputValue);
    });
  }
  //**************************************************************************//
  // Appeler la fonction avec le terme de recherche ""//
  //**************************************************************************//
  afficherListes("", recipes);
  //****************************************************************//
  // Fonction pour afficher les listes d'ingrédients et d'appareils //
  //correspondant au terme de recherche//
  //**************************************************************//
  function afficherListes(term, recipes) {
    // Créer des ensembles pour stocker les ingrédients, les appareils et les ustensiles uniques
    const ingredientsUniques = new Set();
    const appareilsUniques = new Set();
    const ustensilesUniques = new Set();
    // Parcourir les recettes pour extraire les ingrédients, les appareils et les ustensiles correspondant au terme de recherche
    recipes.forEach((recipe) => {
      if (recipe.name.toLowerCase().includes(term)) {
        recipe.ingredients.forEach((ingredient) => ingredientsUniques.add(ingredient.ingredient));
        appareilsUniques.add(recipe.appliance); 
        recipe.ustensils.forEach((utensil) => ustensilesUniques.add(utensil));
      }
    });
      // Afficher les listes d'ingrédients, d'appareils et d'ustensiles
      console.log("Ingrédients correspondant au terme de recherche :");
      console.log(recipes.length);
      ingredientsUniques.forEach((ingredient) => console.log(ingredient));
      console.log(ingredientsUniques);
      appareilsUniques.forEach((appareil) => console.log(appareil));
      console.log(appareilsUniques);
      ustensilesUniques.forEach((ustensil) => console.log(ustensil));
      console.log(ustensilesUniques);
   // Afficher les éléments d'entrée dans les listes
  //  const listIng = document.querySelector(".liste-choix-Ing");
  //  listIng.innerHTML = ""; // Effacer le contenu actuel de la liste
  //  const inputIng = document.createElement("input");
  //  inputIng.setAttribute("type", "search");
  //  inputIng.classList.add("search-butt");
  //  inputIng.placeholder = "Rechercher par ingrédient";
  //  listIng.appendChild(inputIng);
   //
  //  const listApp = document.querySelector(".liste-choix-App");
  //  listApp.innerHTML = "";
  //  const inputApp = document.createElement("input");
  //  inputApp.setAttribute("type", "search");
  //  inputApp.classList.add("search-butt");
  //  inputApp.placeholder = "Rechercher par appareil";
  //  listApp.appendChild(inputApp);
   // Ajouter un gestionnaire d'événements pour le champ de recherche d'appareils
  //   inputApp.addEventListener("input", function(event) {
  //  const searchText = event.target.value.trim().toLowerCase();
  //  // Filtrer les appareils en fonction de la recherche
  //  const filteredAppliances = appliances.filter(appliance => appliance.toLowerCase().includes(searchText));
  //  // Afficher les résultats filtrés
  //  afficherListeUnique(filteredAppliances, ".liste-choix-App", ".option-choix-App");
  //  });

  //  const listUst = document.querySelector(".liste-choix-Ust");
  //  listUst.innerHTML = "";
   //searchInput(input, result);
   //const inputUst = document.createElement("input");
   //inputUst.setAttribute("type", "search");
   //inputUst.classList.add("search-butt");
   //inputUst.placeholder = "Rechercher par ustensile";
   //listUst.appendChild(inputUst);
   // Sélectionner les éléments conteneurs pour les listes d'ingrédients, d'ustensiles et d'appareils
   const inputIng = document.getElementById("myInput-ing");
   const inputApp = document.getElementById("myInput-Ust");
   const inputUst = document.getElementById("myInput-App");


   
   inputIng.addEventListener("input", function(event) {
     const searchText = event.target.value.trim().toLowerCase();
     // Filtrer les ingrédients en fonction de la recherche
     const filteredIngredients = ingredients.filter(ingredient => ingredient.toLowerCase().includes(searchText));
     // Afficher les résultats filtrés
     afficherListeUnique(filteredIngredients, ".liste-choix-Ing", ".option-choix-Ing");
    });
   


    inputApp.addEventListener("input", function(event) {
    const searchText = event.target.value.trim().toLowerCase();
    // Filtrer les appareils en fonction de la recherche
    const filteredAppliances = appliances.filter(appliance => appliance.toLowerCase().includes(searchText));
    // Afficher les résultats filtrés
    afficherListeUnique(filteredAppliances, ".liste-choix-App", ".option-choix-App");
   });
     inputUst.addEventListener("input", function(event) {
     const searchText = event.target.value.trim().toLowerCase();
     // Filtrer les ustensiles en fonction de la recherche
     const filteredUtensils = utensils.filter(utensil => utensil.toLowerCase().includes(searchText));
     // Afficher les résultats filtrés
     afficherListeUnique(filteredUtensils, ".liste-choix-Ust", ".option-choix-Ust");
    });
     //***************************************************************************//
    //appeler les functions ingredientsUniques,appareilsUniques, pour l'afficher//
    //**************************************************************************//
    function afficherListesUniques(ingredients, ustensiles, appareils) {
      afficherListeUnique(ingredients, ".liste-choix-Ing", ".option-choix-Ing"); //er
      afficherListeUnique(ustensiles, ".liste-choix-Ust", ".option-choix-Ust");
      afficherListeUnique(appareils, ".liste-choix-App", ".option-choix-App");
    }
    //***************************************************************************//
    //functions ingredients Uniques,appareilsUniques, pour l'afficher//
    //**************************************************************************//
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
            const isDifferent =
              !uniqueTags.includes(element) && !selectedTags.includes(element); // Vérifie si le tag n'est pas déjà sélectionné
            if (isDifferent) {
              uniqueTags.push(element);
              selectedTags.push(element); // Ajoute le tag sélectionné au tableau selectedTags
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
    // Utilisation de la fonction pour afficher les listes uniques
    afficherListesUniques(Array.from(ingredientsUniques),Array.from(ustensilesUniques),Array.from(appareilsUniques));
     //***********************************************************//
    // Fonction pour réinitialiser les résultats de
    //recherche en fonction des tags sélectionnés
    //***********************************************************//
    function updateSearchResults() {
      const inputValue = document.getElementById("myInput").value.trim().toLowerCase();
      searchBar(recipes, inputValue);
    }
    //***********************************************************//
    //fuction pour eliminer la repitition dans le filter//
    //***********************************************************//
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
