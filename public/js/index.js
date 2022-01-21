// api url
const api_url = "https://api.npoint.io/5f458ccb947908d10993";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  let navElements = "";
  let menuItems = "";
  // Loop to access all rows
  for (let r of data.MenuSections) {
    console.log("MenuSections", data.MenuSections);
    console.log("r", r);

    navElements += `<a href="#${r.Name}">${r.Name}</a>`;
    for (let list of r) {
        menuItems+=
    }
  }
  console.log("navElements", navElements);
  // Setting innerHTML as tab variable
  document.getElementById("topnav").innerHTML = navElements;
}
