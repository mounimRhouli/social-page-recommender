import type { Page, Platform } from '../types';

const mockData: Page[] = [
  // Facebook
  {
    id: 'fb-1',
    platform: 'Facebook',
    name: 'TechCrunch',
    description: 'The latest technology news and information on startups.',
    followers: 2800000,
    link: 'https://www.facebook.com/techcrunch',
    avatar: 'https://picsum.photos/seed/techcrunch/100/100'
  },
  {
    id: 'fb-2',
    platform: 'Facebook',
    name: 'NASA - National Aeronautics and Space Administration',
    description: 'Explore the universe and discover our home planet with the official NASA page.',
    followers: 25000000,
    link: 'https://www.facebook.com/NASA',
    avatar: 'https://picsum.photos/seed/nasa/100/100'
  },
  {
    id: 'fb-3',
    platform: 'Facebook',
    name: 'The AI Revolution',
    description: 'Covering the latest breakthroughs in Artificial Intelligence, Machine Learning, and Data Science. Join the discussion on the future of AI.',
    followers: 750000,
    link: '#',
    avatar: 'https://picsum.photos/seed/ai-revolution/100/100'
  },
   {
    id: 'fb-4',
    platform: 'Facebook',
    name: 'UI/UX Designers Hub',
    description: 'A community for designers to share inspiration, resources, and best practices in UI/UX design, product design, and interaction design.',
    followers: 480000,
    link: '#',
    avatar: 'https://picsum.photos/seed/uiux-hub/100/100'
  },

  // Instagram
  {
    id: 'ig-1',
    platform: 'Instagram',
    name: '@natgeotravel',
    description: 'The official Instagram for National Geographic Travel. We go further.',
    followers: 40000000,
    link: 'https://www.instagram.com/natgeotravel',
    avatar: 'https://picsum.photos/seed/natgeo/100/100'
  },
  {
    id: 'ig-2',
    platform: 'Instagram',
    name: '@spacex',
    description: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft.',
    followers: 20000000,
    link: 'https://www.instagram.com/spacex',
    avatar: 'https://picsum.photos/seed/spacex/100/100'
  },
  {
    id: 'ig-3',
    platform: 'Instagram',
    name: '@deepmind',
    description: 'Researching and building safe AI systems that learn to solve intelligence, to advance science and benefit humanity.',
    followers: 320000,
    link: 'https://www.instagram.com/deepmind',
    avatar: 'https://picsum.photos/seed/deepmind/100/100'
  },
   {
    id: 'ig-4',
    platform: 'Instagram',
    name: '@uidesignpatterns',
    description: 'Daily inspiration for UI design. Featuring the best app interfaces, web designs, and user experience showcases from around the world.',
    followers: 1200000,
    link: '#',
    avatar: 'https://picsum.photos/seed/uipatterns/100/100'
  },
  
  // X
  {
    id: 'x-1',
    platform: 'X',
    name: '@OpenAI',
    description: 'Creating safe artificial general intelligence that benefits all of humanity.',
    followers: 2300000,
    link: 'https://x.com/OpenAI',
    avatar: 'https://picsum.photos/seed/openai/100/100'
  },
  {
    id: 'x-2',
    platform: 'X',
    name: '@smashingmag',
    description: 'Smashing Magazine — for web designers and developers. We tweet about useful techniques, ideas and resources to help you create better websites.',
    followers: 980000,
    link: 'https://x.com/smashingmag',
    avatar: 'https://picsum.photos/seed/smashingmag/100/100'
  },
  {
    id: 'x-3',
    platform: 'X',
    name: '@karpathy',
    description: 'Andrej Karpathy. AI researcher, formerly at Tesla and OpenAI. Posts about AI, neural networks, and machine learning developments.',
    followers: 1100000,
    link: 'https://x.com/karpathy',
    avatar: 'https://picsum.photos/seed/karpathy/100/100'
  },
  {
    id: 'x-4',
    platform: 'X',
    name: '@figma',
    description: 'The official account for Figma, the collaborative interface design tool. Sharing updates, tips, and community creations.',
    followers: 650000,
    link: 'https://x.com/figma',
    avatar: 'https://picsum.photos/seed/figma/100/100'
  },

  // LinkedIn
  {
    id: 'li-1',
    platform: 'LinkedIn',
    name: 'Google',
    description: 'Our mission is to organize the world’s information and make it universally accessible and useful.',
    followers: 30000000,
    link: 'https://www.linkedin.com/company/google/',
    avatar: 'https://picsum.photos/seed/google/100/100'
  },
  {
    id: 'li-2',
    platform: 'LinkedIn',
    name: 'UX Collective',
    description: 'A publication by and for designers. Curated stories on user experience, usability, and product design.',
    followers: 450000,
    link: 'https://www.linkedin.com/company/ux-collective/',
    avatar: 'https://picsum.photos/seed/uxcollective/100/100'
  },
  {
    id: 'li-3',
    platform: 'LinkedIn',
    name: 'Microsoft',
    description: 'Our mission is to empower every person and every organization on the planet to achieve more. Leading advancements in cloud computing, AI, and software.',
    followers: 22000000,
    link: 'https://www.linkedin.com/company/microsoft/',
    avatar: 'https://picsum.photos/seed/microsoft/100/100'
  },
  {
    id: 'li-4',
    platform: 'LinkedIn',
    name: 'Adobe',
    description: 'Changing the world through digital experiences. We empower everyone — from emerging artists to global brands — to bring their digital creations to life.',
    followers: 6000000,
    link: 'https://www.linkedin.com/company/adobe/',
    avatar: 'https://picsum.photos/seed/adobe/100/100'
  },


  // YouTube
  {
    id: 'yt-1',
    platform: 'YouTube',
    name: 'Marques Brownlee (MKBHD)',
    description: 'Quality Tech Videos | Subscribing is free, so is hitting the bell.',
    followers: 18000000,
    link: 'https://www.youtube.com/user/marquesbrownlee',
    avatar: 'https://picsum.photos/seed/mkbhd/100/100'
  },
  {
    id: 'yt-2',
    platform: 'YouTube',
    name: 'Fireship',
    description: 'High-intensity code tutorials to help you build & ship apps fast. Subscribe for new videos every week on JavaScript, Flutter, Firebase, and modern app development.',
    followers: 2500000,
    link: 'https://www.youtube.com/c/Fireship',
    avatar: 'https://picsum.photos/seed/fireship/100/100'
  },
  {
    id: 'yt-3',
    platform: 'YouTube',
    name: 'Lex Fridman',
    description: 'Conversations about the nature of intelligence, consciousness, love, and power. Podcast centered on AI, science, and the human condition.',
    followers: 4100000,
    link: 'https://www.youtube.com/c/LexFridman',
    avatar: 'https://picsum.photos/seed/lexfridman/100/100'
  },
  {
    id: 'yt-4',
    platform: 'YouTube',
    name: 'The Verge',
    description: 'The Verge covers the intersection of technology, science, art, and culture.',
    followers: 3300000,
    link: 'https://www.youtube.com/c/TheVerge',
    avatar: 'https://picsum.photos/seed/theverge/100/100'
  },
  
  // Reddit
  {
    id: 'rd-1',
    platform: 'Reddit',
    name: 'r/MachineLearning',
    description: 'The largest community for machine learning practitioners and researchers.',
    followers: 3000000,
    link: 'https://www.reddit.com/r/MachineLearning/',
    avatar: 'https://picsum.photos/seed/rml/100/100'
  },
  {
    id: 'rd-2',
    platform: 'Reddit',
    name: 'r/webdev',
    description: 'A community for web developers to share news, articles, and ask questions.',
    followers: 1500000,
    link: 'https://www.reddit.com/r/webdev/',
    avatar: 'https://picsum.photos/seed/rwebdev/100/100'
  },
  {
    id: 'rd-3',
    platform: 'Reddit',
    name: 'r/uidesign',
    description: 'A subreddit dedicated to the theory and practice of user interface design. Share your work, ask for critique, and discuss trends.',
    followers: 250000,
    link: 'https://www.reddit.com/r/uidesign/',
    avatar: 'https://picsum.photos/seed/ruidesign/100/100'
  },
  {
    id: 'rd-4',
    platform: 'Reddit',
    name: 'r/artificial',
    description: 'A community for news and discussion about artificial intelligence, from machine learning to robotics.',
    followers: 500000,
    link: 'https://www.reddit.com/r/artificial/',
    avatar: 'https://picsum.photos/seed/rartificial/100/100'
  }
];

export const fetchPages = (platforms: Platform[]): Promise<Page[]> => {
  console.log('Fetching mock data for platforms:', platforms);
  return new Promise(resolve => {
    setTimeout(() => {
      const filteredData = mockData.filter(page => platforms.includes(page.platform));
      resolve(filteredData);
    }, 500); // Simulate network delay
  });
};