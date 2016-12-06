var images = [];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function loadImages(subreddit) {
    var count = 0;

    $.getJSON("https://www.reddit.com/r/" + subreddit + "/.json?jsonp=?", function(data) {
        $.each(data.data.children.slice(0,16), function(i,item){
            if(item.data.post_hint == "image" && item.data.domain != "flickr.com"){
                var str1 = replaceAll(item.data.url, "&amp;", "&");
                if (str1.search(".jpg") < 0) {
                    str1 = str1 + ".jpg";
                }
                images.push(str1);
                //console.log(str1,i);
                //console.log(item.data)
                var $image = $("#img" + count);
                $image.attr("src", str1);

                var title = replaceAll(item.data.title, /\[.*\]/, "");
                $($image).siblings().find("h2").text(title);
                $($image).siblings().find("a").attr("href", item.data.url).text("Click here to enlarge");
                count++;
            } else {
                console.log(item.data.title);
            }
        });
        count = 0;
        console.log(images);
        console.log(data);
    })
        .done(function() { console.log('getJSON request succeeded!'); })
        .fail(function(jqXHR, textStatus) {
            console.log('getJSON request failed! ' + textStatus);
            $('#myModal').modal('show');
        })
        .always(function() { console.log('getJSON request ended!'); });
}

$("form").submit(function( event ) {
    loadImages($("input:first").val());

    event.preventDefault();
});

$('.dropdown-item').click(function () {
   loadImages(this.text);
});


loadImages("pics");