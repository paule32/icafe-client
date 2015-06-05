$( document ).ready( function()
{
  $(document).bind("contextmenu", function (event) {

      // Avoid the real one
      event.preventDefault();

      // Show contextmenu
      $(".custom-menu").finish().toggle(100).

      // In the right position (the mouse)
      css({
          top: event.pageY + "px",
          left: event.pageX + "px"
      });
  });


  // If the document is clicked somewhere
  $(document).bind("mousedown", function (e) {

      // If the clicked element is not the menu
      if (!$(e.target).parents(".custom-menu").length > 0) {

          // Hide it
          $(".custom-menu").hide(100);
      }
  });


  // If the menu element is clicked
  $(".custom-menu>li").click(function(){
      // This is the triggered action name
      switch($(this).attr("data-action")) {

          // A case for each action. Your actions here
          case "1": parent.history.back(); break;
          case "2": alert("second"); break;
          case "3": close_cafe(); break;
      }

      // Hide it AFTER the action was triggered
      $(".custom-menu").hide(100);
  });
});

function load_data(view,dat)
{
  $.get(dat, function(data) {
    $('#subview').html(data);
    view.innerHTML = data;
  });
}

function close_cafe()
{
  window.close();
}

function call_app(url)
{
  // render pause ...
  $('#appdeck').hide();
  $('#app_preload').show();

  var flag = false;

  if (url == 'http://localhost/cafe/calculator.html')
  {
    $('#subview')[0].src = 'calc.html';
    $('#subview').show();
    flag = true;
  }
  else if (url == 'http://localhost/cafe/browser.html')
  {
    $('#subview')[0].src = 'browser.html';
    $('#subview').show();
    flag = true;
  }

  // do render ...
  if (flag) {
    $('#app_preload').hide();
    $('#app_loaded').show();
  }
}
