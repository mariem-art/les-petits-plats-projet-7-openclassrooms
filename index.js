//récupérer les données de fihier recettes.js

      async function displayRecipes(recipes) {
          const recettSection = document.querySelector(".choix-recette");
          recipes.forEach((recipes) => {
              const recettModel = recettTemplate(recipes);
              const userCardDOM = recettModel.getUserCardDOM();
              recettSection.appendChild(userCardDOM);

          });
      }

//appeller le searchIng de l'ingredient,appliance,ustensils
//searchIng();
//searchApp();
//searchUst();


      async function init() {
          // Récupère les datas des photographes
          displayRecipes(recipes);
      }
      init();   


      //search

      async function getRecipe() { 
         let newDataReciepes = recipes;
         return newDataReciepes;
        }
    
    // Appeler la fonction pour récupérer les recettes et ensuite appeler searchBar

    async function initializeSearch() {
        // Récupérer les recettes
        const allRecipes = await getRecipe();
       // Appeler searchBar avec les recettes récupérées
       searchBar(allRecipes);
    }
    
    // Appeler la fonction d'initialisation
   // initializeSearch();
 // Fonction pour afficher les résultats de recherche dans la classe .choix-recette
function displaySearchResults(results) {
   const choixRecette = document.querySelector(".choix-recette");
 // Nettoyer le contenu précédent
 choixRecette.innerHTML = "";
//Créer une liste ul pour contenir les résultats
 const resultList = document.createElement("ul");
  // Ajouter chaque résultat comme un élément de liste li
  results.forEach(result => {
      const listItem = document.createElement("li");
        listItem.textContent = result;
       resultList.appendChild(listItem);
   });
// Ajouter la liste de résultats à la classe .choix-recette
     choixRecette.appendChild(resultList);
 }
 // Appeler la fonction displaySearchResults avec vos résultats de recherche
 const results = [" "]; 
displaySearchResults(results);