export const fractional = {
  headline: 'Fractional CTO',
  summary:
    'Some companies need a CTO before they can justify one. I take on technology ownership two days a week — embedded in the team, in the standups and in the pull requests, accountable for what ships. Not a slide deck.',

  // Client situations, matched to work I have actually done.
  triggers: [
    {
      title: 'There is no technical co-founder',
      body: 'Either one left, or there never was one, and every technical decision now lands on a founder who should be selling. At Loomee I owned technology through a restructuring, took the platform from MVP to production and hired the founding engineering team.',
    },
    {
      title: 'The team grew past five people and nobody designed the org',
      body: 'Hiring is the easy half. Squad boundaries, a career track and a hiring bar are what keep the tenth engineer as productive as the second. At Fourvenues the engineering organisation grew from 6 people to around 40 across 7 squads over my tenure.',
    },
    {
      title: 'Delivery is slowing and nobody can say why',
      body: 'Opinions are cheap and usually wrong. I instrument delivery first — DORA as a shared baseline between product and engineering — and argue second, with numbers on the wall instead of in a meeting.',
    },
    {
      title: 'You want LLM features in production and nobody knows what that costs',
      body: 'Retrieval, evaluation and cost per query, treated like any other subsystem rather than a demo. At Loomee I designed and shipped an LLM retrieval layer on LangChain and Qdrant into a live product.',
    },
    {
      title: 'The product is buckling under its own growth',
      body: 'Architecture that made sense at ten thousand requests stops making sense at a million. I have led that migration in both directions — into microservices at Cubicup, and back toward a well-bounded core where splitting was the wrong answer.',
    },
  ],

  engagements: [
    {
      name: 'Advisory',
      cadence: 'One day a week',
      body: 'Architecture and hiring decisions, code and design review, a weekly session with the founders. For teams that are shipping but flying blind.',
    },
    {
      name: 'Embedded',
      cadence: 'Two days a week',
      body: 'I own the technical roadmap and the engineering process. In the standups, in the pull requests, in the hiring loop. The usual shape, and the one where I am most useful.',
    },
    {
      name: 'Scoped',
      cadence: 'Fixed scope, fixed end date',
      body: 'An architecture assessment, a delivery-metrics baseline, or one LLM feature taken from idea to production. Ends with something running, not a document.',
    },
  ],

  // Saying what this is not is part of the offer.
  notThis: [
    'Not a consultant. I do not hand over a deck and leave; I am accountable for what the team ships.',
    'Not a staffing agency. I hire your engineers, I do not rent you mine.',
    'Not a full-time CTO — this is two days a week, not five. If five is what you actually need, say so: I am open to full-time engineering leadership roles as well, and I would rather point you at the right shape than sell you a fraction of the wrong one.',
  ],

  availability:
    'Working in Spanish or English, remote across the EU, or on site in Valencia and Madrid.',

  cta: {
    label: 'Talk about an engagement',
    email: 'rruben.alapont@gmail.com',
  },
}
