export interface ProgramStat {
  label: string;
  value: string;
}

export interface ProgramStory {
  title: string;
  childName: string;
  age: number;
  summary: string;
  location: string;
}

export interface ProgramGalleryItem {
  src: string;
  alt: string;
}

export interface Program {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  stats: ProgramStat[];
  stories: ProgramStory[];
  gallery: ProgramGalleryItem[];
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
  program: "Education" | "Nutrition" | "Healthcare" | "Empowerment";
}

export interface ImpactStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface SuccessStory {
  childName: string;
  age: number;
  program: "Education" | "Nutrition" | "Healthcare" | "Empowerment";
  location: string;
  before: string;
  after: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  program: "Education" | "Nutrition" | "Healthcare" | "Empowerment";
  location: string;
}

export interface DonationTier {
  amount: 10 | 25 | 50 | 100 | 250 | 500;
  impact: string;
}

export const programs: Program[] = [
  {
    id: 1,
    slug: "education",
    title: "Education",
    tagline: "Opening classroom doors to brighter futures",
    description:
      "Our education program supports first-generation learners with school enrollment, after-school tutoring, digital literacy labs, and mentorship for long-term academic success.",
    icon: "BookOpen",
    heroImage: "https://picsum.photos/seed/aura-education-hero/1400/900",
    stats: [
      { label: "Children Enrolled", value: "18,400+" },
      { label: "Learning Centers", value: "56" },
      { label: "Scholarships Awarded", value: "2,130" },
    ],
    stories: [
      {
        title: "From dropout risk to district topper",
        childName: "Riya",
        age: 13,
        summary:
          "Riya rejoined school through our bridge classes and now leads her class in mathematics.",
        location: "Jhansi",
      },
      {
        title: "A first reader in the family",
        childName: "Arjun",
        age: 10,
        summary:
          "Arjun learned foundational literacy in our evening center and now reads stories to his siblings.",
        location: "Barmer",
      },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/aura-edu-1/900/700", alt: "Children reading in a bright classroom" },
      { src: "https://picsum.photos/seed/aura-edu-2/900/700", alt: "Mentor helping students with tablets" },
      { src: "https://picsum.photos/seed/aura-edu-3/900/700", alt: "Community learning center evening session" },
    ],
  },
  {
    id: 2,
    slug: "nutrition",
    title: "Nutrition",
    tagline: "Healthy meals, stronger beginnings",
    description:
      "The nutrition program tackles child hunger with daily fortified meals, kitchen gardens, anemia screening, and mother-led nutrition education circles.",
    icon: "Utensils",
    heroImage: "https://picsum.photos/seed/aura-nutrition-hero/1400/900",
    stats: [
      { label: "Meals Served", value: "3.2M+" },
      { label: "Children Monitored", value: "22,000+" },
      { label: "Village Kitchens", value: "74" },
    ],
    stories: [
      {
        title: "Weight recovery in six months",
        childName: "Sana",
        age: 5,
        summary:
          "With consistent meal support and growth tracking, Sana moved from severe underweight to healthy range.",
        location: "Nandurbar",
      },
      {
        title: "Kitchen garden transforms a hamlet",
        childName: "Imran",
        age: 8,
        summary:
          "Imran's family now grows leafy vegetables year-round through our community garden training.",
        location: "Kalahandi",
      },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/aura-nutri-1/900/700", alt: "Volunteers serving nutritious lunch to children" },
      { src: "https://picsum.photos/seed/aura-nutri-2/900/700", alt: "Mother group cooking fortified meal" },
      { src: "https://picsum.photos/seed/aura-nutri-3/900/700", alt: "Children in a kitchen garden with vegetables" },
    ],
  },
  {
    id: 3,
    slug: "healthcare",
    title: "Healthcare",
    tagline: "Care that reaches every child, everywhere",
    description:
      "Our healthcare teams run mobile clinics, immunization drives, telemedicine consults, and preventive care workshops in underserved villages.",
    icon: "HeartPulse",
    heroImage: "https://picsum.photos/seed/aura-healthcare-hero/1400/900",
    stats: [
      { label: "Health Checkups", value: "96,500+" },
      { label: "Mobile Camps", value: "1,280" },
      { label: "Vaccinations Supported", value: "41,700" },
    ],
    stories: [
      {
        title: "Treatment reached just in time",
        childName: "Mehul",
        age: 7,
        summary:
          "A mobile camp detected a cardiac issue early and connected Mehul's family to life-saving care.",
        location: "Dahod",
      },
      {
        title: "No more missed immunization",
        childName: "Pooja",
        age: 2,
        summary:
          "Through village health reminders, Pooja completed all key vaccinations on schedule.",
        location: "Gumla",
      },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/aura-health-1/900/700", alt: "Mobile medical van parked in village" },
      { src: "https://picsum.photos/seed/aura-health-2/900/700", alt: "Nurse checking child vitals during camp" },
      { src: "https://picsum.photos/seed/aura-health-3/900/700", alt: "Telemedicine consultation with pediatric specialist" },
    ],
  },
  {
    id: 4,
    slug: "empowerment",
    title: "Empowerment",
    tagline: "Building confidence, voice, and opportunity",
    description:
      "The empowerment track equips adolescents and caregivers with life skills, leadership training, vocational exposure, and financial literacy.",
    icon: "Users",
    heroImage: "https://picsum.photos/seed/aura-empowerment-hero/1400/900",
    stats: [
      { label: "Youth Trained", value: "11,900+" },
      { label: "Women Self-Help Groups", value: "218" },
      { label: "Micro-businesses Started", value: "640" },
    ],
    stories: [
      {
        title: "A girl leader in her village council",
        childName: "Kavya",
        age: 16,
        summary:
          "Kavya completed leadership fellowship and now advocates for girls' safety and school attendance.",
        location: "Seoni",
      },
      {
        title: "Skill training to family stability",
        childName: "Rohan",
        age: 17,
        summary:
          "After digital and communication training, Rohan secured his first apprenticeship in a nearby town.",
        location: "Sirohi",
      },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/aura-emp-1/900/700", alt: "Teen leadership workshop in session" },
      { src: "https://picsum.photos/seed/aura-emp-2/900/700", alt: "Women self-help group meeting" },
      { src: "https://picsum.photos/seed/aura-emp-3/900/700", alt: "Youth presenting project ideas" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Anita Verma",
    role: "Mother",
    location: "Kalahandi, Odisha",
    quote:
      "My daughter now attends school every day, eats nutritious meals, and dreams of becoming a teacher.",
    avatar: "https://picsum.photos/seed/aura-testimonial-1/300/300",
    program: "Education",
  },
  {
    name: "Rahul Sheikh",
    role: "Community Volunteer",
    location: "Nandurbar, Maharashtra",
    quote:
      "The nutrition program changed how our village thinks about food and child health.",
    avatar: "https://picsum.photos/seed/aura-testimonial-2/300/300",
    program: "Nutrition",
  },
  {
    name: "Dr. Nisha Menon",
    role: "Pediatric Consultant",
    location: "Dahod, Gujarat",
    quote:
      "Regular camps mean illnesses are caught early, and children recover faster.",
    avatar: "https://picsum.photos/seed/aura-testimonial-3/300/300",
    program: "Healthcare",
  },
  {
    name: "Kavita Yadav",
    role: "Youth Mentor",
    location: "Seoni, Madhya Pradesh",
    quote:
      "Confidence training helped many girls speak up for their education and safety.",
    avatar: "https://picsum.photos/seed/aura-testimonial-4/300/300",
    program: "Empowerment",
  },
  {
    name: "Suresh Kumar",
    role: "School Principal",
    location: "Jhansi, Uttar Pradesh",
    quote:
      "Attendance and learning outcomes improved dramatically after Aura Rise support began.",
    avatar: "https://picsum.photos/seed/aura-testimonial-5/300/300",
    program: "Education",
  },
  {
    name: "Farida Bano",
    role: "Parent Leader",
    location: "Barmer, Rajasthan",
    quote:
      "We feel supported, informed, and hopeful about our children's future.",
    avatar: "https://picsum.photos/seed/aura-testimonial-6/300/300",
    program: "Healthcare",
  },
];

export const stats: ImpactStat[] = [
  { label: "Children Helped", value: 47000, suffix: "+" },
  { label: "Villages Reached", value: 312 },
  { label: "Years Active", value: 8 },
  { label: "Volunteers", value: 2400, suffix: "+" },
];

export const team: TeamMember[] = [
  {
    name: "Meera Sinha",
    role: "Founder & Executive Director",
    bio: "Meera has led community development initiatives for over 15 years, focusing on child rights and equity in rural India.",
    image: "https://picsum.photos/seed/aura-team-1/500/500",
  },
  {
    name: "Arvind Rao",
    role: "Head of Programs",
    bio: "Arvind oversees field strategy across education, health, and nutrition with a strong evidence-led implementation approach.",
    image: "https://picsum.photos/seed/aura-team-2/500/500",
  },
  {
    name: "Sara Joseph",
    role: "Director, Partnerships",
    bio: "Sara builds collaborations with schools, hospitals, and grassroots organizations to scale lasting impact.",
    image: "https://picsum.photos/seed/aura-team-3/500/500",
  },
  {
    name: "Nikhil Patnaik",
    role: "Lead, Monitoring & Impact",
    bio: "Nikhil designs measurement frameworks that track outcomes and improve delivery quality village by village.",
    image: "https://picsum.photos/seed/aura-team-4/500/500",
  },
  {
    name: "Priya Kulkarni",
    role: "Community Outreach Manager",
    bio: "Priya mentors frontline volunteers and strengthens local ownership through participatory planning models.",
    image: "https://picsum.photos/seed/aura-team-5/500/500",
  },
];

export const successStories: SuccessStory[] = [
  {
    childName: "Riya",
    age: 13,
    program: "Education",
    location: "Jhansi, Uttar Pradesh",
    before:
      "Riya had dropped out after repeated absences caused by household responsibilities and weak foundational learning.",
    after:
      "After bridge classes, family counseling, and scholarship support, she returned to school, regained confidence, and now ranks in the top three of her class.",
  },
  {
    childName: "Sana",
    age: 5,
    program: "Nutrition",
    location: "Nandurbar, Maharashtra",
    before:
      "Sana was severely underweight and frequently ill due to inconsistent meals and limited awareness of nutrition at home.",
    after:
      "With daily fortified meals, growth monitoring, and caregiver coaching, she reached a healthy weight range and became active in preschool activities.",
  },
  {
    childName: "Mehul",
    age: 7,
    program: "Healthcare",
    location: "Dahod, Gujarat",
    before:
      "Mehul experienced persistent fatigue and breathlessness, but his family lacked access to specialist diagnosis.",
    after:
      "A mobile clinic referral connected him to timely treatment; his recovery allowed him to return to regular play and school attendance.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "How can I donate to Aura Rise Foundation?",
    answer:
      "You can donate securely through our website using cards, UPI, net banking, or bank transfer. Monthly and one-time donations are both supported.",
  },
  {
    question: "Are donations tax deductible?",
    answer:
      "Yes. Eligible donations are tax deductible under applicable laws. You receive a receipt and required tax details by email after payment.",
  },
  {
    question: "Can I choose which program my donation supports?",
    answer:
      "Yes. You can direct your donation to Education, Nutrition, Healthcare, or Empowerment, or let us allocate funds to highest-priority needs.",
  },
  {
    question: "How are funds used across programs?",
    answer:
      "Funds cover direct program delivery, field staff, educational and medical supplies, monitoring, and essential administrative support for continuity.",
  },
  {
    question: "What percentage goes directly to impact work?",
    answer:
      "Most funding is deployed to field programs, while a smaller share supports governance, compliance, and systems that ensure accountable delivery.",
  },
  {
    question: "How do you measure impact?",
    answer:
      "We track baseline and follow-up indicators like attendance, health outcomes, nutrition status, and community participation, then publish regular reports.",
  },
  {
    question: "Can I volunteer remotely?",
    answer:
      "Yes. Remote volunteers support content creation, mentoring, data review, fundraising, and digital campaigns depending on current program needs.",
  },
  {
    question: "Do you offer on-ground volunteering opportunities?",
    answer:
      "Yes. We organize structured field opportunities in select regions with orientation, safeguarding guidelines, and local coordinator supervision.",
  },
  {
    question: "How often will I receive updates as a donor?",
    answer:
      "Donors receive periodic updates through newsletters, impact snapshots, and annual summaries showing stories and measurable outcomes.",
  },
  {
    question: "Can organizations partner with Aura Rise Foundation?",
    answer:
      "Absolutely. We partner with companies, schools, hospitals, and local groups for co-funded projects, volunteering drives, and technical support.",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/aura-gallery-1/1200/900",
    alt: "Students in a village classroom raising hands",
    program: "Education",
    location: "Jhansi, Uttar Pradesh",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-2/1200/900",
    alt: "Children reading together under a learning shelter",
    program: "Education",
    location: "Barmer, Rajasthan",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-3/1200/900",
    alt: "Midday meal distribution line at community center",
    program: "Nutrition",
    location: "Kalahandi, Odisha",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-4/1200/900",
    alt: "Caregivers learning meal planning with nutrition staff",
    program: "Nutrition",
    location: "Nandurbar, Maharashtra",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-5/1200/900",
    alt: "Health camp registration desk in rural village",
    program: "Healthcare",
    location: "Dahod, Gujarat",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-6/1200/900",
    alt: "Doctor examining child in mobile clinic van",
    program: "Healthcare",
    location: "Gumla, Jharkhand",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-7/1200/900",
    alt: "Adolescent girls in leadership workshop circle",
    program: "Empowerment",
    location: "Seoni, Madhya Pradesh",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-8/1200/900",
    alt: "Skill training session with youth facilitators",
    program: "Empowerment",
    location: "Sirohi, Rajasthan",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-9/1200/900",
    alt: "Community volunteers tracking child attendance",
    program: "Education",
    location: "Raichur, Karnataka",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-10/1200/900",
    alt: "Kitchen garden harvest day with children",
    program: "Nutrition",
    location: "Bastar, Chhattisgarh",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-11/1200/900",
    alt: "Vaccination awareness wall painting campaign",
    program: "Healthcare",
    location: "Supaul, Bihar",
  },
  {
    src: "https://picsum.photos/seed/aura-gallery-12/1200/900",
    alt: "Women self-help group presenting business plans",
    program: "Empowerment",
    location: "Wardha, Maharashtra",
  },
];

export const donationTiers: DonationTier[] = [
  {
    amount: 10,
    impact: "Provides essential learning supplies for one child for a week.",
  },
  {
    amount: 25,
    impact: "Supports nutritious meals for five children for a full day.",
  },
  {
    amount: 50,
    impact: "Funds a basic health screening camp for children in one hamlet.",
  },
  {
    amount: 100,
    impact: "Sponsors one month of after-school tutoring for a small student group.",
  },
  {
    amount: 250,
    impact: "Equips a community nutrition kitchen with staples and monitoring tools.",
  },
  {
    amount: 500,
    impact: "Helps run a multi-service village outreach covering education, health, and mentorship.",
  },
];
