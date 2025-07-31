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
              Supercharge your career journey with our powerful, easy-to-use tools.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="px-6 py-12 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">{service.title}</h2>
              <ul className="list-disc list-inside text-base-content space-y-1">
                {service.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
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
    points: [
      "Build modern, professional resumes in minutes",
      "ATS-optimized formatting and layout",
      "Export to PDF or save to your dashboard",
    ],
  },
  {
    title: "Cover Letter Generator",
    points: [
      "Generate custom AI-powered cover letters",
      "Tailored to the job role and company",
      "Save and edit anytime",
    ],
  },
  {
    title: "ATS Score Checker",
    points: [
      "Get your resume's ATS compatibility score",
      "Receive suggestions for improvement",
      "Boost your chances of passing filters",
    ],
  },
  {
    title: "Portfolio Builder",
    points: [
      "Auto-generate portfolio from your resume",
      "Deploy it online with one click",
      "Customize your design and content",
    ],
  },
  {
    title: "QR Code Generator",
    points: [
      "Instantly generate QR codes for resume/portfolio",
      "Perfect for sharing at events or on business cards",
      "Track usage and engagement",
    ],
  },
  {
    title: "Custom Templates",
    points: [
      "Choose from modern, elegant templates",
      "Both resume and portfolio styles available",
      "Personalize fonts, colors, and layouts",
    ],
  },
];

export default Services;
