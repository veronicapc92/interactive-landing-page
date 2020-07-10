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

/*** Global Variables ***/
const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("[data-nav]");
const fragment = document.createDocumentFragment();

/*** Callback Functions ***/

// Handles click events on the anchor elements and responds
// by scrolling to anchor ID
function handleClickOnLink(e) {
  const section = document.getElementById(`${e.target.hash.replace("#", "")}`);
  smoothScrolling(e, section);
}

// Handles scroll events on the document and responds by looping through all the sections and:
// - adding the "active" class to a section when the section is near the top of the viewport
// - removing the class as the section leaves the viewport
function handleScrolling() {
  sections.forEach((section) => {
    switchActiveClass(section);
  });
}

/*** Main Functions ***/

// Building the nav

// Creates the anchor element and attaches an event listner to it
function createAnchorElement(section) {
  const textFromHeading =
    section.firstElementChild.firstElementChild.textContent;
  const anchorElement = document.createElement("a");
  anchorElement.textContent = textFromHeading;
  anchorElement.setAttribute("href", `#${section.id}`);
  anchorElement.addEventListener("click", (e) => handleClickOnLink(e));
  return anchorElement;
}

// Creates the li element
function createLiElement(section) {
  const liElement = document.createElement("li");
  liElement.setAttribute("id", `li-${section.id}`);
  return liElement;
}

// Adding class "active" to section when near top of viewport

function switchActiveClass(section) {
  // Explanation of the first 4 variables defined below:
  // 1. Height of the element
  // 2. Point at which the "active" class will be added to the section.
  // 3. Distance from the top of the element to the top of the viewport
  // 4. Distance from the bottom of the element to the top of the viewport
  const height = section.offsetHeight;
  const breakpoint = 0.3 * height;
  const distanceToTop = section.getBoundingClientRect().y;
  const bottom = section.getBoundingClientRect().bottom;

  const liElement = document.getElementById(`li-${section.id}`);

  if (distanceToTop <= breakpoint && bottom >= breakpoint) {
    section.classList.add("your-active-class");
    liElement.classList.add("your-active-class");
  } else {
    section.classList.remove("your-active-class");
    liElement.classList.remove("your-active-class");
  }
}

// Scroll to anchor ID
function smoothScrolling(e, section) {
  e.preventDefault();
  section.scrollIntoView({ behavior: "smooth" });
}

/*** End of main functions ***/

// Build menu
sections.forEach((section) => {
  const anchorElement = createAnchorElement(section);
  const liElement = createLiElement(section);

  liElement.appendChild(anchorElement);
  fragment.appendChild(liElement);
});

navbarList.appendChild(fragment);

// Set sections as active
document.addEventListener("scroll", handleScrolling);
