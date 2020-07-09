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

/**
 * Define Global Variables
 *
 */

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

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

const navbarList = document.getElementById("navbar__list");
const sectionContainers = document.getElementsByClassName("landing__container");
const containersArray = Array.from(sectionContainers);

const fragment = document.createDocumentFragment();

containersArray.forEach((container) => {
  // Getting the text from the headings to use it as the text
  // within the anchor element
  const headingText = container.firstElementChild.textContent;
  // Creating an id number dinamically
  const id = containersArray.indexOf(container) + 1;

  const anchorElement = createAnchorElement(id, headingText);
  const listElement = createLiElement(id);

  listElement.appendChild(anchorElement);
  fragment.appendChild(listElement);
});

navbarList.appendChild(fragment);

function smoothScrolling(e) {
  e.preventDefault();
  const section = document.getElementById(`section${e.target.id}`);
  section.scrollIntoView({ behavior: "smooth" });
}

function createAnchorElement(id, text) {
  const anchorElement = document.createElement("a");
  anchorElement.textContent = text;
  anchorElement.setAttribute("href", `#section${id}`);
  anchorElement.setAttribute("id", `${id}`);
  anchorElement.addEventListener("click", (e) => smoothScrolling(e));
  return anchorElement;
}

function createLiElement(id) {
  const listElement = document.createElement("li");
  //   listElement.setAttribute("id", `li${id}`);
  return listElement;
}
