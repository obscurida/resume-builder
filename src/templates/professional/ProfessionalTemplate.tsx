import React, { useContext } from 'react';

import AboutMe from './components/AboutMe';
import Achievements from './components/Achievements';
import BasicIntro from './components/BasicIntro';
import { Education } from './components/Education';
import Involvement from './components/Involvement';
import { Objective } from './components/Objective';
import RatedSkills from './components/RatedSkills';
import { Section } from './components/Section';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import UnratedSkills from './components/UnratedSkills';
import Work from './components/Work';
import styled from '@emotion/styled';

const ResumeContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 40px 25px;
  column-gap: 10px;

  @media print {
    border: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  font-size: 12px;
`;

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const skills = resumeData.skills;
  const involvements = resumeData.activities.involvements;
  const achievements = resumeData.activities.achievements;

  return (
    <ResumeContainer>
      <LeftSection>
        <Section
          title={resumeData.basics?.name}
          profiles={resumeData.basics.profiles}
          portfolioUrl={resumeData.basics.url}
          titleClassname="text-xl font-medium"
        >
          <BasicIntro basics={resumeData.basics} />
        </Section>
        <SectionValidator value={resumeData.work}>
          <Section title="Experiencia laboral">
            <Work work={resumeData.work} />
          </Section>
        </SectionValidator>

        <SectionValidator value={involvements}>
          <Section title="Proyectos">
            <Involvement data={involvements} />
          </Section>
        </SectionValidator>

        <SectionValidator value={achievements}>
          <Section title="Certificados">
            <Achievements data={achievements} />
          </Section>
        </SectionValidator>
      </LeftSection>

      <RightSection>
        <SectionValidator value={resumeData.basics.summary}>
          <Section title="Sobre mi">
            <AboutMe summary={resumeData.basics.summary} profileImage={resumeData.basics.image} />
          </Section>
        </SectionValidator>

        <SectionValidator value={resumeData.basics.objective}>
          <Section title="Carrera professional">
            <Objective objective={resumeData.basics.objective} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills.languages.concat(skills.frameworks)}>
          <Section title="Experiencia técnica">
            <RatedSkills items={skills.languages.concat(skills.frameworks)} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills.technologies.concat(skills.libraries, skills.databases)}>
          <Section title="Habilidades">
            <UnratedSkills items={skills.technologies.concat(skills.libraries, skills.databases)} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.practices}>
          <Section title="Enfoque profesional">
            <UnratedSkills items={skills.practices} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.tools}>
          <Section title="Herramientas">
            <UnratedSkills items={skills.tools} />
          </Section>
        </SectionValidator>
        <SectionValidator value={resumeData.education}>
          <Section title="Educación">
            <Education education={resumeData.education} />
          </Section>
        </SectionValidator>
      </RightSection>
    </ResumeContainer>
  );
}
