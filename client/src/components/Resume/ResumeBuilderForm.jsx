import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ResumeBuilderForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate || 'modern';
  // Main form state
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.emailAddresses[0]?.emailAddress || '',
      phone: '',
      address: '',
      linkedIn: '',
      portfolio: ''
    },
    professionalSummary: '',
    workExperience: [
      {
        id: Date.now(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: Date.now(),
        degree: '',
        institution: '',
        fieldOfStudy: '',
        graduationYear: ''
      }
    ],
    projects: [],
    skills: [],
    certifications: [],
    languages: []
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCertification, setCurrentCertification] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentProject, setCurrentProject] = useState('');


  // Handle input changes
const handleChange = (section, field, value, index = null) => {
  if (index !== null) {
    const updatedArray = [...formData[section]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [section]: updatedArray });
  } else if (field) {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value }
    });
  } else {
    // For direct fields like 'professionalSummary'
    setFormData({
      ...formData,
      [section]: value
    });
  }
};


  // Add new experience/education entries
  const addEntry = (section) => {
    const template = {
      workExperience: {
        id: Date.now(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      },
      education: {
        id: Date.now(),
        degree: '',
        institution: '',
        fieldOfStudy: '',
        graduationYear: ''
      }
    };
    
    setFormData({
      ...formData,
      [section]: [...formData[section], template[section]]
    });
  };

  // Remove entries
  const removeEntry = (section, id) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter(item => item.id !== id)
    });
  };

  // Handle array-based fields (skills, certs, languages)
  const handleArrayAdd = (section, currentValue, setCurrentValue) => {
    if (currentValue.trim() === '') return;
    setFormData({
      ...formData,
      [section]: [...formData[section], currentValue.trim()]
    });
    setCurrentValue('');
  };

  const handleArrayRemove = (section, index) => {
    const updatedArray = [...formData[section]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [section]: updatedArray });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send data to your backend
    // Then navigate to the resume preview
    navigate('/resume/preview', { state: { resumeData: formData,selectedTemplate } });
  };


  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Build Your ATS-Optimized Resume</h1>
          <p className="text-lg opacity-80">
            Fill in your details to create a resume that beats applicant tracking systems
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name*</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn Profile</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered"
                    value={formData.personalInfo.linkedIn}
                    onChange={(e) => handleChange('personalInfo', 'linkedIn', e.target.value)}
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Portfolio/Website</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered"
                    value={formData.personalInfo.portfolio}
                    onChange={(e) => handleChange('personalInfo', 'portfolio', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Professional Summary*</h2>
              <p className="text-sm opacity-70 mb-2">
                Write a 3-4 sentence summary highlighting your experience and skills (this is crucial for ATS)
              </p>
              <textarea
                className="textarea textarea-bordered h-32"
                value={formData.professionalSummary}
                onChange={(e) => handleChange('professionalSummary', '', e.target.value)}
                required
              />
              <div className="text-xs opacity-50 mt-1">
                Tip: Include relevant keywords from job descriptions
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-xl">Work Experience*</h2>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => addEntry('workExperience')}
                >
                  Add Experience
                </button>
              </div>
              
              {formData.workExperience.map((exp, index) => (
                <div key={exp.id} className="mb-6 p-4 bg-base-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Experience #{index + 1}</h3>
                    {formData.workExperience.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => removeEntry('workExperience', exp.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Job Title*</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={exp.jobTitle}
                        onChange={(e) => handleChange('workExperience', 'jobTitle', e.target.value, index)}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Company*</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={exp.company}
                        onChange={(e) => handleChange('workExperience', 'company', e.target.value, index)}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Start Date*</span>
                      </label>
                      <input
                        type="month"
                        className="input input-bordered"
                        value={exp.startDate}
                        onChange={(e) => handleChange('workExperience', 'startDate', e.target.value, index)}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">End Date</span>
                      </label>
                      <input
                        type="month"
                        className="input input-bordered"
                        value={exp.endDate}
                        onChange={(e) => handleChange('workExperience', 'endDate', e.target.value, index)}
                        disabled={exp.current}
                      />
                      <label className="label cursor-pointer">
                        <span className="label-text">I currently work here</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={exp.current}
                          onChange={(e) => handleChange('workExperience', 'current', e.target.checked, index)}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">Description*</span>
                    </label>
                    <p className="text-sm opacity-70 mb-2">
                      Use bullet points to describe your responsibilities and achievements (ATS scans for action verbs)
                    </p>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={exp.description}
                      onChange={(e) => handleChange('workExperience', 'description', e.target.value, index)}
                      required
                      placeholder="• Increased sales by 30% through...\n• Managed a team of 5 developers to...\n• Implemented new system that reduced costs by..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-xl">Education*</h2>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => addEntry('education')}
                >
                  Add Education
                </button>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="mb-6 p-4 bg-base-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Education #{index + 1}</h3>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => removeEntry('education', edu.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Degree*</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={edu.degree}
                        onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                        required
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Institution*</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={edu.institution}
                        onChange={(e) => handleChange('education', 'institution', e.target.value, index)}
                        required
                        placeholder="University of California"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Field of Study</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleChange('education', 'fieldOfStudy', e.target.value, index)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Graduation Year*</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered"
                        value={edu.graduationYear}
                        onChange={(e) => handleChange('education', 'graduationYear', e.target.value, index)}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
<div className="card bg-base-200 shadow-md">
  <div className="card-body">
    <h2 className="card-title text-xl mb-4">Projects</h2>
    <p className="text-sm opacity-70 mb-2">
      Add your notable projects (Title only; detailed description can be added later)
    </p>
    
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="input input-bordered flex-grow"
        value={currentProject}
        onChange={(e) => setCurrentProject(e.target.value)}
        placeholder="Project Title"
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleArrayAdd('projects', currentProject, setCurrentProject)}
      >
        Add
      </button>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {formData.projects.map((project, index) => (
        <div key={index} className="badge badge-info gap-2">
          {project}
          <button
            type="button"
            onClick={() => handleArrayRemove('projects', index)}
            className="text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


          {/* Skills */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Skills*</h2>
              <p className="text-sm opacity-70 mb-2">
                Add relevant skills (ATS scans for these keywords)
              </p>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  className="input input-bordered flex-grow"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="JavaScript, Project Management, etc."
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleArrayAdd('skills', currentSkill, setCurrentSkill)}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="badge badge-primary gap-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('skills', index)}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Certifications</h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  className="input input-bordered flex-grow"
                  value={currentCertification}
                  onChange={(e) => setCurrentCertification(e.target.value)}
                  placeholder="AWS Certified, PMP, etc."
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleArrayAdd('certifications', currentCertification, setCurrentCertification)}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="badge badge-secondary gap-2">
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('certifications', index)}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Languages</h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  className="input input-bordered flex-grow"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  placeholder="English, Spanish, etc."
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleArrayAdd('languages', currentLanguage, setCurrentLanguage)}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((lang, index) => (
                  <div key={index} className="badge badge-accent gap-2">
                    {lang}
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('languages', index)}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Generate My Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilderForm;