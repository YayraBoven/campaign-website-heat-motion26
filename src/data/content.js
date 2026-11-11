// =====================================================================
//  MOTION · MOTION '26 - ALL WEBSITE CONTENT LIVES HERE
//  To change text, links, dates or photos, edit this file only.
//  Photos: put image files in the `public/images/` folder, then set
//  the path below, e.g.  photo: '/images/maria.jpg'
//  Leave a photo as null to show a placeholder box instead.
// =====================================================================

// ---------- LINKS (replace the # with real links) ----------
// whatsapp, tiktok and tiktokVideo can also be changed by Maria & Yayra at /inbox
// (Links tab). What they save there wins over the values here.
export const links = {
  whatsapp: '#', // Join Team MOTION buttons + WhatsApp icon - channel/group link
  tiktok: '#', // TikTok icon - campaign TikTok profile
  tiktokVideo: '#', // "Watch now" play button - the TikTok campaign video
  manifesto: '/manifesto.pdf', // file in the public/ folder
  merchOrder: '#', // where people order merch (WhatsApp chat link or form)
  email: '', // campaign email, e.g. 'heat26@gmail.com' (leave '' to hide)
}

// icons shown in the hero and footer; `link` is a key of `links` above
export const socials = [
  { name: 'TikTok', icon: 'tiktok', link: 'tiktok' },
  { name: 'WhatsApp', icon: 'whatsapp', link: 'whatsapp' },
]

// ---------- ELECTION DATES (Ghana time, GMT) ----------
export const election = {
  votingOpens: '2026-11-20T00:00:00Z', // Fri 20 Nov, 12:00 AM
  votingCloses: '2026-11-22T23:59:00Z', // Sun 22 Nov, 11:59 PM
  // the event people get from "Add to calendar"
  calendar: {
    title: 'ASC Elections: vote MOTION (Maria & Yayra)',
    details:
      'Voting for ASC President and Vice-President is open from Fri 20 Nov, 12:00 AM to Sun 22 Nov, 11:59 PM (Ghana time). Vote Maria Bortei-Doku & Yayra Boven. Every single vote counts.',
  },
  keyDates: [
    {
      date: 'Mon 16th & Tue 17th Nov',
      title: 'Manifesto Reading & Debate',
      text: 'Come hear us out. Watch Maria and Yayra present the plan live.',
    },
    {
      date: 'Wed 18th Nov',
      title: 'Stepping Up to Bat',
      text: 'With the outgoing ASC executives.',
    },
    {
      date: 'Fri 20th – Sun 22nd Nov',
      title: 'Voting Period',
      text: 'Cast your vote for MOTION. Every single vote counts.',
      highlight: true,
    },
    {
      date: 'Wed 25th – Fri 27th Nov',
      title: 'Results Announcement',
      text: 'Results announced to the entire Ashesi community.',
    },
  ],
}

// ---------- NAVIGATION ----------
export const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Issues Identified', target: 'issues' },
  { label: 'Solutions', target: 'solutions' },
  { label: 'Your Voice', target: 'voice' },
  { label: 'Track Record', target: 'track-record' },
  { label: 'Merch', target: 'merch' },
]

// ---------- CANDIDATES ----------
export const candidates = [
  {
    id: 'maria',
    name: 'Maria Bortei-Doku',
    role: 'ASC President Aspirant',
    course: 'BSc. Economics, Class of 2028',
    bio: 'Maria Emmanuellee Borteley Bortei-Doku is a student leader at Ashesi University with a strong interest in governance, public policy, and institutional development. A former Deputy Speaker of the Ashesi Parliament, Founder and President of ASPAG, and President of the Ashesi Economics Students Union, her experiences have equipped her with an understanding of student governance, representation, and the workings of student leadership at Ashesi. She is passionate about advocacy, service, and accountable leadership.',
    photo: '/images/maria.jpg',
  },
  {
    id: 'yayra',
    name: 'Yayra Boven',
    role: 'ASC Vice-President Aspirant',
    course: 'BSc. Management Information Systems, Class of 2028',
    bio: "Harriet Yayra Boven Fiahagbe is an active member of the Ashesi community, driven by a passion for people, service, and meaningful impact. Her experiences as TEDxAshesi's 2026 Public Relations Lead and a Peer Support Coordinator in the Provost's Office have exposed her to different facets of student life, strengthening her understanding of student needs and experiences. She is also a content creator passionate about storytelling and connecting with people.",
    photo: '/images/yayra.jpg',
  },
]

