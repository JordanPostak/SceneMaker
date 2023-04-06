
// A simple scene manager. The user can add, update, and cancel scenes. The data for the scenes is stored in local storage.

// Change the background image of the body
document.body.style.backgroundImage = "url('images/universemaker.jpg')";

// Change the color and font size of all elements with the class "text-center"
document.querySelector('.text-center').style.fontSize = "50px";

// Call the showScenes function to display the scenes
showScenes();

// Attach a click event listener to the "Cancel" button
cancelBtn.addEventListener('click', function(e) {
  // Prevent the default behavior of the form
  e.preventDefault()
  // Clear the input fields
  document.getElementById("addlocationTxt").value = '';
  document.getElementById("addcharactersTxt").value = '';
  document.getElementById("addpurposeTxt").value = '';
  document.getElementById("addsummaryTxt").value = '';
  document.getElementById("addTxt").value = '';
  document.querySelector("input[name='locationkey']").value = '';
  document.querySelector("input[name='characterskey']").value = '';
  document.querySelector("input[name='purposekey']").value = '';
  document.querySelector("input[name='summarykey']").value = '';
  document.querySelector("input[name='key']").value = '';
  // Change the text of the "Add Scene" button back to "Add Scene"
  document.getElementById("addBtn").innerText = "Add Scene"
  })

// Attach a click event listener to the "Add Scene" button
addBtn.addEventListener('click', function (e) {
  // Prevent the default behavior of the form
  e.preventDefault();
  // Get the input fields from html
  let locationTxt = document.getElementById("addlocationTxt");
  let charactersTxt = document.getElementById("addcharactersTxt");
  let purposeTxt = document.getElementById("addpurposeTxt");
  let summaryTxt = document.getElementById("addsummaryTxt");
  let addTxt = document.getElementById("addTxt");
  // Get the scenes from local storage
  let scenes = localStorage.getItem("scenes");
  // Get the key inputs from scenes from local storage
  let locationkey = document.querySelector("input[name='locationkey']");
  let characterskey = document.querySelector("input[name='characterskey']");
  let purposekey = document.querySelector("input[name='purposekey']");
  let summarykey = document.querySelector("input[name='summarykey']");
  let key = document.querySelector("input[name='key']");
  // If the input fields are empty, return false
  if (locationTxt.value == "" || charactersTxt.value == "" || purposeTxt.value == "" || summaryTxt.value == "" || addTxt.value == "")
  return false
  
  // Create an object to store the scene data
  let scene = {
  location: locationTxt.value,
  characters: charactersTxt.value,
  purpose: purposeTxt.value,
  summary: summaryTxt.value,
  scene: addTxt.value,
  };
  
  // Check if the scenes variable is null
  if (scenes == null) {
  // If it's null, create an empty array and set it to the local storage
  scenes = [];
  localStorage.setItem("scenes", JSON.stringify(scenes));
  } else {
  // If it's not null, parse it from a string to an array
  scenes = JSON.parse(scenes);
  }
  
  // Check if the "Add Scene" button text is "Update Scene"
  if (addBtn.innerText == "Update Scene") {
  // If it's "Update Scene", loop through the scenes array and update the selected scene
  for (let i = 0; i < scenes.length; i++) {
  if (locationkey.value == scenes[i].location && characterskey.value == scenes[i].characters && purposekey.value == scenes[i].purpose && summarykey.value == scenes[i].summary && key.value == scenes[i].scene) {
  scenes[i].location = scene.location;
  scenes[i].characters = scene.characters;
  scenes[i].purpose = scene.purpose;
  scenes[i].summary = scene.summary;
  scenes[i].scene = scene.scene;
  }
  }
  // Change the text of the "Add Scene" button back to "Add Scene"
  addBtn.innerText = "Add Scene";
  } else {
  // If it's "Add Scene", add the new scene to the scenes array
  scenes.push(scene);
  }
  
  // Set the updated scenes array back to local storage
  localStorage.setItem("scenes", JSON.stringify(scenes));
  
  // Clear the input fields
  locationTxt.value = "";
  charactersTxt.value = "";
  purposeTxt.value = "";
  summaryTxt.value = "";
  addTxt.value = "";
  locationkey.value = "";
  characterskey.value = "";
  purposekey.value = "";
  summarykey.value = "";
  key.value = "";
  
  // Call the showScenes function to display the updated scenes
  showScenes();
  });


//////////////////////////////////// FUNCTION TO SHOW SCENES ////////////////////////////////////////

