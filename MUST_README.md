project/assignment description -> i have used node js, express js and MySql database with 
	sequelize ORM to ease and make development process fast.All the functionality mentioned
	in the assignment is working good and is complete.

before running , the computer should have mysql installed, now make a .env file with these variables

DATABASE = "shop" // name of database

DATABASE_USER = "" // database username

DATABASE_PASSWORD = "" // your password here

DATABASE_HOST = "localhost"


how to run this code -> 

------------Project set up------------------------

1) clone the project as " git clone "

2) run in teminal (make sure you are in current folder path) "npm install"

3) start the server as " npm run dev " or " npm start" or simply "node server.js"

4) go to postman or thunderclient(in vs code extension) and create a new request

-----------------tesing APIs--------------------

5) testing APIs starts here...

6) to save/insert/post a new inventory/goods 
	
	a) (in thunderclient) , select POST, enter url "http://localhost:5000/api/create"
	b) go to body , choose JSON , paste this sample data there
	
	{
  "goodsName": "mouse",
  "price": 20,
  "description": "long life mouse",
  "quantity": 25
}
7) repeat the step 6 to add as many data as you want

8) to update data, make sure to insert correct id
	a) select PUT , enter url "http://localhost:5000/api/change/1" (1 represent id here which
		must be present before updating)
	
	b) go to body , choose JSON , paste this sample data there, for simplicity, you can modify 
	only quantity and price , goodsName is a unique value(cannot modified), description not considered
	for now, so to modify both , use this sample data ->
		{
 "price":200 "quantity": 50
} or {
  "quantity": 50
}

9) to get all saved data hit url "http://localhost:5000/api/getdata"

--------------------Billing Part----------------------------

10) to create a new bill , choose PUT , hit url "http://localhost:5000/api/bill/create"
  choose json in body, here id is the product id and quantity is how many of that you want to
	purchase
sample data -> 
{
  "itemsData": [
    {"id": 3, "quantity": 2},
    {"id": 1, "quantity": 2}
  ]
}

11) to get a apecific bill, you have to provide (existing) id manullay (as there is no frontend), 

now , choose GET, and hit url "http://localhost:5000/api/bill/getdata/4"

12) to get all bills, choose GET method, hit url "http://localhost:5000/api/bill/getdata"

note -> all the APIs working correct (in  my system)