export const photos = {
  heroTogether: '/images/together1.jpg', // big photo of both candidates (hero)
  statement: '/images/framed.jpg', // framed photo under the hero
  vision: '/images/together2.jpg', // both together (e.g. the thumbs-up photo)
}

// ---------- ABOUT / OUR MESSAGE ----------
export const statement = {
  highlight: 'Ashesi is stressful, and that’s why we are here.',
  text: 'As student council president and vice, we will set Ashesi in MOTION: lifting the weight of stress and anxiety so many students carry, and restoring morale with a council that prioritises every single student.',
}

export const message = {
  short: [
    'Every student that walks through the gates of Ashesi comes with a dream. The entrepreneur, the engineer, the painter, the student politician, the international student proudly representing their homeland. Many, many people hoping to find their place in such a prestigious institution.',
    'Then the reality of the system sets in. The 11:59s keep piling up, the group chats keep buzzing, and the dream freezes up. That’s where we come in.',
  ],
  full: [
    'Months deep, the 11:59s keep piling and multiple class WhatsApp group chats keep buzzing with “guys, when are we meeting for our presentation prep?”. Then a course that seems to be smooth sailing for everyone else questions your intelligence and abilities. You need to lock in, so you drop your paint canvas. You stop posting on your business page. No more visits to the music studio. The dream freezes up.',
    'Ashesi is stressful, and that’s why we are here. We have spent semesters immersed in the system, studying and participating in various aspects of student life, from Parliament and residential assistancy to UBORA planning, basketball and football practices, all while navigating our primary responsibility as students. The plain and simple of our tenure is to restore student morale and be a supportive council that prioritises every single Ashesi student. Admittedly, we can’t change the system. But we promise innovative ways to beat it, and to ensure that students don’t lose themselves to the rigour of the school.',
    'We will lead a student council that believes every student, with every unique opportunity and experience, deserves to be recognised. This is the time for recovery and recuperation: a tenure that creates convenience for students and showcases clear improvements in campus culture, moods and stress levels, while upholding the rigour and quality Ashesi promises.',
    'Ashesi is all the way on the mountain. It provides the perfect environment for focus, but it also fosters feelings of detachment, loneliness and isolation. We cannot move Ashesi physically, but we can shift the culture. Too often, decisions about our academic life are made with limited consultation. We promise student involvement and initiative, and a government that prioritises amplifying students’ voices. Until your passions are explored and your physical and mental health are taken care of, we will keep fighting.',
    'We recognise the times we are in: the double intake system, the ASC’s lack of finances, low student morale, uncertainty. Giving our lives, time and intellect to this cause will be an honour. Our legacy will be seeds planted in a garden we actually get to see.',
  ],
  signoff: 'Vote for change. Vote for voice. Vote for relief.',
}

export const vision = [
  {
    title: 'A council that works',
    text: 'A student council that is fully functional, responsive, accountable, and committed to continuously raising the standard of student leadership.',
  },
  {
    title: 'A better student life',
    text: 'More enjoyable, fulfilling and refreshing student life experiences, with real support for students going through tough academic and social realities.',
  },
  {
    title: 'Your voice, amplified',
    text: 'A system that values and amplifies students’ voices and fights for their interests.',
  },
]

