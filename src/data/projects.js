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
    id: 'portfolio-v1',
    number: '02',
    title: 'Portfolio v1',
    kicker: 'Archived build',
    status: 'Not live',
    featured: false,
    current: false,
    summary:
      'My first static portfolio, built with HTML, CSS, and vanilla JavaScript.',
    description:
      'The first version of this site taught me responsive layout and DOM events. It also used sample project claims, a non-working contact form, and placeholder links.',
    contribution:
      'Designed and coded the static page, the responsive navigation, smooth scrolling, and the scroll animations.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: {
      src: '/images/projects/portfolio-v1.webp',
      width: 1440,
      height: 900,
      alt: 'Screenshot of the first portfolio version with a blue gradient hero and circular portrait.',
    },
    links: [],
    detailsLabel: 'Why I rebuilt it',
    detail: [
      'Removed unverified experience and client counts.',
      'Replaced the fake contact form with a working email link.',
      'Fixed malformed markup, added visible focus states, and rebuilt the page with real project content.',
    ],
    note: 'Archived for reference. I rebuilt it instead of publishing this version as-is.',
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
