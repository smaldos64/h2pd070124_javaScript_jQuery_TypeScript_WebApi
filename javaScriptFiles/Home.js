let classElement;

export function initWebSite(text = "Ingen tekst angivet !!!")
{
    classElement = document.querySelector('.FyldUnderOpstart');

    //classElement.textContent = "Hej med jer h2pd070125. Tekst her er lavet på baggrund af Callback funktionalitet !!!";
    classElement.textContent = text;
}