import { Card } from "../components/card";
import { projectList } from "../projects/list";
import { MAIN_DIV_ID, PROJECT_URL_PARAM } from "./env";

/**
 * Get the main (full viewport) DIV element
 */
export function getMainDiv(): HTMLDivElement {
  return document.getElementById(MAIN_DIV_ID) as HTMLDivElement;
}


/**
 * Returns the project ID as per the URL param
 */
export function getProjectIdFromUrlParam(): string | null {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  return searchParams.get(PROJECT_URL_PARAM);
}

export function fillUpMenu() {
  const menuDiv = document.getElementById("menu") as HTMLDivElement;

  for (const project of projectList) {
    const projectCard = new Card({
      title: project.name,
      imageUrl: `/thumbnails/${project.projectId}.jpg`,
      description: project.shortDescription,
      link: `/?project=${project.projectId}`,
      linkText: project.linkText,
    });

    menuDiv.appendChild(projectCard);
  }

}

export function showMenu() {
  document.getElementById("menu-container")?.style.setProperty("display", "inherit");
}

export function hideMenu() {
  document.getElementById("menu-container")?.style.setProperty("display", "none");
}

export function toggleMenu() {
  const menuContainer = document.getElementById("menu-container") as HTMLDivElement;
  menuContainer.style.getPropertyValue("display") === "none" ? showMenu() : hideMenu();
}