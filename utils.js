function loadShaders(fragURL, vertURL, callback)
{
  $.ajax({
    url: fragURL,
    success: function(fragSRC) {
      $("#fs").html(fragSRC);

      $.ajax({
        url: vertURL,
        success: function(vertSRC) {
        $("#vs").html(vertSRC);
        callback();
        }
      });
    }
  });
}
