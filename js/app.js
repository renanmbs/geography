//Variables
let form = document.getElementById("form_flag"); //Flag quiz submit button
let form2= document.getElementById("form_capital"); //Capital quiz submit button
let flag_quiz_name; //Name of the flag quiz country's flag
let capital_quiz_name; //Name of the capital quiz' capital

//Fetch parameters
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
  

//Function to get the random country
async function get_country(){

    //Fetch API
    const response_info = await fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions);
    const response_flags = await fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode", requestOptions);

    //Get data
    let data_info = await response_info.json(); //Raw data country's info
    let data_flag = await response_flags.json(); //Raw data flags
    let countries = data_info.data; //Get countries array
    let flags = data_flag.data; //Get flags
    let random = Math.ceil(Math.random() * 250); //Get random number
    let country_name = countries[random].name; //Get country's name
    let capital = (countries[random].capital); //Get country's capital
    let country_flag; //Country's flag

    //Loop through flag data
    for(const names of flags){

        //Check for desired country's flag
        if(names.name == country_name){
            country_flag = names.unicodeFlag; //Set the country's flag
        }
    }

    //Set the screen with data
    set_screen(country_flag,country_name,capital);

}

//Function to place the API fetched info
function set_screen(country_flag,country_name,capital){

    //Get areas to replace
    let flag_replace = document.getElementById("flag");
    let name_replace = document.getElementById("name");
    let capital_replace = document.getElementById("capital");

    //Set the HTML page
    flag_replace.innerHTML = country_flag; //Flag
    name_replace.innerHTML = country_name; //Name
    capital_replace.innerHTML = capital; //Capital

    //Show results
    document.getElementById("results").style.display = "block";

}

//Function to get user choice on what to do in the website
function get_choice(){

    //Get choice from list
    let choice = document.getElementById("choice2").value;

    //If the choice is to get a random country
    if(choice == "rand"){
        document.getElementById("new_get").style.display = "block"; //Show display
        document.getElementById("flag_quiz_area").style.display = "none"; //Hide display
        document.getElementById("capital_quiz_area").style.display = "none";  //Hide display
    }

    //If the choice is for flag quiz
    else if(choice == "flag"){
        document.getElementById("flag_quiz_area").style.display = "block";  //Show display
        document.getElementById("capital_quiz_area").style.display = "none";  //Hide display
        document.getElementById("new_get").style.display = "none";  //Hide display
        document.getElementById("results").style.display = "none";  //Hide display
    }

    //If the choice is for capital quiz
    else if(choice == "cap"){
        document.getElementById("capital_quiz_area").style.display = "block"; //Show display
        document.getElementById("flag_quiz_area").style.display = "none";  //Hide display
        document.getElementById("new_get").style.display = "none";  //Hide display
        document.getElementById("results").style.display = "none"; //Hide display
    }

    //If the choice is default
    else if(choice == "def"){
        document.getElementById("capital_quiz_area").style.display = "none"; //Hide display
        document.getElementById("flag_quiz_area").style.display = "none"; //Hide display
        document.getElementById("new_get").style.display = "none";  //Hide display
        document.getElementById("results").style.display = "none";  //Hide displayß
    }
}

//Function to create the flag game
async function flag_game(){

    //Fetch API
    const response_flags = await fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode", requestOptions);

    //Get data
    let data_flag = await response_flags.json(); //Raw data flags
    let flags = data_flag.data; //Get flags
    let random = Math.ceil(Math.random() * 250); //Get random number
    let country_flag = flags[random].unicodeFlag; //Get country's flag
    flag_quiz_name = flags[random].name; //Set country's name to variable

    //Set random flag
    document.getElementById("flag_placement").innerHTML = country_flag;

}

//Prevent refreshing the page to show values for flag quiz
form.onsubmit = function(e) {

    //Don't refresh the page
    e.preventDefault();

    //Check result for flag quiz
    check_flag();

};

//Prevent refreshing the page to show values for capital quiz
form2.onsubmit = function(e) {

    //Don't refresh the page
    e.preventDefault();

    //Check result for capital quiz
    check_capital();

};

//Function to check the flag quiz result
function check_flag(){

    //Get user input
    let country_input = document.getElementById("flag_input").value; //Input value
    let country_unmodified = flag_quiz_name; //Unmodified name
    country_input = country_input.toLowerCase(); //Transform input to lower case

    flag_quiz_name = flag_quiz_name.toLowerCase(); //Get country's name and put it in lower case

    //Check if the user input is the same as the country's name
    if(flag_quiz_name == country_input){
        document.getElementById("flag_result").innerHTML = "Correct!"; //Print correct result
        document.getElementById("correction_flag").style.display = "none"; //Don't display correct result area
    }

    //If the user got the country wrong
    else{
        document.getElementById("flag_result").innerHTML = "Incorrect!"; //Print incorrect result
        document.getElementById("correction_flag").style.display = "block"; //Show correct result area
        document.getElementById("correct_flag").innerHTML = country_unmodified;//Print correct result
    }

    //Change button for a new country
    document.getElementById("get_flag").innerHTML = "Next!";
}

//Function to create the capital quiz
async function capital_game(){

    //Fetch API
    const response_info = await fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions);

    //Get data
    let data_info = await response_info.json(); //Raw data country's info
    let countries = data_info.data; //Get countries array
    let random = Math.ceil(Math.random() * 250); //Get random number
    let country_name = countries[random].name; //Get country's name
    let capital = (countries[random].capital); //Get country's capital
    capital_quiz_name = capital; //Set capital's name to variable

    //Set random flag
    document.getElementById("country_placement").innerHTML = country_name;

}

//Function to check the capital quiz result
function check_capital(){

    //Get user input
    let capital_input = document.getElementById("capital_input").value;
    let capital_unmodified = capital_quiz_name; //Unmodified name of capital
    capital_input = capital_input.toLowerCase(); //Transform input to lower case

    capital_quiz_name = capital_quiz_name.toLowerCase(); //Get country's name and put it in lower case

    //Check if the user input is the same as the country's name
    if(capital_quiz_name == capital_input){
        document.getElementById("capital_result").innerHTML = "Correct!"; //Print correct result
        document.getElementById("correction_capital").style.display = "none"; //Don't display incorrect answer area
    }

    //If the user got the country wrong
    else{
        document.getElementById("capital_result").innerHTML = "Incorrect!"; //Print incorrect result
        document.getElementById("correction_capital").style.display = "block"; //Display incorrect answer area
        document.getElementById("correct_capital").innerHTML = capital_unmodified;//Print correct result
    }

    //Change button for a new country
    document.getElementById("get_capital").innerHTML = "Next!";
}

//Add event listeners
let button = document.getElementById("get_country"); //Generate Country
let choice = document.getElementById("choice2"); //Choice of what to do
let flags = document.getElementById("get_flag"); //Get a flag for flag quiz 
let capitals = document.getElementById("get_capital"); //Get capital for capital quiz

button.addEventListener("click",get_country); //Change country when button is clicked
choice.addEventListener("change",get_choice); //Get first user choice of what to do in the website
flags.addEventListener("click",flag_game); //Get a new flag when button is pressed
capitals.addEventListener("click", capital_game); //Get a new capital when button is pressed
