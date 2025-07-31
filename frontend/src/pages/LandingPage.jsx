import { Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-base-content mb-6">
            Your Complete <span className="text-primary">Career</span> Solution
          </h1>
          <p className="text-xl text-base-content opacity-80 max-w-3xl mx-auto mb-10">
            Build professional resumes, craft perfect cover letters, optimize for ATS, and deploy your portfolio - all in one platform.
          </p>
          <div className="flex justify-center space-x-4">
            {!isSignedIn ? (
              <button 
                onClick={openSignIn} 
                className="btn btn-primary btn-lg"
              >
                Get Started
              </button>
            ) : (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            )}
            <Link to="/services" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-base-content text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Resume Generator */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="card-title text-base-content">Resume Generator</h3>
                <p className="text-base-content opacity-70">
                  Create professional, ATS-friendly resumes in minutes with our easy-to-use templates.
                </p>
                <div className="card-actions justify-end mt-4">
                  {!isSignedIn ? (
                    <button onClick={openSignIn} className="link link-primary">
                      Try it now
                    </button>
                  ) : (
                    <Link to="/resume" className="link link-primary">
                      Try it now
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Letter Generator */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 className="card-title text-base-content">Cover Letter Generator</h3>
                <p className="text-base-content opacity-70">
                  Craft personalized cover letters that complement your resume and impress hiring managers.
                </p>
                <div className="card-actions justify-end mt-4">
                  <span className="badge badge-secondary">Coming Soon</span>
                </div>
              </div>
            </div>

            {/* ATS Score Checker */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="card-title text-base-content">ATS Score Checker</h3>
                <p className="text-base-content opacity-70">
                  Analyze how well your resume performs against Applicant Tracking Systems.
                </p>
                <div className="card-actions justify-end mt-4">
                  <span className="badge badge-secondary">Coming Soon</span>
                </div>
              </div>
            </div>

            {/* Portfolio Builder */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="card-title text-base-content">Portfolio Builder</h3>
                <p className="text-base-content opacity-70">
                  Create and deploy a professional portfolio to GitHub and Vercel with just a few clicks.
                </p>
                <div className="card-actions justify-end mt-4">
                 {!isSignedIn ? (
                    <button onClick={openSignIn} className="link link-primary">
                      Try it now
                    </button>
                  ) : (
                    <Link to="/form" className="link link-primary">
                      Try it now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-base-content text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-content mb-4">
                1
              </div>
              <h3 className="text-lg font-medium text-base-content mb-2">Create Your Account</h3>
              <p className="text-base-content opacity-70">
                Sign up for free and set up your profile with basic information.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-content mb-4">
                2
              </div>
              <h3 className="text-lg font-medium text-base-content mb-2">Build Your Documents</h3>
              <p className="text-base-content opacity-70">
                Use our tools to create resumes, cover letters, and check ATS scores.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-content mb-4">
                3
              </div>
              <h3 className="text-lg font-medium text-base-content mb-2">Deploy Your Portfolio</h3>
              <p className="text-base-content opacity-70">
                Automatically deploy your professional portfolio to GitHub and Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-extrabold text-primary-content mb-4">
            Ready to boost your career?
          </h2>
          <p className="text-xl text-primary-content opacity-90 mb-8">
            Join thousands of professionals who found success with our tools.
          </p>
          {!isSignedIn ? (
            <button onClick={openSignIn} className="btn btn-secondary btn-lg">
              Get Started For Free
            </button>
          ) : (
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}