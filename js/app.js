//a function to do string manipulation
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//the main function that gets the images from the right subreddit and displays them on the screen
function loadImages(subreddit) {
    //keep a count to make sure we display 8 images
    var count = 0;

    //the image gathering is done here
    $.getJSON("https://www.reddit.com/r/" + subreddit + "/.json?jsonp=?", function(data) {
        //get the first 16 for redundanceness
        $.each(data.data.children.slice(0,16), function(i,item){
            //only get the ones that are images and do no come from flickr(flickr is a b*tch)
            if(item.data.post_hint == "image" && item.data.domain != "flickr.com"){
                //replace the ampersand marks in the reddituploads links
                var str1 = replaceAll(item.data.url, "&amp;", "&");

                //add the .jpg if it isnt there or add l.jpg to get a thumbnail size from ingur
                if(str1.search("imgur") > 0 && str1.search(".jpg") > 0) {
                    str1 = replaceAll(str1,".jpg", "l.jpg");
                } else if (str1.search(".jpg") < 0) {
                        str1 = str1 + ".jpg";
                }

                //attach the string as the source for the images
                var $image = $("#img" + count);
                $image.attr("src", str1);

                //display the title and add the full picture link
                var title = replaceAll(item.data.title, /\[.*\]/, "");
                $($image).siblings().find("h2").text(title);
                $($image).siblings().find("a").attr("href", item.data.url).text("Click here to enlarge");

                count++;
            }
        });
        count = 0;
    })  //if this json request fails, show the modal we made in the html file
        .fail(function(jqXHR, textStatus) {
            console.log('getJSON request failed! ' + textStatus);
            $('#myModal').modal('show');
        })
}

//load the images from the input box when submit is clicked
$("form").submit(function( event ) {
    loadImages($("input:first").val());

    event.preventDefault();
});

//load the images for the subreddit corresponding to the subreddit dropdown
$('.dropdown-item').click(function () {
   loadImages(this.text);
});

//load the images for the first time
loadImages("architectureporn");