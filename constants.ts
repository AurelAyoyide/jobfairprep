import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    mustKnow: [
      {
        title: 'Concepts Fondamentaux',
        items: [
          'Variables: let (mutable), const (immutable), var (function scope, deprecated)',
          'Types: string, number, boolean, null, undefined, object, array',
          'Arrow Functions: () => {} vs function() {} (this context)',
          'Template Literals: `Hello ${name}`',
          'Destructuring: const {name} = user; const [first] = list;',
          'Spread/Rest: ...array, ...object'
        ]
      },
      {
        title: 'Asynchrone',
        items: [
          'Promises: .then(), .catch()',
          'Async/Await: Syntactic sugar for promises',
          'Event Loop: Call stack, Callback queue'
        ]
      },
      {
        title: 'Array Methods',
        items: [
          'map(): Transforme un tableau',
          'filter(): Filtre les éléments',
          'reduce(): Accumule une valeur',
          'forEach(): Itère sans retour',
          'find(): Trouve le premier élément'
        ]
      }
    ],
    questions: [
      "Quelle est la différence entre == et === ?",
      "Explique ce qu'est une closure.",
      "Comment fonctionne l'event loop ?",
      "Différence entre map() et forEach() ?"
    ]
  },
  {
    id: 'html-css',
    title: 'HTML & CSS',
    icon: '🎨',
    color: 'bg-orange-100 text-orange-800',
    mustKnow: [
      {
        title: 'HTML',
        items: [
          'Sémantique: <header>, <main>, <section>, <article>, <footer>',
          'Accessibilité: alt text, aria-labels, structure hiérarchique',
          'Forms: inputs, labels, validation native'
        ]
      },
      {
        title: 'CSS Modern',
        items: [
          'Flexbox: justify-content, align-items, flex-direction',
          'Grid: grid-template-columns, gap',
          'Box Model: Margin, Border, Padding, Content',
          'Position: relative, absolute, fixed, sticky',
          'Units: rem, em, vh, vw, %'
        ]
      },
      {
        title: 'Tailwind CSS',
        items: [
          'Utility-first approach',
          'Responsive prefixes (sm:, md:, lg:)',
          'Hover states (hover:bg-blue-500)',
          'Benefits: Rapid dev, consistent design system'
        ]
      }
    ],
    questions: [
      "Pourquoi utiliser des balises sémantiques ?",
      "Explique le box model.",
      "Différence entre Flexbox et Grid ?",
      "Pourquoi Tailwind plutôt que CSS classique ?"
    ]
  },
  {
    id: 'react-next',
    title: 'React & Next.js',
    icon: '⚛️',
    color: 'bg-blue-100 text-blue-800',
    mustKnow: [
      {
        title: 'React Core',
        items: [
          'Virtual DOM: Diffing algorithm',
          'Props vs State: Read-only external data vs Mutable internal data',
          'Lifecycle: Mount, Update, Unmount'
        ]
      },
      {
        title: 'Hooks',
        items: [
          'useState: État local',
          'useEffect: Side effects (API calls, subscriptions)',
          'useContext: État global simple',
          'useRef: Référence DOM ou valeur mutable sans re-render'
        ]
      },
      {
        title: 'Next.js Features',
        items: [
          'SSR (Server-Side Rendering): HTML generated on request',
          'SSG (Static Site Generation): HTML generated at build time',
          'Routing: File-system based (pages/ or app/ dir)',
          'API Routes: Backend endpoints within Next.js'
        ]
      }
    ],
    questions: [
      "Différence entre props et state ?",
      "Le cycle de vie d'un composant React ?",
      "C'est quoi le SSR et pourquoi l'utiliser ?",
      "Quand utiliser useEffect ?"
    ]
  },
  {
    id: 'vue',
    title: 'Vue.js',
    icon: '💚',
    color: 'bg-emerald-100 text-emerald-800',
    mustKnow: [
      {
        title: 'Core Concepts',
        items: [
          'Reactivity System',
          'Directives: v-if, v-for, v-model, v-bind (:), v-on (@)',
          'SFC (Single File Components): .vue files'
        ]
      },
      {
        title: 'Architecture',
        items: [
          'Options API (data, methods, mounted) vs Composition API (setup)',
          'Computed Properties vs Watchers',
          'Props & Emits ($emit)',
          'Lifecycle Hooks (onMounted, onUnmounted)'
        ]
      }
    ],
    questions: [
      "Différence entre computed et methods ?",
      "Composition API vs Options API ?",
      "Comment fonctionne la réactivité ?"
    ]
  },
  {
    id: 'backend',
    title: 'Backend (Nest/PHP)',
    icon: '⚙️',
    color: 'bg-red-100 text-red-800',
    mustKnow: [
      {
        title: 'NestJS',
        items: [
          'Architecture: Modular (Modules, Controllers, Services)',
          'Decorators: @Controller, @Get, @Injectable',
          'Dependency Injection (DI)',
          'Guards, Pipes, Interceptors'
        ]
      },
      {
        title: 'PHP / Laravel',
        items: [
          'MVC Pattern (Model View Controller)',
          'Eloquent ORM',
          'Blade Templating',
          'Migrations',
          'PDO & Security'
        ]
      },
      {
        title: 'API Concepts',
        items: [
          'REST Principles (GET, POST, PUT, DELETE)',
          'Status Codes (200, 201, 400, 401, 404, 500)',
          'Authentication (JWT) vs Authorization'
        ]
      }
    ],
    questions: [
      "Qu'est-ce que l'injection de dépendances ?",
      "Explique le pattern MVC.",
      "Différence entre PUT et PATCH ?",
      "C'est quoi un Middleware ?"
    ]
  },
  {
    id: 'database',
    title: 'Databases',
    icon: '🗄️',
    color: 'bg-indigo-100 text-indigo-800',
    mustKnow: [
      {
        title: 'SQL (MySQL)',
        items: [
          'Structure: Tables, Rows, Columns',
          'Relations: Foreign Keys',
          'Joins: INNER, LEFT, RIGHT',
          'ACID Compliance'
        ]
      },
      {
        title: 'NoSQL (MongoDB)',
        items: [
          'Structure: Collections, Documents (JSON-like)',
          'Flexible Schema',
          'Scalability (Horizontal)'
        ]
      }
    ],
    questions: [
      "SQL vs NoSQL : quand choisir quoi ?",
      "Qu'est-ce qu'une jointure (JOIN) ?",
      "Différence entre clé primaire et étrangère ?"
    ]
  },
    {
    id: 'general',
    title: 'General & Soft Skills',
    icon: '🤝',
    color: 'bg-gray-100 text-gray-800',
    mustKnow: [
      {
        title: 'Git',
        items: [
          'Flow: add, commit, push, pull',
          'Branches & Merging',
          'Pull Requests'
        ]
      },
      {
        title: 'Behavioral',
        items: [
          'STAR Method (Situation, Task, Action, Result)',
          'Problem solving process',
          'Learning new technologies'
        ]
      }
    ],
    questions: [
      "Parle-moi d'un bug difficile que tu as résolu.",
      "Comment tu gères les conflits Git ?",
      "Où te vois-tu dans 3 ans ?"
    ]
  }
];
