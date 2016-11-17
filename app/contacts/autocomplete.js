$(function() {
  $("#txtBookSearch").autocomplete({
      source: function(request, response) {
        var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=30&q=" + encodeURIComponent(request.term);
        $.ajax({
          url: booksUrl,
          dataType: "jsonp",
          success: function(data) {
			  console.log(data);
            response($.map(data.items, function(item) {
              
              if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate) {
                return {
                  // label value will be shown in the suggestions
                  ebook: (item.saleInfo.isEbook == null ? "" : item.saleInfo.isEbook),
                  title: item.volumeInfo.title,
                  id: item.id,
                  author: item.volumeInfo.authors[0],
                  authors: item.volumeInfo.authors,
                  isbn: item.volumeInfo.industryIdentifiers,
                  publishedDate: item.volumeInfo.publishedDate,
                  image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.thumbnail),
                  small_image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.smallThumbnail)
                  
				  
                };
              }
            }));
          }
        });
      },
      select: function(event, ui) {
          $location.path('/results?id' + ui.item.id)
		
        //location.assign("app/contacts/results.html?id=" + ui.item.id);
        },
   
	  delay: 500,
      minLength: 2,
      focus: function(event, ui) {
        event.preventDefault();
      }
    })
    
    .autocomplete('instance')._renderItem = function(ul, item) {
		if (item.small_image != ''){
      var img = $('<image class="imageClass" src=' + item.small_image + ' alt= ""' + '/>');
		} else {
			var img = $('<image class="imageClass" src= "not_found.png" alt= "not found"/>')
		}
      var link = $('<a>' + item.title + ', ' + item.author + ', ' + item.publishedDate + (item.ebook == "" ? "" : ', (Ebook version)') + '</a>');
      return $('<li>')
        .append("<div>" + img.prop("outerHTML") + link.prop("outerHTML") + "</div>")
        .appendTo(ul);
    };
  
});
