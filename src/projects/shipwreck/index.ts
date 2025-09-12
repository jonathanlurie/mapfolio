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

  console.log(style);
  

  const map = new maplibregl.Map({
    attributionControl: false,
    container: appDiv,
    maxPitch: 89,
    hash: true,
    style,
    center: [0, 0],
    zoom: 3,
  });

  console.log("deug");
  
  map.on("load", () => {
    console.log("adding shipwrecks");
    
    map.addSource("shipwreck-source",
    {
      url: "pmtiles://https://fsn1.your-objectstorage.com/public-map-data/pmtiles/demos/wrecks.pmtiles",
      type: "vector",
    });

    map.addLayer({
      id: 'shipwreck-points',
      type: 'circle',
      source: 'shipwreck-source',
      "source-layer": "wrecks",
      // filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#f00',
        'circle-radius': 3,
        // 'circle-stroke-width': 1,
        // 'circle-stroke-color': '#fff'
      }
    });

  });
}


const description = `
<p>
  Visualizing shipwreck around the globe. (<a href="https://github.com/jonathanlurie/mapfolio/blob/main/src/projects/shipwreck/index.ts">see source</a>)
</p>
<span class="attribution">
  <a href="https://maplibre.org/" target="_blank">MapLibre</a> |
  <a href="https://openstreetmap.org/copyright">© OpenStreetMap Contributors</a>
<span>
`

export default {
  name: "Shipwreck",
  description,
  shortDescription: "Visualizing shipwreck around the globe.",
  projectId: "shipwreck",
  linkText: "Explore",
  projectInitFunction: init,
} as ProjectDescription;