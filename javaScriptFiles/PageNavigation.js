// De importede funktioner er funktioner, der skal køres som Callback funktioner,
// når en given *.html fil er blevet loaded ind i det angivne class tag på
// index.html siden.
// Når en given callback funktion kører, er vi sikre på, at indholdet på den 
// pågældende *.html fil er blevet loaded ind i klassen på index.html filen !!!
// En callback funktion er også det, vi kender som en Delegate fra C# !!!

// Når man adderer nye html sider til sit projekt, sletter hmtl sider eller
// ændrer html sider, skal man kun ændre i import listen lige herunder
// og i pageCallbackFunctionsTranslator arrayet. Al anden kode i filen her
// bliver ikke berørt af disse ændringer.
import { initWebSite} from './Home.js'
import { init_javaScriptClassDemo} from './javaScriptClassDemo.js'
import { init_javaScriptDemoEvent } from './javaScriptDemoEvent.js'
import { init_javaScriptBindingDynamic } from './JavaScriptBindingDynamic.js'
import { init_jqueryDemo } from '../jqueryFiles/jQueryDemo.js'
import { init_jQueryBindingDynamic } from '../jQueryFiles/jQueryBindingDynamic.js'


// Her defineres det array (), der fungerer på den måde, at vi slår op i denne
// og finder en funktion ud fra funktionsnavnet.
// Det vi kalder et KeyValyePair i C# verdenen.
const pageCallbackFunctionsTranslator = {
    'initWebSite': initWebSite,
    'init_javaScriptDemoEvent': init_javaScriptDemoEvent,
    'init_javaScriptClassDemo': init_javaScriptClassDemo,
    'init_javaScriptBindingDynamic': init_javaScriptBindingDynamic,
    'init_jqueryDemo': init_jqueryDemo,
    'init_jQueryBindingDynamic': init_jQueryBindingDynamic
};

export function LoadPage(pageUrl, targetClassName, callbackFunctionName) 
{
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            // Brug den dynamiske klasse til at finde elementet
            const contentContainer = document.querySelector(`.${targetClassName}`);
            if (contentContainer) 
            {
              // Her hentes indholdet af vores nuværende html side ind
              // i den angivne klasse på index.html siden.
              contentContainer.innerHTML = html;
              HandleNavigationBar(pageUrl);

              // Find den rigtige callback funktion i vores mapping-objekt.
              // Hvis ikke der findes en callback funktion for den loadede
              // *.html side, sættes callbackFuntion = null;
              const callbackFunction = pageCallbackFunctionsTranslator[callbackFunctionName] || null;
              
              // Hvis vi har angivet en callback funktion, så bliver denne callback
              // funktion kaldt i kode linjen : callbackFunction();
              if (typeof callbackFunction === 'function') 
              {
                  callbackFunction();
              }
          } 
          else 
          {
              console.error(`Fejl: Kunne ikke finde et element med klassen "${targetClass}".`);
          }
      })
      .catch(error => console.error('Fejl ved indlæsning af side:', error));
}

// Funktionen HandleNavigationBar står for at sætte den/de fremhævede farve/farver
// på den nuværende aktive *.html fil => det nuværende aktive menupunkt.
function HandleNavigationBar(pageUrl) 
{
    // Fjerner 'active' klassen fra alle a-tags i navigationsbaren
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Fjerner 'MenuCurrentItemParent' klassen fra alle dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('MenuCurrentItemParent');
    });

    // Itererer over hvert nav-link
    for (const link of navLinks) 
    {
        // Bemærk: 'textContent' eller 'innerText' erstatter $(this).text()
        if (link.textContent.trim() + ".html" === RemovePathFromFileName(pageUrl)) 
        {
            // Tilføjer 'active' klassen til det matchende link
            link.classList.add('active');

            // Tjekker, om den øvre forælder har 'dropdown-menu' klassen
            if (link.parentNode.parentNode.classList.contains('dropdown-menu')) 
            {
                // Tilføjer 'MenuCurrentItemParent' til den korrekte forælder (den der har 'dropdown' klassen)
                link.parentNode.parentNode.parentNode.classList.add('MenuCurrentItemParent');
            }
            // 'break' afslutter løkken, ligesom 'return false' i jQuery's .each()
            break;
        }
    }
}

function RemovePathFromFileName(pageUrl)
{
  var SubString = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);
  return SubString;
}
