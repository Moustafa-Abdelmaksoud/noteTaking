// set cookies function
function setCookie(name,value,dayToLive) {
    const date = new Date();

    date.setTime(date.getTime() + dayToLive * 24 * 60 * 60 *1000)

    const expires = "expires=" + date.toUTCString();

    document.cookie = `${name}=${value};${expires};path=/`;
}

// get cookies function
function getCookie(name) {
    const decodeCookies = decodeURIComponent(document.cookie)

    const cookiesArray = decodeCookies.split("; ");

    let result = null;

    cookiesArray.forEach((cookie) => {
        if (cookie.indexOf(name) === 0) {
            
            result = cookie.substring(name.length + 1);
        
        }
    });

    return result;
}

// delete cookies function
function deleteCookie(name) {
    setCookie(name,null,null);
}

// login function
function login() {
    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        setCookie("loggedInUser",username,3)
        document.getElementById("loggedIn").style.display = "block";

        document.getElementById("user").textContent = username;

        document.getElementsById("login").style.display = "none";

    }else{
        alert("please enter a valid username or password")
    }
}

// logout function
function logout() {
    deleteCookie("loggedInUser");

    document.getElementById("login").style.display = "flex";

    document.getElementById("loggedIn").style.display = "none";
    
}

// CHECK IF USER ALREADY LOGGED IN OR NOT
window.onload = function () {
    const loggedInAdmin = getCookie("loggedInUser");
  
    if (loggedInAdmin) {
      document.getElementById("loggedIn").style.display = "block";

      document.getElementById("user").textContent = loggedInAdmin;
  
      document.getElementById("login").style.display = "none";
    }
  };

// APPLICATION //
let notesContainer = document.querySelector(".notes-container");
let createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function ShowNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");  
}
ShowNotes();


function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
    
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src="images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click",(e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box")
        notes.forEach((ns) => {
            ns.onkeyup = function() {
                updateStorage();
            }
            
        });
        
    }
})

document.addEventListener("keydown",(event) => {
    if (event.key === 'Enter') {
        document.execCommand("insertLineBreak");
        event.preventDefault();
        
    }
})



