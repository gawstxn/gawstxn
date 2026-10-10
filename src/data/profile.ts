const currentWork = { role: 'Full-Stack Developer', company: 'Apex Maven' };

export const profile = {
  name: 'Naruenat Khamwaree',
  handle: 'gawstxn',
  ...currentWork,
  available: false,
  heroLines: ['Full-stack', 'developer.'],
  introduction: 'I build web and mobile applications.\nClear interfaces. Reliable systems.',
  contactNote: 'Have a question or an idea?\nFeel free to get in touch.',
  photo: '/profile.jpg?v=original',
  biography: [
    `I'm a ${currentWork.role} at ${currentWork.company} and an Information Technology graduate from King Mongkut's University of Technology North Bangkok. I enjoy building applications, connecting systems, and finding practical ways to use AI.`,
    'During my cooperative education at Codemonday, I worked on loyalty and court booking platforms integrated with LINE Official Account. That experience brought me closer to what matters: software that works for the people using it.',
  ],
  location: 'Bangkok, Thailand',
  email: 'naruenat.khamwaree@gmail.com',
  github: 'https://github.com/gawstxn',
  linkedin: 'https://www.linkedin.com/in/naurenat-k',
  instagram: 'https://www.instagram.com/gawstxn',
  resume: '/naruenat-khamwaree.pdf',
};
