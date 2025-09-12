import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import { getDefaultProject, getProjectFromUrlParam } from "./projects/list";
import "./components/register";
import { fillUpMenu, showMenu, toggleMenu } from "./common/ui";


(async () => {

  fillUpMenu();

  document.getElementById("menu-bt")?.addEventListener("pointerup", () => {
    toggleMenu();
  })

  // Loading the project from URL param
  const projectInfo = getProjectFromUrlParam();
  if (projectInfo) {
    (document.getElementById("project-info") as HTMLDivElement).style.setProperty("display", "inherit");
    (document.getElementById("project-title") as HTMLDivElement).innerText = projectInfo.name;
    (document.getElementById("project-description") as HTMLDivElement).innerHTML = projectInfo.description;
    return projectInfo.projectInitFunction();
  }

  // fallback to default project to use a background to the menu
  getDefaultProject().projectInitFunction();
  showMenu();
})()
