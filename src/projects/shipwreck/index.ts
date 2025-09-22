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

  const style = getStyle("bureau-navy", {
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
  
  map.on("style.load", async () => {
    
    map.addSource("shipwreck-source",
    {
      url: "pmtiles://https://fsn1.your-objectstorage.com/public-map-data/pmtiles/demos/wrecks.pmtiles",
      type: "vector",
    });

    

    const sailboatImage = await map.loadImage('/icons/sailboat-fill.png');
    const submarineImage = await map.loadImage('/icons/submarine.png');
    
    map.addImage('sailboat-marker', sailboatImage.data);
    map.addImage('submarine-marker', submarineImage.data);

    map.addLayer({
      id: 'shipwreck-points',
      type: 'circle',
      source: 'shipwreck-source',
      "source-layer": "wrecks",
      // filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': 'rgb(252, 253, 191)',
        'circle-radius': 15,
        "circle-opacity": [
          'interpolate',
          ['linear'],
          ['zoom'],
          7.5, 0,
          8, 0.7,
        ],
      }
    });

    map.addLayer({
      'id': 'shipwreck-icons',
      'type': 'symbol',
      source: 'shipwreck-source',
      "source-layer": "wrecks",
      'layout': {
        
          'icon-image': 'sailboat-marker',
          // get the year from the source's "year" property
          'text-field': ['get', 'name'],
          'text-font': [ 'Noto Sans Regular' ],
          'text-offset': [0, 0.75],
          "text-size": 12,
          'text-anchor': 'top',
          "icon-size": 0.5,
          "icon-rotate": ["get", "orientatio"],
      },
      paint: {
        "icon-opacity": [
          'interpolate',
          ['linear'],
          ['zoom'],
          7.5, 0,
          8, 1,
        ],
        "text-opacity": [
          'interpolate',
          ['linear'],
          ['zoom'],
          7.5, 0,
          8, 1,
        ],
        "text-color": "rgb(252, 253, 191)",
        "text-translate": [0, 10],
        "text-halo-width": 2,
        "text-halo-color": "rgb(28, 16, 68)"
      }
    });

    


    map.addLayer({
      'id': 'earthquakes-heat',
      'type': 'heatmap',
      'source': 'shipwreck-source',
      "source-layer": "wrecks",
      'maxzoom': 9,
      'paint': {
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          3,
          0.05,
          7,
          0.7
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparency color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          // Magma colormap
          0.05, 'rgba(28, 16, 68, 0)',
          0.13, 'rgb(28, 16, 68)',
          0.25, 'rgb(79, 18, 123)',
          0.38, 'rgb(129, 37, 129)',
          0.5, 'rgb(181, 54, 122)',
          0.63, 'rgb(229, 80, 100)',
          0.75, 'rgb(251, 135, 97)',
          0.88, 'rgb(254, 194, 135)',
          1, 'rgb(252, 253, 191)',
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          5,
          7,
          20
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7.5,
          1,
          8,
          0
        ]
      }
    }
  );

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