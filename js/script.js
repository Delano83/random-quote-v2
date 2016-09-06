//Initial Variables
var BackgroundColor;
var myquotes;
var LoadTimer;
var quotesAfter = [];
var sayings;


//Creating a function which selects a random quote object from the quotes array and returns the randomly selected quote object.
function getRandomQuotes() {
	//creates a random number
    var i = (Math.floor(Math.random() * quotes.length));
   
   if(quotesAfter.length < quotes.length ) {

		if (quotesAfter.indexOf( quotes[i] ) > -1 ) {
			return getRandomQuotes();
		} else {

			quotesAfter.push(quotes[i]);
			sayings = quotes[i];
			return sayings;
		}

	} else {
		quotesAfter = []; 
		return getRandomQuotes();
	}
}
//loops through all the object properties, finds the empty ones and deletes them out of the object.
quotes.forEach(function(quotes){
  for (var prop in quotes){
    if(quotes.hasOwnProperty(prop) && isEmpty(quotes[prop])){
      delete quotes[prop];
    }
  }
});

function isEmpty(val){
  return val === undefined || val === null || 
    (typeof(val) === "object" && Object.keys(val).length === 0) || 
    (typeof(val) === "string" && val.trim().length === 0)
}
 
//print function that calls our getRandomQuote function, declares the 'print' variable and constructs a string using only the properties that are defined.
function printQuote(sayings) {
	//call getRandomquote function
    myquotes = getRandomQuotes();
    //declares print variable
    var print = '';
    //construct the HTML template
   print += '<p class="quote">' + myquotes.quote + '</p>';
   print += '<div class="references">';
   //if statement that prints only the defined properties
   if (typeof myquotes.source !== "undefined") { print += '<span class="source">' + myquotes.source + '</span>';}
   if (typeof myquotes.citation !== "undefined") { print += '<span class="citation">' + myquotes.citation + '</span>';}
   if (typeof myquotes.year !== "undefined") { print += '<span class="year"> ' + myquotes.year + '</span>';}
   if (typeof myquotes.place !== "undefined") { print += '<span class="place"> ' + myquotes.place + '</span>';}
   print += '</div>';
   //print the HTML to the quote-box div
   document.getElementById('quote-box').innerHTML = print;
   //calls the change background function
   changeBackground(BackgroundColor);
}

//Generates a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Applies the random color to the background
function changeBackground(BackgroundColor) {
    BackgroundColor = getRandomColor();
    document.body.style.background = BackgroundColor;
}


// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
	document.getElementById('loadQuote').addEventListener("click", printQuote, false); 

//Reloads the page automatically every 5 seconds if the button is not hit.
	LoadTimer = setInterval(printQuote, 30000);