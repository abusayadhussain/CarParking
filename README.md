# CarParking

#Installation
-------------
To setting up the enviornment as this is a node base project npm will install the necessary packages from 
node modules.
Everything is build up no necessariy build upon this.
To run the project, run node app.js in the terminal and it will run the server at port 3000, if you change
the port in the app.listen it will run the server on other port.
To see the project running go http://localhost:3000/


#Tools
------
This project is developed using node.js, express.js, mongodb, mongoose, moment.js, passport.js, method-override,
body-parser, HTML, CSS, Bootstrap.

#Project Description
--------------------
Car Parking is a system where owner of the car can park the car in a parking slot with the information Car name, model
and licence number. But first of all they need to login to do that. Only owner of the car can edit and retrive the car
form the slot. There are 20 slot available No more than 20 cars can park in the slot..if there is 20 car already parked 
the button which is there to enter new car entry will be disabled. For the first hour it will be charged 20BDT and after 
1 hour for every hour it will cahrge 5tk.
