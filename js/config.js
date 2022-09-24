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
    es: 'Calles deseadas: Índice para evaluar la caminabilidad en Bogotá'
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
        en: 'Walkability is defined as the extent to which the urban environment is pedestrian-friendly. Previous studies report spatial inequalities regarding walkability conditions within Colombian cities.<br>See more: <a href="https://doi.org/10.1016/j.retrec.2020.101024" target="_blank">https://doi.org/10.1016/j.retrec.2020.101024</a>',
        es: 'Caminabilidad (walkability en inglés) se define como una medida en que el entorno urbano es amigable para los peatones. Estudios previos reportan desigualdades espaciales con respecto a las condiciones de caminabilidad dentro de las ciudades colombianas.<br>Ver más: <a href="https://doi.org/10.1016/j.retrec.2020.101024" target="_blank">https://doi.org/10.1016/j.retrec.2020.101024</a>'
      },
      location: {
        center: [-74.070074, 4.617067],
        zoom: 16,
        pitch: 60,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: true,
      callback: '',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'ch-2',
      alignment: 'left',
      hidden: false,
      title: {
        en: 'How do we assess walkability?',
        es: '¿Cómo evaluamos la caminabilidad?'
      },
      image: {
        src: './resources/animations/city.gif',
        styles: {
          width: '100%'
        }
      },
      description: {
        en: 'There are several walkability indices in the literature at the meso level (e.g., neighborhood) or the micro level (e.g., street). We assess walkability by combining unobservable factors (e.g., perceptions) and observable components (e.g., built environment) at both scale levels.<br />See more: <a href="https://doi.org/10.1080/01441647.2019.1703842" target="_blank">https://doi.org/10.1080/01441647.2019.1703842</a>',
        es: 'Hay varios índices de caminabilidad en la literatura a nivel meso (p. ej., de vecindario) o nivel micro (p. ej., de calle). Nosotos evaluamos la caminabilidad combinando factores no observables (p. ej., percepciones) y componentes observables (p. ej., entorno construido) en ambos niveles de escala.<br />Ver más: <a href="https://doi.org/10.1080/01441647.2019.1703842" target="_blank">https://doi.org/10.1080/01441647.2019.1703842</a>'
      },
      location: {
        center: [-74.070074, 4.617067],
        zoom: 16,
        pitch: 60,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: true,
      callback: '',
      onChapterEnter: [],
      onChapterExit: []
    },
    {
      id: 'ch-3',
      alignment: 'right',
      hidden: false,
      title: {
        en: 'Can this methodology be used to assess walkability in an entire city? ',
        es: '¿Puede esta metodología ser usada para evaluar la caminabilidad de una ciudad entera?'
      },
      image: {
        src: './resources/vectors/city.png',
        styles: {
          width: '100%'
        }
      },
      description: {
        en: 'Yes. Bogotá is the first large-scale application. Particularly, the methodology considers pedestrians’ perceptions of five factors influencing walkability: Pedestrian infrastructure robustness, road safety, personal security, destination access, and comfort. Also, it includes observable components of the built environment associated with each factor.<br />See more: <a href="https://doi.org/10.1016/j.trd.2022.103462" target="_blank">https://doi.org/10.1016/j.trd.2022.103462</a>',
        es: 'Sí. Bogotá es la primera aplicación a gran escala. En particular, la metodología considera las percepciones de los peatones sobre cinco factores que influyen en la caminabilidad: Solidez de la infraestructura peatonal, seguridad vial, seguridad personal, acceso al destino y comodidad. Además, se incluyen componentes observables del entorno construido asociados a cada factor.<br />See more: <a href="https://doi.org/10.1016/j.trd.2022.103462" target="_blank">https://doi.org/10.1016/j.trd.2022.103462</a>'
      },
      location: {
        center: [-74.070074, 4.617067],
        zoom: 16,
        pitch: 60,
        bearing: 0
      },
      mapAnimation: 'flyTo',
      rotateAnimation: true,
      callback: '',
      onChapterEnter: [
        {
          layer: '3d-buildings',
          opacity: 0.6
        }
      ],
      onChapterExit: []
    },
    {
      id: 'ch-4',
      alignment: 'center',
      hidden: false,
      styles: {
        textAlign: 'center'
      },
      title: {
        en: 'Do all pedestrians experience the same walkability conditions?',
        es: '¿Todos los peatones experimentan las mismas condicines de caminabilidad?'
      },
      image: {
        src: './resources/vectors/characters.png',
        styles: {
          width: '100%'
        }
      },
      description: {
        en: 'No, that is why we allowed differences among pedestrian types according to socioeconomic groups, age ranges and gender.',
        es: 'No, por eso permitimos diferencias entre tipos de peatones según grupos socioeconómicos, rangos de edad y género.'
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
      id: 'ch-5',
      alignment: 'left',
      hidden: false,
      title: {
        en: 'Then, what were the main results for Bogotá?',
        es: 'Entonces, ¿Cuáles son los principales resultados para Bogotá?'
      },
      image: {
        src: './resources/vectors/average.png',
        styles: {
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
      id: 'ch-6',
      alignment: 'right',
      hidden: false,
      title: false,
      image: {
        src: './resources/vectors/young.png',
        styles: {
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
      id: 'ch-7',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/vectors/elderly.png',
        styles: {
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
      id: 'ch-8',
      alignment: 'right',
      hidden: false,
      title: false,
      image: {
        src: './resources/vectors/low-income.png',
        styles: {
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
      id: 'ch-9',
      alignment: 'left',
      hidden: false,
      title: false,
      image: {
        src: './resources/vectors/high-income.png',
        styles: {
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
    {
      id: 'ch-10',
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
        }
      ],
      onChapterExit: []
    }
  ]
};