import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import ModernTemplate from '../Templates/ModernTemplate';
import ClassicTemplate from '../Templates/ClassicTemplate';
import ExecutiveTemplate from '../Templates/ExecutiveTemplate'; 
import CreativeTemplate from '../Templates/CreativeTemplate';

const ResumePreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resumeData = state?.resumeData || {};
  const template = state?.selectedTemplate || 'modern';
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [error, setError] = useState(null);

  // const calculateATSScore = () => {
  //   let score = 70;
  //   if (typeof resumeData.professionalSummary === 'string' && resumeData.professionalSummary.length > 50) score += 10;
  //   if (resumeData.skills?.length >= 5) score += 10;
  //   if (resumeData.workExperience?.length >= 2) score += 10;
  //   return Math.min(score, 100);
  // };
  // const atsScore = calculateATSScore();

  useEffect(() => {
    const generatePdf = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        const blob = await pdf(<ModernTemplate data={resumeData} />).toBlob();
        setPdfBlob(blob);
      } catch (err) {
        console.error('PDF generation error:', err);
        setError('Failed to generate PDF. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    };

    if (Object.keys(resumeData).length > 0) {
      generatePdf();
    }
  }, [resumeData]);

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo?.fullName?.replace(/[^a-zA-Z0-9]/g, '_') || 'resume'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const validateResumeData = () => {
    if (!resumeData.personalInfo?.fullName) return 'Full name is required';
    if (!resumeData.professionalSummary) return 'Professional summary is required';
    if (!resumeData.workExperience?.length) return 'At least one work experience is required';
    return null;
  };

  const renderWebTemplate = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2">{resumeData.personalInfo?.fullName || 'Your Name'}</h2>
        <p>Email: {resumeData.personalInfo?.email}</p>
        <p>Phone: {resumeData.personalInfo?.phone}</p>
        {resumeData.personalInfo?.linkedIn && <p>LinkedIn: {resumeData.personalInfo.linkedIn}</p>}
        {resumeData.personalInfo?.portfolio && <p>Portfolio: {resumeData.personalInfo.portfolio}</p>}
      </div>

      {resumeData.professionalSummary && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
          <p>
            {resumeData.professionalSummary.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      )}

      {resumeData.workExperience?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">
                {exp.jobTitle} at {exp.company}, {exp.location}
              </p>
              <p>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p>
                {exp.description.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}

      {resumeData.education?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">
                {edu.degree} - {edu.institution}
              </p>
              <p>Year: {edu.graduationYear}</p>
              {edu.fieldOfStudy && <p>Field: {edu.fieldOfStudy}</p>}
            </div>
          ))}
        </div>
      )}

      {resumeData.skills?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <p>{resumeData.skills.join(', ')}</p>
        </div>
      )}

      {resumeData.certifications?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Certifications</h3>
          <ul className="list-disc pl-6">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {resumeData.languages?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Languages</h3>
          <p>{resumeData.languages.join(', ')}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Resume Preview</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/resume/build', { state: { resumeData, selectedTemplate: template } })}
              className="btn btn-ghost"
            >
              Edit Resume
            </button>

            <button
              onClick={() => {
                const validationError = validateResumeData();
                if (validationError) {
                  alert(validationError);
                  return;
                }
                handleDownload();
              }}
              className="btn btn-primary"
              disabled={isGenerating || !pdfBlob}
            >
              {isGenerating ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Generating...
                </>
              ) : (
                'Download PDF'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* <div className="card bg-base-200 shadow-md mb-8">
          <div className="card-body">
            <h2 className="card-title">ATS Optimization Score: {atsScore}/100</h2>
            <div className="w-full bg-base-300 rounded-full h-4 mb-2">
              <div className="bg-primary h-4 rounded-full" style={{ width: `${atsScore}%` }}></div>
            </div>
            {atsScore >= 80 ? (
              <p className="text-success">Excellent! Your resume is well optimized for ATS systems.</p>
            ) : atsScore >= 60 ? (
              <p className="text-warning">Good, but could be improved. Consider adding more keywords.</p>
            ) : (
              <p className="text-error">Needs work. Your resume may not perform well in ATS systems.</p>
            )}
          </div>
        </div> */}

        <div className="bg-white shadow-2xl p-8 rounded-lg">
          {renderWebTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
