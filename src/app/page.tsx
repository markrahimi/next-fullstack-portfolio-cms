"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { CertificationsSection } from "@/components/certifications-section";
import { PageLoading } from "@/components/page-loading";
import { usePageView } from "@/hooks/usePageView";

export default function Home() {
  usePageView("home");

  return (
    <>
      <PageLoading />
      <div className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
      </div>
    </>
  );
}
