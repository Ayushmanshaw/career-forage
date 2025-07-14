// src/pages/Services.jsx
const Services = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">Our Services</h1>
            <p className="py-6 text-base-content">
              Explore the tools and services we offer to supercharge your career journey.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title">{service.title}</h2>
              <p className="text-base-content">{service.description}</p>
              <button className="btn btn-secondary mt-4">Learn More</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const services = [
  {
    title: "Resume Builder",
    description: "Create polished, ATS-optimized resumes quickly and easily.",
  },
  {
    title: "Cover Letter Generator",
    description: "Generate tailored cover letters using AI in minutes.",
  },
  {
    title: "ATS Score Checker",
    description: "Analyze your resume's compatibility with Applicant Tracking Systems.",
  },
  {
    title: "Portfolio Builder",
    description: "Auto-generate and deploy your professional portfolio website.",
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for quick resume & portfolio sharing.",
  },
  {
    title: "Custom Templates",
    description: "Choose from a variety of modern, elegant templates for resumes & portfolios.",
  },
];

export default Services;
