function InsertContentFromHTMLFileInSpecifiedClassUsing_javaScript(targetClassName, url) 
{
  const nav = document.querySelector('.' + targetClassName)
    fetch(url).
    then(res => res.text()).
    then(data => {
      document.getElementsByClassName(targetClassName)[0].innerHTML = data;
    })
}


function ShowHideLines(ShowHideText)
    {
        var DocumentElements = document.getElementsByName("demo");

        // DocumentElements.forEach((Element) =>
        // {
        //     Element.style.display = ShowHideText;
        // });

        for (Counter = 0; Counter < DocumentElements.length; Counter++)
        {
            DocumentElements[Counter].style.display=ShowHideText;
        }
    }