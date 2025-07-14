import React from 'react';

const ExecutiveTemplate = ({ data }) => {
  return (
    <div className="executive-template p-6 bg-gray-900 text-white rounded-md">
      <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
      <p className="mb-2">{data.personalInfo.email} | {data.personalInfo.phone}</p>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <p>{data.professionalSummary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Work Experience</h2>
        {data.workExperience.map((exp, idx) => (
          <div key={idx}>
            <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ExecutiveTemplate;
