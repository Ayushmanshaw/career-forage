// src/pages/LearnMore.jsx
import { Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function LearnMore() {
  const { openSignIn } = useClerk();

  const features = [
    {
      title: "Smart Resume Builder",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Create professional, ATS-friendly resumes with our intelligent builder",
      highlights: [
        "10+ industry-specific templates",
        "Real-time content suggestions",
        "One-click design changes",
        "Export as PDF/DOCX"
      ]
    },
    {
      title: "Cover Letter Generator",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      description: "Personalized cover letters tailored to each job application",
      highlights: [
        "AI-powered content generation",
        "Company-specific customization",
        "Tone adjustment (professional/creative)",
        "Template library"
      ]
    },
    {
      title: "ATS Score Checker",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Optimize your resume for Applicant Tracking Systems",
      highlights: [
        "Keyword analysis",
        "Format compliance checker",
        "Score improvement tips",
        "Industry benchmarks"
      ]
    },
    {
      title: "Portfolio Builder",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: "Create and deploy your professional portfolio",
      highlights: [
        "Drag-and-drop builder",
        "Custom domain support",
        "GitHub integration",
        "Vercel deployment"
      ]
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up in Seconds",
      description: "Create your free account with email or social login"
    },
    {
      number: 2,
      title: "Build Your Profile",
      description: "Add your education, experience, and skills"
    },
    {
      number: 3,
      title: "Generate Documents",
      description: "Create resumes and cover letters tailored to your goals"
    },
    {
      number: 4,
      title: "Launch Your Portfolio",
      description: "Deploy your personal website with one click"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold text-base-content mb-6">
              Everything You Need for Your <span className="text-primary">Career Success</span>
            </h1>
            <p className="text-xl text-base-content opacity-80 mb-10">
              CareerForge provides all the tools you need to stand out in today's competitive job market.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-base-content opacity-80 max-w-3xl mx-auto">
            Designed to give you an edge in your job search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="card-title text-2xl text-base-content">{feature.title}</h3>
                <p className="text-base-content opacity-80">{feature.description}</p>
                <ul className="mt-4 space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-base-content opacity-80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              How It Works
            </h2>
            <p className="text-xl text-base-content opacity-80 max-w-3xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="card bg-base-100 shadow-md">
                <div className="card-body items-center text-center">
                  <div className="w-14 h-14 bg-primary text-primary-content rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="card-title text-xl text-base-content">{step.title}</h3>
                  <p className="text-base-content opacity-80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-base-content opacity-80 max-w-3xl mx-auto">
            Hear from professionals who boosted their careers
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
                    <h4 className="font-bold text-base-content">User {item}</h4>
                    <p className="text-sm text-base-content opacity-70">Software Engineer</p>
                  </div>
                </div>
                <p className="text-base-content opacity-80">
                  "CareerForge helped me create a professional resume that got me interviews at top tech companies. The ATS optimization was a game-changer!"
                </p>
                <div className="rating rating-sm mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input key={star} type="radio" name="rating" className="mask mask-star-2 bg-orange-400" checked={star <= 5} readOnly />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
    </div>
  );
}