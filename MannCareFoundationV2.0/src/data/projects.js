// =====================================================
// Sab 6 projects ka data — naya project add karna ho to
// bas is array me ek object add karo, page apne aap ban jayega.
// Route: /projects/:slug  (e.g. /projects/poshan)
// =====================================================

const imgs = import.meta.glob('/src/assets/images/**/*.{jpeg,jpg,JPG,png,gif,webp,svg,ico}', { eager: true, query: '?url' })
const img = (path) => { const v = imgs[`/src/assets/images${path}`]; if (!v) return path; return typeof v === 'string' ? v : v.default || path }

export const projects = [
  {
    slug: "poshan",
    name: "Project Poshan",
    badge: "Nutrition Support Initiative",
    subtitle: "Nourishing Lives, Restoring Hope & Building Healthier Communities",
    heroImg: img("/projects/hero1.jpeg"),
    heroImgMobile: img("/projects/mobile-slide1.jpeg"),
    card: {
      title: "Everyone Deserves Nutritious Food",
      text: "Project Poshan is a flagship humanitarian initiative of MANN Foundation dedicated to addressing hunger, malnutrition, and food insecurity among vulnerable individuals and families. Through ration support, nutritious meals, healthy snacks, and refreshment assistance, we ensure that nourishment reaches those who need it most.",
    },
    aboutHeading: "Fighting Hunger With Compassion",
    mission:
      "Access to nutritious food is not a privilege—it is a fundamental human necessity. Project Poshan works to ensure that every individual receives the nourishment required to live with dignity, health, and hope.",
    whyItMatters:
      "Hunger and poor nutrition affect physical health, productivity, mental well-being, and overall quality of life. By providing food support, we help families break the cycle of hardship and insecurity.",
    servicesHeading: "Nutritional Support Programs",
    servicesTag: "What We Provide",
    services: [
      { icon: "🥖", title: "Dry Ration Kits", desc: "Essential monthly food supplies for families facing financial hardship." },
      { icon: "🍲", title: "Cooked Meals", desc: "Fresh and nutritious meals distributed to individuals in need." },
      { icon: "🥗", title: "Healthy Snack Kits", desc: "Nutritional snacks designed to support energy and wellness." },
      { icon: "☕", title: "Refreshment Support", desc: "Timely refreshment assistance during outreach and relief activities." },
    ],
    beneficiariesHeading: "Supporting Those Who Need It Most",
    beneficiariesTag: "Who We Serve",
    beneficiaries: [
      "👴 Elderly Citizens",
      "👷 Daily Wage Workers",
      "🚚 Migrant Families",
      "♿ Persons with Disabilities",
      "🏠 Economically Marginalized Families",
      "🤝 Individuals in Crisis",
    ],
    impactHeading: "Creating Stronger Communities Through Nutrition",
    impact: [
      { title: "Health & Wellbeing", desc: "Improving nutrition, immunity, and overall physical wellness." },
      { title: "Dignity & Stability", desc: "Ensuring food support reaches every person with respect and inclusion." },
      { title: "Hope For Tomorrow", desc: "Building resilient families and healthier communities for the future." },
    ],
    cta: {
      title: "Join The Mission To End Hunger",
      text: "Every meal served is an act of compassion. Every ration kit delivered is a step toward a healthier and more humane society.",
      btn: "Support Project Poshan",
    },
  },
  {
    slug: "gyaan",
    name: "Project Gyaan",
    badge: "Education Support Initiative",
    subtitle: "Empowering Children Through Education, Technology & Opportunity",
    heroImg: img("/projects/hero2.jpeg"),
    heroImgMobile: img("/projects/mobile-slide2.jpeg"),
    card: {
      title: "Every Child Deserves The Right To Learn",
      text: "Project Gyaan is a transformative education initiative focused on ensuring inclusive, continuous, and quality education for children from marginalized and underserved communities. Through academic support, digital learning, educational resources, and skill development opportunities, the project empowers children to build brighter futures and achieve their full potential.",
    },
    aboutHeading: "Transforming Lives Through Education",
    mission:
      "Project Gyaan aims to ensure that every child, regardless of economic background, has access to quality education, learning resources, digital opportunities, and the support needed to succeed academically and personally.",
    whyItMatters:
      "Financial hardship, lack of educational resources, and limited digital access prevent many children from reaching their full potential. Project Gyaan bridges these gaps and creates equal opportunities for learning and growth.",
    servicesHeading: "Education & Learning Support Programs",
    servicesTag: "What We Provide",
    services: [
      { icon: "📚", title: "School Kits", desc: "Distribution of school bags, notebooks, stationery, textbooks and learning materials." },
      { icon: "👕", title: "Uniform Support", desc: "Providing school uniforms and essential educational supplies to children in need." },
      { icon: "💻", title: "Digital Education", desc: "Access to computers, e-learning platforms, smart classrooms and online learning tools." },
      { icon: "🎓", title: "Learning Guidance", desc: "Mentorship, motivation, academic encouragement and educational support programs." },
    ],
    beneficiariesHeading: "Supporting Young Learners & Future Leaders",
    beneficiariesTag: "Who We Serve",
    beneficiaries: [
      "👧 School Children",
      "🧒 Underprivileged Students",
      "🏘️ Children From Marginalized Communities",
      "💻 First-Time Digital Learners",
      "📖 Students At Risk Of Dropping Out",
      "🌟 Aspiring Young Achievers",
    ],
    impactHeading: "Building Futures Through Knowledge & Technology",
    impact: [
      { title: "Access To Education", desc: "Ensuring every child receives educational resources and opportunities to learn." },
      { title: "Digital Empowerment", desc: "Bridging the digital divide through technology access and computer literacy." },
      { title: "Confidence & Growth", desc: "Encouraging children to believe in their abilities and pursue brighter futures." },
    ],
    cta: {
      title: "Join The Mission To Educate Every Child",
      text: "Every book distributed, every digital resource provided, and every child empowered through education brings us one step closer to a brighter and more equitable future.",
      btn: "Support Project Gyaan",
    },
  },
  {
    slug: "sakhi",
    name: "Project Sakhi",
    badge: "Women Empowerment Initiative",
    subtitle: "Empowering Women Through Confidence, Skills, Health & Independence",
    heroImg: img("/projects/hero3.jpeg"),
    heroImgMobile: img("/projects/mobile-slide3.jpeg"),
    card: {
      title: "Strong Women Build Strong Communities",
      text: "Project Sakhi is a holistic women empowerment initiative dedicated to strengthening confidence, self-reliance, health awareness, and economic independence among women from marginalized communities. Through skills, knowledge, and support, the project enables women to become active contributors and leaders in society.",
    },
    aboutHeading: "Empowering Women Beyond Limitations",
    mission:
      "Project Sakhi works to empower women economically, socially, physically, and emotionally by providing opportunities, awareness, resources, and support systems that enable them to live with dignity and confidence.",
    whyItMatters:
      "Many women face challenges such as financial dependence, limited access to opportunities, lack of health awareness, and social barriers. Project Sakhi helps overcome these challenges through a comprehensive empowerment approach.",
    servicesHeading: "Women Empowerment Support Programs",
    servicesTag: "What We Provide",
    services: [
      { icon: "🧵", title: "Skill Development", desc: "Training programs that help women acquire income-generating and livelihood skills." },
      { icon: "💼", title: "Livelihood Support", desc: "Opportunities for sustainable employment and self-employment initiatives." },
      { icon: "🩺", title: "Health & Hygiene Support", desc: "Access to menstrual hygiene products, personal care resources, and health essentials." },
      { icon: "📢", title: "Awareness Campaigns", desc: "Sessions on health, sanitation, nutrition, rights awareness, safety, and financial literacy." },
    ],
    beneficiariesHeading: "Supporting Women At Every Stage Of Growth",
    beneficiariesTag: "Who We Serve",
    beneficiaries: [
      "👩 Women From Marginalized Communities",
      "💪 Aspiring Entrepreneurs",
      "🏡 Homemakers Seeking Opportunities",
      "🩷 Women Requiring Health & Hygiene Support",
      "📚 Women Seeking Knowledge & Awareness",
      "🌟 Future Women Leaders",
    ],
    impactHeading: "Creating Confident, Healthy & Independent Women",
    impact: [
      { title: "Economic Independence", desc: "Equipping women with skills and opportunities to achieve financial stability." },
      { title: "Health & Wellbeing", desc: "Promoting awareness, hygiene practices, and access to essential health resources." },
      { title: "Leadership & Confidence", desc: "Encouraging women to participate actively in decision-making and community leadership." },
    ],
    cta: {
      title: "Join The Movement For Women Empowerment",
      text: "Every woman empowered creates a ripple effect that strengthens families, uplifts communities, and builds a more inclusive and sustainable future.",
      btn: "Support Project Sakhi",
    },
  },
  {
    slug: "swasth",
    name: "Project Swasth",
    badge: "Health & Hygiene Initiative",
    subtitle: "Promoting Health, Hygiene, Awareness & Dignity For Every Individual",
    heroImg: img("/projects/hero4.jpeg"),
    heroImgMobile: img("/projects/mobile-slide4.jpeg"),
    card: {
      title: "Healthy Communities Begin With Awareness",
      text: "Project Swasth is a comprehensive health and hygiene initiative focused on preventive healthcare, hygiene awareness, and access to essential health support. Through education, medical assistance, hygiene resources, and community outreach, the initiative empowers individuals to lead healthier, safer, and more dignified lives.",
    },
    aboutHeading: "Building Healthier Communities Through Prevention",
    mission:
      "Project Swasth aims to improve community health by promoting hygiene, preventive healthcare, health education, and access to essential medical support for vulnerable individuals and families.",
    whyItMatters:
      "Poor hygiene awareness, limited healthcare access, and untreated medical conditions often lead to preventable illnesses and long-term health complications. Project Swasth addresses these challenges through awareness, support, and timely intervention.",
    servicesHeading: "Health & Hygiene Support Programs",
    servicesTag: "What We Provide",
    services: [
      { icon: "🩺", title: "Health Awareness", desc: "Educational sessions on hygiene, sanitation, nutrition, disease prevention, and healthy lifestyle practices." },
      { icon: "🩷", title: "Menstrual Hygiene Support", desc: "Distribution of sanitary pads and awareness programs promoting safe, healthy, and dignified menstrual practices." },
      { icon: "🦷", title: "Oral Health Education", desc: "Dental hygiene awareness for children, including proper brushing habits and preventive oral care practices." },
      { icon: "🏥", title: "Medical Assistance", desc: "Support for identified medical cases, treatment guidance, healthcare referrals, and access to essential care services." },
    ],
    beneficiariesHeading: "Supporting Health & Wellbeing For All",
    beneficiariesTag: "Who We Serve",
    beneficiaries: [
      "👨‍👩‍👧 Vulnerable Families",
      "👧 School Children",
      "🩷 Women & Adolescent Girls",
      "🏘️ Underserved Communities",
      "👴 Elderly Individuals",
      "🤝 Individuals Requiring Medical Support",
    ],
    impactHeading: "Creating A Healthier & More Informed Society",
    impact: [
      { title: "Preventive Healthcare", desc: "Encouraging healthy habits and early intervention to reduce preventable diseases and health complications." },
      { title: "Improved Hygiene Practices", desc: "Promoting awareness and access to hygiene resources that support dignity, confidence, and overall wellbeing." },
      { title: "Accessible Health Support", desc: "Helping individuals access medical guidance, treatment support, and essential healthcare services when needed." },
    ],
    cta: {
      title: "Join The Mission For Better Health & Hygiene",
      text: "Every awareness session, hygiene kit, medical intervention, and act of care brings us closer to building healthier communities where every individual can live with dignity, confidence, and wellbeing.",
      btn: "Support Project Swasth",
    },
  },
  {
    slug: "pashu",
    name: "Project Pashu",
    badge: "Every Life Matters",
    subtitle: "Caring For Animals Through Compassion, Protection & Humane Action",
    heroImg: img("/projects/hero5.jpeg"),
    heroImgMobile: img("/projects/mobile-slide5.jpeg"),
    card: {
      title: "Every Living Being Deserves Care & Dignity",
      text: "Project Pashu is a compassionate animal welfare initiative dedicated to the care, protection, and well-being of animals in need. Through feeding drives, medical assistance, rescue support, and community awareness, the initiative works to ensure that vulnerable animals receive the care, safety, and compassion they deserve.",
    },
    aboutHeading: "Protecting & Caring For Our Voiceless Companions",
    mission:
      "Project Pashu is committed to improving the lives of animals through care, protection, feeding support, medical assistance, and awareness initiatives that promote kindness and responsible coexistence.",
    whyItMatters:
      "Countless animals face hunger, injury, illness, abandonment, and cruelty every day. Project Pashu works to reduce suffering and create safer, healthier environments where animals can live with dignity and care.",
    servicesHeading: "Animal Welfare & Care Programs",
    servicesTag: "What We Provide",
    services: [
      { icon: "🐾", title: "Feeding Drives", desc: "Regular food distribution and clean water support for stray, abandoned, and vulnerable animals." },
      { icon: "🏥", title: "Medical Assistance", desc: "Treatment support, emergency care, first aid, and veterinary coordination for injured and sick animals." },
      { icon: "🛡️", title: "Preventive Care", desc: "Promoting animal health, safety awareness, and humane treatment through community engagement." },
      { icon: "🏠", title: "Seasonal Protection", desc: "Water bowls, shelter support, and weather protection during extreme summer, monsoon, and winter conditions." },
    ],
    beneficiariesHeading: "Supporting Animals In Need Of Care & Protection",
    beneficiariesTag: "Who We Serve",
    beneficiaries: [
      "🐕 Stray Dogs",
      "🐄 Abandoned Cattle",
      "🐾 Injured Animals",
      "🩺 Sick & Distressed Animals",
      "🏘️ Community Animals",
      "❤️ Vulnerable & Neglected Animals",
    ],
    impactHeading: "Creating A More Humane & Compassionate Society",
    impact: [
      { title: "Reduced Animal Suffering", desc: "Providing timely food, care, and medical support to improve the quality of life for vulnerable animals." },
      { title: "Community Awareness", desc: "Encouraging compassion, responsible coexistence, and reporting of cruelty, neglect, and injury cases." },
      { title: "Protection & Care", desc: "Creating safer environments where animals receive respect, dignity, and protection throughout their lives." },
    ],
    cta: {
      title: "Join The Mission To Protect Every Life",
      text: "Every meal provided, every animal treated, and every act of kindness brings us closer to a world where compassion extends to all living beings. Together, we can create safer and more caring communities for animals.",
      btn: "Support Project Pashu",
    },
  },
  {
    slug: "paryavaran",
    name: "Project Paryavaran",
    badge: "Save Nature Today",
    subtitle: "Protecting Nature, Preserving Resources & Building A Sustainable Future",
    heroImg: img("/projects/hero6.jpeg"),
    heroImgMobile: img("/projects/mobile-slide6.jpeg"),
    card: {
      title: "Nature Is The Foundation Of Life",
      text: "Project Paryavaran is an environmental conservation and sustainability initiative dedicated to protecting, preserving, and restoring our natural ecosystem. Through tree plantation, environmental awareness, waste management, and water conservation efforts, the initiative inspires communities to embrace sustainable living and safeguard the planet for future generations.",
    },
    aboutHeading: "Creating Greener Communities Through Action",
    mission:
      "Project Paryavaran aims to promote environmental conservation, sustainability, and responsible living practices that protect air, water, land, and biodiversity while encouraging communities to actively participate in preserving nature.",
    whyItMatters:
      "Climate change, pollution, deforestation, and water scarcity are growing challenges affecting ecosystems and communities. Project Paryavaran addresses these concerns through awareness, conservation, and collective environmental action.",
    servicesHeading: "Environmental Conservation Programs",
    servicesTag: "What We Do",
    services: [
      { icon: "🌳", title: "Tree Plantation", desc: "Increasing green cover through plantation drives in schools, communities, and public spaces to improve environmental health." },
      { icon: "♻️", title: "Waste Management", desc: "Promoting waste segregation, reducing plastic usage, and encouraging sustainable alternatives for cleaner surroundings." },
      { icon: "📚", title: "Environmental Education", desc: "Awareness programs, workshops, and campaigns that encourage eco-friendly habits and climate responsibility." },
      { icon: "💧", title: "Water Conservation", desc: "Promoting rainwater harvesting, water-saving practices, and protection of natural water resources." },
    ],
    beneficiariesHeading: "Creating A Better Environment For All",
    beneficiariesTag: "Who Benefits",
    beneficiaries: [
      "🌱 Future Generations",
      "🏘️ Local Communities",
      "🎓 Students & Youth",
      "🌳 Urban & Rural Ecosystems",
      "🐦 Wildlife & Biodiversity",
      "🌍 Society As A Whole",
    ],
    impactHeading: "Building A Cleaner, Greener & Sustainable Planet",
    impact: [
      { title: "Greener Communities", desc: "Enhancing green cover, improving air quality, and restoring ecological balance through tree plantation and conservation efforts." },
      { title: "Environmental Awareness", desc: "Inspiring individuals and communities to adopt eco-friendly habits and become responsible environmental stewards." },
      { title: "Sustainable Future", desc: "Encouraging responsible use of natural resources and reducing ecological impact for generations to come." },
    ],
    cta: {
      title: "Join The Mission To Save Nature Today",
      text: "Every tree planted, every drop of water saved, and every eco-friendly action contributes to a healthier environment. Together, we can create a greener, cleaner, and more sustainable future for all.",
      btn: "Support Project Paryavaran",
    },
  },
];

