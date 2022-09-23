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
    en: 'Desirable streets for pedestrians: Using a street-level index to assess walkability in Bogotá',
    es: 'Calles deseadas por peatones: Índice a nivel de calle para evaluar la caminabilidad en Bogotá'
  },
  subtitle: {
    en: 'What is the quality of pedestrian infrastructure in the city?',
    es: '¿Cuál es la calidad de la infraestructura peatonal en la ciudad?'
  },
  images: [
    {
      src: './resources/uniandes_150x.png',
      id: 'uniandes-logo'
    },
    {
      src: './resources/grupo-sur.png',
      id: 'gruposur-logo'
    },
    {
      src: './resources/uninorte.png',
      id: 'uninorte-logo'
    }
  ],
  byline: false,
  footer: false,
  chapters: [
    {
      id: 'title',
      alignment: 'full',
      hidden: true,
      title: true,
      image: false,
      description: true,
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
      title: {
        en: 'What is walkability?',
        es: '¿Qué es caminabilidad?'
      },
      image: {
        src: './resources/usaquen.jpeg',
        styles: {
          objectFit: 'cover',
          height: '260px',
          objectPosition: '0% 65%'
        }
      },
      description: {
        en: 'Walkability is defined as the extent to which the urban environment is pedestrian-friendly. In this case, we evaluate the quality of the city’s pedestrian network to understand the factors that influence walkability including observable components (e.g., built environment) and non-observable (e.g., perceptions) factors at meso and microscale levels and according to pedestrian characteristics.',
        es: 'Caminabilidad (walkability en inglés) se define como una medida en que el entorno urbano es amigable para los peatones. En este caso, evaluamos la calidad de la red peatonal de la ciudad para comprender los factores que influyen en la caminabilidad, incluyendo los componentes observables del entorno construido (p.e. calidad del andén, usos del suelo, tráfico, etc.) y los factores no observables (percepciones) a niveles de meso y microescala. También se tuvieron en cuenta las características socioeconómicas de los peatones.'
      },
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
      title: {
        en: 'What are the pedestrian characteristics?',
        es: '¿Cuáles son las características de los peatones?'
      } ,
      image: {
        src: './resources/vectors/characters.png',
        styles: {
          objectFit: 'cover',
          height: '160px'
        }
      },
      description: {
        en: 'We did differentiated assessments according to socioeconomic levels, age ranges, and gender. We did not find differences between men and women perceptions.',
        es: 'Hicimos evaluaciones diferenciadas según el nivel socioeconómico, rangos de edad y sexo. No encontramos diferencias entre las percepciones de hombres y mujeres.'
      },
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
        },
        {
          layer: 'walkability-lyr',
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
        src: './resources/animations/city.gif',
        styles: {
          objectFit: 'cover',
          height: '370px',
          width: '100%',
          objectPosition: '0% 60%'
        }
      },
      description: {
        en: 'Our proposed formulation of the walkability index (WI) includes observable components of the built environment and pedestrians’ perceptions of five factors influencing walkability: Pedestrian infrastructure robustness, Road safety, Personal security, Destination access, and Comfort. The WI is composed of these non-observable factors (perceptions) and their corresponding components (observable attributes of the built environment).',
        es: 'Nuestra formulación propuesta del índice de caminabilidad (WI) incluye componentes observables del entorno construido y las percepciones de los peatones de cinco factores que influyen en la caminabilidad: calidad de la infraestructura peatonal, seguridad vial, seguridad personal, actividades cercanas y comodidad. El WI lo forman las percepciones de estos factores no observables y sus correspondientes componentes (atributos observados del entorno construido).' 
      },
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
          layer: 'walkability-lyr',
          opacity: 1
        },
        {
          layer: '3d-buildings',
          opacity: 0
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4.1',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/vectors/average.png',
        styles: {
          objectFit: 'cover',
          height: '350px',
          width: '100%'
        }
      },
      description: {
        en: 'In general, pedestrians in Bogotá prefer areas that are safe from aggression or crime and with low interaction with motorized traffic. What an average pedestrian values most about the built environment in the city is that there are traffic lights (for safe crossings), police presence, good lighting, trees, and inclusive infrastructure for the elderly, children, and people with physical limitations.',
        es:  'En general, los peatones en Bogotá prefieren áreas seguras (no delincuencia) y con baja interacción con el tráfico motorizado. Lo que más valora un peatón promedio del entorno construido de la ciudad, es que haya semáforos (para cruzar seguros), que haya policías, buena iluminación, arbolado e infraestructura inclusiva para adultos mayores, niños y personas con limitaciones físicas. Los jóvenes también prefieren espacios peatonales seguros (tanto en seguridad vial como seguridad personal) con dispositivos de control de tráfico. Estas personas también otorgan gran importancia a la infraestructura inclusiva, la buena calidad de los andenes y la presencia de establecimientos comerciales.'
      },
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
          layer: 'walkability-lyr',
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
        src: './resources/vectors/young.png',
        styles: {
          objectFit: 'cover',
          height: '350px',
          width: '100%'
        }
      },
      description: {
        en: 'Young people also prefer safe pedestrian areas (both road safety and personal security) with traffic control devices. These people also attach great importance to inclusive infrastructure, the good quality of the sidewalks, and the presence of commercial establishments.',
        es: 'Los jóvenes también prefieren espacios peatonales seguros (tanto en seguridad vial como seguridad personal) con dispositivos de control de tráfico. Estas personas también otorgan gran importancia a la infraestructura inclusiva, la buena calidad de los andenes y la presencia de establecimientos comerciales.'
      },
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
          layer: 'walkability-lyr',
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
        src: './resources/vectors/elderly.png',
        styles: {
          objectFit: 'cover',
          height: '350px',
          width: '100%'
        }
      },
      description: {
        en: 'As for the elderly, traffic control devices, good lighting, the presence of ramps and trees, and little congestion with traffic calming, are the most important attributes of the built environment.',
        es: 'En cuanto a los adultos mayores, los dispositivos de control de tráfico, la buena iluminación, la presencia de rampas y árboles y poca congestión con pacificación del tráfico, son los atributos más importantes del entorno construido.'
      },
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
          layer: 'walkability-lyr',
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
        src: './resources/vectors/low-income.png',
        styles: {
          objectFit: 'cover',
          height: '350px',
          width: '100%'
        }
      },
      description: {
        en: 'People of low-income neighborhoods prefer safety above all else: they highly value the presence of traffic control devices, as well as police and security cameras. They also value adequate infrastructure in terms of inclusion, quality, and connectivity. The presence of trees and commercial areas is also important.',
        es: 'Las personas de bajos ingresos prefieren la seguridad por encima de todo: valoran mucho la presencia de dispositivos de control de tráfico, así como la presencia de cámaras policiales y de seguridad. También valoran la infraestructura peatonal adecuada en términos de inclusión, calidad y conectividad. La presencia de árboles y áreas comerciales también es importante.'
      },
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
          layer: 'walkability-lyr',
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
        src: './resources/vectors/high-income.png',
        styles: {
          objectFit: 'cover',
          height: '350px',
          width: '100%'
        }
      },
      description: {
        en: 'In addition to the need to feel safer, high-income people appreciate that there are more people on the street (pedestrian activity), calm traffic zones with police, commercial activity, access to public transport, with trees and good lighting.',
        es: 'Además de la necesidad de sentirse más seguros en la calle, las personas de altos ingresos valoran que haya más gente caminando, zonas tranquilas respecto al tráfico con policía, actividad comercial, acceso al transporte público, árboles y buena iluminación en la noche.'
      },
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
          layer: 'walkability-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },
    /*{
      id: 'ch-5',
      alignment: 'center',
      hidden: false,
      styles: {
        textAlign: 'center'
      },
      title: false,
      image: false,
      description: {
        en: '<b>How is the quality of the pedestrian network in Bogotá?</b><br /><i>Click on a legend to highlight by District</i><br /><div id="vis"></div>',
        es: '<b>¿Cómo es la calidad de la red peatonal en Bootá?</b><br /><i>Haga clic en una leyenda para detallar una Localidad</i><br /><div style="padding: 5px;" id="vis"></div>'
      },
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
          layer: 'walkability-lyr',
          opacity: 1
        }
      ],
      onChapterExit: []
    },*/
    {
      id: 'ch-6',
      alignment: 'center',
      hidden: true,
      styles: {
        textAlign: 'center'
      },
      title: false,
      image: false,
      description: false,
      location: {
        center: [-74.070074, 4.610067],
        zoom: 13.5,
        pitch: 0,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: 'enableMapInteractions',
      onChapterEnter: [
        {
          layer: 'walkability-lyr',
          opacity: 0
        },
        {
          layer: '3d-buildings',
          opacity: 0
        }
      ],
      onChapterExit: []
    }
  ]
};