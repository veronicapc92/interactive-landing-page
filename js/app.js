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
const sectionsArray = Array.from(sections);
const fragment = document.createDocumentFragment();

/*** Helper Functions ***/
function handleClickOnLink(e) {
  const section = document.getElementById(`section${e.target.id}`);
  smoothScrolling(e, section);
}

function handleScrolling() {
  sectionsArray.forEach((section) => {
    switchActiveClass(section);
  });
}

/*** Main Functions ***/

// Building the nav
function createAnchorElement(text, id) {
  const anchorElement = document.createElement("a");
  anchorElement.textContent = text;
  anchorElement.setAttribute("href", `#section${id}`);
  anchorElement.setAttribute("id", `${id}`);
  anchorElement.addEventListener("click", (e) => handleClickOnLink(e));
  return anchorElement;
}

function createLiElement(id) {
  const liElement = document.createElement("li");
  liElement.setAttribute("id", `li${id}`);
  return liElement;
}

// Adding class 'active' to section when near top of viewport

function switchActiveClass(section) {
  const height = section.offsetHeight;
  const breakpoint = 0.3 * height;
  const distanceToTop = section.getBoundingClientRect().y;
  const bottom = section.getBoundingClientRect().bottom;
  const index = sectionsArray.indexOf(section);
  const liElement = document.getElementById(`li${index + 1}`);

  if (distanceToTop <= breakpoint && bottom >= breakpoint) {
    section.classList.add("your-active-class");
    liElement.classList.add("your-active-class");
  } else {
    section.classList.remove("your-active-class");
    liElement.classList.remove("your-active-class");
  }
}

// Scroll to anchor ID using scrollTO event
function smoothScrolling(e, section) {
  e.preventDefault();
  section.scrollIntoView({ behavior: "smooth" });
}

/*** Begin Events */

// Build menu
sectionsArray.forEach((section) => {
  const headingText = section.firstElementChild.firstElementChild.textContent;
  const id = sectionsArray.indexOf(section) + 1;
  const anchorElement = createAnchorElement(headingText, id);
  const liElement = createLiElement(id);

  liElement.appendChild(anchorElement);
  fragment.appendChild(liElement);
});

navbarList.appendChild(fragment);

// Scroll to section on link click

// Set sections as active
document.addEventListener("scroll", handleScrolling);
