type MockAuthor = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
};

export const authors: MockAuthor[] = [
  {
    id: '3',
    name: 'Aisha Rahman',
    role: 'Regional Workforce Strategist',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Aisha advises employers on scalable hiring programs, recruitment process design, and workforce planning across the GCC.',
  },
  {
    id: '4',
    name: 'Daniel George',
    role: 'Talent Operations Lead',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Daniel focuses on employer branding, candidate experience, and performance hiring systems for fast-growing organizations.',
  },
  {
    id: '5',
    name: 'Sara Nadeem',
    role: 'Recruitment Compliance Specialist',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    bio: 'Sara writes about compliant hiring operations, documentation discipline, and risk-aware expansion into new markets.',
  },
];
