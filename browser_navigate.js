function SearchClick()
{
  console.log('clickerhery');

  var stext = $('#SearchText')[0].value;
  $('#BrowserIFcontents', window.parent.document)[0].src = stext;
}
