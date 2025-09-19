import { useState, useEffect } from "react";
import { Linkedin, Github, Download, Mail, Sun, Moon, Languages } from "lucide-react";
import i18n from "../public/i18n.json";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const content = i18n[lang];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Fade-in animation on scroll
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in");
    const onScroll = () => {
      fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 60) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-bg text-black"}>
      {/* Header */}
      <header className="flex items-center justify-between py-6 px-4 md:px-12 bg-card shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/profile.jpg" alt="Nikhil Chitrapu" className="rounded-full w-12 h-12 object-cover border-2 border-primary" />
          <span className="font-extrabold text-2xl text-primary">{content.profile.name}</span>
        </div>
        <nav className="flex gap-6 items-center font-semibold text-muted">
          <a href="#about">{lang === "en" ? "About" : "Über mich"}</a>
          <a href="#experience">{lang === "en" ? "Experience" : "Erfahrung"}</a>
          <a href="#education">{lang === "en" ? "Education" : "Ausbildung"}</a>
          <a href="#skills">{lang === "en" ? "Skills" : "Kenntnisse"}</a>
          <a href="#contact">{lang === "en" ? "Contact" : "Kontakt"}</a>
          <button className="mx-2" title="Toggle language" onClick={() => setLang(lang === "en" ? "de" : "en")}>
            <Languages size={22} className="inline-block mr-1" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <button className="mx-2" title="Dark mode" onClick={() => setDarkMode(v => !v)}>
            {darkMode ? <Sun size={22} /> : <Moon size={22}/>}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section id="about" className="max-w-5xl mx-auto py-12 px-4 md:px-0 flex flex-col md:flex-row items-center gap-10 fade-in">
        <img src="/profile.jpg" alt="Nikhil Chitrapu" className="rounded-full w-40 h-40 object-cover shadow-lg border-4 border-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{content.profile.title}</h1>
          <p className="text-lg text-muted mb-3">{content.profile.summary}</p>
          <div className="flex gap-4 mt-3 flex-wrap">
            <span className="bg-primary text-white px-4 py-2 rounded font-semibold">{content.contact.location}</span>
            <span className="bg-accent text-white px-4 py-2 rounded font-semibold">{content.contact.email}</span>
            <span className="bg-card text-primary px-4 py-2 rounded font-semibold">{content.contact.phone}</span>
          </div>
          <a href="/resume.pdf" download className="mt-6 inline-block bg-accent text-white font-semibold px-5 py-2 rounded hover:bg-primary transition">
            <Download className="inline-block mr-2" /> {lang === "en" ? "Download CV" : "Lebenslauf herunterladen"}
          </a>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="max-w-5xl mx-auto py-8 fade-in">
        <h2 className="text-xl font-bold text-primary mb-6">{lang === "en" ? "Experience" : "Erfahrung"}</h2>
        <div className="border-l-4 border-accent pl-6">
          {content.experience.map((exp, i) => (
            <div key={i} className="mb-8 relative group">
              <div className="absolute -left-7 top-2 w-4 h-4 rounded-full bg-accent group-hover:scale-110 transition" />
              <span className="text-sm text-muted font-semibold">{exp.period}</span>
              <div className="font-bold text-primary text-lg">{exp.company}</div>
              <div className="text-accent font-semibold mb-2">{exp.role}</div>
              <ul className="list-disc pl-6 text-muted text-base">
                {exp.details.map((d, idx) => <li key={idx}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="max-w-5xl mx-auto py-8 fade-in">
        <h2 className="text-xl font-bold text-primary mb-4">{lang === "en" ? "Education & Certifications" : "Ausbildung & Zertifikate"}</h2>
        <div className="mb-4">
          {content.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <span className="font-semibold text-accent">{edu.degree}</span> <span className="text-muted">({edu.period})</span>
              <div className="text-muted">{edu.institution}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {content.certifications.map((cert, i) => (
            <span key={i} className="bg-primary text-white px-4 py-2 rounded font-semibold text-sm mb-2">{cert}</span>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-5xl mx-auto py-8 fade-in">
        <h2 className="text-xl font-bold text-primary mb-4">{lang === "en" ? "Skills" : "Kenntnisse"}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(content.skills).map(([category, skills], i) => (
            <div key={i}>
              <h3 className="text-accent font-semibold mb-2">{category}</h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <li key={idx} className="bg-bg border border-accent text-primary px-3 py-1 rounded font-medium text-sm">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto py-8 fade-in">
        <h2 className="text-xl font-bold text-primary mb-3">{lang === "en" ? "Contact" : "Kontakt"}</h2>
        <div className="flex items-center gap-8 flex-wrap">
          <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2 text-accent font-semibold hover:underline">
            <Mail /> {content.contact.email}
          </a>
          <a href={content.contact.linkedin} target="_blank" rel="noopener" className="flex items-center gap-2 text-accent font-semibold hover:underline">
            <Linkedin /> LinkedIn
          </a>
          <a href={content.contact.github} target="_blank" rel="noopener" className="flex items-center gap-2 text-accent font-semibold hover:underline">
            <Github /> GitHub
          </a>
        </div>
      </section>
    </div>
    {/* Fade-in animation */}
    <style jsx global>{`
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 1s ease forwards;
      }
      .fade-in.visible {
        opacity: 1;
        transform: none;
      }
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: none;
        }
      }
    `}</style>
  </main>
}