/* Posts Page JavaScript */

"use strict";

// All variablies
const loginData = getLoginData();
const allPostsEndpoint = "https://microbloglite.herokuapp.com/api/posts";
const allUsersEndpoint = "https://microbloglite.herokuapp.com/api/users";
const randomPhotoEndpoint = "https://i.pravatar.cc/300";
const pElement = document.getElementById("postText");
const viewAllBtn = document.getElementById("viewAll");
const contactsDiv = document.querySelector(".contact-profile");
const smallTagOutput = document.getElementById("usernameB");
const seeAllContactsBtn = document.getElementById("allContacts");
const userFullNameH4 = document.getElementById("h4");
let logoutBtn = document.getElementById("logoutBtn");

//Calling function before the rest of the JavaScript is executed
getUsersPosts();

getContacts();

//Logout Event Listener
logoutBtn.addEventListener("click", logout)


//View All posts button Event Listener, to see all posts
viewAllBtn.addEventListener("click", getAllUsersPosts)

//View ALL contacts button Event Listener, to see all contacts
seeAllContactsBtn.addEventListener("click", getAllContacts)

//Function to GET all of the users posts
function getAllUsersPosts() {
  const loginData = getLoginData();
  console.log(loginData.token);
  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(allPostsEndpoint + `/?offset=10`, options)
    .then((response) => response.json())
    .then((data) => toHTML(data));
}

//Function to display the first 10 users posts
function getUsersPosts() {
    const loginData = getLoginData();
    let options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    fetch(allPostsEndpoint + `/?limit=10&offset=0`, options)
    .then((response) => response.json())
    .then((data) => toHTML(data));
}


function randomPicGenerated() {
    fetch(randomPhotoEndpoint)
    .then((response) => response.json())
    .then((data) => toHTML(data));
};


//Function to DISPLAY all of the users posts
function toHTML(data) {
    //display the amount of posts
    // function displayPostAmount() {
    //     viewAllBtn.innerHTML = data.length;
    //    }
    //    displayPostAmount();
    data.forEach((element) => {
        console.log(data.length)
      pElement.innerHTML += `<div class="feeds">
      <!-- ----------------FEEDS-1--------------------- -->
      <div class="feed">
          <div class="head">
              <div class="user">
                  <div class="profile-photo">
                      <img src="${randomPhotoEndpoint}?timestamp=${Date.now()}" alt="">
                  </div>


                  <div class="ingo">
                      <h3>${element.username}</h3>
                      <small>6 Hours Ago</small>
                  </div>
              </div>
              <span class="edit">
                  <i class="uil uil-ellipsis-h"></i>
              </span>
          </div>
          <div class="photo">
          <img src="${randomPhotoEndpoint}?timestamp=${Date.now()}" />
          </div>
          <div class="action-button">
              <div class="interaction-buttons">
                  <span><i class=" uil uil-heart"></i></span>
                  <span><i class="uil uil-comment-alt-dots"></i></span>
                  <span><i class="uil uil-share"></i></span>
              </div> 
              <div class="bookmark">
                  <span><i class="uil uil-bookmark"></i></span>
              </div>
          </div>
          <div class="liked-by">
              <span><img src="postsAssets/girl2.png"></span>
              <span><img src="postsAssets/girl4.png"></span>
              <span><img src="postsAssets/girl1.png"></span>
              <p>Liked by <b>Megan Wright, Leroya Mauguez...</b>and <b>2473 others</b></p>
          </div>
          <div class="caption">
              <p id="postText">${element.text}</p>
          </div>
      </div>
  </div>
  
  `;
    });
  }



//Display username function
function displayUsername() {
    document.querySelector('.text-muted').innerHTML = loginData.username;
   }
   displayUsername();
   
      

   //Function to GET all of the users posts
   function getContacts() {
    
       const loginData = getLoginData();
       console.log(loginData.token);
       let options = {
         method: "GET",
         headers: {
           Authorization: `Bearer ${loginData.token}`,
         },
       };
       fetch(allUsersEndpoint + `/?limit=5&offset=0`, options)
         .then((response) => response.json())
         .then((data) => displayContacts(data))
         
     }
   
     //Display ALL contacts once (seeAllContactsBtn) button is clicked
     function getAllContacts() {
        const loginData = getLoginData();
        console.log(loginData.token);
        let options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        };
        fetch(allUsersEndpoint + `/?limit=15&offset=5`, options)
          .then((response) => response.json())
          .then((data) => displayContacts(data));
      }
    
      

       function displayContacts(data) {
           data.forEach((element) => {
            smallTagOutput.innerHTML += `
        <div class="contacts">
        <div class="contact-profile">
         <div class="profile-photo">
             <img src="${randomPhotoEndpoint}?timestamp=${Math.random()}">
         </div>
         <div class="notification-body">
             <small>${element.fullName}</small>
             <b>${element.username}</b>
         </div>
        </div>
        </div>
         `
           });
         }
     






