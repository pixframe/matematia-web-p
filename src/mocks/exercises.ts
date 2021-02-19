import { Exercise } from '../utils/types';

/*

Restricciones de tiempo:
    - Todos los ejercicios tienen un tiempo estimado de resolución
    - Opcionalmente el tiempo estimado de resolución se convierte en tiempo límite.
    - Se deben registrar los tiempos reales que el usuario tardó en concluir el ejercicio.

Habilidades:
    - Todos los ejercicios están ligados a una o más habilidades.
    [visuospatiality, temporalSpace, workingMemory, mentalAgility, planning, mathematicalThinking, semanticMemory, proceduralMemory, reasoning]

Dificultad:
    - Todos los ejercicios tienen un nivel difícultad.
    [easy,intermediate,hard,expert]

Recursos de ayuda:
    - Todos los ejercicios pueden tener un recurso de ayuda que puede ser:
    imagen
    video incrustado
    link a una página web
    
    help {
        link: string;
        text: string;
        type: "image" | "video" | "link"
    }

Modos:
    - Los ejercicios debén ser marcados para evaluación o para entrenamiento.

    mode =  training | evaluation

Closed Answer:
    - El ejercicio debe tener una sola pregunta
    - La pregunta debe tener una o mas respuestas correctas.
    - La Explicación es a nivel de la pregunta.

Columns:
    - Debe tener dos o mas preguntas.
    - Cada pregunta tiene solo una respuesta correcta.
    - La explicación es a nivel de la pregunta.

Multiple Choice: 
    - Debe tener una sola pregunta.
    - La pregunta debe tener dos o mas respuestas que pueden ser correctas o incorrectas.
    - La pregunta debe tener al menos una respuesta correcta.
    - La explicacion es a nivel de respuesta.

True False:
    - El ejercicio debe tener una sola pregunta.
    - La pregunta debe tener dos respuestas.
    - Solo una de las respuestas debe ser la correcta.
    - La explicacón es a nivel de la pregunta.


*/

export const exercises: Exercise[] = [
  {
    id: 'amdlakmsdkm1lkem1k2e',
    subtopicId: '5NVIomAlpH4ly1dz8Zhj',
    type: 'closedAnswer',
    text: 'this is a general exercise text that can be use in the lists for example',
    questions: [
      {
        id: 'amlsdkmalsdm2',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: 'this is the question explanation text',
        answers: [
          {
            id: '12ekpoqwdañ',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: 'this is a answer explanation text',
            isCorrect: true
          },
          {
            id: 'a89a8sd7asdg6a5s45',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: 'this is another answer explanation text',
            isCorrect: true
          }
        ]
      }
    ],
    image: 'this is the exercise image',
    explanation: 'this is the exercise explanation text',
    help: { text: 'this is a help text', type: 'link', url: 'alsklalkasd' },
    estimatedTime: 20,
    isTimeLimited: true,
    difficulty: 'easy',
    mode: 'training',
    skills: ['visuospatiality'],
    createdAt: '1597818626872', // epoch / unix time
    createdBy: '',
    updatedAt: '1597818649227',
    updatedBy: ''
  },
  {
    id: 'amdlakmsdkm1lkem1k2e',
    subtopicId: '5NVIomAlpH4ly1dz8Zhj',
    type: 'columns',
    text:
      'in this case where the exercise have multiple questions this text is shown in the list instead',
    questions: [
      {
        id: '23e2f',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: '',
        answers: [
          {
            id: '2f23f',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: true
          }
        ]
      },
      {
        id: '2f2f2fasasa',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: '',
        answers: [
          {
            id: 'fghdfd23q3a',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: true
          }
        ]
      },
      {
        id: 'ka09sdk0am',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: '',
        answers: [
          {
            id: 'amasdek2ml',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: true
          }
        ]
      }
    ],
    image: '',
    explanation: '',
    help: {
      text: '',
      type: 'text'
    },
    estimatedTime: 20,
    isTimeLimited: true,
    difficulty: 'easy',
    mode: 'training',
    skills: [],
    createdAt: '1597818626872',
    createdBy: '',
    updatedAt: '1597818626872',
    updatedBy: ''
  },
  {
    id: 'amdlakmsdkm1lkem1k2e',
    subtopicId: '5NVIomAlpH4ly1dz8Zhj',
    type: 'multipleChoice',
    text: '',
    questions: [
      {
        id: '1232asd',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: '',
        answers: [
          {
            id: 'gfd32',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: true
          },
          {
            id: 'ad2dasfdg',
            text: 'alsdmalskd',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: false
          }
        ]
      }
    ],
    image: '',
    explanation: '',
    help: {
      text: '',
      type: 'text'
    },
    estimatedTime: 20,
    isTimeLimited: true,
    difficulty: 'easy',
    mode: 'training',
    skills: [],
    createdAt: '1597818626872',
    createdBy: '',
    updatedAt: '1597818626872',
    updatedBy: ''
  },
  {
    id: 'amdlakmsdkm1lkem1k2e',
    subtopicId: '5NVIomAlpH4ly1dz8Zhj',
    type: 'trueFalse',
    text: '',
    questions: [
      {
        id: 'asd12as2',
        text: 'kalsdkasdlml',
        image: 'asdkmalsdkm',
        explanation: 'adsadasd',
        answers: [
          {
            id: 'asdas',
            text: 'Verdadero',
            image: '',
            explanation: '',
            isCorrect: true
          },
          {
            id: 'asdas2',
            text: 'Falso',
            image: 'aslkdmalsdm',
            explanation: '',
            isCorrect: false
          }
        ]
      }
    ],
    image: '',
    explanation: 'asdasdsa',
    help: {
      text: '',
      type: 'text'
    },
    estimatedTime: 20,
    isTimeLimited: true,
    difficulty: 'easy',
    mode: 'training',
    skills: [],
    createdAt: '1597818626872',
    createdBy: '',
    updatedAt: '1597818626872',
    updatedBy: ''
  }
];
