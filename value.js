//const
document.addEventListener('DOMContentLoaded', function() {
  // Dropdown Ingrédients
  const iconIn = document.querySelector('.fa-solid.fa-chevron-up');
  const searchInputIn = document.getElementById('liste-choix-Ing');
  iconIn.addEventListener('click', function() {
      iconIn.classList.toggle('rotate');
      searchInputIn.classList.toggle('show');
      if (searchInputIn.classList.contains('show')) {
          searchInputIn.focus(); 
      }
  });
   // Dropdown Appareils
   const iconApp = document.querySelector('span.fa-solid.fa-chevron-up.App');
   const searchInputApp = document.getElementById('liste-choix-App');
   iconApp.addEventListener('click', function() {
       iconApp.classList.toggle('rotate');
       searchInputApp.classList.toggle('show');
       if (searchInputApp.classList.contains('show')) {
           searchInputApp.focus(); 
       }
   });

    // Dropdown Ustensiles
    const iconUst = document.querySelector('.fa-solid.fa-chevron-up.Ust');
    const searchInputUst = document.getElementById('liste-choix-Ust');
    iconUst.addEventListener('click', function() {
        iconUst.classList.toggle('rotate');
        searchInputUst.classList.toggle('show');
        if (searchInputUst.classList.contains('show')) {
            searchInputUst.focus(); 
        }
    });
});
