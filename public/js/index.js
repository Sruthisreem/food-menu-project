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
// Function to define innerHTML for HTML table
function show(data) {
  let navElements = "";
  let menuItems = "";
  // Loop to access all rows
  for (let r of data.MenuSections) {
    navElements += `<a href="#${r.Name}">${r.Name}</a>`;
    menuItems += `<h id="${r.Name}" class="section-header">${r.Name}</h>`;

    for (let list of r.MenuItems) {
      menuItems += `
      <div class="menu-item ${
        list.SoldOut ? "no-cursor" : ""
      }" onclick="showAddToCartPopUp('${encodeURIComponent(
        JSON.stringify(list)
      )}')">
        <div id="itemName" class="item-name">${list.Name}</div>
        <div id="itemStatus" class="status">
        ${list.SoldOut ? `<div class="item-status">SoldOut</div>` : ""} 
            </div>           
        <div id="itemPrice" class="item-price">&dollar;${list.Price.toFixed(
          2
        )}</div>
      </div>`;
    }
  }
  // Setting innerHTML as tab variable
  document.getElementById("topnav").innerHTML = navElements;
  document.getElementById("menuDetails").innerHTML = menuItems;
}

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
      <button onclick="closeAddToCartPopUp();">Add to Order</button>
    </div>
</div>
  `;
  overlay.innerHTML = popUpMarkUp;
  overlay.style.opacity = 1;
  overlay.style.visibility = "visible";
}

function closeAddToCartPopUp() {
  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.visibility = "hidden";
  overlay.innerHTML = "";
}