// Home page ke project cards ka data
export const homeProjects = [
  {
    slug: "poshan", num: "01", color: "#f9a8d4", icon: "fa-bowl-food",
    name: "Project Poshan", tag: "Nutrition Support Initiative",
    desc: "Addressing hunger, malnutrition and food insecurity through Dry Ration Kits, Nutritious Cooked Meals, Healthy Snack Kits, and Refreshment Support for all needy individuals.",
    points: ["Dry Ration Kits", "Nutritious Cooked Meals", "Healthy Snack Kits", "Refreshment Support"],
  },
  {
    slug: "gyaan", num: "02", color: "#fda4af", icon: "fa-book-open",
    name: "Project Gyaan", tag: "Education Support Initiative",
    desc: "Ensuring inclusive, continuous, quality education for children from marginalized communities through academic and digital learning support.",
    points: ["School Kits & Stationery", "Digital Education Tools", "Computer Literacy", "Smart Classrooms"],
  },
  {
    slug: "sakhi", num: "03", color: "#f472b6", icon: "fa-female",
    name: "Project Sakhi", tag: "Women Empowerment Initiative",
    desc: "Empowering women holistically through skill development, livelihood training, hygiene support, and confidence-building at the grassroots level.",
    points: ["Skill Development Training", "Menstrual Hygiene Support", "Financial Literacy", "Leadership Development"],
  },
  {
    slug: "swasth", num: "04", color: "#fb7185", icon: "fa-heart-pulse",
    name: "Project Swasth", tag: "Health & Hygiene Initiative",
    desc: "Promoting preventive healthcare, hygiene awareness, and access to essential health support — including oral health, menstrual hygiene, and medical assistance.",
    points: ["Health Awareness Sessions", "Sanitary Pad Distribution", "Oral Health for Children", "Medical Case Support"],
  },
  {
    slug: "pashu", num: "05", color: "#f9a8d4", icon: "fa-paw",
    name: "Project Pashu", tag: "Animal Support Initiative",
    desc: "Dedicated to the care, protection, and well-being of animals — stray dogs, abandoned cattle, injured animals — with feeding drives, medical support, and community awareness.",
    points: ["Regular Feeding Drives", "Medical & Emergency Care", "Seasonal Care Support", "Community Engagement"],
  },
  {
    slug: "paryavaran", num: "06", color: "#22c55e", icon: "fa-leaf",
    name: "Project Paryavaran", tag: "Environment & Sustainability Initiative",
    desc: "Promoting environmental protection through tree plantation, cleanliness drives, and awareness programs to build a greener and healthier future for all.",
    points: ["Tree Plantation Drives", "Cleanliness & Waste Management Campaigns", "Plastic-Free Awareness Programs", "Environmental Education for Students"],
  },
];

