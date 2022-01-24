// api url
const api_url = "https://api.npoint.io/5f458ccb947908d10993";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
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
  document.getElementById("footer").style.display = "block";
}
// Function to show content with data
function show(data) {
  let navElements = "";
  let menuItems = "";
  // Loop to access all rows
  for (let dataItem of data.MenuSections) {
    navElements += `<a href="#${dataItem.Name}" onclick="setMenuItem(this)">${dataItem.Name}</a>`;
    menuItems += `<h id="${dataItem.Name}" class="section-header">${dataItem.Name}</h>`;

    for (let list of dataItem.MenuItems) {
      menuItems += `
      <div class="menu-item ${
        list.SoldOut ? "no-cursor" : ""
      }" onclick="showAddToCartPopUp('${encodeURIComponent(
        JSON.stringify(list)
      )}')">
        <div id="itemName" class="item-name">${list.Name}</div>
        <div id="itemStatus" class="status">
        ${list.SoldOut ? `<div class="item-status">Sold Out</div>` : ""} 
            </div>           
        <div id="itemPrice" class="item-price">&dollar;${list.Price.toFixed(
          2
        )}</div>
      </div>`;
    }
  }

  document.getElementById("topnav").innerHTML = navElements;
  document.getElementById("menuDetails").innerHTML = menuItems;
  document.getElementById("topnav").firstElementChild.classList.add("active");
}

//function to show add to cart popup
function showAddToCartPopUp(data) {
  const itemData = JSON.parse(decodeURIComponent(data));
  const overlay = document.getElementById("overlay");
  const popUpMarkUp = `
  <div class="popup">
    <a class="close" onclick="closeAddToCartPopUp();">&times;</a>
    <div class="popup-content">
      <h4>${itemData.Name}</h4>
      <span>&dollar;${itemData.Price.toFixed(2)}</span>
      <input type="number" id="quantity" name="quantity" min="1" value="1">
      <button class="add-cart-button" onclick="closeAddToCartPopUp();">Add to Order</button>
    </div>
</div>
  `;
  overlay.innerHTML = popUpMarkUp;
  overlay.style.opacity = 1;
  overlay.style.visibility = "visible";
}

// function to close the popup
function closeAddToCartPopUp() {
  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.visibility = "hidden";
  overlay.innerHTML = "";
}

//function to maintain active state on selected top navigation menu
function setMenuItem(menuItem) {
  var checkChildStatus = document.querySelector("#topnav .active");
  if (checkChildStatus) {
    checkChildStatus.classList.remove("active");
  }
  menuItem.classList.add("active");
}