// ---------- ISSUES & SOLUTIONS (from the manifesto) ----------
// solutions can be a plain list, or grouped: [{ heading, items: [] }]
export const issues = [
  {
    id: 'general',
    title: 'General ASC',
    problems: [
      'ASC leadership during the spring semester.',
      'The ASC’s financial state.',
      'Uncertainty concerning key events like ASC Week, UBORA and the Career Fair.',
    ],
    solutions: [
      {
        heading: 'Succession plan',
        items: [
          'Heightened intentionality in year-group representation in core ASC leadership positions.',
          'Regular in-person visits to campus during semesters when we are not on campus, taking it as a full-time job.',
        ],
      },
      {
        heading: 'Financial state',
        items: [
          'Introduce a new student dues amount that reflects current economic realities.',
          'Seek alternative sources of sponsorship: investment in student businesses, companies, departmental collaboration, and grants.',
        ],
      },
      {
        heading: 'Key events: ASC Week, UBORA & Career Fair',
        items: [
          'Minimise exclusion by pioneering standard termly events that rotate over the years.',
          'Bus students from specific vantage points for events so no one misses out.',
        ],
      },
    ],
  },
  {
    id: 'academic',
    title: 'Academic',
    problems: [
      'Heavy academic workload and pressure on students.',
      'Back-to-back classes make it difficult to participate in wellbeing activities such as Wellness Wednesday.',
      'Slow course selection and registration processes.',
      'Delays in responses to academic waiver requests.',
      'Limited or delayed access to final grades.',
      'Concerns about the academic calendar and scheduling system.',
      'Difficulty balancing academics with extracurricular activities and student life.',
    ],
    solutions: [
      'Advocate for the prioritisation of free periods such as mid-semester breaks, revision weeks, weekends, and Wellness Wednesday.',
      'Work closely with the Registry to make course selection more efficient, e.g. timely emails whenever a delay occurs.',
      'Collaborate with the CCAPS team and the Provost to cancel classes or offer a half day so students can fully enjoy Wellness Wednesday.',
      'Recuperation vs. reduction: academic assistance such as ASC-catered informal study groups in lofi classrooms, plus incentives to encourage learning.',
      'Collaborate with Career Services and the EDU Collaborative (IPCC) to take the Career Fair to countries where international students may find themselves, bringing international companies on board.',
      'Bring final grades, course selection delays and additional pressures to the Provost’s attention so student responses are taken into consideration.',
      'Introduce academic rant groups for heart-to-heart discussions about academic shortcomings.',
      'Lobby for more study spaces, especially during the day.',
    ],
  },
  {
    id: 'welfare',
    title: 'Welfare',
    problems: [
      'Loneliness and feelings of rejection among students.',
      'Concerns about prioritising students’ mental health and emotional well-being.',
      'Students struggle to build meaningful relationships and a sense of belonging.',
      'Limited opportunities to build relationships across cohorts and backgrounds.',
      'Unpleasant smells in classrooms and other campus spaces.',
      'Unpleasant smells and sanitation concerns in the washroom at the Hive.',
      'Restrictions on when and how students can use their meal plans.',
      'High costs of paper bowls and other disposable food containers.',
      'Concerns surrounding the lump-sum stipend structure for Mastercard Scholars.',
    ],
    solutions: [
      'Empower clubs and associations to create communities that help people build stronger relationships and interpersonal bonds.',
      'Board and interactive games at vantage points on campus, where people can meet strangers and unwind.',
      'Negotiate with food vendors to reduce the price of disposable packs.',
      'Initiate an ASC Mastercard funds distribution programme that breaks lump-sum stipends into monthly receipts.',
      'More versatile food options on campus, expanding the reach of the meal plan.',
    ],
  },
  {
    id: 'cohesion',
    title: 'Cohesion',
    problems: [
      'International students feel detached and isolated from the wider Ashesi community.',
      'Limited opportunities for international students to integrate into campus life.',
      'Students feel socially disconnected across cohorts and backgrounds.',
      'Limited opportunities to engage with one another outside academic activities.',
      'Students feel bored or disconnected from campus life during breaks.',
      'Students are missing important cohort events and engagement opportunities.',
      'Limited exposure for international students to experiences, opportunities and networks beyond Ashesi.',
      'Displacement during fumigation.',
      'Food options aren’t great, and there is no designated place for cooking (sadza, chapati, etc.).',
    ],
    solutions: [
      'Host a Culture Night of songs, where each country performs a contemporary classic.',
      'Send Independence Day reminder emails a day in advance, encouraging the community to wear that nation’s flag colours or national jersey.',
      'Introduce an ASC Grillos card for students who are solely on a meal plan.',
      'Introduce fumigation day activities so students on campus don’t have to go off campus looking for a place to be.',
      'Work towards a staple menu that spans all African regions.',
      'Ashesi Flag Day.',
      'A weekly sign language tips email.',
      'A Master’s students meet and greet.',
    ],
  },
  {
    id: 'off-campus',
    title: 'Off-Campus',
    problems: [
      'Recurring water issues in student residences, including off-campus housing.',
      'Security concerns and theft affecting students living off campus.',
      'Concerns about student safety in off-campus residential areas.',
      'High transportation costs to and from Berekuso.',
      'Berekuso drivers charging excessive or inconsistent prices.',
      'Limited affordable and predictable transport options for off-campus students.',
    ],
    solutions: [
      'Work hard to tighten security off campus and ensure street lights are functional at all times.',
      'Find innovative and cheaper ways to transport students from the hill to Kwabenya, Berekuso and Accra.',
      'Bring in popular restaurants like KFC and Pizza Hut to diversify meal options on campus.',
    ],
  },
  {
    id: 'sports',
    title: 'Sports',
    problems: [
      'Decline in sporting activities and student participation.',
      'Gym closures and maintenance issues affecting access.',
      'Concerns about the condition, maintenance and availability of sports facilities.',
      'Concerns about access to and overall use of the sports centre.',
      'A dying sports culture at Ashesi.',
    ],
    solutions: [
      'Liaise with Berekuso taxi drivers for scheduled transport between the gate and the field.',
      'Assist with sports gear and equipment where needed.',
      'Provide refreshments to athletes after games.',
      'Boost publicity for sports at Ashesi and build a strong sense of sportsmanship.',
      'Implement a ticketing system with perks.',
      'Promote sports teams’ flags and colours, as well as cheerleaders.',
      'Introduce the Ashesi mascot at events such as Varsity.',
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    problems: [
      'Students find campus life repetitive or boring.',
      'Limited social, recreational and entertainment activities during breaks.',
      'Limited opportunities to engage in activities outside academics.',
      'Students miss important cohort events and social opportunities.',
      'Limited activities that encourage students to socialise and enjoy campus life.',
    ],
    solutions: [
      'Maintain and improve EnterCom events: Akwaba Nights, ASC Opening and Closing Nights, external events, and collaborations with other schools.',
      'Facilitate easy access to entertainment opportunities in Accra.',
      'Diversify entertainment with unique experiences such as hiking, silent movie nights, pilates, skateboarding and roller skating.',
    ],
  },
  {
    id: 'outreach',
    title: 'Outreach',
    problems: [
      'Limited access to external experiences and developmental opportunities.',
      'Students miss important opportunities, including career fairs and external cohort events.',
      'Limited engagement opportunities that connect students with wider networks.',
    ],
    solutions: [
      'Collaborate with existing outreach clubs and support their projects.',
      'Focus on giving back to individuals within the Ashesi community who have social ambitions.',
    ],
  },
  {
    id: 'pr',
    title: 'Public Relations',
    problems: [
      'Students miss important cohort events and opportunities because of communication gaps.',
      'Students lack clear feedback on concerns raised through student governance channels.',
    ],
    solutions: [
      'Create creative, modern and current media output that gets information to every student.',
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    problems: [
      'Concerns about financial transparency within the ASC.',
      'Flaws and perceived inequities in the student council’s financial tiering system.',
      'Concerns about the transparency and communication of student-related financial decisions.',
    ],
    solutions: [
      'Re-evaluate and update the tiering system to better reflect club impact.',
      'Connect with financial institutions and agencies to increase financial literacy and exposure across the Ashesi community.',
    ],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    problems: [
      'Limited exposure to entrepreneurial opportunities and networks.',
      'Limited opportunities to connect with external organisations and professional networks.',
      'Missed career fairs and other opportunities for professional development and industry exposure.',
    ],
    solutions: [
      'Create a conducive environment for student businesses to thrive.',
      'Invite top entrepreneurs, CEOs and industry players for interactive sessions with students.',
      'Share key insights from entrepreneurial books, texts and readings with the Ashesi community.',
    ],
  },
]

// ---------- YOUR VOICE (anonymous wall + private inbox) ----------
// Notes and messages are stored by the site itself - read private ones at /inbox
export const voice = {
  eyebrow: 'Your voice, amplified',
  title: 'Share your priorities',
  lead: 'No names, no logins. Stick a note on the wall for everyone to see, or send something straight to Maria & Yayra.',
  wallPrompt: 'What should the ASC fix, keep or start?',
  privatePrompt:
    'Something you’d rather not post publicly? Tell us here. Only Maria & Yayra will read it.',
}

// ---------- TRACK RECORD (placeholders - replace with real details) ----------
// who: 'maria' | 'yayra' | 'both'
export const trackRecord = [
  // ---------- MARIA ----------
  { who: 'maria', title: 'Ashesi Economics Students Union (AESU)', role: 'President', text: '' },
  { who: 'maria', title: 'African Students in Politics, Advocacy and Governance (ASPAG)', role: 'Founder and President', text: '' },
  { who: 'maria', title: 'Ashesi Parliament', role: 'Former Deputy Speaker', text: '' },
  { who: 'maria', title: 'Ashesi Constitution Review Team', role: 'General Secretary', text: '' },
  { who: 'maria', title: 'Ashesi University', role: 'Resident Assistant', text: '' },
  { who: 'maria', title: 'Ashesi Leadership Summit 2026', role: 'Coordinator', text: '' },
  { who: 'maria', title: 'The Cause (Mental Health Advocacy)', role: 'Founder', text: '' },
  { who: 'maria', title: 'Project Sustainability', role: 'President', text: '' },
  { who: 'maria', title: 'Raising Empathetic Leaders to Combat Bullying (ABC)', role: 'Campaign Lead', text: '' },
  { who: 'maria', title: 'The African Network (TAN)', role: 'Youth Advocacy and AfCFTA Panel Speaker', text: '' },
  { who: 'maria', title: 'Morning Glory International School', role: 'Head Girl', text: '' },

  // ---------- YAYRA ----------
  { who: 'yayra', title: 'TEDxAshesi', role: 'Public Relations Lead (2026) · Public Relations Co-Lead (previous session)', text: '' },
  { who: 'yayra', title: 'Ashesi Student Council (ASC)', role: 'Public Relations Committee Member', text: '' },
  { who: 'yayra', title: 'Provost’s Office', role: 'Peer Support Coordinator', text: '' },
  { who: 'yayra', title: 'Ashesi Women’s Football Team', role: 'Co-Captain (previous session)', text: '' },
  { who: 'yayra', title: 'Ashesi Commencement Support', role: 'Volunteer', text: '' },
  { who: 'yayra', title: 'Career Services', role: 'Volunteer', text: '' },
  { who: 'yayra', title: 'UBORA Awards', role: 'Sportswoman of the Year & Rising Star Award Recipient', text: '' },
  { who: 'yayra', title: 'The Boven Foundation', role: 'Co-Founder', text: '' },
  { who: 'yayra', title: 'Morgan International Community School', role: 'SRC Vice President', text: '' },
  { who: 'yayra', title: 'Foundations of Design and Entrepreneurship (FDE)', role: 'Coach', text: '' },
  { who: 'yayra', title: 'Ashesi University', role: 'Peer Academic Advisor', text: '' },
]

// ---------- MERCH (placeholders) ----------
export const merch = {
  comingSoon: true, // set to false when merch is ready to order
  items: [
    { name: 'MOTION T-Shirt(Black)', photo: '/images/black.jpg' },
    { name: 'MOTION T-Shirt (White)', photo: '/images/white.jpg' },
    { name: 'MOTION Wristband', photo: '/images/bands.jpg' },
    { name: 'MOTION Stickers', photo: '/images/stickers.jpg' },

  ],
}
