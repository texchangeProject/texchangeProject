$(function() {
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    } else {
      return results[1] || 0;
    }
  };
  if ($.urlParam('id') != null){
  var booksUrl = "https://www.googleapis.com/books/v1/volumes/" + $.urlParam('id');
  $.getJSON(booksUrl, function(data, textStatus, jqxhr) {
    console.log(data)
    var dict = {
      ebook: (data.saleInfo.isEbook == null ? "" : data.saleInfo.isEbook),
      title: data.volumeInfo.title,
      id: data.id,
      author: data.volumeInfo.authors[0],
      authors: data.volumeInfo.authors,
      isbn: data.volumeInfo.industryIdentifiers,
      publishedDate: data.volumeInfo.publishedDate,
      image: (data.volumeInfo.imageLinks == null ? "" : data.volumeInfo.imageLinks.thumbnail),
      small_image: (data.volumeInfo.imageLinks == null ? "" : data.volumeInfo.imageLinks.smallThumbnail),
      description: (data.volumeInfo.description == null ? "" : data.volumeInfo.description),
      publisher: data.volumeInfo.publisher
    };
    
    if (dict.image != '') {
      $('#divDescription').append('<img src="' + dict.image + '" style="float: left; padding: 10px;">');
    } else {
		$('#divDescription').append('<img src="not-found.png" style="float: left; padding: 10px;">');
	}
    if (dict.ebook == true) {
      $('#divDescription').append('<h2>(Ebook version)</h2>');
    }
    $('#divDescription').append('<p><b>Title:</b> ' + dict.title + '</p>');
    $('#divDescription').append('<p><b>Authors:</b> ' + dict.authors.join(', ') + '</p>');
    $('#divDescription').append('<p><b>First published year:</b> ' + dict.publishedDate + '</p>');
    $('#divDescription').append('<p><b>Publisher:</b> ' + dict.publisher + '</p>');
    // and the usual description of the book
	if (dict.description == "") {
		$('#divDescription').append('<p><b>Description:</b> No description available.</p>');
	} else{
		$('#divDescription').append('<p><b>Description:</b> ' + dict.description + '</p>');
	}
    if (dict.isbn && dict.isbn[0].identifier) {
      $('#divDescription').append('<p><b>ISBN:</b> ' + dict.isbn[0].identifier + '</p>');
      $('#divDescription').append('<a href="http://www.worldcat.org/isbn/' + dict.isbn[0].identifier + '" target="_blank">View item on worldcat</a>');
      $('#divDescription').append('<p>Some users may own this book in a different edition, <a href="http://books.google.com/books?q=editions:ISBN' + dict.isbn[0].identifier + '&id=' + dict.id + '" target="_blank">check out other versions on google</a> and search their ISBN here</p>');
    };
	$('#divDescription').append('<p>If this is a school textbook, you can view prices from online vendors on <a href="http://www.campusbooks.com/search/' + dict.isbn[0].identifier + '" target="_blank">campusbooks.com</a></p>');
	
  }).fail(function(jqxhr, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  });
  }
});