import type { EditorialInfoPageContent } from "@/ui/EditorialInfoPage";

export type FooterPageKey =
  | "beAMasterPage"
  | "giftExperiencePage"
  | "termsPage"
  | "privacyPage";

export type FooterPagesMessages = Record<FooterPageKey, EditorialInfoPageContent>;

export const footerPageMessages: Record<string, FooterPagesMessages> = {
  en: {
    beAMasterPage: {
      eyebrow: "For masters",
      title: "Become a host master with Chaka",
      intro:
        "Chaka connects curious travelers with people who preserve living crafts, memories and practices. If you teach through experience, we can help you shape that knowledge into a clear, thoughtful and sustainable offering.",
      heroImage: "/draft/masters/master_5.avif",
      heroAlt: "Chaka master sharing her practice",
      stats: [
        { value: "1:1", label: "Editorial guidance to design your experience" },
        { value: "4", label: "Profile pillars: story, format, logistics and hospitality" },
        { value: "Global", label: "Visibility for travelers seeking meaningful learning" },
      ],
      quote:
        "We are not looking for generic classes. We are looking for encounters with voice, roots and an honest way of sharing a craft.",
      quoteAuthor: "Chaka curatorial team",
      sections: [
        {
          label: "01",
          title: "Your practice matters as much as the way you host",
          paragraphs: [
            "At Chaka we value experiences with identity: ceramics, cooking, weaving, music, calligraphy, farming, natural building or any practice shared with dedication.",
            "We work with you to translate that practice into an offering that a traveler can understand without losing the essence of your way of doing things.",
          ],
        },
        {
          label: "02",
          title: "We build a clear and bookable narrative with you",
          paragraphs: [
            "We help define duration, immersion level, ideal group size, materials, rhythms and the element that makes your experience distinct.",
            "The goal is for the traveler to understand what they will learn, how it may feel and why that encounter can only happen with you and in that place.",
          ],
        },
        {
          label: "03",
          title: "We curate quality without forcing a formula",
          paragraphs: [
            "We review safety, logistics clarity, expectations and the host experience so the encounter works well in practice.",
            "We do not impose a single template. Every master enters with their own rhythm, space and way of hosting, as long as the experience stays clear, respectful and consistent.",
          ],
        },
      ],
      checklistTitle: "What we usually assess",
      checklist: [
        "Real trajectory in the craft or practice you share.",
        "Ability to host people with care and context.",
        "A concrete proposal, even if it still needs refinement.",
        "Willingness to document the experience with images, timing and requirements.",
      ],
      cta: {
        title: "Tell us what knowledge you want to open to the world.",
        description:
          "If you feel your practice can become a transformative experience, let us talk. The first step is simple: to know you and understand how you do what you do.",
        primaryHref: "/contact",
        primaryLabel: "Apply as a master",
        secondaryHref: "/masters",
        secondaryLabel: "See active experiences",
      },
    },
    giftExperiencePage: {
      eyebrow: "Meaningful gifts",
      title: "Gift an experience that leaves a mark",
      intro:
        "A Chaka gift is not an object or a contextless booking. It is the possibility of learning from someone extraordinary in a real setting, with time to listen, practice and remember.",
      heroImage: "/draft/home/experience_card_1.avif",
      heroAlt: "Craft learning experience at Chaka",
      stats: [
        { value: "Flexible", label: "We choose the right format with you based on date, destination or budget" },
        { value: "Personal", label: "We can tailor the experience to the person receiving it" },
        { value: "Human", label: "We do not deliver a cold coupon, but a curated recommendation" },
      ],
      quote:
        "The best gifts do not stay in a drawer. They remain in the body, in memory and in the way a person looks at the world again.",
      quoteAuthor: "Chaka Journey",
      sections: [
        {
          label: "01",
          title: "We think about the person, not the inventory",
          paragraphs: [
            "Before suggesting an experience, we want to understand who it is for: what moves them, what sparks curiosity, whether they prefer something contemplative, manual, culinary or embodied.",
            "That allows us to suggest more precise encounters with a stronger chance of becoming a lasting memory.",
          ],
        },
        {
          label: "02",
          title: "Every experience has its own rhythm and atmosphere",
          paragraphs: [
            "Some gifts celebrate change, some thank a friendship, some surprise a partner and some accompany an important journey.",
            "We can help you choose between short experiences, multi day immersions or encounters designed for two or more people.",
          ],
        },
        {
          label: "03",
          title: "The experience starts before the trip",
          paragraphs: [
            "We also care about how it is delivered: a clear message, a thoughtful introduction and the feeling that the gift was chosen with real attention.",
            "If needed, we help present the proposal so the recipient understands its value from the very first moment.",
          ],
        },
      ],
      checklistTitle: "Ideal when you are looking for",
      checklist: [
        "A gift that is hard to forget.",
        "Something more personal than an object or a generic gift card.",
        "An experience aligned with creative, cultural or culinary interests.",
        "Guidance to choose without getting lost among too many options.",
      ],
      cta: {
        title: "We help you find the right experience.",
        description:
          "Write to us with the person's profile, your approximate budget and whether you already have a destination in mind. We will reply with a recommendation curated by the team.",
        primaryHref: "/contact",
        primaryLabel: "I want to gift an experience",
        secondaryHref: "/experiences",
        secondaryLabel: "See inspiration",
      },
    },
    termsPage: {
      eyebrow: "Terms of use",
      title: "Terms of Service",
      intro:
        "These guidelines summarize how Chaka operates. They are designed to protect travelers, masters and hosts, and to ensure every booking happens with clear expectations, mutual respect and shared responsibility.",
      heroImage: "/draft/us/image (3).jpg",
      heroAlt: "Chaka Journey gathering space",
      stats: [
        { value: "Bookings", label: "Subject to availability confirmed by the master or host" },
        { value: "Respect", label: "We expect careful conduct with people, spaces and materials" },
        { value: "Changes", label: "We may update conditions when operations require it" },
      ],
      quote:
        "A good experience starts when every party knows what to expect and commits to sustaining it.",
      quoteAuthor: "Chaka operating principle",
      sections: [
        {
          label: "01",
          title: "Bookings, availability and confirmations",
          paragraphs: [
            "Every booking depends on the real availability of the master, the space and the logistical conditions of the destination. Some experiences require manual validation before becoming confirmed.",
            "When you share information for a booking, we ask that it be accurate and up to date. This includes number of participants, special needs and realistic travel windows.",
          ],
        },
        {
          label: "02",
          title: "Responsible participation",
          paragraphs: [
            "Chaka experiences take place in workshops, homes, studios, kitchens, rural environments or community spaces. Anyone who books agrees to act respectfully toward people, practices, objects and cultural contexts.",
            "We do not tolerate aggressive, discriminatory or unsafe behavior that puts the host, the group or the environment at risk.",
          ],
        },
        {
          label: "03",
          title: "Changes, cancellations and service scope",
          paragraphs: [
            "In some cases an experience may need to be adjusted due to weather, health, material availability or force majeure. If that happens, we prioritize reasonable alternatives or rescheduling when viable.",
            "Chaka acts as a curatorial and operational platform for connection. Some specific conditions may vary by experience, and we will always share those details before final booking closure.",
          ],
        },
      ],
      checklistTitle: "In short",
      checklist: [
        "Booking implies accepting the specific conditions of each experience.",
        "Availability is not guaranteed until final confirmation.",
        "We expect respectful conduct throughout the process.",
        "We may update these terms to reflect operational or legal improvements.",
      ],
      cta: {
        title: "If you need clarification, let us talk before booking.",
        description:
          "We prefer to resolve questions directly and clearly, especially when an experience involves special conditions, transportation or prior preparation.",
        primaryHref: "/contact",
        primaryLabel: "Ask about conditions",
        secondaryHref: "/experiences",
        secondaryLabel: "Explore experiences",
      },
    },
    privacyPage: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      intro:
        "At Chaka we collect only the information needed to answer inquiries, coordinate bookings, improve the service and maintain clear communication with you. We do not treat your data as merchandise: we use it to operate with more care and clarity.",
      heroImage: "/draft/us/image (6).jpg",
      heroAlt: "Chaka Journey team in a calm conversation",
      stats: [
        { value: "Minimal", label: "We ask only for the data needed for contact and coordination" },
        { value: "Secure", label: "We limit access to sensitive information within the team" },
        { value: "Clear", label: "You can write to us to review, correct or delete your data" },
      ],
      quote:
        "Trust is also designed. That is why we explain what we collect, how we use it and how you can request changes.",
      quoteAuthor: "Chaka privacy policy",
      sections: [
        {
          label: "01",
          title: "What information we may collect",
          paragraphs: [
            "When you fill out a form or coordinate an experience, we may receive your name, email, country of origin, interests, tentative travel dates and any additional detail you choose to share.",
            "If you make a booking, we may also process data related to payment and the logistics needed to carry out the experience properly.",
          ],
        },
        {
          label: "02",
          title: "How we use that information",
          paragraphs: [
            "We use your data to answer messages, prepare proposals, confirm availability, coordinate bookings and keep relevant communication before and after the experience.",
            "We may also analyze aggregated information to better understand what travelers are looking for and improve how we present experiences.",
          ],
        },
        {
          label: "03",
          title: "Your rights and your options",
          paragraphs: [
            "You can request access, correction or deletion of your data by writing to us directly. You can also ask us to stop sending promotional messages.",
            "If we share information with third parties that are necessary to operate an experience, we aim to keep that exchange to the minimum required and tied to the booking you requested.",
          ],
        },
      ],
      checklistTitle: "Chaka commitments",
      checklist: [
        "Minimize collection of unnecessary data.",
        "Explain what we use your information for.",
        "Handle access, correction or deletion requests.",
        "Avoid uses unrelated to your relationship with the platform.",
      ],
      cta: {
        title: "If you want to review or delete your information, write to us.",
        description:
          "We handle privacy related requests directly. If you need to review your data or update information, we resolve it with you.",
        primaryHref: "/contact",
        primaryLabel: "Contact the team",
        secondaryHref: "/home",
        secondaryLabel: "Back to Chaka",
      },
    },
  },
  es: {
    beAMasterPage: {
      eyebrow: "Para maestros",
      title: "Se un maestro anfitrion en Chaka",
      intro:
        "Chaka conecta a viajeros curiosos con personas que resguardan oficios, memorias y practicas vivas. Si ensenas desde la experiencia, podemos ayudarte a convertir tu saber en una propuesta clara, cuidada y sostenible.",
      heroImage: "/draft/masters/master_5.avif",
      heroAlt: "Maestra de Chaka compartiendo su practica",
      stats: [
        { value: "1:1", label: "Acompanamiento editorial para disenar tu experiencia" },
        { value: "4", label: "Pilares del perfil: relato, formato, logistica y hospitalidad" },
        { value: "Global", label: "Visibilidad para viajeros que buscan aprendizaje con contexto" },
      ],
      quote:
        "No buscamos clases genericas. Buscamos encuentros con voz propia, arraigo y una forma honesta de compartir el oficio.",
      quoteAuthor: "Equipo curatorial de Chaka",
      sections: [
        {
          label: "01",
          title: "Tu practica importa tanto como tu manera de recibir",
          paragraphs: [
            "En Chaka nos interesan experiencias con identidad: ceramica, cocina, tejido, musica, caligrafia, agricultura, construccion natural o cualquier practica transmitida con dedicacion.",
            "Trabajamos contigo para traducir esa experiencia en una propuesta entendible para alguien que llega desde otro contexto sin perder la esencia de tu forma de hacer.",
          ],
        },
        {
          label: "02",
          title: "Construimos contigo una narrativa clara y reservable",
          paragraphs: [
            "Te ayudamos a definir duracion, nivel de inmersion, numero ideal de participantes, materiales, ritmos y lo que hace unica a tu experiencia.",
            "La idea es que el viajero entienda que va a aprender, como se sentira y por que ese encuentro solo puede suceder contigo y en ese territorio.",
          ],
        },
        {
          label: "03",
          title: "Curamos calidad sin convertirlo en una formula",
          paragraphs: [
            "Revisamos seguridad, claridad logistica, expectativas y experiencia de anfitrion para que el encuentro se sostenga bien en la practica.",
            "No imponemos un molde unico. Cada maestro entra con su ritmo, su espacio y su manera de recibir, siempre que la experiencia sea clara, respetuosa y consistente.",
          ],
        },
      ],
      checklistTitle: "Que solemos evaluar",
      checklist: [
        "Trayectoria real en el oficio o practica que compartes.",
        "Capacidad de recibir personas con contexto y cuidado.",
        "Una propuesta concreta, aunque todavia necesite afinarse.",
        "Disponibilidad para documentar la experiencia con fotos, tiempos y requerimientos.",
      ],
      cta: {
        title: "Cuentanos que saber quieres abrir al mundo.",
        description:
          "Si sientes que tu practica puede convertirse en una experiencia transformadora, conversemos. El primer paso es simple: conocerte y entender como haces lo que haces.",
        primaryHref: "/contact",
        primaryLabel: "Postular como maestro",
        secondaryHref: "/masters",
        secondaryLabel: "Ver experiencias activas",
      },
    },
    giftExperiencePage: {
      eyebrow: "Regalos con sentido",
      title: "Regala una experiencia que deje huella",
      intro:
        "Un regalo en Chaka no es un objeto ni una reserva sin contexto. Es la posibilidad de aprender con alguien extraordinario, en un entorno real, con tiempo para escuchar, practicar y recordar.",
      heroImage: "/draft/home/experience_card_1.avif",
      heroAlt: "Experiencia de aprendizaje artesanal en Chaka",
      stats: [
        { value: "Flexible", label: "Elegimos contigo el formato segun fecha, destino o presupuesto" },
        { value: "Personal", label: "Podemos orientar la experiencia al perfil de quien recibe" },
        { value: "Humano", label: "No entregamos un cupon frio, sino una recomendacion curada" },
      ],
      quote:
        "Los mejores regalos no se guardan en un cajon. Se quedan en el cuerpo, en la memoria y en la manera en que una persona vuelve a mirar el mundo.",
      quoteAuthor: "Chaka Journey",
      sections: [
        {
          label: "01",
          title: "Pensamos el regalo desde la persona, no desde el inventario",
          paragraphs: [
            "Antes de recomendar una experiencia, nos interesa entender para quien es: que le conmueve, que le da curiosidad, si prefiere algo contemplativo, manual, culinario o corporal.",
            "Eso nos permite sugerir encuentros mas precisos y con mayor potencial de convertirse en un recuerdo duradero.",
          ],
        },
        {
          label: "02",
          title: "Cada experiencia tiene un ritmo y una atmosfera distinta",
          paragraphs: [
            "Hay regalos para celebrar un cambio, agradecer una amistad, sorprender a una pareja o acompanar un viaje importante.",
            "Podemos ayudarte a elegir entre experiencias cortas, inmersiones de varios dias o encuentros pensados para compartir entre dos o mas personas.",
          ],
        },
        {
          label: "03",
          title: "La experiencia empieza antes del viaje",
          paragraphs: [
            "Tambien cuidamos la manera en que se entrega: un mensaje claro, una introduccion sensible y la sensacion de que lo regalado fue pensado con verdadera atencion.",
            "Si hace falta, te ayudamos a presentar la propuesta para que quien la reciba entienda su valor desde el primer momento.",
          ],
        },
      ],
      checklistTitle: "Ideal para regalar cuando buscas",
      checklist: [
        "Un obsequio dificil de olvidar.",
        "Algo mas personal que un objeto o una gift card generica.",
        "Una experiencia alineada a intereses creativos, culturales o gastronomicos.",
        "Acompanamiento para elegir sin perderte entre demasiadas opciones.",
      ],
      cta: {
        title: "Te ayudamos a encontrar la experiencia adecuada.",
        description:
          "Escribenos con el perfil de la persona, tu presupuesto aproximado y si ya tienes un destino en mente. Te responderemos con una recomendacion curada por el equipo.",
        primaryHref: "/contact",
        primaryLabel: "Quiero regalar una experiencia",
        secondaryHref: "/experiences",
        secondaryLabel: "Ver inspiracion",
      },
    },
    termsPage: {
      eyebrow: "Terminos de uso",
      title: "Terminos del servicio",
      intro:
        "Estos lineamientos resumen como operamos en Chaka. Buscan proteger a viajeros, maestros y anfitriones, y asegurar que cada reserva se haga con expectativas claras, respeto mutuo y responsabilidad compartida.",
      heroImage: "/draft/us/image (3).jpg",
      heroAlt: "Espacio de encuentro de Chaka Journey",
      stats: [
        { value: "Reservas", label: "Sujetas a disponibilidad confirmada por el maestro o anfitrion" },
        { value: "Respeto", label: "Esperamos una conducta cuidadosa con personas, espacios y materiales" },
        { value: "Cambios", label: "Podemos actualizar condiciones cuando la operacion lo requiera" },
      ],
      quote:
        "Una buena experiencia empieza cuando todas las partes saben que esperar y se comprometen a sostenerlo.",
      quoteAuthor: "Principio operativo de Chaka",
      sections: [
        {
          label: "01",
          title: "Reservas, disponibilidad y confirmaciones",
          paragraphs: [
            "Toda reserva depende de la disponibilidad real del maestro, del espacio y de las condiciones logisticas del destino. Algunas experiencias requieren validacion manual antes de quedar confirmadas.",
            "Cuando compartes informacion para reservar, te pedimos que sea precisa y actualizada. Eso incluye numero de participantes, necesidades especiales y ventanas reales de viaje.",
          ],
        },
        {
          label: "02",
          title: "Participacion responsable",
          paragraphs: [
            "Las experiencias de Chaka ocurren en talleres, hogares, estudios, cocinas, entornos rurales o espacios comunitarios. Quien reserva acepta actuar con respeto hacia personas, practicas, objetos y contextos culturales.",
            "No toleramos comportamientos agresivos, discriminatorios o que pongan en riesgo la integridad del anfitrion, del grupo o del entorno visitado.",
          ],
        },
        {
          label: "03",
          title: "Cambios, cancelaciones y alcance del servicio",
          paragraphs: [
            "En algunos casos una experiencia puede ajustarse por clima, salud, disponibilidad de materiales o motivos de fuerza mayor. Si ocurre, priorizamos ofrecer alternativas razonables o reprogramaciones cuando sea viable.",
            "Chaka actua como plataforma curatorial y operativa de conexion. Algunas condiciones especificas pueden variar segun la experiencia, por lo que siempre te compartiremos detalles antes del cierre final de la reserva.",
          ],
        },
      ],
      checklistTitle: "En resumen",
      checklist: [
        "Reservar implica aceptar condiciones especificas de cada experiencia.",
        "La disponibilidad no se garantiza hasta confirmacion final.",
        "Esperamos conducta respetuosa durante todo el proceso.",
        "Podemos modificar estos terminos para reflejar mejoras operativas o legales.",
      ],
      cta: {
        title: "Si necesitas una aclaracion, conversemos antes de reservar.",
        description:
          "Preferimos resolver dudas de forma directa y clara, especialmente cuando una experiencia requiere condiciones especiales, traslados o preparacion previa.",
        primaryHref: "/contact",
        primaryLabel: "Consultar condiciones",
        secondaryHref: "/experiences",
        secondaryLabel: "Explorar experiencias",
      },
    },
    privacyPage: {
      eyebrow: "Privacidad",
      title: "Politica de privacidad",
      intro:
        "En Chaka recogemos solo la informacion necesaria para responder consultas, coordinar reservas, mejorar el servicio y mantener una comunicacion clara contigo. No tratamos tus datos como mercancia: los usamos para operar mejor y con mas cuidado.",
      heroImage: "/draft/us/image (6).jpg",
      heroAlt: "Equipo de Chaka Journey en una conversacion tranquila",
      stats: [
        { value: "Minimo", label: "Pedimos solo los datos necesarios para contacto y coordinacion" },
        { value: "Seguro", label: "Limitamos el acceso a informacion sensible dentro del equipo" },
        { value: "Claro", label: "Puedes escribirnos para consultar, corregir o eliminar tus datos" },
      ],
      quote:
        "La confianza tambien se disena. Por eso explicamos que recogemos, para que lo usamos y como puedes pedir cambios.",
      quoteAuthor: "Politica de privacidad Chaka",
      sections: [
        {
          label: "01",
          title: "Que informacion podemos recopilar",
          paragraphs: [
            "Cuando llenas un formulario o coordinas una experiencia, podemos recibir tu nombre, correo, pais de origen, intereses, fechas tentativas de viaje y cualquier detalle adicional que tu mismo compartas.",
            "Si realizas una reserva, tambien podemos procesar datos asociados al pago y a la logistica necesaria para ejecutar la experiencia de forma correcta.",
          ],
        },
        {
          label: "02",
          title: "Como utilizamos esa informacion",
          paragraphs: [
            "Usamos tus datos para responder mensajes, preparar propuestas, confirmar disponibilidad, coordinar reservas y mantener una comunicacion relevante antes y despues de la experiencia.",
            "Tambien podemos analizar informacion agregada para entender mejor que buscan nuestros viajeros y mejorar como presentamos las experiencias.",
          ],
        },
        {
          label: "03",
          title: "Tus derechos y tus opciones",
          paragraphs: [
            "Puedes pedir acceso, correccion o eliminacion de tus datos escribiendonos directamente. Tambien puedes solicitar que dejemos de enviarte mensajes promocionales.",
            "Si compartimos informacion con terceros indispensables para operar una experiencia, procuramos que ese intercambio sea el minimo necesario y este relacionado con la reserva que solicitaste.",
          ],
        },
      ],
      checklistTitle: "Compromisos de Chaka",
      checklist: [
        "Reducir al minimo la recoleccion de datos innecesarios.",
        "Explicar para que usamos la informacion que compartes.",
        "Atender solicitudes de acceso, correccion o eliminacion.",
        "Evitar usos ajenos a la relacion entre tu y la plataforma.",
      ],
      cta: {
        title: "Si quieres revisar o eliminar tu informacion, escribenos.",
        description:
          "Atendemos solicitudes relacionadas con privacidad de forma directa. Si necesitas revisar tus datos o actualizar alguna informacion, lo resolvemos contigo.",
        primaryHref: "/contact",
        primaryLabel: "Contactar al equipo",
        secondaryHref: "/home",
        secondaryLabel: "Volver a Chaka",
      },
    },
  },
  fr: {
    beAMasterPage: {
      eyebrow: "Pour les maitres",
      title: "Devenez maitre hote avec Chaka",
      intro:
        "Chaka relie des voyageurs curieux a des personnes qui preservent des savoir faire, des memoires et des pratiques vivantes. Si vous enseignez par l'experience, nous pouvons vous aider a transformer ce savoir en une proposition claire, soignee et durable.",
      heroImage: "/draft/masters/master_5.avif",
      heroAlt: "Maitre Chaka partageant sa pratique",
      stats: [
        { value: "1:1", label: "Accompagnement editorial pour concevoir votre experience" },
        { value: "4", label: "Piliers du profil: recit, format, logistique et hospitalite" },
        { value: "Monde", label: "Visibilite pour les voyageurs en quete d'un apprentissage ancre" },
      ],
      quote:
        "Nous ne cherchons pas des cours generiques. Nous cherchons des rencontres avec une voix propre, des racines et une maniere honnete de transmettre un savoir faire.",
      quoteAuthor: "Equipe curatoriale Chaka",
      sections: [
        {
          label: "01",
          title: "Votre pratique compte autant que votre facon d'accueillir",
          paragraphs: [
            "Chez Chaka, nous recherchons des experiences avec identite: ceramique, cuisine, tissage, musique, calligraphie, agriculture, construction naturelle ou toute pratique transmise avec dedication.",
            "Nous travaillons avec vous pour traduire cette experience en une proposition comprehensible pour un voyageur sans perdre l'essence de votre geste.",
          ],
        },
        {
          label: "02",
          title: "Nous construisons avec vous un recit clair et reservable",
          paragraphs: [
            "Nous vous aidons a definir la duree, le niveau d'immersion, la taille ideale du groupe, les materiaux, les rythmes et ce qui rend votre experience unique.",
            "L'objectif est que le voyageur comprenne ce qu'il va apprendre, comment il pourra se sentir et pourquoi cette rencontre ne peut avoir lieu qu'avec vous et dans ce territoire.",
          ],
        },
        {
          label: "03",
          title: "Nous soignons la qualite sans imposer une formule",
          paragraphs: [
            "Nous examinons la securite, la clarte logistique, les attentes et l'experience d'accueil afin que la rencontre fonctionne dans la realite.",
            "Nous n'imposons pas de modele unique. Chaque maitre arrive avec son rythme, son espace et sa maniere d'accueillir, tant que l'experience reste claire, respectueuse et coherente.",
          ],
        },
      ],
      checklistTitle: "Ce que nous evaluons",
      checklist: [
        "Un vrai parcours dans le savoir faire ou la pratique partagee.",
        "La capacite d'accueillir avec soin et contexte.",
        "Une proposition concrete, meme encore a affiner.",
        "La disponibilite pour documenter l'experience avec images, temps et besoins.",
      ],
      cta: {
        title: "Dites nous quel savoir vous voulez ouvrir au monde.",
        description:
          "Si vous sentez que votre pratique peut devenir une experience transformatrice, parlons en. La premiere etape est simple: vous connaitre et comprendre comment vous faites ce que vous faites.",
        primaryHref: "/contact",
        primaryLabel: "Postuler comme maitre",
        secondaryHref: "/masters",
        secondaryLabel: "Voir les experiences actives",
      },
    },
    giftExperiencePage: {
      eyebrow: "Cadeaux porteurs de sens",
      title: "Offrez une experience qui laisse une trace",
      intro:
        "Un cadeau Chaka n'est ni un objet ni une reservation sans contexte. C'est la possibilite d'apprendre avec quelqu'un d'extraordinaire, dans un cadre reel, avec le temps d'ecouter, de pratiquer et de se souvenir.",
      heroImage: "/draft/home/experience_card_1.avif",
      heroAlt: "Experience artisanale Chaka",
      stats: [
        { value: "Souple", label: "Nous choisissons avec vous le bon format selon la date, la destination ou le budget" },
        { value: "Personnel", label: "Nous pouvons adapter l'experience a la personne qui la recoit" },
        { value: "Humain", label: "Nous ne livrons pas un coupon froid, mais une recommandation soignee" },
      ],
      quote:
        "Les meilleurs cadeaux ne restent pas dans un tiroir. Ils demeurent dans le corps, dans la memoire et dans la maniere de regarder le monde autrement.",
      quoteAuthor: "Chaka Journey",
      sections: [
        {
          label: "01",
          title: "Nous pensons d'abord a la personne",
          paragraphs: [
            "Avant de recommander une experience, nous voulons comprendre a qui elle s'adresse: ce qui l'emouvra, ce qui eveille sa curiosite, si elle prefere quelque chose de contemplatif, manuel, culinaire ou corporel.",
            "Cela nous permet de proposer des rencontres plus justes, avec davantage de chances de devenir un souvenir durable.",
          ],
        },
        {
          label: "02",
          title: "Chaque experience a son rythme et son atmosphere",
          paragraphs: [
            "Certains cadeaux celebrent un changement, d'autres remercient une amitie, surprennent un partenaire ou accompagnent un voyage important.",
            "Nous pouvons vous aider a choisir entre des experiences courtes, des immersions de plusieurs jours ou des rencontres concues pour deux personnes ou davantage.",
          ],
        },
        {
          label: "03",
          title: "L'experience commence avant le voyage",
          paragraphs: [
            "Nous soignons aussi la maniere de l'offrir: un message clair, une introduction sensible et la sensation qu'il a ete choisi avec une vraie attention.",
            "Si besoin, nous vous aidons a presenter la proposition pour que la personne comprenne sa valeur des le premier instant.",
          ],
        },
      ],
      checklistTitle: "Ideal si vous cherchez",
      checklist: [
        "Un cadeau difficile a oublier.",
        "Quelque chose de plus personnel qu'un objet ou une carte cadeau generique.",
        "Une experience en lien avec des interets creatifs, culturels ou culinaires.",
        "Un accompagnement pour choisir sans vous perdre parmi trop d'options.",
      ],
      cta: {
        title: "Nous vous aidons a trouver l'experience juste.",
        description:
          "Ecrivez nous avec le profil de la personne, votre budget approximatif et si vous avez deja une destination en tete. Nous vous repondrons avec une recommandation soignee par l'equipe.",
        primaryHref: "/contact",
        primaryLabel: "Je veux offrir une experience",
        secondaryHref: "/experiences",
        secondaryLabel: "Voir des inspirations",
      },
    },
    termsPage: {
      eyebrow: "Conditions d'utilisation",
      title: "Conditions d'utilisation",
      intro:
        "Ces lignes directrices resumment la maniere dont Chaka opere. Elles visent a proteger les voyageurs, les maitres et les hotes et a faire en sorte que chaque reservation se fasse avec des attentes claires, du respect mutuel et une responsabilite partagee.",
      heroImage: "/draft/us/image (3).jpg",
      heroAlt: "Lieu de rencontre Chaka Journey",
      stats: [
        { value: "Reservations", label: "Sous reserve de disponibilite confirmee par le maitre ou l'hote" },
        { value: "Respect", label: "Nous attendons une conduite attentive envers les personnes, les lieux et les materiaux" },
        { value: "Mises a jour", label: "Nous pouvons adapter les conditions si l'operation l'exige" },
      ],
      quote:
        "Une bonne experience commence lorsque chacun sait a quoi s'attendre et s'engage a le soutenir.",
      quoteAuthor: "Principe operationnel de Chaka",
      sections: [
        {
          label: "01",
          title: "Reservations, disponibilite et confirmations",
          paragraphs: [
            "Chaque reservation depend de la disponibilite reelle du maitre, du lieu et des conditions logistiques de la destination. Certaines experiences necessitent une validation manuelle avant confirmation.",
            "Lorsque vous partagez des informations pour reserver, nous vous demandons qu'elles soient exactes et a jour. Cela inclut le nombre de participants, les besoins particuliers et les periodes de voyage reelles.",
          ],
        },
        {
          label: "02",
          title: "Participation responsable",
          paragraphs: [
            "Les experiences Chaka ont lieu dans des ateliers, des maisons, des studios, des cuisines, des environnements ruraux ou des espaces communautaires. Toute personne qui reserve s'engage a agir avec respect envers les personnes, les pratiques, les objets et les contextes culturels.",
            "Nous ne tolerons aucun comportement agressif, discriminatoire ou dangereux pour l'hote, le groupe ou l'environnement.",
          ],
        },
        {
          label: "03",
          title: "Changements, annulations et perimetre du service",
          paragraphs: [
            "Dans certains cas, une experience peut etre ajustee en raison de la meteo, de la sante, de la disponibilite des materiaux ou d'un cas de force majeure. Si cela arrive, nous privilegions des alternatives raisonnables ou un report lorsque c'est possible.",
            "Chaka agit comme plateforme curatoriale et operationnelle de mise en relation. Certaines conditions peuvent varier selon l'experience et nous partagerons toujours ces details avant la validation finale.",
          ],
        },
      ],
      checklistTitle: "En bref",
      checklist: [
        "Reserver implique d'accepter les conditions propres a chaque experience.",
        "La disponibilite n'est pas garantie avant la confirmation finale.",
        "Nous attendons une conduite respectueuse tout au long du processus.",
        "Nous pouvons mettre a jour ces conditions pour des raisons operationnelles ou legales.",
      ],
      cta: {
        title: "Si vous avez besoin d'une precision, parlons en avant de reserver.",
        description:
          "Nous preferons repondre aux questions de maniere directe et claire, surtout lorsqu'une experience implique des conditions particulieres, des trajets ou une preparation prealable.",
        primaryHref: "/contact",
        primaryLabel: "Poser une question",
        secondaryHref: "/experiences",
        secondaryLabel: "Explorer les experiences",
      },
    },
    privacyPage: {
      eyebrow: "Confidentialite",
      title: "Politique de confidentialite",
      intro:
        "Chez Chaka, nous ne recueillons que les informations necessaires pour repondre aux demandes, coordonner les reservations, ameliorer le service et maintenir une communication claire avec vous. Nous ne traitons pas vos donnees comme une marchandise.",
      heroImage: "/draft/us/image (6).jpg",
      heroAlt: "Equipe Chaka Journey en conversation",
      stats: [
        { value: "Minimal", label: "Nous demandons uniquement les donnees necessaires au contact et a la coordination" },
        { value: "Securise", label: "Nous limitons l'acces aux informations sensibles au sein de l'equipe" },
        { value: "Clair", label: "Vous pouvez nous ecrire pour consulter, corriger ou supprimer vos donnees" },
      ],
      quote:
        "La confiance se concoit aussi. C'est pourquoi nous expliquons ce que nous collectons, comment nous l'utilisons et comment demander des changements.",
      quoteAuthor: "Politique de confidentialite Chaka",
      sections: [
        {
          label: "01",
          title: "Quelles informations nous pouvons collecter",
          paragraphs: [
            "Lorsque vous remplissez un formulaire ou coordonnez une experience, nous pouvons recevoir votre nom, votre courriel, votre pays d'origine, vos interets, vos dates de voyage envisagees et tout detail supplementaire que vous choisissez de partager.",
            "Si vous effectuez une reservation, nous pouvons aussi traiter des donnees liees au paiement et a la logistique necessaire pour bien executer l'experience.",
          ],
        },
        {
          label: "02",
          title: "Comment nous utilisons ces informations",
          paragraphs: [
            "Nous utilisons vos donnees pour repondre aux messages, preparer des propositions, confirmer les disponibilites, coordonner les reservations et maintenir une communication pertinente avant et apres l'experience.",
            "Nous pouvons egalement analyser des informations agregees pour mieux comprendre ce que recherchent les voyageurs et ameliorer la presentation des experiences.",
          ],
        },
        {
          label: "03",
          title: "Vos droits et vos options",
          paragraphs: [
            "Vous pouvez demander l'acces, la correction ou la suppression de vos donnees en nous ecrivant directement. Vous pouvez aussi demander l'arret des messages promotionnels.",
            "Si nous partageons des informations avec des tiers indispensables au fonctionnement d'une experience, nous visons a limiter cet echange au strict necessaire et a la reservation demandee.",
          ],
        },
      ],
      checklistTitle: "Engagements de Chaka",
      checklist: [
        "Reduire au minimum la collecte de donnees inutiles.",
        "Expliquer a quoi sert l'information partagee.",
        "Traiter les demandes d'acces, de correction ou de suppression.",
        "Eviter les usages sans lien avec votre relation a la plateforme.",
      ],
      cta: {
        title: "Si vous voulez consulter ou supprimer vos informations, ecrivez nous.",
        description:
          "Nous traitons directement les demandes liees a la confidentialite. Si vous devez verifier ou mettre a jour vos donnees, nous le faisons avec vous.",
        primaryHref: "/contact",
        primaryLabel: "Contacter l'equipe",
        secondaryHref: "/home",
        secondaryLabel: "Retour a Chaka",
      },
    },
  },
  de: {
    beAMasterPage: {
      eyebrow: "Fur Meister",
      title: "Werde Gastgeber-Meister bei Chaka",
      intro:
        "Chaka verbindet neugierige Reisende mit Menschen, die lebendige Handwerke, Erinnerungen und Praktiken bewahren. Wenn du durch Erfahrung lehrst, helfen wir dir dabei, dieses Wissen in ein klares, sorgfaltig gestaltetes und tragfahiges Angebot zu ubersetzen.",
      heroImage: "/draft/masters/master_5.avif",
      heroAlt: "Chaka Meisterin bei ihrer Praxis",
      stats: [
        { value: "1:1", label: "Redaktionelle Begleitung fur die Gestaltung deiner Erfahrung" },
        { value: "4", label: "Profilpfeiler: Geschichte, Format, Logistik und Gastfreundschaft" },
        { value: "Global", label: "Sichtbarkeit fur Reisende, die sinnvolles Lernen suchen" },
      ],
      quote:
        "Wir suchen keine generischen Kurse. Wir suchen Begegnungen mit eigener Stimme, Verwurzelung und einer ehrlichen Art, ein Handwerk zu teilen.",
      quoteAuthor: "Chaka Kurations-Team",
      sections: [
        {
          label: "01",
          title: "Deine Praxis ist genauso wichtig wie deine Art zu empfangen",
          paragraphs: [
            "Bei Chaka interessieren uns Erfahrungen mit Identitat: Keramik, Kochen, Weben, Musik, Kalligrafie, Landwirtschaft, Naturbau oder jede Praxis, die mit Hingabe weitergegeben wird.",
            "Wir arbeiten mit dir daran, diese Erfahrung so zu ubersetzen, dass Reisende sie verstehen konnen, ohne dass die Essenz deiner Arbeitsweise verloren geht.",
          ],
        },
        {
          label: "02",
          title: "Wir entwickeln mit dir eine klare und buchbare Erzahlung",
          paragraphs: [
            "Wir helfen dir, Dauer, Intensitat, ideale Gruppengrosse, Materialien, Rhythmus und das Besondere deiner Erfahrung zu definieren.",
            "Ziel ist, dass Reisende verstehen, was sie lernen werden, wie es sich anfuhlen kann und warum diese Begegnung nur mit dir und an diesem Ort moglich ist.",
          ],
        },
        {
          label: "03",
          title: "Wir kuratieren Qualitat ohne starre Formel",
          paragraphs: [
            "Wir prufen Sicherheit, logistische Klarheit, Erwartungen und Gastgeberqualitat, damit die Begegnung auch praktisch funktioniert.",
            "Wir zwingen niemanden in ein einheitliches Format. Jeder Meister bringt seinen eigenen Rhythmus, Raum und Stil mit, solange die Erfahrung klar, respektvoll und konsistent bleibt.",
          ],
        },
      ],
      checklistTitle: "Was wir meist prufen",
      checklist: [
        "Echte Erfahrung im Handwerk oder in der Praxis, die du teilst.",
        "Fahigkeit, Menschen mit Sorgfalt und Kontext zu empfangen.",
        "Ein konkreter Vorschlag, auch wenn er noch Feinschliff braucht.",
        "Bereitschaft, die Erfahrung mit Bildern, Zeiten und Anforderungen zu dokumentieren.",
      ],
      cta: {
        title: "Erzahl uns, welches Wissen du fur die Welt offnen willst.",
        description:
          "Wenn du das Gefuhl hast, dass deine Praxis zu einer transformierenden Erfahrung werden kann, dann lass uns sprechen. Der erste Schritt ist einfach: dich kennenzulernen und zu verstehen, wie du arbeitest.",
        primaryHref: "/contact",
        primaryLabel: "Als Meister bewerben",
        secondaryHref: "/masters",
        secondaryLabel: "Aktive Erfahrungen ansehen",
      },
    },
    giftExperiencePage: {
      eyebrow: "Geschenke mit Bedeutung",
      title: "Schenke eine Erfahrung, die Spuren hinterlasst",
      intro:
        "Ein Chaka Geschenk ist weder ein Gegenstand noch eine kontextlose Buchung. Es ist die Moglichkeit, von einer aussergewohnlichen Person in einem echten Umfeld zu lernen, mit Zeit zum Zuhoren, Uben und Erinnern.",
      heroImage: "/draft/home/experience_card_1.avif",
      heroAlt: "Handwerkliche Lernerfahrung bei Chaka",
      stats: [
        { value: "Flexibel", label: "Wir finden mit dir das richtige Format nach Datum, Reiseziel oder Budget" },
        { value: "Personlich", label: "Wir konnen die Erfahrung auf die beschenkte Person abstimmen" },
        { value: "Menschlich", label: "Wir liefern keinen kalten Gutschein, sondern eine kuratierte Empfehlung" },
      ],
      quote:
        "Die besten Geschenke bleiben nicht in einer Schublade. Sie bleiben im Korper, in der Erinnerung und in der Art, wie jemand die Welt wieder betrachtet.",
      quoteAuthor: "Chaka Journey",
      sections: [
        {
          label: "01",
          title: "Wir denken zuerst an die Person, nicht an das Inventar",
          paragraphs: [
            "Bevor wir eine Erfahrung empfehlen, wollen wir verstehen, fur wen sie gedacht ist: was beruhrt, was Neugier weckt und ob die Person eher etwas Kontemplatives, Handwerkliches, Kulinarisches oder Korperliches bevorzugt.",
            "So konnen wir prazisere Begegnungen empfehlen, die eher zu einer bleibenden Erinnerung werden.",
          ],
        },
        {
          label: "02",
          title: "Jede Erfahrung hat ihren eigenen Rhythmus und ihre Atmosphare",
          paragraphs: [
            "Manche Geschenke feiern einen Wandel, andere danken fur eine Freundschaft, uberraschen einen Partner oder begleiten eine wichtige Reise.",
            "Wir helfen dir bei der Wahl zwischen kurzen Erfahrungen, mehrtagigen Immersionen oder Begegnungen fur zwei oder mehr Personen.",
          ],
        },
        {
          label: "03",
          title: "Die Erfahrung beginnt vor der Reise",
          paragraphs: [
            "Uns ist auch wichtig, wie sie ubergeben wird: mit einer klaren Botschaft, einer sensiblen Einfuhrung und dem Gefuhl, dass dieses Geschenk mit echter Aufmerksamkeit gewahlt wurde.",
            "Falls notig, helfen wir dir dabei, den Vorschlag so zu prasentieren, dass der Wert sofort verstandlich wird.",
          ],
        },
      ],
      checklistTitle: "Ideal, wenn du suchst",
      checklist: [
        "Ein Geschenk, das schwer zu vergessen ist.",
        "Etwas Personlicheres als einen Gegenstand oder einen generischen Gutschein.",
        "Eine Erfahrung, die zu kreativen, kulturellen oder kulinarischen Interessen passt.",
        "Begleitung bei der Auswahl ohne Uberforderung durch zu viele Optionen.",
      ],
      cta: {
        title: "Wir helfen dir, die passende Erfahrung zu finden.",
        description:
          "Schreib uns mit dem Profil der Person, deinem ungefahren Budget und ob du bereits ein Reiseziel im Kopf hast. Wir antworten mit einer kuratierten Empfehlung des Teams.",
        primaryHref: "/contact",
        primaryLabel: "Ich mochte eine Erfahrung verschenken",
        secondaryHref: "/experiences",
        secondaryLabel: "Inspiration ansehen",
      },
    },
    termsPage: {
      eyebrow: "Nutzungsbedingungen",
      title: "Nutzungsbedingungen",
      intro:
        "Diese Leitlinien fassen zusammen, wie Chaka arbeitet. Sie sollen Reisende, Meister und Gastgeber schutzen und sicherstellen, dass jede Buchung mit klaren Erwartungen, gegenseitigem Respekt und geteilter Verantwortung erfolgt.",
      heroImage: "/draft/us/image (3).jpg",
      heroAlt: "Begegnungsraum von Chaka Journey",
      stats: [
        { value: "Buchungen", label: "Abhangig von der vom Meister oder Gastgeber bestatigten Verfugbarkeit" },
        { value: "Respekt", label: "Wir erwarten einen achtsamen Umgang mit Menschen, Orten und Materialien" },
        { value: "Anderungen", label: "Wir konnen Bedingungen aktualisieren, wenn der Betrieb es erfordert" },
      ],
      quote:
        "Eine gute Erfahrung beginnt dann, wenn alle Beteiligten wissen, was sie erwartet, und bereit sind, es mitzutragen.",
      quoteAuthor: "Chaka Betriebsprinzip",
      sections: [
        {
          label: "01",
          title: "Buchungen, Verfugbarkeit und Bestatigungen",
          paragraphs: [
            "Jede Buchung hangt von der tatsachlichen Verfugbarkeit des Meisters, des Ortes und der logistischen Bedingungen des Reiseziels ab. Einige Erfahrungen erfordern vor der Bestatigung eine manuelle Prufung.",
            "Wenn du Informationen fur eine Buchung teilst, sollen sie korrekt und aktuell sein. Dazu zahlen die Anzahl der Teilnehmenden, besondere Bedurfnisse und realistische Reisezeiten.",
          ],
        },
        {
          label: "02",
          title: "Verantwortungsvolle Teilnahme",
          paragraphs: [
            "Chaka Erfahrungen finden in Werkstatten, Hausern, Studios, Kuchen, landlichen Umgebungen oder Gemeinschaftsraumen statt. Wer bucht, verpflichtet sich zu einem respektvollen Umgang mit Menschen, Praktiken, Objekten und kulturellen Kontexten.",
            "Aggressives, diskriminierendes oder unsicheres Verhalten, das Gastgeber, Gruppe oder Umgebung gefahrdet, wird nicht toleriert.",
          ],
        },
        {
          label: "03",
          title: "Anderungen, Stornierungen und Leistungsumfang",
          paragraphs: [
            "In manchen Fallen muss eine Erfahrung wegen Wetter, Gesundheit, Materialverfugbarkeit oder hoherer Gewalt angepasst werden. In solchen Fallen priorisieren wir verhaltnismassige Alternativen oder Umbuchungen, wenn dies moglich ist.",
            "Chaka arbeitet als kuratorische und operative Plattform der Verbindung. Manche Bedingungen konnen je nach Erfahrung variieren, und wir teilen diese Details immer vor dem finalen Abschluss der Buchung.",
          ],
        },
      ],
      checklistTitle: "Kurz gesagt",
      checklist: [
        "Mit der Buchung werden die spezifischen Bedingungen jeder Erfahrung akzeptiert.",
        "Verfugbarkeit ist erst nach finaler Bestatigung garantiert.",
        "Wir erwarten respektvolles Verhalten wahrend des gesamten Prozesses.",
        "Wir konnen diese Bedingungen aus betrieblichen oder rechtlichen Grunden aktualisieren.",
      ],
      cta: {
        title: "Wenn du eine Klarung brauchst, sprich mit uns vor der Buchung.",
        description:
          "Wir beantworten Fragen lieber direkt und klar, besonders wenn eine Erfahrung besondere Bedingungen, Transporte oder Vorbereitung erfordert.",
        primaryHref: "/contact",
        primaryLabel: "Bedingungen anfragen",
        secondaryHref: "/experiences",
        secondaryLabel: "Erfahrungen entdecken",
      },
    },
    privacyPage: {
      eyebrow: "Datenschutz",
      title: "Datenschutzerklarung",
      intro:
        "Bei Chaka erfassen wir nur die Informationen, die wir brauchen, um Anfragen zu beantworten, Buchungen zu koordinieren, den Service zu verbessern und klar mit dir zu kommunizieren. Wir behandeln deine Daten nicht wie Ware.",
      heroImage: "/draft/us/image (6).jpg",
      heroAlt: "Chaka Journey Team im Gesprach",
      stats: [
        { value: "Minimal", label: "Wir fragen nur die Daten ab, die fur Kontakt und Koordination notwendig sind" },
        { value: "Sicher", label: "Wir beschranken den Zugriff auf sensible Informationen im Team" },
        { value: "Klar", label: "Du kannst uns schreiben, um Daten einzusehen, zu korrigieren oder zu loschen" },
      ],
      quote:
        "Vertrauen wird ebenfalls gestaltet. Deshalb erklaren wir, was wir erfassen, wofur wir es nutzen und wie du Anderungen anfragen kannst.",
      quoteAuthor: "Chaka Datenschutzrichtlinie",
      sections: [
        {
          label: "01",
          title: "Welche Informationen wir erfassen konnen",
          paragraphs: [
            "Wenn du ein Formular ausfullst oder eine Erfahrung koordinierst, konnen wir deinen Namen, deine E Mail Adresse, dein Herkunftsland, Interessen, geplante Reisedaten und weitere freiwillig geteilte Angaben erhalten.",
            "Wenn du eine Buchung vornimmst, konnen wir zudem Daten verarbeiten, die mit Zahlung und der fur die Durchfuhrung notwendigen Logistik zusammenhangen.",
          ],
        },
        {
          label: "02",
          title: "Wie wir diese Informationen nutzen",
          paragraphs: [
            "Wir nutzen deine Daten, um Nachrichten zu beantworten, Vorschlage vorzubereiten, Verfugbarkeiten zu bestatigen, Buchungen zu koordinieren und relevante Kommunikation vor und nach der Erfahrung aufrechtzuerhalten.",
            "Ausserdem konnen wir aggregierte Informationen analysieren, um besser zu verstehen, wonach Reisende suchen, und um die Darstellung der Erfahrungen zu verbessern.",
          ],
        },
        {
          label: "03",
          title: "Deine Rechte und Moglichkeiten",
          paragraphs: [
            "Du kannst Zugang, Berichtigung oder Loschung deiner Daten anfordern, indem du uns direkt schreibst. Ebenso kannst du verlangen, keine Werbenachrichten mehr zu erhalten.",
            "Wenn wir Informationen mit Dritten teilen, die fur die Durchfuhrung einer Erfahrung notwendig sind, beschranken wir diesen Austausch auf das Minimum und auf die von dir angefragte Buchung.",
          ],
        },
      ],
      checklistTitle: "Chaka Verpflichtungen",
      checklist: [
        "Die Erhebung unnotiger Daten minimieren.",
        "Erklaren, wofur wir deine Informationen verwenden.",
        "Anfragen zu Auskunft, Berichtigung oder Loschung bearbeiten.",
        "Nutzungen ausserhalb deiner Beziehung zur Plattform vermeiden.",
      ],
      cta: {
        title: "Wenn du deine Informationen prufen oder loschen willst, schreib uns.",
        description:
          "Wir bearbeiten datenschutzbezogene Anfragen direkt. Wenn du deine Daten einsehen oder aktualisieren musst, losen wir das gemeinsam mit dir.",
        primaryHref: "/contact",
        primaryLabel: "Team kontaktieren",
        secondaryHref: "/home",
        secondaryLabel: "Zuruck zu Chaka",
      },
    },
  },
};

export function getFooterPageContent(
  messages: Record<string, unknown>,
  pageKey: FooterPageKey
): EditorialInfoPageContent {
  const footerPages = messages.FooterPages as Partial<FooterPagesMessages> | undefined;
  return footerPages?.[pageKey] || footerPageMessages.en[pageKey];
}