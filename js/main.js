// Turn on the collapsible menu only after this script is ready.
document.documentElement.classList.add("js-enabled");

const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#main-navigation");

// Keep the menu button and navigation state in sync for assistive technology.
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  siteNavigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  siteNavigation.classList.toggle("is-open", !isExpanded);
});

// Close the mobile menu after choosing a section link.
siteNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

// Escape closes the menu and returns keyboard focus to its button.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
