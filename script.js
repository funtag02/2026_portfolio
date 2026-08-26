const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

const projectTabs = document.querySelectorAll(".project-tab");
const projectPanels = document.querySelectorAll("[data-panel]");

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedProject = tab.dataset.project;

    projectTabs.forEach((candidate) => {
      const isSelected = candidate === tab;
      candidate.classList.toggle("is-active", isSelected);
      candidate.setAttribute("aria-selected", String(isSelected));
    });

    projectPanels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== selectedProject;
    });
  });
});

const experienceDetails = {
  amadeus: {
    date: "September 2024 — September 2026",
    title: "Apprenticeship · C++ Software Development",
    organization: "Amadeus · Sophia Antipolis, France (06)",
    details: [
      "Maintenance of large-scale microservices backends within the Hotel Distribution department.",
      "Built a Python log visualization tool to accelerate code flow analysis across a large codebase.",
      "Contributed to a Kafka BI monitoring migration from a legacy component to a new one.",
    ],
  },
  "infotel-apprenticeship": {
    date: "August 2023 — August 2024",
    title: "Apprenticeship · Fullstack Development",
    organization: "Infotel Conseil · Sophia Antipolis, France (06)",
    details: [
      "Advanced the development of a recruitment management web application.",
      "Implemented integration and regression testing.",
      "Improved API response times.",
      "Redesigned the user interface based on Figma mockups.",
      "Integrated MSAL for OAuth2-based authentication.",
    ],
  },
  "infotel-internship": {
    date: "April 2023 — July 2023",
    title: "Internship · Fullstack Development",
    organization: "Infotel Conseil · Sophia Antipolis, France (06)",
    details: [
      "Developed a web application to streamline recruitment process management for the agency.",
      "Technologies: Spring 6 and Angular 17.",
      "Worked in an Agile Scrum team.",
    ],
  },
};

const experienceDialog = document.querySelector("#experience-dialog");
const dialogClose = experienceDialog?.querySelector(".dialog-close");
let activeExperienceTrigger = null;

function openExperienceDialog(trigger) {
  const experience = experienceDetails[trigger.dataset.experience];
  if (!experience || !experienceDialog) return;

  activeExperienceTrigger = trigger;
  experienceDialog.querySelector("#experience-dialog-date").textContent = experience.date;
  experienceDialog.querySelector("#experience-dialog-title").textContent = experience.title;
  experienceDialog.querySelector("#experience-dialog-org").textContent = experience.organization;
  experienceDialog.querySelector("#experience-dialog-details").replaceChildren(
    ...experience.details.map((detail) => {
      const item = document.createElement("li");
      item.textContent = detail;
      return item;
    }),
  );
  experienceDialog.showModal();
  dialogClose?.focus();
}

document.querySelectorAll(".experience-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => openExperienceDialog(trigger));
  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openExperienceDialog(trigger);
  });
});

dialogClose?.addEventListener("click", () => experienceDialog.close());
experienceDialog?.addEventListener("click", (event) => {
  if (event.target === experienceDialog) experienceDialog.close();
});
experienceDialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  experienceDialog.close();
});
experienceDialog?.addEventListener("close", () => activeExperienceTrigger?.focus());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && experienceDialog?.open) experienceDialog.close();
});

window.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
});