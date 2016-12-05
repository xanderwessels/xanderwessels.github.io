var images = [];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function loadImages(subreddit) {

    $.getJSON("https://www.reddit.com/r/" + subreddit + "/.json?jsonp=?", function(data) {
        $.each(data.data.children.slice(0,8), function(i,item){
            var str1 = replaceAll(item.data.url, "&amp;", "&")
            if (str1.search(".jpg") < 0){ str1 = str1 + ".jpg";}
            if (item.data.domain == "flickr.com"){str1 = "placeholder.png"}
            images.push(str1);
            console.log(str1,i);
            console.log(item.data)
            var $image =  $("#img" + i);
            $("<img/>").attr("class", "img-responsive").attr("src", str1).appendTo($image);

            var title = replaceAll(item.data.title,/\[.*\]/,"")
            $($image).find("h2").text(title);
            $($image).find("a").attr("href", item.data.url).text("Click here to enlarge");
        })
        console.log(data);
    })
        .done(function() { console.log('getJSON request succeeded!'); })
        .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
        .always(function() { console.log('getJSON request ended!'); });
}
$("form").submit(function( event ) {
    if ($("input:first").val() === "correct" ) {
        $( "span" ).text( "Validated..." ).show();
        return;
    }

    $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
    event.preventDefault();
});

loadImages("Earthporn");