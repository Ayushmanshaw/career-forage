import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="text-center p-8">
        <p>No data found. Please fill the form first.</p>
        <button onClick={() => navigate('/form')} className="btn btn-primary mt-4">
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">{data.fullName}</h1>
      <p className="text-gray-600 mb-1">{data.email}</p>
      <p className="text-gray-600 mb-1">{data.phone}</p>
      <p className="text-gray-600 mb-4">{data.address}</p>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <ul className="list-disc pl-5 space-y-1">
          {data.education.map((edu, idx) => (
            <li key={idx}>
              {edu.degree}, {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <ul className="list-disc pl-5 space-y-1">
          {data.experience.map((exp, idx) => (
            <li key={idx}>
              {exp.role} at {exp.company} ({exp.duration})
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {data.projects.map((proj, idx) => (
          <div key={idx} className="mb-3">
            <h3 className="font-bold">{proj.title}</h3>
            <p className="text-gray-700">{proj.description}</p>
          </div>
        ))}
      </section>

      {/* Languages */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Languages</h2>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((lang, idx) => (
            <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {lang}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