// Gallery (Media page) data
export const gallerySections = [
  {
    tag: "🥛 Cool & Healthy Hydration",
    title: "Buttermilk Distribution",
    desc: "Refreshing buttermilk distributed to beat the heat — keeping communities cool, hydrated & healthy.",
    images: [img("/media/b1.JPG"), img("/media/b2.JPG"), img("/media/b3.JPG"), img("/media/b4.JPG"), img("/media/b5.JPG"), img("/media/b6.JPG")],
  },
  {
    tag: "🍉 Beat the Heat Initiative",
    title: "Watermelon Distribution",
    desc: "Cool relief in the summer heat — juicy watermelons shared to keep our community hydrated & happy.",
    images: [img("/media/w1.jpg"), img("/media/w2.jpg"), img("/media/w3.jpg"), img("/media/w4.jpg"), img("/media/w5.jpg")],
  },
  {
    tag: "🍒 Summer Refreshment Drive",
    title: "Litchi Distribution",
    desc: "Spreading sweetness & nutrition — fresh Litchis distributed with love to children and families in need.",
    images: [img("/media/l1.jpg"), img("/media/l2.jpg"), img("/media/l3.jpg"), img("/media/l4.jpg")],
  },
  {
    tag: "🍪 Nutrition on the Go",
    title: "Snack Distribution",
    desc: "Healthy snacks distributed to children — ensuring no child goes to school hungry.",
    images: [img("/media/snack1.jpeg"), img("/media/snack2.jpeg"), img("/media/snack3.jpeg"), img("/media/snack4.jpeg"), img("/media/snack5.jpeg")],
  },
];

// Team members
export const team = [
  { img: img("/about/team1.jpeg"), name: "Mrs. Anjana Vyas", role: "PRESIDENT" },
  { img: img("/about/team2.jpeg"), name: "Mrs. Archana Parmar", role: "VICE PRESIDENT" },
  { img: img("/about/team3.jpeg"), name: "Mrs. Deepali Gautam", role: "CORE MEMBER" },
  { img: img("/about/team4.jpeg"), name: "Mrs. Sushma Ambokar", role: "CORE MEMBER" },
  { img: img("/about/team6.jpeg"), name: "Mrs. Maya Jadhao", role: "CORE MEMBER" },
];
