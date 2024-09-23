function InsertContentFromHTMLFileInSpecifiedClassUsing_jQuery(targetClassName, url) 
{
  $("." + targetClassName).load(url);
  HandleNavigationBarNew1(url);
}

function HandleNavigationBarNew1(url) 
{
  $(".topnav a").removeClass("active");
  $(".dropdown").removeClass("MenuCurrentItemParent");
  
  $(".topnav a").each(function() {

    if ($(this).text() + ".html" === RemovePathFromFileName(url))
    {
      $(this).addClass("active");
      if ($(this).parent().hasClass("dropdown-content"))
      {
        $(this).parent().parent().addClass("MenuCurrentItemParent");
      }
      return false;
    }
  });
}

function RemovePathFromFileName(url)
{
  var SubString = url.substring(url.lastIndexOf('/') + 1);
  return SubString;
}

