

/* Language setup */

var lang = 'en';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

if (params.lang === 'en' || params.lang === null) {
  lang = 'en';
  document.getElementById('lang-change').href = '?lang=es';
  document.getElementById('lang-flag').src = './resources/colombia.png';
} else {
  lang = 'es';
  document.getElementById('lang-change').href = '?lang=en';
  document.getElementById('lang-flag').src = './resources/usa.png';
}



var initLoad = true;

var layerTypes = {
  'fill': ['fill-opacity'],
  'line': ['line-opacity'],
  'circle': ['circle-opacity', 'circle-stroke-opacity'],
  'symbol': ['icon-opacity', 'text-opacity'],
  'raster': ['raster-opacity'],
  'fill-extrusion': ['fill-extrusion-opacity'],
  'heatmap': ['heatmap-opacity']
}

var alignments = {
  'left': 'lefty',
  'center': 'centered',
  'right': 'righty',
  'full': 'fully'
}

function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { "duration": layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

var story = document.getElementById('story');

var features = document.createElement('div');

features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
  var titleText = document.createElement('h1');
  titleText.innerText = config.title[lang];
  header.appendChild(titleText);
}

if (config.subtitle) {
  var subtitleText = document.createElement('h2');
  subtitleText.innerText = config.subtitle[lang];
  header.appendChild(subtitleText);
}

if (config.images) {
  for (const image of config.images) {
    let img = document.createElement('img');
    img.src = image.src;
    img.setAttribute('id', image.id);
    header.appendChild(img);
  }
}

if (config.byline) {
  var bylineText = document.createElement('p');
  bylineText.innerText = config.byline;
  header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute('id', 'header');
  story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
  var container = document.createElement('div');
  var chapter = document.createElement('div');

  if (record.title) {
    var title = document.createElement('h3');
    title.innerText = record.title[lang];
    chapter.appendChild(title);
  }

  if (record.image) {
    var image = new Image();
    image.src = record.image.src;

    if (record.image.styles) {
      Object.entries(record.image.styles).forEach((style) => {
        const [key, value] = style;
        image.style[key] = value;
      });
    }

    chapter.appendChild(image);
  }

  if (record.description) {
    var story = document.createElement('p');
    story.innerHTML = record.description[lang];
    chapter.appendChild(story);
  }

  container.setAttribute('id', record.id);
  container.classList.add('step');

  if (idx === 0) {
    container.classList.add('active');
  }

  chapter.classList.add(config.theme);
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || 'centered');

  if (record.hidden) {
    container.classList.add('hidden');
  }

  if (record.styles) {
    Object.entries(record.styles).forEach((style) => {
      const [key, value] = style;
      chapter.style[key] = value;
    });
  }

  features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (config.footer) {
  var footerText = document.createElement('p');
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute('id', 'footer');
  story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

/*const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
  return {
    url: url + suffix
  }
}*/

var map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  interactive: false,
  //transformRequest: transformRequest,
  projection: config.projection
});

// Create a inset map if enabled in config.js
if (config.inset) {
  var insetMap = new mapboxgl.Map({
    container: 'mapInset', // container id
    style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
    center: config.chapters[0].location.center,
    // Hardcode above center value if you want insetMap to be static.
    zoom: 3, // starting zoom
    hash: false,
    interactive: false,
    attributionControl: false,
    //Future: Once official mapbox-gl-js has globe view enabled,
    //insetmap can be a globe with the following parameter.
    //projection: 'globe'
  });
}

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();


