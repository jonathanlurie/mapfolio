import { getProjectIdFromUrlParam } from "../common/ui";
import { init as initBasemapkitAvenueSimple } from "./basemapkit-avenue-simple";
import { init as initBasemapkitAvenueVintage } from "./basemapkit-avenue-vintage";


export type ProjectDescription = {
  name: string,
  projectId: string,
  description: string,
  linkUrl: string,
  imageUrl: string,
  linkText: string,
  projectInitFunction: () => Promise<void>,
}

export const projectList: ProjectDescription[] = [
  {
    name: "Basemapkit: Avenue",
    projectId: "basemapkit-avenue-simple",
    description: "Making use of the Avenue style as defined in Basemapkit",
    linkUrl: "/?project=basemapkit-avenue-simple",
    imageUrl: "/thumbnails/basic.jpg",
    linkText: "Explore",
    projectInitFunction: initBasemapkitAvenueSimple,
  },

  {
    name: "Basemapkit: Avenue Vintage",
    projectId: "basemapkit-avenue-vintage",
    description: "Using Basemapkit to give a vintage vibe to a map",
    linkUrl: "/?project=basemapkit-avenue-vintage",
    imageUrl: "/thumbnails/vintage.jpg",
    linkText: "Explore",
    projectInitFunction: initBasemapkitAvenueVintage,
  }
] as const;

/**
 * Returns the project informations based on the URL param for project
 */
export function getProjectFromUrlParam(): null | ProjectDescription {
  const projectId = getProjectIdFromUrlParam();
  if (projectId === null) return null;
  const candidates = projectList.filter(p => p.projectId === projectId);
  return candidates.length ? candidates[0] : null;
}

export function getDefaultProject(): ProjectDescription {
 return Object.values(projectList)[0];
}