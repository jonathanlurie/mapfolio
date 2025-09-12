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


async function init() {
  const appDiv = getMainDiv();
  maplibregl.addProtocol("pmtiles", new Protocol().tile);

  const pmtiles = PMTILE_PLANET_URL;
  const sprite = ICONS_PHOSPHORE_DIECUT_URL;
  const glyphs = GLYPHS_URL;

  const style = getStyle("avenue", {
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
    container: appDiv,
    maxPitch: 89,
    hash: true,
    style,
    center: [0, 0],
    zoom: 3,
  });
}


export default {
  name: "Basemapkit: Avenue",
  description: "Making use of the Avenue style as defined in Basemapkit",
  projectId: "basemapkit-avenue-simple",
  linkText: "Explore",
  projectInitFunction: init,
} as ProjectDescription;