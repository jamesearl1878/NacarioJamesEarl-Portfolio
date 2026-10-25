export const projects = [
  {
    id: 'promise-lab',
    number: '01',
    title: 'Promise Lab',
    kicker: 'Practice build',
    status: 'Live demo',
    featured: true,
    current: false,
    summary:
      'A small lab for seeing how JavaScript Promises move from pending to settled.',
    description:
      'Built from a classroom exercise, then rebuilt with explicit resolve and reject states, a live event log, and a real fetch example that handles success and failure.',
    contribution:
      'Rebuilt the exercise from scratch: Promise logic, fetch handling, UI states, event log, error messages, and responsive styling.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Promises', 'fetch'],
    image: {
      src: '/images/projects/promise-lab.webp',
      width: 1440,
      height: 900,
      alt: 'Promise Lab hero in light mode with the promise state panel showing a resolved promise.',
    },
    links: [{ label: 'Open live demo', href: '/demos/promise-lab/index.html' }],
    detailsLabel: 'Build notes',
    detail: [
      'Replaced random success or failure with explicit resolve and reject controls, so each settled state is visible.',
      'Added an aria-live log so the result is announced, not only colored.',
      'Handled fetch success, HTTP errors, and network failure as separate outcomes.',
    ],
    note: null,
  },
  {
    id: 'firealert-ai',
    number: '02',
    title: 'FireAlert AI',
    kicker: 'Group capstone',
    status: 'Documented design',
    featured: false,
    current: false,
    summary:
      'AI-assisted fire severity detection and advisory dispatch for Barangay Tejero, Cebu City.',
    description:
      'A capstone system design where residents submit fire photos through a Flutter app, a YOLO-based model flags fire and smoke, and the system classifies severity as Low, Medium, or High to recommend a dispatch level to the Bureau of Fire Protection. A React monitoring dashboard with a live map supports BFP review. The AI output is advisory only — BFP personnel verify every report and make the final call.',
    contribution:
      'One of five BSIT researchers on the manuscript, sharing in the system design, module planning, and UI mockups.',
    stack: ['Flutter', 'React', 'Tailwind CSS', 'Node.js', 'Ultralytics YOLO', 'scikit-learn'],
    image: {
      src: '/images/projects/firealert-ai.webp',
      width: 1440,
      height: 900,
      alt: 'Two FireAlert AI resident app mockups: the AI analysis screen and the severity assessment result marked High.',
    },
    links: [],
    detailsLabel: 'Project notes',
    detail: [
      'Group capstone manuscript with five authors; the screens are illustrative UI mockups from the documentation, not a live deployment.',
      'Six planned modules: user access, incident reporting, fire and smoke detection, severity classification, dispatch recommendation, and BFP monitoring.',
      'Severity scores and dispatch levels stay advisory — BFP verifies each report and declares the final alarm level.',
    ],
    note: 'Documented system design — no live app or public repository yet.',
  },
  {
    id: 'portfolio-v2',
    number: '03',
    title: 'Portfolio v2',
    kicker: 'Current build',
    status: 'This site',
    featured: false,
    current: true,
    summary:
      'A custom responsive portfolio with a racing-inspired identity, dark mode, and motion that respects your settings.',
    description:
      'The rebuild you are looking at: React components, a Tailwind design system, an original crest, real project screenshots, and a focus on readable content over inflated claims.',
    contribution:
      'Design direction, React component architecture, Tailwind tokens, responsive layouts, accessibility, motion, and deployment preparation. AI tools assisted with code and review.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    image: {
      src: '/images/projects/portfolio-v2.webp',
      width: 1440,
      height: 900,
      alt: 'Dark mode Portfolio v2 hero with a large name, orange-red accents, and a framed portrait.',
    },
    links: [],
    detailsLabel: 'Build notes',
    detail: [
      'Built a small semantic-token system so light and dark themes stay consistent.',
      'Added keyboard-visible focus states, a native dialog menu, and reduced-motion fallbacks.',
      'Captured real screenshots rather than using mocked project imagery.',
    ],
    note: 'Live link will be added after the first Vercel deployment.',
  },
]
