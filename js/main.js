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

// Escape closes an open dialog or menu; focus returns to the opener automatically for dialogs.
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (cardDialog.open) {
    cardDialog.close();
  } else if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

const cardDialog = document.querySelector(".card-dialog");
const cardDialogTitle = document.querySelector("#card-dialog-title");
const cardDialogContent = document.querySelector(".card-dialog-content");
const cardDialogClose = document.querySelector(".card-dialog-close");

document.querySelectorAll(".card-open-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("article");
    const title = card.querySelector("h3");
    const details = card.querySelector(".card-details");

    cardDialogTitle.textContent = title.textContent;
    cardDialogContent.replaceChildren(
      ...Array.from(details.childNodes, (node) => node.cloneNode(true))
    );
    cardDialog.showModal();
  });
});

cardDialogClose.addEventListener("click", () => {
  cardDialog.close();
});

cardDialog.addEventListener("click", (event) => {
  if (event.target === cardDialog) {
    cardDialog.close();
  }
});
