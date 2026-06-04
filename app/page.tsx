import Navbar            from "@/app/components/Navbar";
import HeroSection       from "@/app/components/HeroSection";
import AboutSection      from "@/app/components/AboutSection";
import ExperienceSection from "@/app/components/ExperienceSection";
import ProjectsSection   from "@/app/components/ProjectsSection";
import SkillsSection     from "@/app/components/SkillsSection";
import ContactSection    from "@/app/components/ContactSection";
import Footer            from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
