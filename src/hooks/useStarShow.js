
import { useCallback, useEffect, useState } from 'react';

const formations = [
  // 1. INICIO
  {
    id: 'greeting',
    type: 'text',
    value: 'HOLA DAYANA',
  },
  {
    id: 'intro',
    type: 'text',
    value: 'HE PREPARADO ALGO PARA TI',
  },
  {
    id: 'special',
    type: 'text',
    value: 'QUIERO DECIRTE ALGO',
  },

  // 2. LO QUE SIENTO POR TI
  {
    id: 'love',
    type: 'text',
    value: 'TE AMO MUCHO',
  },
  {
    id: 'reason',
    type: 'text',
    value: 'ERES MI PERSONA FAVORITA',
  },
  {
    id: 'happiness',
    type: 'text',
    value: 'CONTIGO SOY FELIZ',
  },
  {
    id: 'beautiful',
    type: 'text',
    value: 'HACES MI MUNDO MEJOR',
  },
  {
    id: 'gratitude',
    type: 'text',
    value: 'GRACIAS POR EXISTIR',
  },
  {
    id: 'heart',
    type: 'heart',
    value: 'TE AMO',
  },

  // 3. NUESTRO AMOR A DISTANCIA
  {
    id: 'distance',
    type: 'text',
    value: 'AUNQUE ESTEMOS LEJOS',
  },
  {
    id: 'close',
    type: 'text',
    value: 'TE SIENTO CERCA DE MI',
  },
  {
    id: 'memories',
    type: 'text',
    value: 'AMO CADA MOMENTO CONTIGO',
  },
  {
    id: 'miss-you',
    type: 'text',
    value: 'TE EXTRAÑO CADA DIA',
  },
  {
    id: 'hug',
    type: 'text',
    value: 'SUEÑO CON ABRAZARTE',
  },

  // 4. MIS ERRORES Y MI COMPROMISO
  {
    id: 'sorry',
    type: 'text',
    value: 'PERDONAME POR MIS ERRORES',
  },
  {
    id: 'improve',
    type: 'text',
    value: 'QUIERO SER MEJOR PARA TI',
  },
  {
    id: 'care',
    type: 'text',
    value: 'QUIERO CUIDAR DE NOSOTROS',
  },
  {
    id: 'fear',
    type: 'text',
    value: 'QUIERO SEGUIR HACIENDOTE FELIZ',
  },

  // 5. NUESTRO FUTURO
  {
    id: 'future',
    type: 'text',
    value: 'QUIERO UN FUTURO CONTIGO',
  },
  {
    id: 'promise',
    type: 'text',
    value: 'QUIERO SEGUIR A TU LADO',
  },
  {
    id: 'choose',
    type: 'text',
    value: 'TE ELIJO CADA DIA',
  },
  {
    id: 'together',
    type: 'text',
    value: 'NI LA DISTANCIA CAMBIA LO QUE SIENTO',
  },

  // 6. FINAL
  {
    id: 'forever',
    type: 'text',
    value: 'ERES MI GRAN AMOR',
  },
  {
    id: 'final',
    type: 'text',
    value: 'TE AMO DAYANA',
  },
  {
    id: 'final-heart',
    type: 'heart',
    value: 'MI AMOR POR TI NO TIENE DISTANCIA',
  },
];

export default function useStarShow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFormation = useCallback(() => {
    setCurrentIndex((previous) =>
      Math.min(previous + 1, formations.length - 1)
    );
  }, []);

  useEffect(() => {
    if (currentIndex >= formations.length - 1) {
      return undefined;
    }

    const timer = setTimeout(() => {
      nextFormation();
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, nextFormation]);

  return {
    currentFormation: formations[currentIndex],
    currentIndex,
    totalFormations: formations.length,
  };
}
