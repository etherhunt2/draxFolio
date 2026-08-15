import React, { useRef } from 'react';
import SkillBar from '@/components/Skills/SkillBar';

const Skills = () => {
  const skillBars = [
    { title: 'JavaScript', percentage: 90, label: 3 },
    { title: 'React', percentage: 85, label: 2 },
    { title: 'Node.js', percentage: 90, label: 2 },
    { title: 'Express', percentage: 85, label: 2 },
    { title: 'MongoDB', percentage: 80, label: 2 },
    { title: 'HTML', percentage: 92, label: 5 },
    { title: 'CSS', percentage: 80, label: 5 },
    { title: 'Next.JS', percentage: 75, label: 2 },
    { title: 'TypeScript', percentage: 60, label: 1 },
    { title: 'Payload Headless CMS', percentage: 60, label: 1 },
    { title: 'WordPress CMS', percentage: 90, label: 6 },
    { title: 'MySQL', percentage: 90, label: 4 },
    { title: 'PHP', percentage: 85, label: 3 },
    { title: 'Bootstrap', percentage: 80, label: 4 },
    { title: 'Tailwind CSS', percentage: 85, label: 4 },
    { title: 'GSAP', percentage: 65, label: 2 },
    { title: 'Lenis', percentage: 65, label: 2 },
    { title: 'Linux', percentage: 90, label: 5 },
    // Add more skills as needed
  ];

  return (
    <div className='mb-5'>
      <div className='text-3xl text-center font-beon my-2 titlee'>Skills</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {skillBars.map((skill, index) => (
          <SkillBar
            key={index}
            title={skill.title}
            percentage={skill.percentage}
            label={skill.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;