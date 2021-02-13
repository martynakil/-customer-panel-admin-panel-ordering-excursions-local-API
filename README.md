

<h1> Order a excursion [ customer panel & admin panel ] </h1>

*<h3>1 panel - an admin who adds tours, 2nd panel - a customer who can order these tours :blue_book:</h3>*

>from the series: practicing JS and API  :muscle:

----

The functionality of the task was based on the following:

**ADMIN (admin panel)** :sassy_man:
http://localhost:8080/admin.html

* adds a tour,  he enters the name of the trip, price and description in the form.
* this tour appears in the local API. at the address: http://localhost:3005/excursions
* can edit and delete the tour

**CLIENT (client panel)** :sassy_woman:
http://localhost:8080/

* the customer sees all tours added by the admin (with description, price and of course name)
* the customer can add the selected tour to the order (must enter the number of people)
* after selecting the tour, he can place an order. In the form, he sees the selected tours. Must enter name and email.
*This order also appears in the local API at: http://localhost:3005/orders


-------

<h3>What did I use in the project? What have I learned?</h3>

* First of all, here I was learning how API works
* [comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
* how to clone an item in JS
* how to use [forEach Method](https://www.w3schools.com/jsref/jsref_foreach.asp)
* what is prototype in JS
* what is [setAttribute Method](https://www.w3schools.com/jsref/met_element_setattribute.asp)
* what is [ParentElement](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
* first of all, how does the API work!
* I used webpack
* what is [JSON SERVER](https://www.npmjs.com/package/json-server)


-----
<h3>How to open a file? :eyes:  :eyes: </h3>

* On the right side you will find the "clone or download" button - click it.
* An item should appear with the "Download ZIP" option - click again.
* Now you just need to unpack the downloaded file and open it in your favorite editor.
* you must enter the appropriate folder (command "cd" + file name, e.g. cd excursionfile)
* you must to install all packages via  *npm install*
* then you can start *npm start*


**If you want to run the client version, just enter 
http: // localhost: 8080 / index.html in the browser 
and admin will be available at: http: // localhost: 8080 / admin.html.** 	:v:	 :v: 	:v:

JSON SERVER

is installed in the project so you have to run it as well, otherwise the API will not work.
go to the root directory and type

----

*json-server --watch ./data/excursions.json*

----

From now on, the API will be available at: http: // localhost: 3000, 

but note that there are two different resources in the file, i.e.

* excursions
* orders

Depending on what data you want to work on, you will pass a different URL to fetch (), i.e.

----

http: // localost: 3000 / excursions - tour management
http: // localost: 3000 / orders - order management

-----



:computer: TECHNOLOGIES : html, css and JS, API, WEBPACK, NPM


----

My next small project from JS   :arrow_right: :arrow_right: :arrow_right: [CLICK ME ](https://github.com/martynakil/-testing-SDK-for-GitHub-API)




----


**ADMIN PANEL**  :eyes::

![Zrzut ekranu 2021-02-13 o 00 32 29](https://user-images.githubusercontent.com/59742201/107833267-02d3ff00-6d93-11eb-9442-8f63f70e1fb7.png)

----

**API ADMIN**  :eyes:

![Zrzut ekranu 2021-02-12 o 23](https://user-images.githubusercontent.com/59742201/107832859-d2d82c00-6d91-11eb-8354-51d111aef4f1.png)


----

**CLIENT PANEL**  :eyes:


![Zrzut ekranu 2021-02-13 o 00 33 22](https://user-images.githubusercontent.com/59742201/107833296-154e3880-6d93-11eb-8883-d2b3275204b4.png)


----

**API ORDER**  :eyes:

![Zrzut ekranu 2021-02-12 o 23 43 12](https://user-images.githubusercontent.com/59742201/107832963-1d59a880-6d92-11eb-806d-31dc697a98d7.png)
