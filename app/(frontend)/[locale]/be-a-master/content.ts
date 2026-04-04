export type CriteriaItem = {
  id: string;
  body: string;
};

export type BeAMasterContent = {
  heroTitle: string;
  getStarted: string;
  criteriaHeading: string;
  continueLabel: string;
  criteria: CriteriaItem[];
};

export const contentByLocale: Record<string, BeAMasterContent> = {
  es: {
    heroTitle: 'Comparte el oficio que has perfeccionado durante años con mentes curiosas y nuevas generaciones.',
    getStarted: 'Comenzar',
    criteriaHeading: 'Antes de comenzar, esto es lo que buscamos en un maestro Chaka',
    continueLabel: 'Continuar al formulario',
    criteria: [
      { id: '01', body: 'Maestros con dominio real de su oficio y capacidad de enseñar a niveles inicial, intermedio y avanzado.' },
      { id: '02', body: 'Personas con taller propio o acceso a un espacio apto para recibir entre 1 y 4 invitados.' },
      { id: '03', body: 'Experiencias estructuradas, claras y seguras, con una narrativa autentica del territorio y la practica.' },
      { id: '04', body: 'Maestros comprometidos con su comunidad local y abiertos a compartir su contexto cultural.' },
      { id: '05', body: 'Disponibilidad real para recibir invitados de manera consistente durante el mes.' },
      { id: '06', body: 'Disposicion para construir una alianza de largo plazo basada en respeto, calidad y mejora continua.' },
    ],
  },
  en: {
    heroTitle: 'Share the craft you have mastered over the years with curious minds and future generations.',
    getStarted: 'Get Started',
    criteriaHeading: 'Before we begin, here is what we look for in a Chaka master',
    continueLabel: 'Continue to contact form',
    criteria: [
      { id: '01', body: 'Artists with real mastery of their craft and the ability to teach beginner, intermediate, and advanced levels.' },
      { id: '02', body: 'Artists with their own studio or access to a suitable space to host 1-4 guests.' },
      { id: '03', body: 'Structured, safe and clear experiences with an authentic narrative tied to place and practice.' },
      { id: '04', body: 'Artists who actively contribute to their local community and can share cultural context.' },
      { id: '05', body: 'Reliable availability to host guests consistently throughout the month.' },
      { id: '06', body: 'Willingness to build a long-term partnership based on respect, quality and continuous improvement.' },
    ],
  },
  fr: {
    heroTitle: 'Partagez le savoir-faire que vous avez maitrise pendant des annees avec des esprits curieux.',
    getStarted: 'Commencer',
    criteriaHeading: 'Avant de commencer, voici ce que nous recherchons chez un maitre Chaka',
    continueLabel: 'Continuer vers le formulaire',
    criteria: [
      { id: '01', body: 'Maitres avec une vraie maitrise de leur pratique et capacite a enseigner tous les niveaux.' },
      { id: '02', body: 'Personnes avec un atelier propre ou un espace adapte pour accueillir 1 a 4 invites.' },
      { id: '03', body: 'Experiences structurees, sures et claires, reliees au territoire et a la pratique.' },
      { id: '04', body: 'Maitres impliques dans leur communaute et capables de partager leur contexte culturel.' },
      { id: '05', body: 'Disponibilite reelle pour accueillir des invites de maniere reguliere.' },
      { id: '06', body: 'Volonte de construire un partenariat durable fonde sur le respect et la qualite.' },
    ],
  },
  de: {
    heroTitle: 'Teile dein Handwerk, das du uber Jahre gemeistert hast, mit neugierigen Menschen und neuen Generationen.',
    getStarted: 'Starten',
    criteriaHeading: 'Bevor wir beginnen: Das suchen wir bei einem Chaka Meister',
    continueLabel: 'Weiter zum Kontaktformular',
    criteria: [
      { id: '01', body: 'Meister mit echter Fachkompetenz und der Fahigkeit, Anfanger, Fortgeschrittene und Profis zu unterrichten.' },
      { id: '02', body: 'Personen mit eigenem Studio oder Zugang zu einem geeigneten Raum fur 1-4 Gaste.' },
      { id: '03', body: 'Strukturierte, sichere und klare Erlebnisse mit authentischem Bezug zu Ort und Praxis.' },
      { id: '04', body: 'Meister, die ihre lokale Gemeinschaft aktiv mitgestalten und kulturellen Kontext teilen.' },
      { id: '05', body: 'Zuverlassige Verfugbarkeit, um regelmassig Gaste im Monat zu empfangen.' },
      { id: '06', body: 'Bereitschaft fur eine langfristige Partnerschaft auf Basis von Respekt und Qualitat.' },
    ],
  },
};
