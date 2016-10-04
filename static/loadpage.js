$(document).ready(
  $.get( "test.php", function( data ) {
    alert( "Data Loaded: " + data );
  });

$("#button").click(function(){
    //$.get("index.html", function(data, status){
        alert("Data: ");// + data + "\nStatus: " + status);
    //});
});


//$(document).ready(
//    function () {
//      $.get("index.html", function (data) {
//      $("#loadpage").append(data);
//      });
//    });

//$(function () {
//  $.get("index.html", function (data) {
//  $("#loadpage").append(data);
//  });
//  });

//$.get("index.html")
//.done((data) => {
//    console.info(data); // output the content of the html file
//});

