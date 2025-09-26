import { buildStyle, getStyle } from "basemapkit";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import {
  GLYPHS_URL,
  ICONS_PHOSPHORE_DIECUT_URL,
  PMTILE_PLANET_URL,
} from "../../common/env";
import { getMainDiv } from "../../common/ui";
import type { ProjectDescription } from "../list";


async function init() {
  const appDiv = getMainDiv();
  maplibregl.addProtocol("pmtiles", new Protocol().tile);

  const pmtiles = PMTILE_PLANET_URL;
  const sprite = ICONS_PHOSPHORE_DIECUT_URL;
  const glyphs = GLYPHS_URL;

  const style = buildStyle({
    baseStyleName: "spectre",
    pmtiles,
    sprite,
    glyphs,
    colorEdit: {
      exposure: -1.3,
      saturation: 1,
      hueRotation: 220
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
  
  map.on("style.load", async () => {
    
    map.addSource('cloud-source', {
      type: 'raster',
      tiles: ['/tilesets/low_cloud_cover_colorized/{z}/{x}/{y}.png'],
      tileSize: 512,
      minzoom: 0,
      maxzoom: 4,
    });

    map.addLayer({
      id: 'cloud-layer',
      type: 'raster',
      source: 'cloud-source',
      minzoom: 0,
    }, "earth-line");

  });
}


const description = `
<p>
  Visualizing global low cloud cover at 0.25° from Meteo France's ARPEGE forecast model with Basemapkit's Spectre style.
</p>
<span class="attribution">
  <a href="https://maplibre.org/" target="_blank">MapLibre</a> |
  <a href="https://openstreetmap.org/copyright">© OpenStreetMap Contributors</a> |
  <a href="https://donneespubliques.meteofrance.fr/?fond=produit&id_produit=130&id_rubrique=51">Meteo France - ARPEGE</a>
<span>
`

export default {
  name: "Global cloud cover",
  description,
  shortDescription: "Visualizing global cloud cover with Basemapkit's Spectre style.",
  projectId: "cloud-colorized",
  linkText: "Explore",
  projectInitFunction: init,
} as ProjectDescription;