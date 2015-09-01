var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Northwind.sl3');


var getCategories = function () {
	db.run('', function() {
		console.log('=========');
		console.log('Categories');
		console.log('=========');
	});
 
	db.each('SELECT * FROM Categories', function(err, row) {
		console.log(row.Description.toString())
	});
	
}

var getProducts = function () {
	db.run('', function() {
		console.log('=========');
		console.log('Products');
		console.log('=========');
	});

	db.each('SELECT * FROM Products ' +
		'INNER JOIN Categories ' +
		'ON Products.CategoryID = Categories.CategoryID ' +
		'LIMIT 10', function (err, row) {
			console.log(row.ProductName + ' is a '  + row.CategoryName);
	});
};

var getEmployeeSupers = function () {
	db.run('', function() {
		console.log('=========');
		console.log('Employee Supervisors');
		console.log('=========');
	});

	db.each('SELECT Employees.LastName AS EmployeeLastName, Supervisors.LastName AS SupervisorLastName ' + 
		'FROM Employees '+
		'LEFT OUTER JOIN Employees AS Supervisors ' +
		'ON Employees.ReportsTo = Supervisors.EmployeeID ', function (err, row) {
		if (row.SupervisorLastName) {
			console.log('Employee ' + row.EmployeeLastName + " supervisors's last name is " + row.SupervisorLastName)
		} else {
			console.log(row.EmployeeLastName + ' has no supervisor')
		}
	});
};

var createCatFavTable = function() {
	db.run('CREATE TABLE CategoryFavorites', function() {
		console.log('=========');
		console.log('New CategoryFavorites Table');
		console.log('=========');
		'FavoriteID INTEGER NOT NULL AUTOINCREMENT '+
		'CategoryID INTEGER NOT NULL'
	});
};



db.serialize(function() {
	getCategories();
	getProducts();
	getEmployeeSupers();
	createCatFavTable();
	db.close();
});