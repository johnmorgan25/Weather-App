console.log("client side JS is loaded");

// Global variables
const inputForm = document.querySelector("form");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Main function
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const feel = document.querySelector("#feeling").value;
  const zip = document.querySelector("#zip").value;
  const paragraphOne = document.querySelector("#paragraph-one");
  console.log("testing");
  paragraphOne.innerHTML = feel;
  console.log(paragraphOne.innerHTML);

  // fetchData function
  const paragraphTwo = document.querySelector("#paragraph-two");
  fetch(`http://localhost:8080/weather?search=${zip}`).then((response) => {
    response.json().then((data) => {
      const temprature = data.temprature;
      const location = data.location;
      if (data.error) {
        console.log("error" + data.error);
        paragraphTwo.innerHTML = "error" + data.error;
      } else {
        console.log(location);
        console.log(temprature);
        paragraphTwo.innerHTML = `It is ${temprature} celsius out there in ${location} on ${newDate}`;
      }
    });
  });
});
