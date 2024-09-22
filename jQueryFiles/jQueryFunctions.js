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
    if ($(this).text() + ".html" === url)
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

var ButtonAddedCounter = 0;
var CurrentButton;

var txtButtonContext = $("#txtButtonContext");
var ButtonAddedClass = $(".ButtonsAdded");

var CurrentEditItem;

$("#btnAddNewButton1").on('click', function () {
//$("#btnAddNewButton1").click(function () {
    ButtonAddedCounter++;

    var WorkStringCell0 = "<td>" + ButtonAddedCounter + "</td>";

    var WorkString1 = "<input id='btnDynamic" + ButtonAddedCounter + "' ";
    WorkString1 += "value='btnDynamic" + ButtonAddedCounter + "' ";
    WorkString1 += "type='button'";
    WorkString1 += " />";
    var WorkStringCell1 = "<td>" + WorkString1 + "</td>";

    var WorkString2 = "<input id='btnEditDynamic" + ButtonAddedCounter + "' ";
    WorkString2 += "value='btnEditDynamic" + ButtonAddedCounter + "' ";
    WorkString2 += "type='button'";
    WorkString2 += " />";
    var WorkStringCell2 = "<td>" + WorkString2 + "</td>";

    var WorkString3 = "<input id='btnDeleteDynamic" + ButtonAddedCounter + "' ";
    WorkString3 += "value='btnDeleteDynamic" + ButtonAddedCounter + "' ";
    WorkString3 += "type='button'";
    WorkString3 += " />";
    var WorkStringCell3 = "<td>" + WorkString3 + "</td>";
    
    var NewRowHTML = "<tr>" + WorkStringCell0 + WorkStringCell1 + 
                      WorkStringCell2 + WorkStringCell3 + "</tr>";
    $("#DataTable tbody").append(NewRowHTML);
    
    ButtonAddedClass.removeClass("None");
});

$("#btnTestButton").on('click', function() {
  alert("Klikket på knappen");
});
