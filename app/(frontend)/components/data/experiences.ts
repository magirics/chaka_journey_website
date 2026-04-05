export type ExperienceSummary = {
  id: string;
  image: string;
  user: {
    name: string;
    country: string;
  };
  master: {
    craft: string;
    name: string;
    country: string;
  };
  title: string;
  story: string[];
};

export const experiencesCatalog: ExperienceSummary[] = [
  {
    id: "steven-viviana-argentina",
    image: "/draft/experiences/image (1).avif",
    user: { name: "Steven", country: "Estados Unidos" },
    master: {
      craft: "Tango Argentino",
      name: "Viviana",
      country: "Argentina",
    },
    title: "Tango en Buenos Aires",
    story: [
      "Durante tres dias, Steven aprendio los fundamentos del tango argentino junto a Viviana en barrios historicos de Buenos Aires.",
      "Cada clase combino tecnica corporal, caminata y musicalidad para entender el tango como expresion cultural.",
      "La experiencia termino con una practica social donde pudo bailar con musica en vivo y compartir con la comunidad local.",
    ],
  },
  {
    id: "sadia-chikako-japon",
    image: "/draft/experiences/image (2).avif",
    user: { name: "Sadia", country: "Qatar" },
    master: {
      craft: "Caligrafia Japonesa",
      name: "Chikako",
      country: "Japon",
    },
    title: "Caligrafia en Kyoto",
    story: [
      "Sadia participo en una inmersion de caligrafia japonesa con Chikako, aprendiendo postura, ritmo y uso tradicional del pincel.",
      "El taller incluyo practica con tinta sumi y papel washi para crear composiciones de kanji contemporaneas.",
      "Al final, preparo una pieza personal con su nombre y una frase poetica para llevarse como recuerdo.",
    ],
  },
  {
    id: "allison-pum-pum-argentina",
    image: "/draft/experiences/image (3).avif",
    user: { name: "Allison", country: "Estados Unidos" },
    master: {
      craft: "Arte Callejero",
      name: "Pum Pum",
      country: "Argentina",
    },
    title: "Mural Colectivo en Buenos Aires",
    story: [
      "Allison trabajo con Pum Pum en el desarrollo de un mural urbano desde el boceto hasta la aplicacion final.",
      "La experiencia abordo color, composicion y narrativa visual aplicada a espacios publicos.",
      "El resultado fue una obra colaborativa inspirada en simbolos del barrio y relatos de sus vecinos.",
    ],
  },
  {
    id: "andrea-takaoka-japon",
    image: "/draft/experiences/image (4).avif",
    user: { name: "Andrea", country: "Hong Kong" },
    master: {
      craft: "Encerado Tradicional",
      name: "Takaoka",
      country: "Japon",
    },
    title: "Tecnicas de Encerado I",
    story: [
      "Andrea exploro tecnicas de encerado tradicional con Takaoka para proteger y dar acabado a superficies artesanales.",
      "Se practicaron mezclas de cera, control de temperatura y aplicacion por capas en piezas pequenas.",
      "Concluyo con una sesion de pulido manual para lograr brillo y resistencia duradera.",
    ],
  },
  {
    id: "mateo-takaoka-japon",
    image: "/draft/experiences/image (1).avif",
    user: { name: "Mateo", country: "Chile" },
    master: {
      craft: "Encerado Tradicional",
      name: "Takaoka",
      country: "Japon",
    },
    title: "Tecnicas de Encerado II",
    story: [
      "Mateo profundizo en acabados avanzados, trabajando transiciones y texturas sobre madera y ceramica.",
      "El maestro compartio metodos de correccion de fallas y conservacion a largo plazo de las piezas.",
      "La practica final consistio en restaurar una pieza antigua aplicando el proceso completo.",
    ],
  },
  {
    id: "helena-takaoka-japon",
    image: "/draft/experiences/image (2).avif",
    user: { name: "Helena", country: "Brasil" },
    master: {
      craft: "Encerado Tradicional",
      name: "Takaoka",
      country: "Japon",
    },
    title: "Tecnicas de Encerado III",
    story: [
      "Helena trabajo en piezas de gran formato y aprendio a planificar el proceso por etapas.",
      "Se enfatizo el equilibrio entre acabado estetico y proteccion funcional en distintos climas.",
      "La experiencia cerro con una evaluacion personalizada y recomendaciones para su propio taller.",
    ],
  },
];
