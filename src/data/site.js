export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = navItems.map((item) => item.id)

export const site = {
  name: 'James Earl Nacario',
  shortName: 'James Nacario',
  firstName: 'James Earl',
  lastName: 'Nacario',
  monogram: 'JN',
  role: 'Student developer',
  focus: 'Front-end & interface design',
  eyebrow: 'Student developer / Portfolio v2',
  intro:
    'I am a student developer learning to build clear, responsive interfaces. I learn by making small, complete projects and reviewing what I changed along the way.',
  heroNote:
    'Currently learning React, Tailwind CSS, and Vite by rebuilding this portfolio.',
  status: 'Learning in public',
  about: [
    'I am a student developer interested in front-end development and interface design. I started with plain HTML, CSS, and JavaScript, built a first portfolio, then rebuilt it with React, Vite, and Tailwind CSS.',
    'I am still early in this journey. I am comfortable with semantic HTML, responsive CSS, and vanilla JavaScript, including DOM events, Promises, and fetch. I am learning component structure, design systems, accessibility testing, and deployment.',
    'I would rather show a few honest practice builds than fill a page with numbers I cannot prove. The projects below are real, and the notes explain what I made and what I would improve next.',
  ],
  principles: [
    {
      title: 'Readable first',
      body: 'Typography, contrast, and spacing come before decoration. If the content is hard to read, the design is not finished.',
    },
    {
      title: 'Show the work',
      body: 'Small finished projects with honest notes are more useful than inflated claims or unfinished screens.',
    },
    {
      title: 'Build, then refine',
      body: 'Make a working version, test it on a phone, and improve what actually breaks.',
    },
  ],
  now: [
    { label: 'Building', value: 'Portfolio v2' },
    { label: 'Learning', value: 'React + Tailwind' },
    { label: 'Practising', value: 'Async JavaScript' },
  ],
  nav: navItems,
  contact: {
    email: {
      label: 'Email',
      value: 'your.email@example.com',
      isPlaceholder: true,
    },
    github: {
      label: 'GitHub',
      value: 'github.com/your-username',
      url: null,
      isPlaceholder: true,
    },
  },
  aiNote:
    'AI assistance: Qoder for planning, code, and review; browser testing and screenshots with browser-use and Chrome.',
}
