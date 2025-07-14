import React from 'react';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const ResumeLandingPage = () => {
  const { openSignIn } = useClerk();

  const features = [
    {
      title: "AI-Powered Content",
      icon: "🤖",
      description: "Get intelligent suggestions for your resume content based on your experience and target job"
    },
    {
      title: "ATS Optimization",
      icon: "📊",
      description: "Automatically optimize your resume for Applicant Tracking Systems"
    },
    {
      title: "Professional Templates",
      icon: "🎨",
      description: "Choose from dozens of industry-specific, recruiter-approved designs"
    },
    {
      title: "Real-Time Editing",
      icon: "✏️",
      description: "See changes instantly with our live preview editor"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Select a Template",
      description: "Choose from our collection of professional designs"
    },
    {
      number: 2,
      title: "Fill Your Details",
      description: "Our AI will suggest optimal wording for your experience"
    },
    {
      number: 3,
      title: "Customize & Refine",
      description: "Tweak the design and content to perfection"
    },
    {
      number: 4,
      title: "Download & Apply",
      description: "Export as PDF or DOCX and start applying"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">
              Build Your Perfect <span className="text-primary">AI-Powered Resume</span>
            </h1>
            <p className="text-xl mb-10">
              Create a professional resume that gets you interviews. Our AI helps you craft the perfect document for your dream job.
            </p>
            <div className="flex justify-center gap-4">
            <Link to="/resume/template" className="btn btn-primary btn-lg">
              Create My Resume Now
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Use Our Resume Builder?</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            We combine AI technology with expert recruiter knowledge to help you stand out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title text-xl">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Create Your Resume in 4 Easy Steps</h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Our guided process makes resume building simple and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="card bg-base-100 shadow-md">
                <div className="card-body items-center text-center">
                  <div className="w-14 h-14 bg-primary text-primary-content rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="card-title text-lg">{step.title}</h3>
                  <p className="opacity-80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template Showcase */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Templates</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Choose from our collection of recruiter-approved designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Modern', 'Classic', 'Creative'].map((style) => (
            <div key={style} className="card bg-base-100 shadow-md overflow-hidden">
              <figure>
                <img 
                  src={`https://placehold.co/600x400/1e3a8a/ffffff?text=${style}+Template`} 
                  alt={`${style} Resume Template`}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{style} Design</h3>
                <p>Perfect for {style.toLowerCase()} industries and roles</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-primary">Preview</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Hear from people who landed jobs with our resumes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span>U{item}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">User {item}</h4>
                      <p className="text-sm opacity-70">Software Engineer at TechCo</p>
                    </div>
                  </div>
                  <p className="opacity-80">
                    "The AI suggestions helped me highlight skills I didn't even think to include. Got 3 interviews in the first week!"
                  </p>
                  <div className="rating rating-sm mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input key={star} type="radio" name={`rating-${item}`} className="mask mask-star-2 bg-orange-400" defaultChecked={star <= 5} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ResumeLandingPage;