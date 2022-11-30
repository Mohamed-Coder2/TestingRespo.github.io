/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
// USE this scrollTO 
/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const list = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
//Responsiveness && active class problem due to the TO TOP BUTTON
function buildNAvigationbar()
{
  for(const section of sections)
  {
    const title = section.getAttribute("data-nav");
    const sectionID = section.getAttribute("id");
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.classList.add("menu__link");
    link.href = `#${sectionID}`;
    link.textContent = title;
    link.addEventListener("click", e => 
    {
      e.preventDefault();
      section.scrollIntoView({
        behavior:"smooth",
      })
    })
    listItem.appendChild(link);
    fragment.appendChild(listItem);
  }
  list.appendChild(fragment);
}
window.addEventListener("load", buildNAvigationbar())

/////////////////////

//Making the navbar hidden while scrolling down and appear again once we scroll up
//source: https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
let prevScrollPos = window.pageYOffset;

//hiding the navigation bar and showing the scroll to top button

window.onscroll = function(){ 
  hidingNavBar();
  scrollFunction();
}
function hidingNavBar()
{
  let currenScrollPos = window.pageYOffset;
  if(prevScrollPos > currenScrollPos){
    document.getElementById("navbar__list").style.top = "0";
  }
  else{
    document.getElementById("navbar__list").style.top = "-120px";
  }
  prevScrollPos = currenScrollPos;
}
///////////////////////////////////////////////////////////////////
// @author : https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
let mybutton = document.getElementById("myBtn");
function scrollFunction() {
  if (window.pageYOffset > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// for(let i = 0; i < 4; i++)
// {
//   for(let j = 0; j < 4; j++)
//   {
//     if(i == "active" && j == "active")
//     {
//       //remove all active class
//     }
//   }
// }
//////////////////////////////////////////////////////////////////

///////////////////////////////////
/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click

// Set sections as active
//The following block of code was provided by 
const observerOptions = 
{
  root: null,
  rootMargin: '0px',
  threshold: 0.65
}
const links = list.querySelectorAll('a.menu__link')
const observerCallback = (entries) =>{
  if(entries[0].isIntersecting)
  {
    entries[0].target.classList.add("your-active-class")
    links.forEach(link =>{
      if(link.textContent === entries[0].target.dataset.nav)
      {
        link.classList.add('active');
      }
      else 
      {
        link.classList.remove('active');
      }
    })
  }
  else
  {
    entries[0].target.classList.remove("your-active-class")
  }
}

const observer = new IntersectionObserver(observerCallback, observerOptions)
window.addEventListener("scroll", ()=>
  {
    for(const section of sections)
    {
      observer.observe(section)
    }
  })

