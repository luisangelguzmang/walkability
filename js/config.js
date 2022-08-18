var config = {
  style: 'mapbox://styles/fabiancpl91/cl4y7o29u003514jqkiag1kvb',
  accessToken: 'pk.eyJ1IjoiZmFiaWFuY3BsOTEiLCJhIjoiY2w0d3poZTU3MDJieDNqbDRrNGwwajk2ZiJ9.ZTAlm-46xSfdj27Jg2UYig',
  showMarkers: false,
  markerColor: '#3FB1CE',
  projection: 'equirectangular',
  inset: false,
  theme: 'light',
  use3dTerrain: true,
  title: {
    en: 'Desirable streets for pedestrians: Using a street-level index to assess walkability in Bogota',
    es: 'Calles deseadas por los peatones: Uso de un índice a nivel de calles para evaluar la caminabilidad en Bogotá'
  },
  subtitle: {
    en: 'What is the quality of pedestrian infrastructure in the city?',
    es: '¿Cuál es la calidad de la infraestructura peatonal en la ciudad?'
  },
  image: './resources/uniandes_150x.png',
  byline: false,
  footer: false,
  chapters: [
    {
      id: 'title',
      alignment: 'full',
      hidden: true,
      title: 'Desirable streets for pedestrians: Using a street-level index to assess walkability in Bogota',
      image: false,
      description: 'What is the quality of pedestrian infrastructure in the city?',
      location: {
        center: [-74.070074, 4.617067],
        zoom: 16,
        pitch: 60,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: true,
      callback: 'show3DBuildings',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'ch-1',
      alignment: 'center',
      hidden: false,
      styles: {
        textAlign: 'center'
      },
      title: 'What is walkability?',
      image: {
        src: './resources/usaquen.jpeg',
        styles: {
          objectFit: 'cover',
          height: '225px',
          objectPosition: '0% 60%'
        }
      },
      description: 'Walkability is defined as the extent to which the urban environment is pedestrian-friendly. In this case, we evaluate the quality of the city’s pedestrian network to understand the factors that influence walkability including observable components (e.g., built environment) and non-observable (e.g., perceptions) factors at meso and microscale levels and according to pedestrian characteristics.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 22,
        pitch: 80,
        bearing: 15
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: 'startPathAnimation',
      onChapterEnter: [
        {
          layer: '3d-buildings',
          opacity: 0.6
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-2',
      alignment: 'left',
      hidden: false,
      title: 'What are the pedestrian characteristics?',
      image: {
        src: './resources/people-walking.png',
        styles: {
          objectFit: 'cover',
          height: '145px',
          objectPosition: '0% 0%'
        }
      },
      description: 'We did differentiated assessments according to socioeconomic levels, age ranges, and gender differences. We did not find differences between men&#39;s and women&#39;s perceptions.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: '3d-buildings',
          opacity: 0
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-3',
      alignment: 'center',
      hidden: false,
      styles: {
        textAlign: 'center'
      },
      title: false,
      image: {
        src: './resources/city3d.png',
        styles: {
          objectFit: 'cover',
          height: '225px',
          width: '65%',
          objectPosition: '0% 50%'
        }
      },
      description: 'Our proposed formulation of the walkability index (WI) includes observable components of the built environment and pedestrians’ perceptions of five factors influencing walkability: Pedestrian infrastructure robustness, Road safety, Personal security, Destination access, and Comfort. The WI is composed of these non-observable factors (perceptions) and their corresponding components (observable attributes of the built environment).',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        },
        {
          layer: '3d-buildings',
          opacity: 0
        }
      ],
      onChapterExit: [
        {
          layer: 'walkability-base-lyr',
          opacity: 0
        }
      ]
    },
    {
      id: 'ch-4.1',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/pedestrian.gif'
      },
      description: 'In general, pedestrians in Bogotá prefer areas that are safe from aggression or crime and with low interaction with motorized traffic. What an average pedestrian values most about the built environment in the city is that there are traffic lights (for safe crossings), police presence, good lighting, trees, and inclusive infrastructure for the elderly, children, and people with physical limitations.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4.2',
      alignment: 'right',
      hidden: false,
      title: false,
      image: {
        src: './resources/young-pedestrian.gif'
      },
      description: 'Young people also prefer safe pedestrian areas (both road safety and personal security) with traffic control devices. These people also attach great importance to inclusive infrastructure, the good quality of the sidewalks, and the presence of commercial establishments.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4.3',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/elder-pedestrian.gif'
      },
      description: 'As for the elderly, traffic control devices, good lighting, the presence of ramps and trees, and little congestion with traffic calming, are the most important attributes of the built environment.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4.4',
      alignment: 'right',
      hidden: false,
      title: false,
      image: {
        src: './resources/lowinc-pedestrian.gif'
      },
      description: 'People of low-income neighborhoods prefer safety above all else: they highly value the presence of traffic control devices, as well as police and security cameras. They also value adequate infrastructure in terms of inclusion, quality, and connectivity. The presence of trees and commercial areas is also important.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4.5',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/highinc-pedestrian.gif'
      },
      description: 'In addition to the need to feel safer, high-income people appreciate that there are more people on the street (pedestrian activity), calm traffic zones with police, commercial activity, access to public transport, with trees and good lighting.',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: 'disableMapInteractions',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-5',
      alignment: 'center',
      hidden: true,
      styles: {
        textAlign: 'center'
      },
      title: false,
      image: false,
      description: 'How is the quality of the pedestrian network in Bogotá?<br /><a href="#">Navigate the map</a>',
      location: {
        center: [-74.070074, 4.610067],
        zoom: 15,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: 'enableMapInteractions',
      onChapterEnter: [
        {
          layer: 'walkability-base-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    }
  ]
};