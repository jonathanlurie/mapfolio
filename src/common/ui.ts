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