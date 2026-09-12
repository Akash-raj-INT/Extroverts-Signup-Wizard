// Mock Data for Extroverts Signup Wizard & Cross-Field Dependencies

export const LOCATION_DATA = {
  "California": {
    cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose"],
    colleges: {
      "Los Angeles": ["UCLA (University of California)", "USC (University of Southern California)", "Loyola Marymount", "Working Professional / Other"],
      "San Francisco": ["UC Berkeley", "SFSU (San Francisco State)", "USF (University of San Francisco)", "Working Professional / Other"],
      "San Diego": ["UC San Diego", "San Diego State University", "USD (University of San Diego)", "Working Professional / Other"],
      "San Jose": ["San Jose State University", "Santa Clara University", "Working Professional / Other"]
    }
  },
  "New York": {
    cities: ["New York City", "Buffalo", "Albany", "Rochester"],
    colleges: {
      "New York City": ["NYU (New York University)", "Columbia University", "Fordham University", "CUNY Hunter College", "Working Professional / Other"],
      "Buffalo": ["SUNY Buffalo", "Canisius University", "Working Professional / Other"],
      "Albany": ["University at Albany", "College of Saint Rose", "Working Professional / Other"],
      "Rochester": ["University of Rochester", "RIT (Rochester Institute of Tech)", "Working Professional / Other"]
    }
  },
  "Texas": {
    cities: ["Austin", "Houston", "Dallas", "San Antonio"],
    colleges: {
      "Austin": ["UT Austin (University of Texas)", "St. Edward's University", "Working Professional / Other"],
      "Houston": ["Rice University", "University of Houston", "Working Professional / Other"],
      "Dallas": ["SMU (Southern Methodist)", "UT Dallas", "Working Professional / Other"],
      "San Antonio": ["UTSA", "Trinity University", "Working Professional / Other"]
    }
  },
  "Maharashtra": {
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    colleges: {
      "Mumbai": ["IIT Bombay", "St. Xavier's College", "NMIMS Mumbai", "VJTI Mumbai", "Working Professional / Other"],
      "Pune": ["SPPU (Pune University)", "COEP Tech", "Symbiosis International", "FLAME University", "Working Professional / Other"],
      "Nagpur": ["VNIT Nagpur", "RTMNU", "Working Professional / Other"],
      "Nashik": ["KK Wagh Institute", "MET BKC", "Working Professional / Other"]
    }
  },
  "Delhi NCR": {
    cities: ["New Delhi", "Gurgaon", "Noida"],
    colleges: {
      "New Delhi": ["Delhi University (DU)", "IIT Delhi", "JNU", "DTU (Delhi Tech Univ)", "Working Professional / Other"],
      "Gurgaon": ["GD Goenka University", "Gurugram University", "Working Professional / Other"],
      "Noida": ["Amity University Noida", "Jaypee Institute of Tech", "Working Professional / Other"]
    }
  },
  "Karnataka": {
    cities: ["Bengaluru", "Mysuru", "Mangaluru"],
    colleges: {
      "Bengaluru": ["IISc Bangalore", "RV College of Engineering", "Christ University", "PES University", "Working Professional / Other"],
      "Mysuru": ["University of Mysore", "JSS STU", "Working Professional / Other"],
      "Mangaluru": ["NITK Surathkal", "St. Aloysius College", "Working Professional / Other"]
    }
  }
};

export const PARTY_VIBES = [
  { id: "vibe_edm", label: "EDM & Techno Nights", icon: "🎧", description: "Heavy bass, strobes, dark room vibes" },
  { id: "vibe_house", label: "Secret House Parties", icon: "🏠", description: "Cozy backyard & living room jams" },
  { id: "vibe_rooftop", label: "Rooftop Sundowners", icon: "🍹", description: "Cocktails, sunsets, progressive house" },
  { id: "vibe_campus", label: "Campus Hangouts", icon: "🎓", description: "Dorm chills, fest afterparties" },
  { id: "vibe_clubbing", label: "Clubbing & VIP Lounges", icon: "💃", description: "High energy, velvet ropes, champagne" },
  { id: "vibe_foodies", label: "Late Night Foodies", icon: "🍕", description: "3 AM diners, taco runs, diner talk" },
  { id: "vibe_gaming", label: "Gaming & Board Games", icon: "🎮", description: "LAN parties, smash bros, tabletop" },
  { id: "vibe_rave", label: "Underground Raves", icon: "⚡", description: "Warehouse parties, neon body paint" },
  { id: "vibe_beach", label: "Beach & Pool Parties", icon: "🏖️", description: "Sunlight, swimming, tropical house" },
  { id: "vibe_live", label: "Live Jam Sessions", icon: "🎸", description: "Acoustic, Indie bands, open mic" }
];

export const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
];

export const TERMS_AND_CONDITIONS = {
  title: "Extroverts Community Terms & Safety Code",
  lastUpdated: "September 2026",
  sections: [
    {
      id: "age_policy",
      title: "1. Minimum Age Requirement (18+ strictly enforced)",
      content: "Extroverts is an exclusive community platform created for adults aged 18 and older. Minors under the age of 18 are prohibited from registering, hosting, or attending parties organized through this app. Age verification is enforced during signup and profile review."
    },
    {
      id: "code_of_conduct",
      title: "2. Zero-Tolerance Safety & Respect Policy",
      content: "We enforce a zero-tolerance policy against any form of harassment, uninvited physical contact, hate speech, or non-consensual behavior. All members must treat party hosts and guests with absolute respect. Violators face immediate permanent ban and reporting to local authorities."
    },
    {
      id: "privacy_location",
      title: "3. Privacy & Location Safety",
      content: "Your exact street address is never published publicly. Party locations are only shared with approved guests 2 hours prior to event start. You retain full control over your profile visibility and privacy settings at all times."
    },
    {
      id: "host_responsibilities",
      title: "4. Host Guidelines & Guest Verification",
      content: "Party hosts have the right to set entry criteria and guest limits. Hosts are responsible for maintaining a safe environment and ensuring compliance with local noise and safety regulations."
    }
  ]
};
