import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import About      from "./components/About";
import Experience from "./components/Experiance";
import Projects   from "./components/Projects";
import Skills     from "./components/Skills";
import Education  from "./components/Educations";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";
export default function Home() {
  return (
    <>
      {/* Accessible landmark: navigation */}
      <header>
        <Navbar />
      </header>

      <main id="main-content">
        {/* Each section wrapped in <section> with aria-label for screen readers */}
        <section aria-label="Hero">
          <Hero />
        </section>

        <section aria-label="About me">
          <About />
        </section>

        <Divider />

        <section aria-label="Work experience">
          <Experience />
        </section>

        <Divider />

        <section aria-label="Projects">
          <Projects />
        </section>

        <Divider />

        <section aria-label="Skills">
          <Skills />
        </section>

        <Divider />

        {/* <section aria-label="Education">
          <Education />
        </section> */}

        <Divider />

        <section aria-label="Contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
    </div>
  );
}