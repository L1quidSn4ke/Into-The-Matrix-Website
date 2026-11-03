// Turn on the collapsible menu only after this script is ready.
document.documentElement.classList.add("js-enabled");

const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#main-navigation");
const sectionDialog = document.querySelector(".section-dialog");
const sectionDialogContent = document.querySelector(".section-dialog-content");
const sectionDialogClose = document.querySelector(".section-dialog-close");
const cardDialog = document.querySelector(".card-dialog");
const cardDialogTitle = document.querySelector("#card-dialog-title");
const cardDialogContent = document.querySelector(".card-dialog-content");
const cardDialogClose = document.querySelector(".card-dialog-close");
const sections = sectionDialog
  ? Array.from(document.querySelectorAll("#main-content > section:not(#home)"))
  : [];
const sectionPositions = new Map(
  sections.map((section) => [
    section,
    { parent: section.parentElement, nextSibling: section.nextElementSibling },
  ])
);
let activeSection = null;
let sectionDialogOpener = null;

// Keep the menu button and navigation state in sync for assistive technology.
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  siteNavigation.classList.remove("is-open");
}

function restoreActiveSection() {
  if (!activeSection) {
    return;
  }

  activeSection.hidden = true;
  const position = sectionPositions.get(activeSection);
  position.parent.insertBefore(activeSection, position.nextSibling);
  activeSection = null;
}

function openSection(section, opener) {
  if (activeSection) {
    restoreActiveSection();
  }

  section.hidden = false;
  sectionDialogContent.replaceChildren(section);
  sectionDialog.setAttribute("aria-label", section.querySelector("h2").textContent);
  activeSection = section;
  sectionDialogOpener = opener;

  if (!sectionDialog.open) {
    sectionDialog.showModal();
  }

  sectionDialogClose.focus();
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

  if (cardDialog && cardDialog.open) {
    cardDialog.close();
  } else if (sectionDialog && sectionDialog.open) {
    sectionDialog.close();
  } else if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) {
    return;
  }

  const section = document.getElementById(link.hash.slice(1));
  if (!sections.includes(section)) {
    return;
  }

  event.preventDefault();
  closeMenu();
  openSection(section, link);
});

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

if (cardDialog && cardDialogClose) {
  cardDialogClose.addEventListener("click", () => {
    cardDialog.close();
  });

  cardDialog.addEventListener("click", (event) => {
    if (event.target === cardDialog) {
      cardDialog.close();
    }
  });
}

if (sectionDialog && sectionDialogClose) {
  sectionDialogClose.addEventListener("click", () => {
    sectionDialog.close();
  });

  sectionDialog.addEventListener("click", (event) => {
    if (event.target === sectionDialog) {
      sectionDialog.close();
    }
  });

  sectionDialog.addEventListener("close", () => {
    const opener = sectionDialogOpener;
    restoreActiveSection();
    sectionDialogOpener = null;

    if (opener && opener.getClientRects().length > 0) {
      opener.focus();
    } else if (menuButton.getClientRects().length > 0) {
      menuButton.focus();
    } else {
      siteNavigation.querySelector("a").focus();
    }
  });
}

sections.forEach((section) => {
  section.hidden = true;
});

if (sectionDialog) {
  document.documentElement.classList.add("section-cards-enabled");

  const initialSection = document.getElementById(location.hash.slice(1));
  if (sections.includes(initialSection)) {
    openSection(initialSection, null);
  }
}
