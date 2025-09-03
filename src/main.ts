import "maplibre-gl/dist/maplibre-gl.css";
import "./style.css";
import { getProjectFromUrlParam } from "./projects/list";
import "./components/register";


(async () => {
  const projectInfo = getProjectFromUrlParam();

  if (projectInfo) {
    return projectInfo.projectInitFunction();
  }
  
})()
