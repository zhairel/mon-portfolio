import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { profileData } from './data/profile';
import { experienceData } from './data/experience';
import { projectsData } from './data/projects';
import { skillCategoriesData } from './data/skills';
import { educationData } from './data/education';
import { certificationsData } from './data/certifications';
import { learningTopicsData } from './data/learning';

import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SectionTransition } from './components/SectionTransition';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { scrollTo } = useSmoothScroll();

  const handleNavigate = (id: string) => {
    scrollTo(`#${id}`, -40);
  };

  return (
    <div
      className="min-h-screen flex flex-col selection:bg-cyan-500/20 selection:text-cyan-500 relative transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      
      {/* 1. Thin Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 2. Interactive Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 3. Subtle Ambient Particle Constellation Background */}
      <ParticleCanvas theme={theme} />

      {/* 4. Minimal Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        resumeUrl={profileData.resumeUrl}
        onNavigate={handleNavigate}
      />

      {/* Main Storytelling Sections */}
      <main className="flex-1 relative z-10">
        {/* Step 1: Full Viewport Cinematic Hero with Staggered Oversized Typography */}
        <Hero profile={profileData} />

        {/* Step 2: Storytelling About Section with Pinned Left Heading */}
        <About profile={profileData} />

        {/* Step 3: Cinematic Transition Moment */}
        <SectionTransition
          words={["DESIGN.", "DEVELOP.", "DEPLOY."]}
          subtitle="Engineering scalable institutional platforms with modern architecture and high reliability."
        />

        {/* Step 4: Pinned Featured Projects Showcase (Centerpiece) */}
        <Projects projects={projectsData} />

        {/* Step 5: Kinetic Horizontal Marquee Skills Stream */}
        <Skills categories={skillCategoriesData} />

        {/* Step 6: Interactive Career Timeline with Scroll-Fill Indicator & Promotion Milestone */}
        <Experience experience={experienceData} />

        {/* Step 7: Editorial Education & Continuous Growth */}
        <Education
          education={educationData}
          learningTopics={learningTopicsData}
        />

        {/* Step 8: Verified National Certifications */}
        <Certifications certifications={certificationsData} />

        {/* Step 9: Final Large-Text Contact Section */}
        <Contact profile={profileData} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
