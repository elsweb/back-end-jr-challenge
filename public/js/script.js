$(".small2").each(function(){
    fulltext = $(this).text();
    if ($(this).text().length > 200) {
       $(this).text($(this).text().substr(0, 50));
       $(this).append('<span> ...</span>');      
    }
});