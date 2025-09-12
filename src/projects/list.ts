import { getProjectIdFromUrlParam } from "../common/ui";
import avenueSimpleProject from "./basemapkit-avenue-simple";
import avenueVintageProject from "./basemapkit-avenue-vintage";


export type ProjectDescription = {
  name: string,
  projectId: string,
  description: string,
  shortDescription: string,
  imageUrl: string,
  linkText: string,
  projectInitFunction: () => Promise<void>,
}

export const projectList: ProjectDescription[] = [
  avenueSimpleProject,
  avenueVintageProject
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