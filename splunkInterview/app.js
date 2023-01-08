//make title 80px
const body = document.getElementsByTagName("BODY");
const text = body[0].firstChild.nodeValue;
const title = document.createElement("DIV");
title.innerText = `${text}`;
body[0].firstChild.remove();
body[0].prepend(title);
title.style.fontSize = "80px";

//need to code bootstrap answer here

// Using jQuery - Add the following content to all the elements with the class
//no using jquerry will change latter.
const helloWorld = document.getElementsByClassName("content");
//need to conver html elemenst to array in other use forEach
const arrayHello = Array.from(helloWorld);
arrayHello.forEach(
  (content) => (content.innerHTML = `${content.innerHTML} Hello World`)
);

//Using jQuery Please when clicking on an element with the class "click-me"
//show an Alert. Inside the alert show the value of the data attribute
//message
const btnClickMe = document.getElementsByClassName("click-me")[0];
btnClickMe.addEventListener("click", (event) => {
  alert(event.target.dataset.message);
});

/* <h4>Exercise Six - jQuery AJAX</h4>
    Using the following API:<br />
    https://jsonplaceholder.typicode.com/todos/1
    <br />
    Display the title of the weather on the div the class "title". */

const url = "https://jsonplaceholder.typicode.com/todos/1";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const divTitle = document.getElementsByClassName("title")[0];
    divTitle.innerHTML = data.title;
  });
