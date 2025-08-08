// LoadPage funktionen i './PageNavigation.js' filen står for den praktiske¨
// del af side navigation. 
import { LoadPage } from './PageNavigation.js';

// Event listener der lytter på klik i body (eller et andet overordnet element)
document.body.addEventListener('click', function(event) 
{
    const target = event.target;

    if (target.tagName === 'A' && target.hasAttribute('data-pageUrl')) 
    {
        event.preventDefault();

        // Læs alle dine parametre fra data-attributterne i index.html filen
        // Læg mærke til !!! at der udelukkende er små bogstaver i navnene her 
        // i javaScript koden, selvom der også kan indgå store bogstaver i 
        // navnene i index.html filen.
        // Eksempelvis bliver  
        const pageUrl = target.dataset.pageurl;
        const callbackFunctionName = target.dataset.callbackfunctionname;
        const targetClassName = target.dataset.targetclassname;
        
        // Find den rigtige callback funktion i vores mapping-objekt.
        // Hvis ikke der findes en callback funktion for den loadede
        // *.html side, sættes callbackFuntion = null;
        //const callbackFunction = pageCallbackFunctionsTranslator[callbackFunctionName] || null;
        
        // Kald nu din funktion der loader *.html siden med alle de indsamlede parametre.
        // Hermed sikrer vi, at koden i en (eventuel) callback funktion først køres,
        // når siden faktisk er blevet loaded. Og dermed er vi sikre på, at det virker,
        // som vi har tænskt os, det skal gøre !!!
        LoadPage(pageUrl, targetClassName, callbackFunctionName);
    }
});

document.addEventListener('DOMContentLoaded', function() {
// Det der svarer til javaScript koden herover i jQuery er kodelinjen herunder :
// $(function() { . Så denne kodelinje kan man bruge i setdet for, hvis man foretrækker
// at arbejde i jQuery.   
//$(function() {

    // Vi sikrer os, at vores index.html side er blevet loaded ved brug af argumentet
    // 'DOMContentLoaded' her i vores addEventListener "funktion", før vi kalder 
    // loadPage funktionen. Vi kalder LoadPage direkte her, da vi skal have en *.html
    // at starte op med, når vi loader siden. 
    // Bruger vi ikke beskyttelsen DOMContentLoaded, kan vi ikke være sikre på, at det 
    // vil virke !!!
    LoadPage('Home.html', 'ContentFrameForHTMLFiles', 'initWebSite');
});
