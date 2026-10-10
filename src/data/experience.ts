import { profile } from './profile';

export interface Experience {
  role: string;
  organization: string;
  period: string;
  detail?: string;
  current?: boolean;
}

export const workExperience: Experience[] = [
  { role: profile.role, organization: profile.company, period: 'Aug 2026 — Present', current: true, detail: 'Web and mobile application development.' },
  {
    role: 'Software Developer', organization: 'Codemonday · Cooperative education',
    period: 'Nov 2025 — Feb 2026',
    detail: 'Full-stack application development and automated customer workflows.',
  },
];

export const education: Experience[] = [
  {
    role: 'B.Sc. Information Technology',
    organization: "King Mongkut's University of Technology North Bangkok",
    period: '2022 — 2026', detail: 'GPAX 3.36 · Second Class Honours',
  },
  { role: 'Vocational Certificate in Electronics', organization: 'Phanomsarakham Technical College', period: '2018 — 2021' },
];
