//Initial Variables
//Variable to change background color
var BackgroundColor;
//Holds the quote in the getRandomQuote variable
var sayings;

//Holds the quotes in the printQuote function
var myquotes;
//Holds setTimeout
var LoadTimer;
//Empty Array 
var quotesAfter = [];


//Creating a function which selects a random quote object from the quotes array and returns the randomly selected quote object.
function getRandomQuotes() {
	//creates a random number
    var i = (Math.floor(Math.random() * quotes.length));
   //As long as the as the quotesAfter variable is not full
   if(quotesAfter.length < quotes.length ) {
   	//If 
		if (quotesAfter.indexOf( quotes[i] ) > -1 ) {
			return getRandomQuotes();
		} else {
			//pushes the current quote to the quotesAfter variable
			quotesAfter.push(quotes[i]);
			sayings = quotes[i];
			return sayings;
		}

	} else {
		//Empty the quoteAfter array once all 5 quotes are printed
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
//Defines an empty field. I tried to make sure I did not forget anything.
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
    //constructs the HTML template
   print += '<p class="quote">' + myquotes.quote + '</p>';
   print += '<div class="references">';
   //if statements that prints only the defined properties
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

//Calls the getRandomColor function and applies it to the background
function changeBackground(BackgroundColor) {
    BackgroundColor = getRandomColor();
    document.body.style.background = BackgroundColor;
}


// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
	document.getElementById('loadQuote').addEventListener("click", printQuote, false); 

//Reloads the page automatically every 30 seconds if the button is not hit.
	LoadTimer = setInterval(printQuote, 30000);