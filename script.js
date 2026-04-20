function downloadPDF() {
  window.open("Harinarayan.pdf", "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.getElementById("contactBtn");
  const downloadButtons = document.querySelectorAll(".download-btn");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
  const contentSections = document.querySelectorAll(".content-section");

  if (contactButton) {
    contactButton.addEventListener("click", () => {
      window.location.href = "mailto:your.email@example.com";
    });
  }


  const showSection = (sectionId) => {
    const hasTarget = Array.from(contentSections).some(
      (section) => section.id === sectionId
    );
    const safeId = hasTarget ? sectionId : contentSections[0]?.id;

    contentSections.forEach((section) => {
      const isActive = section.id === safeId;
      section.classList.toggle("active-section", isActive);
      section.classList.remove("fade-enter");
      if (isActive) {
        // Trigger transition each time section changes.
        window.requestAnimationFrame(() => {
          section.classList.add("fade-enter");
        });
      }
    });

    sidebarLinks.forEach((link) => {
      const hrefId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", hrefId === safeId);
    });
  };

  if (sidebarLinks.length > 0 && contentSections.length > 0) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").replace("#", "");
        if (window.location.hash !== `#${targetId}`) {
          window.history.replaceState(null, "", `#${targetId}`);
        }
        showSection(targetId);
      });
    });

    const initialSection =
      window.location.hash.replace("#", "") || contentSections[0].id;
    showSection(initialSection);
  }
});
