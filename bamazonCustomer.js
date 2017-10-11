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

	connection.end(); 
	
});



//function to display all the products available for sale
function displayProducts() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		//console.log(res); //test

		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price.toFixed(2));
		}

	})
}

