var url_text = 	document.getElementById('url');
var user_input_text = document.getElementById('word');
var whole_word_checkbox = document.getElementById("whole_word");
var case_sensitive_checkbox = document.getElementById("case_sensitive")
var submit_button = document.getElementById('submit_button');

var url = 0;
var user_input = 0;
var whole_word = 0;
var case_sensitive = 0;

function validateYouTubeUrl(url_text)
{            
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;   
    return (url_text.value.match(p)) ? RegExp.$1 : false;
      
}

var submit_function = function submit_function () 
{
	if(url_text.value === null || url_text.value === "")
	{
        alert("Enter a youtube video URL please !!!");
        window.open("http://127.0.0.1:8000/word_finder/", "_self")
		return;
	}

    if(!validateYouTubeUrl(url_text))
    {
        alert("Enter a valid You Tube URL please !!!!!");  
        // window.open("page.html","_self")
        return;
    }

    url = url_text.value;    

	if(user_input_text.value === null || user_input_text.value === "")
	{
		alert("Enter a word to be searched in video please !!!");
		return;
    }

    user_input = user_input_text.value;
        
    console.log(url);
    console.log(user_input);
    console.log("whole word = " + whole_word);
    console.log("case sensitive = " + case_sensitive);

}

// var chekbox_function = function chekbox_function()
// {    
//     whole_word = whole_word_checkbox.checked ? 1 : 0;
//     case_sensitive = case_sensitive_checkbox.checked ? 1 : 0; 
    
//     console.log("whole word = " + whole_word);
//     console.log("case sensitive = " + case_sensitive);
// }

submit_button.addEventListener("click", submit_function);
// whole_word_checkbox.addEventListener("click", chekbox_function);
// case_sensitive_checkbox.addEventListener("click", chekbox_function);

