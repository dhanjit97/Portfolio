export interface Project {
  id: string;
  title: string;
  shortName: string;
  status: 'Prototype / Experiment' | 'Shipped Utility' | 'Forked Project' | 'Work in Progress';
  statusNote: string;
  headline: string;
  problem: string;
  whatWasBuilt: string;
  technicalDecisions: string[];
  tradeoffsAndLessons: string;
  stack: string[];
  repoUrl?: string;
  hasLiveDemo: boolean;
  schematicImage?: string;
  schematicCaption?: string;
  screenshotImage?: string;
  screenshotCaption?: string;
  featured?: boolean;
  architectureDetails: {
    label: string;
    description: string;
  }[];
}

export interface ExplorationNote {
  id: string;
  topic: string;
  category: string;
  status: 'Active Experiment' | 'Architecture Study' | 'Tooling Exploration';
  description: string;
  technicalFocus: string;
  hypothesis?: string;
  approach?: string;
  currentStatusNote?: string;
}

export interface TechnicalPillar {
  number: string;
  title: string;
  summary: string;
  subtopics: string[];
  practicalApplication: string;
}
