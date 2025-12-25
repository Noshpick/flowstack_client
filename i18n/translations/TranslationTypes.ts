export interface TranslationTypes {
  LINKS: {
    support: string;
  };
  HEADER: {
    services: string;
    portfolio: string;
    contacts: string;
    contactUs: string;
  };
  HERO: {
    title_1: string;
    title_2: string;
    title_3: string;
    description: string;
    card: {
      title_1: string;
      title_2: string;
      button: {
        ourCases: string;
        contactUs: string;
      };
    };
  };
  SERVICES: {
    title: string;
    cards: {
      card_1: {
        title: string;
        button: string;
        href: string;
      };
      card_2: {
        title: string;
        button: string;
        href: string;
      };
      card_3: {
        title: string;
        button: string;
        href: string;
      };
      card_4: {
        title: string;
        button: string;
        href: string;
      };
      card_5: {
        title: string;
        button: string;
        href: string;
      };
      card_6: {
        title: string;
        button: string;
        href: string;
      };
    };
  };
  PORTFOLIO: {
    title: string;
    subtitle: string;
    block_titles: {
      technologies: string;
      result: string;
      deadlines: string;
      team: string;
      client: string;
      problems: string;
      solutions: string;
      results: string;
      screenshots: string;
    };
    buttons: {
      go_to_website: string;
      view_case: string;
    };
    cases: Array<{
      id: number;
      title: string;
      description: string;
      image: string;
      result: string;
      technologies: string[];
      siteUrl: string;
      caseUrl: string;
      fullDescription: string;
      challenges: string;
      solutions: string[];
      metrics: string[];
      duration: string;
      teamSize: string;
      client: string;
      gallery: string[];
    }>;
  };
  TEAM: {
    title: string;
    subtitle: string;
    block_titles: {
      technologies: string;
      experience: string;
      projects: string;
      bio: string;
      creates: string;
      skills: string;
    };
    members: Array<{
      id: number;
      imageUrl: string;
      name: string;
      emoji: string;
      specialty: string;
      description: string;
      technologies: string[];
      buttonText: string;
      bio: string;
      experience: string;
      projects: string;
      creates: string;
      socials?: {
        linkedin?: string;
        github?: string;
        telegram?: string;
        portfolio?: string;
        behance?: string;
        dribbble?: string;
      };
      skills: string[];
    }>;
  };
  STAGES: {
    title: string;
    cards: {
      card_1: {
        title: string;
        description: string;
      };
      card_2: {
        title: string;
        description: string;
      };
      card_3: {
        title: string;
        description: string;
      };
      card_4: {
        title: string;
        description: string;
      };
      card_5: {
        title: string;
        description: string;
      };
    };
  };
  CONTACTS: {
    title: string;
    description: string;
    button: string;
  };
  FOOTER: {
    description: string;
    navigation: {
      home: string;
      services: string;
      portfolio: string;
      contacts: string;
    };
    information: {
      telegram: string;
      email: string;
      adress: string;
    };
    copyright: string;
  };
}