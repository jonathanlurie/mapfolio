import { getStyle } from "basemapkit";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import {
  GLYPHS_URL,
  ICONS_PHOSPHORE_DIECUT_URL,
  PMTILE_PLANET_URL,
  PMTILE_TERRAIN_MAPTERHORN_PLANET
} from "../../common/env";
import { getMainDiv } from "../../common/ui";
import type { ProjectDescription } from "../list";


export async function init() {
  const appDiv = getMainDiv();
  maplibregl.addProtocol("pmtiles", new Protocol().tile);

  const pmtiles = PMTILE_PLANET_URL;
  const sprite = ICONS_PHOSPHORE_DIECUT_URL;
  const glyphs = GLYPHS_URL;

  const style = getStyle("avenue-vintage", {
    pmtiles,
    sprite,
    glyphs,
    terrain: {
      pmtiles:  PMTILE_TERRAIN_MAPTERHORN_PLANET,
      encoding: "terrarium",
      hillshading: true,
    }
  })

  const map = new maplibregl.Map({
    attributionControl: false,
    container: appDiv,
    maxPitch: 89,
    hash: true,
    style,
    center: [0, 0],
    zoom: 3,
  });
}


const description = `
<p>
  Making use of the Avenue Vintage style as defined in Basemapkit. (<a href="https://github.com/jonathanlurie/mapfolio/blob/main/src/projects/basemapkit-avenue-vintage/index.ts">see source</a>)
</p>
<span class="attribution">
  <a href="https://maplibre.org/" target="_blank">MapLibre</a> |
  <a href="https://openstreetmap.org/copyright">© OpenStreetMap Contributors</a>
<span>
`

export default {
  name: "Basemapkit: Vintage",
  description,
  shortDescription: "Making use of the Avenue Vintage style as defined in Basemapkit.",
  projectId: "basemapkit-avenue-vintage",
  linkText: "Explore",
  projectInitFunction: init,
} as ProjectDescription;