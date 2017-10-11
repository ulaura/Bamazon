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


};

//function to ask users what product they would like to buy
//calling the function from within displayProducts() to force a synchronous display
//i.e. show the database and then go through inquirer prompts
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

		//compares user's input from productChoice to to item_id in bamazon database
		connection.query("SELECT * FROM products WHERE item_id=?", answers.productChoice, function (err, res) {
			if (err) throw err;

			for (var j = 0; j < res.length; j++) {
				//console.log(res[j].product_name); //test

				//if the user asked for a larger quantity than what's available in stock
				if (answers.productQuantity > res[j].stock_quantity) {
					console.log("\n" + res[j].product_name + " >> Insufficient quantity!!");

					console.log("");
					
					//run inquirer prompts again
					buyProducts();
				}

				else {
					//get the total cost of what the user wants to purchase
					var totalCost = res[j].price * answers.productQuantity;

					console.log("\nYour order: " + res[j].product_name);
					console.log("Quantity ordered: " + answers.productQuantity);
					console.log("Unit price: " + res[j].price.toFixed(2));
					console.log("Total cost: " + totalCost.toFixed(2));
				}
			}

		})

	});
};