map.on("load", function () {

  if (config.use3dTerrain) {
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  };

  // 3D Buildings
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
      ],
      'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
    }
  });

  // Sources used in map navigation

  map.addSource('localidades-src', {
    'type': 'geojson',
    'data': './data/localidades.geojson'
  });

  map.addSource('troncales-src', {
    'type': 'geojson',
    'data': './data/troncales.geojson'
  });

  map.addSource('photos-src', {
    'type': 'geojson',
    'data': './data/photos.geojson',
    'cluster': true,
    'clusterMaxZoom': 14,
    'clusterRadius': 50
  });

  map.loadImage('./resources/camera.png', (error, image) => {
    if (error) throw error;
      map.addImage('camera-marker', image);
  });

  // As the map moves, grab and update bounds in inset map.
  if (config.inset) {
    map.on('move', getInsetBounds);
  }

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: '.step',
      offset: 0.5,
      progress: true
    })
    .onStepEnter(async response => {
      var chapter = config.chapters.find(chap => chap.id === response.element.id);
      response.element.classList.add('active');
      map[chapter.mapAnimation || 'flyTo'](chapter.location);
      // Incase you do not want to have a dynamic inset map,
      // rather want to keep it a static view but still change the
      // bbox as main map move: comment out the below if section.
      if (config.inset) {
        if (chapter.location.zoom < 5) {
          insetMap.flyTo({ center: chapter.location.center, zoom: 0 });
        } else {
          insetMap.flyTo({ center: chapter.location.center, zoom: 3 });
        }
      }

      if (config.showMarkers) {
        marker.setLngLat(chapter.location.center);
      }

      if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
      }

      if (chapter.callback) {
        window[chapter.callback]();
      }

      if (chapter.rotateAnimation) {
        map.once('moveend', () => {

          const rotateNumber = map.getBearing();
          map.rotateTo(rotateNumber + 180, {
            duration: 120000, easing: (t) => t
          });
        });
      }
    })
    .onStepExit(response => {
      var chapter = config.chapters.find(chap => chap.id === response.element.id);
      response.element.classList.remove('active');
      if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
    });
});

//Helper functions for insetmap
function getInsetBounds() {
  let bounds = map.getBounds();

  let boundsJson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              bounds._sw.lng,
              bounds._sw.lat
            ],
            [
              bounds._ne.lng,
              bounds._sw.lat
            ],
            [
              bounds._ne.lng,
              bounds._ne.lat
            ],
            [
              bounds._sw.lng,
              bounds._ne.lat
            ],
            [
              bounds._sw.lng,
              bounds._sw.lat
            ]
          ]
        ]
      }
    }]
  }

  if (initLoad) {
    addInsetLayer(boundsJson);
    initLoad = false;
  } else {
    updateInsetLayer(boundsJson);
  }

}

function addInsetLayer(bounds) {
  insetMap.addSource('boundsSource', {
    'type': 'geojson',
    'data': bounds
  });

  insetMap.addLayer({
    'id': 'boundsLayer',
    'type': 'fill',
    'source': 'boundsSource', // reference the data source
    'layout': {},
    'paint': {
      'fill-color': '#fff', // blue color fill
      'fill-opacity': 0.2
    }
  });
  // // Add a black outline around the polygon.
  insetMap.addLayer({
    'id': 'outlineLayer',
    'type': 'line',
    'source': 'boundsSource',
    'layout': {},
    'paint': {
      'line-color': '#000',
      'line-width': 1
    }
  });
}

function updateInsetLayer(bounds) {
  insetMap.getSource('boundsSource').setData(bounds);
}

// setup resize event
window.addEventListener('resize', scroller.resize);

/*
 * Callbacks
 */

function show3DBuildings() {
  const layers = map.getStyle().layers;
  for (const layer of layers) {
    if (layer.type === 'symbol' && layer.layout['text-field']) {
      setLayerOpacity({
        layer: layer.id,
        opacity: 0
      });
    }
  }
}

function startPathAnimation() {
  console.log('Starting path animation...');

  const layers = map.getStyle().layers;
  for (const layer of layers) {
    if (layer.type === 'symbol' && layer.layout['text-field']) {
      setLayerOpacity({
        layer: layer.id,
        opacity: 1
      });
    }
  }

  map.flyTo({
    center: [
      -74.06991273164749,
      4.610926316471365
    ],
    zoom: 22,
    pitch: 80,
    bearing: 15
  });

  setTimeout(() => {
    map.flyTo({
      center: [
        -74.06861186027527,
        4.618282491272579
      ],
      curve: 0.4,
      speed: 0.04
    });
  }, 1500);
}

const navigation = new mapboxgl.NavigationControl({
  showCompass: false,
  showZoom: true,
  visualizePitch: false
});

