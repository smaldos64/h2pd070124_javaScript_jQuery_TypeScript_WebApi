function InsertContentFromHTMLFileInSpecifiedClassUsing_jQuery(targetClassName, url) 
{
  $("." + targetClassName).load(url);
  HandleNavigationBarNew1(url);
}

function HandleNavigationBarNew1(url) 
{
  $(".navbar-nav a").removeClass("active");
  $(".dropdown").removeClass("MenuCurrentItemParent");
  //$(".dropdown-menu").removeClass("MenuCurrentItemParent");
  
  $(".navbar-nav a").each(function() {

    if ($(this).text() + ".html" === RemovePathFromFileName(url))
    {
      $(this).addClass("active");
      //if ($(this).parent().hasClass("dropdown-content"))
      if ($(this).parent().parent().hasClass("dropdown-menu"))
      {
        $(this).parent().parent().parent().addClass("MenuCurrentItemParent");
        //$(this).prev(".dropdown").addClass("MenuCurrentItemParent");
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

