//bringing in dependencies mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	//my username
	user: "root",

	//my mysql password
	password: "Database!DreamGirl28",

	database: "bamazon"
});


					//the callback
connection.connect(function(err) {

	//handle the error
	if (err) throw err;

	//to see if a connection was made
	console.log("Connected as id " + connection.threadId);

	console.log("");

	displayProducts();


	

	
	
});



//function to display all the products available for sale
function displayProducts() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		//console.log(res); //test

		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price.toFixed(2));
		}
		console.log("");

		buyProducts();
	})

	connection.end(); 
};

//function to ask users what product they would like to buy
//calling the function from within displayProducts() to force a synchronous display
function buyProducts() {
	inquirer.prompt([
		{
			name: "productChoice",
			type: "input",
			message: "What product would you like to buy? Please enter the corresponding item ID: ",

			//checks if the user put in a number
			validate: function(message) {
				if (isNaN(message)) {
					return console.log(" << Invalid Response. Please input a number.")
				}
				else {
					return true;
				}
			}

		},
		{
			name: "productQuantity",
			type: "input",
			message: "How much of that product would you like to buy? Please enter a number: ",

			//checks if user put in a number
			validate: function(message) {
				if (isNaN(message)) {
					return console.log(" << Invalid Response. Please input a number.")
				}
				else {
					return true;
				}
			} 
		}
	])

	//the promise <3 xoxo
	.then(function(answers) {
		//console.log(answers); //test
		
		
	});
};