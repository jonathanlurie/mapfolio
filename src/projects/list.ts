import { getProjectIdFromUrlParam } from "../common/ui";
import { init as initBasemapkitAvenueSimple } from "./basemapkit-avenue-simple";
import { init as initBasemapkitAvenueVintage } from "./basemapkit-avenue-vintage";


export type ProjectDescription = {
  name: string,
  projectId: string,
  description: string,
  linkUrl: string,
  projectInitFunction: () => Promise<void>,
}

export const projectList: ProjectDescription[] = [
  {
    name: "Basemapkit: Avenue (simple)",
    projectId: "basemapkit-avenue-simple",
    description: "Making use of the Avenue style as defined in Basemapkit",
    linkUrl: "https://github.com/jonathanlurie/basemapkit",
    projectInitFunction: initBasemapkitAvenueSimple,
  },

  {
    name: "Basemapkit: Avenue (vintage)",
    projectId: "basemapkit-avenue-vintage",
    description: "Making use of the Avenue Vintage style as defined in Basemapkit",
    linkUrl: "https://github.com/jonathanlurie/basemapkit",
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