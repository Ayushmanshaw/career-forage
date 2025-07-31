// 📁 /pages/resume/ResumeBuilderForm.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import WorkExperienceForm from "../../components/WorkExperienceForm";
import TagInputSection from "../../components/TagInputSection";
import EducationForm from "../../components/EducationForm";

const ResumeBuilderForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate || "modern";

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      phone: "",
      address: "",
      linkedIn: "",
      portfolio: "",
    },
    professionalSummary: "",
    workExperience: [
      {
        id: Date.now(),
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        id: Date.now(),
        degree: "",
        institution: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        marks: "",
      },
    ],

    projects: [],
    skills: [],
    certifications: [],
    languages: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentCertification, setCurrentCertification] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedArray = [...formData[section]];
      updatedArray[index][field] = value;
      setFormData({ ...formData, [section]: updatedArray });
    } else if (field) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ ...formData, [section]: value });
    }
  };

  const addEntry = (section) => {
    const template = {
      workExperience: {
        id: Date.now(),
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
      education: {
        id: Date.now(),
        degree: "",
        institution: "",
        fieldOfStudy: "",
        graduationYear: "",
      },
    };
    setFormData({
      ...formData,
      [section]: [...formData[section], template[section]],
    });
  };

  const removeEntry = (section, id) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter((item) => item.id !== id),
    });
  };

  const handleArrayAdd = (section, currentValue, setCurrentValue) => {
    if (!currentValue.trim()) return;
    setFormData({
      ...formData,
      [section]: [...formData[section], currentValue.trim()],
    });
    setCurrentValue("");
  };

  const handleArrayRemove = (section, index) => {
    const updatedArray = [...formData[section]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [section]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/resume/preview", {
      state: { resumeData: formData, selectedTemplate },
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Build Your ATS-Optimized Resume
          </h1>
          <p className="text-lg opacity-80">
            Fill in your details to create a resume that beats applicant
            tracking systems
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {["fullName", "email", "phone", "linkedIn", "portfolio"].map(
                  (field, idx) => (
                    <div className="form-control" key={idx}>
                      <label className="text-sm font-medium mb-1 block">
                        <span className="label-text">
                          {field
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={formData.personalInfo[field]}
                        onChange={(e) =>
                          handleChange("personalInfo", field, e.target.value)
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Professional Summary*</h2>
              <textarea
                className="textarea textarea-bordered h-32 w-full"
                value={formData.professionalSummary}
                onChange={(e) =>
                  handleChange("professionalSummary", "", e.target.value)
                }
              />
            </div>
          </div>

          {/* Experience */}
          <WorkExperienceForm
            data={formData.workExperience}
            onChange={handleChange}
            onAdd={() => addEntry("workExperience")}
            onRemove={(id) => removeEntry("workExperience", id)}
          />

          {/* Education */}
          <EducationForm
            data={formData.education}
            onChange={handleChange}
            onAdd={() => addEntry("education")}
            onRemove={(id) => removeEntry("education", id)}
          />

          {/* Projects */}
          <TagInputSection
            title="Projects"
            placeholder="Project Title"
            value={currentProject}
            setValue={setCurrentProject}
            data={formData.projects}
            onAdd={() =>
              handleArrayAdd("projects", currentProject, setCurrentProject)
            }
            onRemove={(index) => handleArrayRemove("projects", index)}
            badgeStyle="badge-info"
          />

          {/* Skills */}
          <TagInputSection
            title="Skills*"
            placeholder="JavaScript, Python, etc."
            value={currentSkill}
            setValue={setCurrentSkill}
            data={formData.skills}
            onAdd={() =>
              handleArrayAdd("skills", currentSkill, setCurrentSkill)
            }
            onRemove={(index) => handleArrayRemove("skills", index)}
            badgeStyle="badge-primary"
          />

          {/* Certifications */}
          <TagInputSection
            title="Certifications"
            placeholder="AWS Certified, PMP, etc."
            value={currentCertification}
            setValue={setCurrentCertification}
            data={formData.certifications}
            onAdd={() =>
              handleArrayAdd(
                "certifications",
                currentCertification,
                setCurrentCertification
              )
            }
            onRemove={(index) => handleArrayRemove("certifications", index)}
            badgeStyle="badge-secondary"
          />

          {/* Languages */}
          <TagInputSection
            title="Languages"
            placeholder="English, Spanish, etc."
            value={currentLanguage}
            setValue={setCurrentLanguage}
            data={formData.languages}
            onAdd={() =>
              handleArrayAdd("languages", currentLanguage, setCurrentLanguage)
            }
            onRemove={(index) => handleArrayRemove("languages", index)}
            badgeStyle="badge-accent"
          />

          {/* Submit Button */}
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
