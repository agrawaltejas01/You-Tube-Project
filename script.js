var url = 	document.getElementById('url');
var user_input = document.getElementById('word');
var submit_button = 	document.getElementById('submit_button');

function validateYouTubeUrl()
{
    var url = $('#youTubeUrl').val();
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                $('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
            }
            else {
                // Do anything for not being valid
            }
        }
}

function validateYouTubeUrl(url)
{
	url = url.toString()
   	// if (url != undefined || url != '') 
    // {
    //     var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    //     var match = url.match(regExp);
    //     if (match && match[2].length == 11) 
    //     {
    //         // Do anything for being valid
    //         // // if need to change the url to embed url then use below line
    //         // $('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
    //     }
    //     else 
    //     {
    //         // Do anything for not being valid
    //         alert("Not a youtube url")
    //     }
    // }

     var regExp = /(?:https?:\/\/(?:www\.)?)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/,
      match = url.match(regExp);

  	return match ? match[3] : false;
}

var test_function = function test_function () 
{
	console.log(url.value);
	console.log(user_input.value);

	if(url.value === null || url.value === "")
	{
		alert("Enter a youtube video URL please !!!");
		return;
	}

	console.log(validateYouTubeUrl(url))

	if(user_input.value === null || user_input.value === "")
	{
		alert("Enter a word to be searched in video please !!!");
		return;
	}
}

submit_button.addEventListener("click", test_function)

// submit_button.addEventListener("click", function(){
// 	console.log(url.value);
// 	console.log(user_input.value);

// 	if(url.value === null || url.value === "")
// 		alert("Enter a youtube video URL please !!!")

// 	if(user_input.value === null || user_input.value === "")
// 		alert("Enter a word to be searched in video please !!!")
// })