const toggleableLayers = [
  {
    'id': 'localidades-lyr',
    'label': {
      en: 'Districts',
      es: 'Localidades'
    },
    'visibility': 'visible',
    'exclusive': false
  },
  {
    'id': 'troncales-lyr',
    'label': {
      en: 'TM trunk corridors',
      es: 'Troncales TM'
    } ,
    'visibility': 'visible',
    'exclusive': false
  },
  {
    'id': 'walkability-base-lyr',
    'label': {
      en: 'Walkability (base)',
      es: 'Caminabilidad (general)'
    },
    'visibility': 'visible',
    'exclusive': true
  },
  {
    'id': 'walkability-eb-lyr',
    'label': {
      en: 'Walkability (low-income)',
      es: 'Caminabilidad (bajos ingresos)'
    },
    'visibility': 'none',
    'exclusive': true
  },
  {
    'id': 'walkability-ea-lyr',
    'label': {
      en: 'Walkability (high-income)',
      es: 'Caminabilidad (altos ingresos)'
    },
    'visibility': 'none',
    'exclusive': true
  },
  {
    'id': 'walkability-edj-lyr',
    'label': {
      en: 'Walkability (young people)',
      es: 'Caminabilidad (jóvenes)'
    },
    'visibility': 'none',
    'exclusive': true
  },
  {
    'id': 'walkability-edv-lyr',
    'label': {
      en: 'Walkability (elder people)',
      es: 'Caminabilidad (adultos mayores)'
    },
    'visibility': 'none',
    'exclusive': true
  },
  {
    'id': 'photos-lyr',
    'label': {
      en: 'Photos',
      es: 'Fotos'
    },
    'visibility': 'visible',
    'exclusive': false
  }
];

function enableMapInteractions() {
  console.log("Making the map interactive");

  document.getElementById('section07').style.visibility = 'visible';
  document.getElementById('section10').style.visibility = 'hidden';
  document.getElementById("chart-icon").style.visibility = 'visible';
  document.getElementById("scale").style.visibility = 'visible';

  const handlers = ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate', 'touchPitch']
  for (const handler of handlers) {
    map[handler].enable();
  }

  // Enable navigation controls
  if (!map.hasControl(navigation)) {
    map.addControl(navigation, 'bottom-right');
  }

  const layers = map.getStyle().layers;

  // Find the index of the first symbol layer in the map style.
  let firstSymbolId;
  for (const layer of layers) {
    if (layer.type === 'symbol') {
      firstSymbolId = layer.id;
      break;
    }
  }

  // Adding layers manual for interacting with the map

  if (!map.getLayer('localidades-lyr')) {
    map.addLayer(
      {
        'id': 'localidades-lyr',
        'type': 'line',
        'source': 'localidades-src',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': '#8da0cb',
          'line-opacity': 0.2,
          'line-width': 8
        }
      },
      firstSymbolId
    );
  }

  if (!map.getLayer('troncales-lyr')) {
    map.addLayer(
      {
        'id': 'troncales-lyr',
        'type': 'line',
        'source': 'troncales-src',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': '#D22830',
          'line-opacity': 0.2,
          'line-width': 8
        }
      },
      firstSymbolId
    );
  }

  if (!map.getLayer('photos-lyr')) {
    map.addLayer({
      'id': 'cluster-photos-lyr',
      'type': 'symbol',
      'source': 'photos-src',
      'filter': ['has', 'point_count'],
      'layout': {
        'icon-image': 'camera-marker',
        'icon-size': 1.25,
        'visibility': 'none'
      }
    });
      
    map.addLayer({
      'id': 'photos-lyr',
      'type': 'symbol',
      'source': 'photos-src',
      'filter': ['!', ['has', 'point_count']],
      'layout': {
        'icon-image': 'camera-marker',
        'icon-size': 0.75,
        'visibility': 'none'
      }
    });
  }

  // Set up the corresponding toggle button for each layer.
  for (const layer of toggleableLayers) {
    // Skip layers that already have a button set up.
    if (document.getElementById(layer.id)) {
      continue;
    }

    // Showing layers accoring to configuration
    map.setLayoutProperty(layer.id, 'visibility', layer.visibility);

    if (layer.id === 'photos-lyr') {
      map.setLayoutProperty('cluster-photos-lyr', 'visibility', layer.visibility);
    }

    // Create a link.
    const link = document.createElement('a');
    link.id = layer.id;
    link.href = '#';
    link.textContent = layer.label[lang];
    if (layer.visibility === 'visible') {
      link.className = 'active';
    } else {
      link.className = '';
    }

    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
      const clickedLayer = this.id;
      e.preventDefault();
      e.stopPropagation();

      let visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
      );

      if (visibility === undefined) {
        visibility = layer.visibility;
      }

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        if (clickedLayer === 'photos-lyr') map.setLayoutProperty('cluster-photos-lyr', 'visibility', 'none');
        
        this.className = '';
      } else {
        if (clickedLayer.startsWith('walkability')) {
          // First ensure to hide all exclusive layers
          for (const exclusiveLayer of toggleableLayers.filter(l => l.exclusive)) {
            if (clickedLayer !== exclusiveLayer.id) {
              map.setLayoutProperty(exclusiveLayer.id, 'visibility', 'none');
              document.getElementById(exclusiveLayer.id).className = '';
            } else {
              map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
              this.className = 'active';
            }
          }
        } else {
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          if (clickedLayer === 'photos-lyr') map.setLayoutProperty('cluster-photos-lyr', 'visibility', 'visible');

          this.className = 'active';
        }
      }
    };

    const layers = document.getElementById('menu');
    layers.appendChild(link);
  }

  for (const lyr of ['walkability-base-lyr', 'walkability-eb-lyr', 'walkability-ea-lyr', 'walkability-edj-lyr', 'walkability-edv-lyr', 'photos-lyr', 'cluster-photos-lyr']) {
    map.on('click', lyr, (e) => {
      if (e.features[0].layer.id.startsWith('walkability')) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(popupFormat(e.features[0]))
          .addTo(map);
      } else if (e.features[0].layer.id === 'cluster-photos-lyr') {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['cluster-photos-lyr']
        });

        const clusterId = features[0].properties.cluster_id;
        map.getSource('photos-src').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
        });
        }
        );
      } else {
        // Build photo slides
        let container = document.getElementById('photo-slides-container');
        let photos = JSON.parse(e.features[0].properties.photos);
        photos.map(photo => {
          let div = document.createElement('div');
          div.classList.add('photo-slides');
          div.classList.add('photo-slides-fade');
          let img = document.createElement('img');
          img.src = 'https://storage.googleapis.com/uniandes-walkability-photos/' + e.features[0].properties.folder + '/' + photo;
          img.classList.add('photo-slides-img');
          div.appendChild(img);
          container.appendChild(div);
        });
        
        // Open photo popup
        slideIndex = 1;
        showSlides(slideIndex);
        openPhotoPopup();        
      }
    });
  
    // Change the cursor to a pointer when
    // the mouse is over the states layer.
    map.on('mouseenter', lyr, () => {
      map.getCanvas().style.cursor = 'pointer';
    });
  
    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', lyr, () => {
      map.getCanvas().style.cursor = '';
    });
  }
  
  function popupFormat(e) {
    let title = {
      en: 'District',
      es: 'Localidad'
    };

    let subtitle = {
      en: 'Walkability index',
      es: 'Índice de caminabilidad'
    };

    let walk_prop = {
      'walkability-base-lyr': 'Walk_Base',
      'walkability-eb-lyr': 'Walk_E_B',
      'walkability-ea-lyr': 'Walk_E_A',
      'walkability-edj-lyr': 'Walk_ED_J',
      'walkability-edv-lyr': 'Walk_ED_V'
    };

    return `<h3>${title[lang]}: ${e.properties.LocNombre}</h3><h4>${subtitle[lang]}: ${e.properties[walk_prop[e.layer.id]].toFixed(3)}</h4>`
  }
}

