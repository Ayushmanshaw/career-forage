// src/pages/About.jsx
const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">About Career Forage</h1>
            <p className="py-6 text-base-content">
              Empowering individuals to build, optimize, and showcase their professional identity with ease.
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="px-6 py-12 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-base-content">
            At <strong>CareerCraft Hub</strong>, we believe that every professional deserves access to tools that help
            them shine. Our platform simplifies the process of creating resumes, generating cover letters, analyzing ATS
            scores, and building stunning portfolios—all in one place.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-base-content space-y-2">
            <li>AI-powered solutions tailored for job seekers</li>
            <li>Easy-to-use, beginner-friendly interfaces</li>
            <li>Focus on ATS optimization for higher job visibility</li>
            <li>Quick portfolio generation and deployment to GitHub</li>
          </ul>
        </div>
      </section>

      {/* Optional: Team Section */}
      <section className="px-6 py-12 bg-base-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold">Meet the Team</h2>
          <p className="text-base-content mt-2">Driven by passion & innovation</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">{member.name}</h3>
                <p className="text-base-content">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const teamMembers = [
  { name: "Ayushman Shaw", role: "Founder & Lead Developer" },
  { name: "Ayushman Shaw", role: "UI/UX Designer" },
  { name: "Ayushman Shaw", role: "Frontend Developer" }
];

export default About;