function getFullname() {
    const loginData = getLoginData();
    console.log(loginData.token);
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };
    fetch(allUsersEndpoint + `/${data.username}`, options)
      .then((response) => response.json())
      .then((data) => displayContacts(data))
      
  }


//THEME
const theme = document.querySelector('#theme');
const themeModel = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');




//THEME COUSTOMIZATION

//opens model
const openThemeModel =()=>{
    themeModel.style.display='grid';
}
//close model
const closeThemeModel=(element) => {
    if (element.target.classList.contains('customize-theme')) {
        themeModel.style.display='none';        
    }
}

//close model
themeModel.addEventListener('click',closeThemeModel);

theme.addEventListener('click',openThemeModel);



//FONT SIZE
//REMOVE active class font
const removeSizeSelector= () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => { 
    size.addEventListener('click',() => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size1')){
            fontSize='10px';
            root.style.setProperty('----sticky-top-left','5.4rem');
            root.style.setProperty('----sticky-top-right','5.4rem');
        }
        else if (size.classList.contains('font-size2')){
            fontSize='13px';
            root.style.setProperty('----sticky-top-left','5.4rem');
            root.style.setProperty('----sticky-top-right','-7rem');
        }
        else if (size.classList.contains('font-size3')){
            fontSize='15px';
            root.style.setProperty('----sticky-top-left','-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        }
        else if (size.classList.contains('font-size4')){
            fontSize='17px';
            root.style.setProperty('----sticky-top-left','-5rem');
            root.style.setProperty('----sticky-top-right','-25rem');
        }
        else if (size.classList.contains('font-size5')){
            fontSize='18px';
            root.style.setProperty('----sticky-top-left','-12rem');
            root.style.setProperty('----sticky-top-right','-35rem');
        }
        //change font size of the root html
    document.querySelector('html').style.fontSize = fontSize;
    })
})

//Remove active color class
const changeActiveColorClass=()=>{
    colorPalette.forEach(colorPicker=>{
        colorPicker.classList.remove('active');
    })
}

//color
colorPalette.forEach(color =>{
    color.addEventListener('click',()=>{
        let primaryHue;
        //remove action class from color
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue =0;
        }
        else if(color.classList.contains('color-2')){
            primaryHue=314;
        }
        else if(color.classList.contains('color-3')){
            primaryHue=300;
        }
        else if(color.classList.contains('color-4')){
            primaryHue=166;
        }
        else if(color.classList.contains('color-5')){
            primaryHue=42;
        }
        color.classList.add('active');
        root.style.setProperty('--primary-color-hue',primaryHue);
    })
})

//Theme BACKGROUND value
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//changes background color
const changeBG =() =>{
    root.style.setProperty('--light-color-lightness',lightColorLightness);
    root.style.setProperty('--white-color-lightness',whiteColorLightness);
    root.style.setProperty('--dark-color-lightness',darkColorLightness);
}

Bg1.addEventListener('click',() => {
    darkColorLightness='95%'
    whiteColorLightness='20%'
    lightColorLightness='15%'
    
    //add active class
    Bg1.classList.add('active');
    //remove active from class
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    window.location.reload();
});

Bg2.addEventListener('click',()=>{
    darkColorLightness='95%'
    whiteColorLightness='20%'
    lightColorLightness='15%'

    //add active class
    Bg2.classList.add('active');
    //remove active from class
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click',()=>{
    darkColorLightness='95%'
    whiteColorLightness='10%'
    lightColorLightness='0%'

    //add active class
    Bg3.classList.add('active');
    //remove active from class
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();


})






// function getUsersPosts() {
//   const loginData = getLoginData();
//   let options = {
//       method: "GET",
//       headers: {
//           Authorization: `Bearer ${loginData.token}`,
//       },
//   };
//   fetch(allPostsEndpoint + `/?limit=20&offset=3&username=${userName}`, options)
//       .then(response => response.json())
//       .then(posts => { console.log(posts) })
// }

// pElement.innerHTML = data

// function toHTML(data) {
//   data.forEach((e) => {
//     pElement.innerHTML += `<article>
//  <p>${e.username}</p>
//  <p>${e.text}</p>
//  </article>
// `;
//   });
// }

// for loop

//   fetch(allPostsEndpoint + `/api/posts/?limit=20&offset=0&username=${userName}`, options)
//         .then(response => response.json())
//         .then(data => { let message = `<li> User: ${data.username} </li> <li> Post: ${data.text} </li>`;
//             pElement.innerHTML = message; })