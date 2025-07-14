import React from 'react';

const ClassicTemplate = ({ data }) => {
  return (
    <div className="classic-template p-6 font-serif text-gray-800">
      <h1 className="text-3xl font-bold mb-4 border-b pb-2">{data.personalInfo.fullName}</h1>
      <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>

      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-1">Professional Summary</h2>
        <p>{data.professionalSummary}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-1">Work Experience</h2>
        {data.workExperience.map((exp, idx) => (
          <div key={idx}>
            <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-1">Education</h2>
        {data.education.map((edu, idx) => (
          <div key={idx}>
            <strong>{edu.degree}</strong> at {edu.institution} ({edu.graduationYear})
            {edu.fieldOfStudy && <p>Field of Study: {edu.fieldOfStudy}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClassicTemplate;
