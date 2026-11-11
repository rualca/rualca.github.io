// Anonymised on purpose: no employer or client names. The tests enforce it.
export const caseStudiesDisclaimer =
  "Case studies are anonymised and described at a high level. I don't name the company or share confidential details, out of respect for confidentiality commitments."

export const caseStudies = [
  {
    id: 'burned-out-team-to-predictable-delivery',
    title: 'Turning a burned-out team into predictable delivery',
    context:
      'A fast-growing software platform whose business was roughly doubling every year, with an engineering team of 6 that would grow to around 40.',
    problem:
      'There was no CI/CD that added value, the few developers were burned out, dates slipped and customers felt it.',
    decision:
      'I started by mapping what existed and, for each piece, why it was the way it was, before changing anything. With the full picture in hand I applied improvements in order: good practices, written processes and CI/CD that earned its place. DORA metrics became the shared baseline between product, commercial and engineering.',
    result:
      'Software-delivery cycle time fell by over 50%, and delivery cost with it. The team stopped working at its limit, incidents and customer complaints dropped, and trust with the business came back. Engineering grew from 6 to around 40 people, and I hired around 20 of those engineers, every one of whom was still with the company when I left.',
    takeaway: 'Measuring first turned arguments about delivery into conversations about numbers.',
  },
  {
    id: 'fragile-prototype-to-production',
    title: 'From a fragile prototype to production in about 2 months',
    context:
      'A regulated health platform with a working prototype, an unclear value proposition and a company that needed revenue.',
    problem:
      'The prototype had many errors, no clear architecture and was hard to maintain, and the team had to reach production as soon as possible.',
    decision:
      'I refactored instead of rewriting and cut the scope to the minimum that delivered value. It was not the moment to buy, so we built, combining a first in-house hire with an external development agency.',
    result:
      'The platform reached production in about 2 months, with fewer errors and faster deployment of changes and fixes. By the end of the role, dozens of therapists were running hundreds of sessions a month on it.',
    takeaway: 'Shipping the smallest release that delivers value beat shipping everything late.',
  },
  {
    id: 'developer-to-technical-lead',
    title: 'From developer to technical lead of 20 engineers in 18 months',
    context:
      'A booking-distribution platform serving tens of thousands of properties and connected to more than 60 sales channels, handling over 1M requests a day.',
    problem:
      'The code was outdated, new integrations took too long to connect, nobody could tell why they failed, and the junior engineers had no direction.',
    decision:
      'I rebuilt integrations behind adapters with observability per channel, so every failure became diagnosable. On my own initiative I mentored the junior engineers, with no formal role to do so.',
    result:
      'New-channel integrations got faster and synchronisation incidents and double bookings fell. 5 junior engineers reached mid-level within 12 months. Within 18 months I was offered the technical lead role, on the strength of those results and of how I worked with people, leading 20 engineers as direct reports.',
    takeaway: 'I started leading before I had the title.',
  },
  {
    id: 'email-process-to-saas',
    title: 'Replacing an email-based process with a SaaS platform, built from scratch',
    context:
      'A renovation company whose operations ran on a program built around email, and which had to become a SaaS product.',
    problem:
      'The work was managed by hand: quotes were manual, projects were hard to follow, and margins were only known once the job had closed.',
    decision:
      'I built the whole SaaS platform and its infrastructure from scratch as technical lead. I started with project tracking, the essential value, and then added the quoting engine to close the circle of what a renovation project involves. A renovation was modelled as a long-lived project with states, not as a single transaction.',
    result:
      'Cost deviation and margin became visible per project while the work was still running, quoting got faster, and a new city became configuration instead of a fork of the system, across dozens of projects in 6 cities. I was technical lead through 2 funding rounds.',
    takeaway: 'Start with the value people need most, then close the circle around it.',
  },
]