function disableMapInteractions() {
  console.log("Making the map NOT interactive again");

  document.getElementById('section07').style.visibility = 'hidden';
  document.getElementById('section10').style.visibility = 'visible';
  document.getElementById("chart-icon").style.visibility = 'hidden';
  document.getElementById("scale").style.visibility = 'hidden';

  const handlers = ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate', 'touchPitch']
  for (const handler of handlers) {
    map[handler].disable();
  }

  if (map.hasControl(navigation)) {
    map.removeControl(navigation);
  }

  // Deleting layers menu
  let menu = document.getElementById('menu');
  if (menu.hasChildNodes()) {
    menu.innerHTML = '';
  }

  // Hidden all layers
  for (const layer of toggleableLayers) {
    if (map.getLayer(layer.id)) {
      map.setLayoutProperty(layer.id, 'visibility', 'none');

      if (layer.id === 'photos-lyr') {
        map.setLayoutProperty('cluster-photos-lyr', 'visibility', 'none');
      }
    }
  }  
}

/* EDA popup */ 

function openEDAPopup() {

  // TODO: Get selected walkability layer

  let districts = [
    { "id": "chk-BOGOTA", "label": "Bogotá", "checked": "checked" },
    { "id": "chk-ANTONIO NARIÑO", "label": "Antonio Nariño", "checked": "" },
    { "id": "chk-BARRIOS UNIDOS", "label": "Barrios Unidos", "checked": "" },
    { "id": "chk-BOSA", "label": "Bosa", "checked": "" },
    { "id": "chk-CANDELARIA", "label": "Candelaria", "checked": "" },
    { "id": "chk-CHAPINERO", "label": "Chapinero", "checked": "" },
    { "id": "chk-CIUDAD BOLIVAR", "label": "Ciudad Bolivar", "checked": "" },
    { "id": "chk-ENGATIVA", "label": "Engativá", "checked": "" },
    { "id": "chk-FONTIBON", "label": "Fontibón", "checked": "" },
    { "id": "chk-KENNEDY", "label": "Kennedy", "checked": "" },
    { "id": "chk-LOS MARTIRES", "label": "Los Martires", "checked": "" },
    { "id": "chk-PUENTE ARANDA", "label": "Puente Aranda", "checked": "" },
    { "id": "chk-RAFAEL URIBE URIBE", "label": "Rafael Uribe Uribe", "checked": "" },
    { "id": "chk-SAN CRISTOBAL", "label": "San Cristobal", "checked": "" },
    { "id": "chk-SANTA FE", "label": "Sanat Fé", "checked": "" },
    { "id": "chk-SUBA", "label": "Suba", "checked": "" },
    { "id": "chk-TEUSAQUILLO", "label": "Teusaquillo", "checked": "" },
    { "id": "chk-TUNJUELITO", "label": "Tunjuelito", "checked": "" },
    { "id": "chk-USAQUEN", "label": "Usaquén", "checked": "" },
    { "id": "chk-USME", "label": "Usme", "checked": "" },
  ];

  function drawChart(districts) {
    console.log(districts);
    console.log( districts.map(d => {
      return { "field": "LocNombre", "equal": d.id.replace('chk-', '') }
    }));
    vegaEmbed('#vis', {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "width": 900,
      "height": 500,
      "data": {
        "url": "./data/walkability.csv"
      },
      "mark": {
        "type": "line"
      },
      "transform": [
        {
          "density": "Walk_Base",
          "groupby": [ "LocNombre" ],
          "extent": [0, 1]
        },
        {
          "filter": {
            "or": districts.map(d => {
              return { "field": "LocNombre", "equal": d.id.replace('chk-', '') }
            })
          }
        }
      ],
      "encoding": {
        "x": {
          "field": "value",
          "type": "quantitative",
          "title": lang === "en" ? "Walkability index" : "Índice de caminabilidad"
        },
        "y": {
          "field": "density",
          "type": "quantitative",
          "title": lang === "en" ? "Density" : "Densidad"
        },
        "color": {
          "field": "LocNombre",
          "scale": {
            "scheme": "tableau10"
          },
          "legend": {
            "symbolType": "circle",
            "symbolSize": 50,
            "symbolStrokeWidth": 5,
            "columns": 1
          },
          "title": lang === "en" ? "District" : "Localidad"
        },
        "opacity": {
          "value": 0.9
        },
        "strokeWidth": {
          "value": 2
        }
      }
    }, { "actions": false });
  }

  let districtSelection = document.getElementById('district-selection');
  districts.map((d, i) => {
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.id = d.id;
    input.name = d.id;
    input.checked = d.checked;
    districtSelection.appendChild(input);

    input.addEventListener('click', e => {
      let checked = districts.find(d => d.id === e.target.id).checked;
      if (checked === 'checked') {
        districts.find(d => d.id === e.target.id).checked = '';
      } else {
        districts.find(d => d.id === e.target.id).checked = 'checked';
      }

      drawChart(districts.filter(d => d.checked !== ''));
    });

    let label = document.createElement('label');
    label.for = d.id;
    label.innerHTML = d.label + '&nbsp;&nbsp;';
    districtSelection.appendChild(label);

    if (i == 9) {
      districtSelection.appendChild(document.createElement('br'));
    }
  });

  

  drawChart(districts.filter(d => d.checked !== ''));
  
  document.getElementById('eda-popup').style.width = '100%';
}

function closeEDAPopup() {
  document.getElementById('eda-popup').style.width = '0%';
}

/* Photos popup */ 

function openPhotoPopup() {
  document.getElementById('photo-popup').style.width = '100%';
}

function closePhotoPopup() {
  document.getElementById('photo-popup').style.width = '0%';

  // Removing photos in slider
  let photos = document.getElementById('photo-slides-container').querySelectorAll('div');
  photos.forEach(photo => {
    photo.remove();
  });
}

/* Photo slides */

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("photo-slides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}

/* Go back action */

function goBack() {
  window.scrollBy(0, -window.innerHeight);
}