function showScenes() {
  // retrieve the scenes from local storage
  let scenes = localStorage.getItem("scenes");
  
  // check if scenes is null (no scenes stored yet)
  if (scenes == null) {
    // set scenesObj to an empty array
    scenesObj = [];
  } else {
    // parse the scenes from string to an array of objects
    scenesObj = JSON.parse(scenes);
  }

  // initialize an empty string to store the HTML code
  let html = "";

  // loop through the scenes array and generate the HTML code for each scene
  scenesObj.forEach(function (element, index) {
    html += `<div class="card sceneCard m-2 shadow-sm rounded" >
              <div class="card-body">
                <h5 class="card-title">Scene ${index + 1} </h5>
                <h6 class="card-subtitle mb-2 text-muted">Scene Location: ${element.location}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Characters in Scene: ${element.characters}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Scene Purpose: ${element.purpose}</h6>
                <p class="card-text">Scene Summary: ${element.summary}</p>
                <div class="text-center">
                  <button data-id='${index}' onClick="editScene(this.getAttribute('data-id'))" class="btn btn-primary  btn-sm rounded">Edit</button>
                  <button id='${index}' onClick="deleteScene(this.id)" class="btn btn-sm rounded btn-danger">Delete</button>
                </div>
               </div>
             </div>`
  });

  // get the element where the scenes will be displayed
  let sceneElm = document.getElementById("scenes");

  // check if there are any scenes to display
  if (scenesObj.length!=null) {
    // set the inner HTML of the scenes element to the generated HTML code
    sceneElm.innerHTML = html;
  }else{
    // set the inner HTML of the scenes element to a message indicating no scenes available
    sceneElm.innerHTML = 'No Scenes are there, Please add Scene....'; 
  }
}


////////////////////////////////////// FUNCIONT TO DELETE SCENES ////////////////////////////////////////

// This function deletes a scene from local storage by removing it from the array
// of scenes and updating the local storage with the new array.
// The index of the scene to be deleted is passed as a parameter.
function deleteScene(index) {
  // Confirm with the user if they really want to delete the scene.
  // If the user clicks "Cancel", the function returns without deleting the scene.
  if(confirm("Are you sure to delete this scene? This action cannot be undone.") === false)
  return false;
  
  // Get the scenes from local storage and parse it into an array.
  let scenes = localStorage.getItem("scenes");
  if (scenes == null) {
    scenesObj = [];
  } else {
    scenesObj = JSON.parse(scenes);
  }
  
  // Remove the scene at the specified index from the array.
  scenesObj.splice(index,1);
  
  // Save the updated array back to local storage.
  localStorage.setItem("scenes", JSON.stringify(scenesObj));
  
  // Call the showScenes function to display the updated list of scenes.
  showScenes();
}


/////////////////////// THIS FUNCTION EDITS SCENES /////////////////////////////
// The index of the scene to be edited is passed as a parameter.
function editScene(index) {
  // Get the scenes data from local storage
  let scenes = localStorage.getItem("scenes");
  if (scenes === null) {
  scenes = [];
  } else {
  scenes = JSON.parse(scenes);
  }
  
  // Get the input fields
  let locationTxt = document.getElementById("addlocationTxt");
  let charactersTxt = document.getElementById("addcharactersTxt");
  let purposeTxt = document.getElementById("addpurposeTxt");
  let summaryTxt = document.getElementById("addsummaryTxt");
  let addTxt = document.getElementById("addTxt");
  // Get the key inputs
  let locationkey = document.querySelector("input[name='locationkey']");
  let characterskey = document.querySelector("input[name='characterskey']");
  let purposekey = document.querySelector("input[name='purposekey']");
  let summarykey = document.querySelector("input[name='summarykey']");
  let key = document.querySelector("input[name='key']");
  
  // Get the selected scene data
  let location = scenes[index].location;
  let characters = scenes[index].characters;
  let purpose = scenes[index].purpose;
  let summary = scenes[index].summary;
  let scene = scenes[index].scene;
  
  // Fill the input fields with the selected scene data
  locationTxt.value = location;
  charactersTxt.value = characters;
  purposeTxt.value = purpose;
  summaryTxt.value = summary;
  addTxt.value = scene;
  // Fill the key inputs with the selected scene data
  locationkey.value = location;
  characterskey.value = characters;
  purposekey.value = purpose;
  summarykey.value = summary;
  key.value = scene;
  
  // Change the text of the "Add Scene" button to "Update Scene"
  addBtn.innerText = "Update Scene";
  }


//////////////////////////// FUNCTION TO FILTER SCENES BASED ON SEARCH INPUT VALUE ///////////////////////////

let search = document.getElementById("searchTxt");
search.addEventListener('input', function() {
    // store the input value as lowercase to compare with thescenes text
    let inputVal = search.value.toLowerCase();
    // get all scene cards
    let sceneCard = document.getElementsByClassName('sceneCard');
    // convert HTML collection of scene cards to an array
    Array.from(sceneCard).forEach(function(element) {
      // get the text content of the card and convert it to lowercase
      let cardTxt = (element.getElementsByTagName("p")[0].innerText).toLowerCase();
      // if the card text includes the input value, display the card, otherwise hide it
      if (cardTxt.includes(inputVal) === true) {
        element.style.display ='block';
      } else {
        element.style.display ='none';
      }
    }); 
});