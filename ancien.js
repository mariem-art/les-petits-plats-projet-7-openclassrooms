document.addEventListener("DOMContentLoaded", function() {
  const selectedTags = []; //creer un tableau pour mettre les resultas de buttons 
  const filterValues = [];//pour mettre les valeur filtre
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
         console.log((
           //chaque tags soit dans ing ou app ou ust 
           uniqueTags.every(tag=>recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) ||
           recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) ||
           recipe.appliance.toLowerCase().includes(tag.toLowerCase()) )
           ) );
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
       console.log(searchResults);
       console.log(uniqueTags);
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
   //**************************************************************************//
            //fuction pour les inputs ing/app/ust
   //**************************************************************************//
  function searchInput(inputElement, result) {
    const inputValue = inputElement.value.trim().toLowerCase();
    const searchResults = result.filter(item => item.toLowerCase().includes(inputValue));
    // displayOptions(searchResults, inputElement.resultset.container);
    afficherListesUniques(searchResults ,inputElement.resultset.container);
   }
  const inputs = document.querySelectorAll('.search-input');
  if (inputs) {
    inputs.forEach(input => {
      input.addEventListener('keyup', function() {
       const result = input.resultset.type === 'ingredients' ? ingredients :
                      ingredients;
                      input.resultset.type === 'appliances' ? appliances :
                      appliances;
                      input.resultset.type === 'utensils' ? utensils :
                      utensils;
       searchInput(input, result);
      });
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
            // Si aucun résultat n'est trouvé, afficher le nombre par défaut (0 ou autre valeur souhaitée)
            const defaultRecipeCount =50;
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
    //**************************************************************//
    function afficherListes(term,recipes) {
      // Créer des ensembles pour stocker les ingrédients, les appareils et les ustensiles uniques
       const ingredientsUniques = new Set();
       const appareilsUniques = new Set();
      const ustensilesUniques = new Set();
      
      // Parcourir les recettes pour extraire les ingrédients, les appareils et les ustensiles correspondant au terme de recherche
      recipes.forEach(recipe => {
          if (recipe.name.toLowerCase().includes(term)) {
              recipe.ingredients.forEach(ingredient => ingredientsUniques.add(ingredient.ingredient));
              appareilsUniques.add(recipe.appliance);
              recipe.ustensils.forEach(utensil => ustensilesUniques.add(utensil));
          }
      });
     // Afficher les listes d'ingrédients, d'appareils et d'ustensiles
     console.log("Ingrédients correspondant au terme de recherche :");
     console.log(recipes.length);
     ingredientsUniques.forEach(ingredient => console.log(ingredient));
     console.log(ingredientsUniques);
     appareilsUniques.forEach(appareil => console.log(appareil));
     console.log(appareilsUniques);
     ustensilesUniques.forEach(ustensil => console.log(ustensil));
     console.log(ustensilesUniques);
     //mettre les valeurs dans les classes pour l'afficher 
     const listIng= document.querySelector('.liste-choix-Ing');
     listIng.innerHTML = ''; // Effacer le contenu actuel de la liste
     const listApp = document.querySelector('.liste-choix-App');
     listApp.innerHTML = '';
     const listUst =document.querySelector('.liste-choix-Ust');
     listUst.innerHTML = '';
     //***************************************************************************//
     //appeler les functions ingredientsUniques,appareilsUniques, pour l'afficher//
     //**************************************************************************//
     function afficherListesUniques(ingredients, ustensiles, appareils) {
      afficherListeUnique(ingredients, '.liste-choix-Ing', '.option-choix-Ing');//er 
      afficherListeUnique(ustensiles, '.liste-choix-Ust', '.option-choix-Ust');
      afficherListeUnique(appareils, '.liste-choix-App', '.option-choix-App');
     }
     function afficherListeUnique(elements, containerClass,inputElement) {
      const listContainer = document.querySelector(containerClass);
      if (listContainer) {
              const input = document.createElement("input");
              input.setAttribute("type", "search");
              input.classList.add("search-butt");
               // Définir le type d'entrée comme texte
              const Icon = document.createElement("i");
               // Créer l'icône de recherche
              const icon = document.createElement("i");
              icon.classList.add("fa", "fa-search");
              input.appendChild(icon);
              const resultList = document.createElement("ul");
              elements.forEach(element => {
               // Définir la valeur de l'entrée avec l'élément actuel du tableau
               const listItem = document.createElement("li");
              listItem.classList.add("liste");
              listItem.textContent = element;
              input.value = " ";
              resultList.appendChild(listItem); // Ajouter l'élément d'entrée au listItem
              listItem.addEventListener("click", function() {
                listItem.classList.add("highlight");
                // let inputElement;
                // if (containerClass === "option-choix-Ing") {
                //     inputElement = document.getElementById("myInput-ing");
                // } else if (containerClass === "option-choix-App") {
                //     inputElement = document.getElementById("myInput-App");
                // } else if (containerClass === "option-choix-Ust") {
                //     inputElement = document.getElementById("myInput-Ust");
                // } else {
                //     inputElement = null; // Affecter null plutôt que la chaîne vide
                // }
                  console.log(listItem);
                  const isDifferent = !uniqueTags.includes(element);
                  if (isDifferent) {
                      uniqueTags.push(element);
                      const filterElement = document.createElement('div');
                      filterElement.classList.add('tag');
                      const btnX = document.createElement("i");
                      btnX.className = "fa-solid fa-xmark close-tag";
                      btnX.addEventListener('click', function(event) {
                          event.stopPropagation();
                          closetag(btnX);
                        });
                      filterElement.textContent = element;
                      filterElement.classList.add('tag', 'highlight');
                      selectTag.appendChild(filterElement);
                      filterElement.appendChild(btnX);
                      const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
                      searchBar(recipes, inputValue);
                      //searchInput(input, result);
                      //restoreTag(tag);
                      
                    }
                });
              resultList.appendChild(listItem);
          });
          listContainer.appendChild(input); // Ajouter l'élément d'entrée à l'élément de liste
          listContainer.appendChild(resultList);
          
      }
     }
    // Utilisation de la fonction pour afficher les listes uniques
    
     afficherListesUniques(Array.from(ingredientsUniques), Array.from(ustensilesUniques), Array.from(appareilsUniques));
   //***********************************************************//
              //fuction pour fermeture//
   //***********************************************************//
   function closetag(btnX) {
    btnX.parentNode.remove();
    searchBar(recipes, inputValue);
    afficherListeUnique(elements, containerClass,inputElement);
    reactiverTag(tag);
   }
   //***********************************************************//
   // Modifier la fonction closetag pour rétablir les tags//
   //***********************************************************//
   function searchRecipesWithLoops(recipes, searchTerm) {
    let results = []; // Initialise le tableau des résultats
    // Parcourt chaque recette dans le tableau des recettes
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]; // Obtient la recette courante
        // Vérifie si le terme de recherche est inclus dans le titre ou la description de la recette
        if (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(recipe); // Ajoute la recette aux résultats si correspondance
            continue; // Passe à la recette suivante
        }

        // Parcourt chaque ingrédient de la recette courante
        for (let j = 0; j < recipe.ingredients.length; j++) {
            // Vérifie si le terme de recherche est inclus dans l'ingrédient
            if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push(recipe); // Ajoute la recette aux résultats si correspondance
                break; // Sort de la boucle d'ingrédients car correspondance trouvée
            }
        }
    }
    //console.log(results); // Affiche les résultats dans la console avant de retourner
    return results; // Retourne le tableau des résultats
}

function searchRecipesWithFunctionalProgramming(recipes, searchTerm) {
    // Utilise la méthode `filter` pour filtrer les recettes
    const results = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Vérifie le nom de la recette
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) || // Vérifie la description
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) // Vérifie chaque ingrédient
    );
    // La méthode `some` retourne true si au moins un ingrédient correspond au terme de recherche
    //console.log(results); // Affiche les résultats dans la console avant de retourner
    return results; // Retourne le tableau des résultats filtrés
}
   //***********************************************************//
   // Modifier la fonction closetag pour rétablir les tags//
   //***********************************************************//
    function closetag(btnX) {
     const tag = btnX.parentNode.textContent.trim();
     btnX.parentNode.remove();
     console.log("supprisi");
     updateSearchResults(); // Mettre à jour les résultats de recherche
    //  restoreTag(tag);
    }
    
   // Fonction pour réinitialiser les résultats de recherche en fonction des tags sélectionnés
   function updateSearchResults() {
     const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
     searchBar(recipes, inputValue);
    }
   //***********************************************************//
   // Fonction pour rétablir le tag dans la liste correspondante
   //***********************************************************//
   // Fonction pour réactiver un tag supprimé
   function reactiverTag(tag) {
   // Vérifier le type de tag et l'ajouter à la liste appropriée
   if (ingredients.includes(tag)) {
      const listIng = document.querySelector('.liste-choix-Ing');
      appendTagToList(tag, listIng);
   } else if (appliances.includes(tag)) {
      const listApp = document.querySelector('.liste-choix-App');
      appendTagToList(tag, listApp);
   } else if (utensils.includes(tag)) {
      const listUst = document.querySelector('.liste-choix-Ust');
      appendTagToList(tag, listUst);
   }
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
  