// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
        <div className="flex-none">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" data-toggle-theme="light,dark" />
            {/* sun icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64 17.657l-1.414 1.414L2.1..." />
            </svg>
            {/* moon icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.752 15.002A9.718..." />
            </svg>
          </label>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold">Craft Your Career Tools in One Place</h1>
            <p className="py-6 text-base-content">
              Build your resume, generate cover letters, analyze ATS score, and create your portfolio seamlessly!
            </p>
            <Link to="/">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card bg-base-200 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{feature.title}</h2>
              <p>{feature.description}</p>
              <Link to={feature.link}>
                <button className="btn btn-secondary mt-4">Explore</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const features = [
  {
    title: "Resume Builder",
    description: "Create professional resumes easily.",
    link: "/resume",
  },
  {
    title: "Cover Letter Generator",
    description: "AI-powered personalized cover letters.",
    link: "/cover-letter",
  },
  {
    title: "ATS Score Checker",
    description: "Optimize resumes for ATS systems.",
    link: "/ats-checker",
  },
  {
    title: "Portfolio Builder",
    description: "Auto-generate and deploy your portfolio.",
    link: "/portfolio",
  },
];

export default Home;
