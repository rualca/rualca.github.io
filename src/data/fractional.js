export const fractional = {
  headline: 'Fractional CTO and technical advisory',
  summary:
    'Some companies need senior technical leadership before they can justify a full-time CTO. I already hold that seat at Aimira, so I take on a small number of engagements alongside it: mostly scoped pieces of work and advisory, and occasionally a deeper embedded role. I stay accountable for what ships. Not a slide deck.',

  // Client situations, matched to work I have actually done.
  triggers: [
    {
      title: 'There is no technical co-founder',
      body: 'Either one left, or there never was one, and every technical decision now lands on a founder who should be selling, and a wrong hire or a wrong platform choice costs months of runway. At Loomee I owned technology through a restructuring, took the platform from MVP to production in about two months.',
    },
    {
      title: 'The team grew past five people and nobody designed the org',
      body: 'Without structure every new hire adds cost faster than output. Hiring is the easy half. Squad boundaries, a career track and a hiring bar are what keep the tenth engineer as productive as the second. At Fourvenues the engineering organisation grew from 6 people to around 40 across 7 squads over my tenure.',
    },
    {
      title: 'Roadmap dates keep slipping and nobody can say why',
      body: 'Missed dates cost you customers and credibility with the people who fund you. Opinions are cheap and usually wrong. I instrument delivery first — DORA as a shared baseline between product and engineering — and argue second, with numbers on the wall instead of in a meeting.',
    },
    {
      title: 'You want LLM features in production and nobody knows what that costs',
      body: 'Retrieval, evaluation and cost per query, treated like any other subsystem rather than a demo. At Loomee I shipped an LLM retrieval layer on LangChain and Qdrant into a live product — in regulated mental health, where it had to cite its sources, defer to the clinician and survive an audit.',
    },
    {
      title: 'The AI feature has to run where the product is, not in a notebook',
      body: 'Real-time inference carries latency, cost and failure modes a demo never shows, and the further it sits from a data centre the more that is true. At Aimira I own a computer-vision platform that inspects fabric in line, at production speed, on the factory floor.',
    },
    {
      title: 'Growth is outrunning the product',
      body: 'Architecture that made sense at ten thousand requests stops making sense at a million, and the cost shows up as outages and a roadmap that stalls. I have led that migration in both directions — into microservices at Cubicup, and back toward a well-bounded core where splitting was the wrong answer.',
    },
  ],

  engagements: [
    {
      name: 'Scoped',
      cadence: 'Fixed scope, fixed end date',
      body: 'An architecture assessment, a delivery-metrics baseline, or one LLM feature taken from idea to production. Ends with something running, not a document. The easiest place to start.',
    },
    {
      name: 'Advisory',
      cadence: 'One day a week',
      body: 'Architecture and hiring decisions, code and design review, a weekly session with the founders. For teams that are shipping but flying blind. This is the usual ongoing shape while the CTO seat at Aimira has my week.',
    },
    {
      name: 'Embedded',
      cadence: 'Two days a week, subject to capacity',
      body: 'I own the technical roadmap and the engineering process, in the standups, in the pull requests and in the hiring loop. Availability is limited and depends on my other commitments, so ask before you plan around it.',
    },
  ],

  // Saying what this is not is part of the offer.
  notThis: [
    'Not advice without accountability. I do not hand over a deck and leave; I am accountable for what the team ships.',
    'Not a staffing agency. I hire your engineers, I do not rent you mine.',
    'Not a full-time CTO for your company — I already hold that seat at Aimira. This is scoped work or a day or two a week alongside it. If five is what you actually need, say so early: I would rather tell you the scope is bigger than my calendar than sell you a fraction of the wrong thing.',
  ],

  availability:
    'A small number of engagements at a time, alongside the CTO role at Aimira. Working in Spanish or English, remote across the EU, or on site in Valencia and Madrid.',

  cta: {
    label: 'Talk about an engagement',
    email: 'rruben.alapont@gmail.com',
  },
}
