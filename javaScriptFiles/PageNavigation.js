// LoadPage funktionen i './PageNavigation.js' filen står for den praktiske¨
// del af side navigation. 
//import { LoadPage } from './PageNavigation.js';
//import { HandleNavigationBar } from './PageNavigation.js';

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
        // Vi kan have elementer, der ikke har dataset.htmlpageurl defineret. 
        // Så det tjekker vi lige på først.
        // Hvis ikke dataset.htmlpageurl er defineret, er det ikke en *.html side,
        // Så vi kan bare skippe dette element.
        if (link.dataset.htmlpageurl)
        {
            // Bemærk: 'textContent' eller 'innerText' erstatter $(this).text()
            if (link.dataset.htmlpageurl.trim() === pageUrl)
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
}

function RemovePathFromFileName(pageUrl)
{
  var SubString = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);
  return SubString;
}



document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('[data-htmlpageurl]');
    const cache = new Map(); // Cache til prefetch og load-once

    async function prefetchPages() {
        for (const link of links) {
            if (link.dataset.prefetch === 'true') {
                const url = link.dataset.htmlpageurl;
                if (!cache.has(url)) {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error(`Prefetch fejl for ${url}: ${response.statusText}`);
                        const text = await response.text();
                        cache.set(url, text);
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
        }
    }

    // Forsøger at parse data-callbackparams string til et passende JS objekt eller value
    function parseCallbackParams(paramStr) {
        if (!paramStr) return undefined;
        try {
            // Hvis det er gyldig JSON, returneres det parsed JSON (objekt, array, tal, string)
            return JSON.parse(paramStr);
        } catch {
            // Hvis det fejler, returneres stringen som den er
            return paramStr;
        }
    }

    async function handlePageLoad(link) {
        const htmlPageUrl = link.dataset.htmlpageurl;
        const jsModuleUrl = link.dataset.jsmoduleurl;  
        const callbackFunctionName = link.dataset.callbackfunctionname;
        const targetClassName = link.dataset.targetclassname;
        const loadOnce = link.dataset.loadOnce === 'true';

        const target = document.querySelector(`.${targetClassName}`);
        if (!target) {
            console.error(`Kan ikke finde target med klasse '${targetClassName}'`);
            return;
        }

        if (loadOnce && target.dataset.loaded === 'true') {
            return;
        }

        try {
            let htmlContent;
            if (cache.has(htmlPageUrl)) {
                htmlContent = cache.get(htmlPageUrl);
            } else {
                const response = await fetch(htmlPageUrl);
                if (!response.ok) throw new Error(`Fejl ved hentning af ${htmlPageUrl}: ${response.statusText}`);
                htmlContent = await response.text();
                if (link.dataset.prefetch === 'true') {
                    cache.set(htmlPageUrl, htmlContent);
                }
            }

            target.innerHTML = htmlContent;
            target.dataset.loaded = 'true';
            HandleNavigationBar(htmlPageUrl);

            if (jsModuleUrl && callbackFunctionName) {
                const module = await import(jsModuleUrl);

                const rawParams = link.dataset.callbackparams;
                const params = parseCallbackParams(rawParams);

                if (typeof module[callbackFunctionName] === 'function') {
                    if (params !== undefined) {
                        module[callbackFunctionName](params);
                    } else {
                        module[callbackFunctionName]();
                    }
                } else {
                    console.error(`Callback '${callbackFunctionName}' ikke fundet i modulet '${jsModuleUrl}'`);
                }
            }
        } catch (error) {
            console.error('Fejl ved load af side eller modul:', error);
        }
    }

    links.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            await handlePageLoad(link);
        });
    });

    prefetchPages();

    const defaultLink = document.querySelector('[data-default="true"]');
    if (defaultLink) {
        handlePageLoad(defaultLink);
    }
});
