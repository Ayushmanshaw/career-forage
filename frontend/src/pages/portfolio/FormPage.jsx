import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import QRCode from 'react-qr-code';
import EducationForm from "../../components/EducationForm";
import TagInputSection from "../../components/TagInputSection";

const GITHUB_CLIENT_ID = "Ov23liz2TPFRchkUysG3";

const FormPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [vercelUrl, setVercelUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      linkedin: "",
      github: "",
    },
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
    skills: [],
    languages: [],
    projects: [],
    experience: [],
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentProject, setCurrentProject] = useState("");
  const [currentExperience, setCurrentExperience] = useState("");

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
      education: {
        id: Date.now(),
        degree: "",
        institution: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        marks: "",
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const githubUrlParam = urlParams.get("githubUrl");
    const vercelUrlParam = urlParams.get("vercelUrl");

    if (githubUrlParam && vercelUrlParam) {
      setLoading(false);
      setGithubUrl(decodeURIComponent(githubUrlParam));
      setVercelUrl(decodeURIComponent(vercelUrlParam));
    }
  }, [location.search]);

  const handleSubmit = () => {
    setLoading(true);
    const encodedState = btoa(JSON.stringify(formData));
    const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo&state=${encodedState}`;
    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Build Your Portfolio</h1>
          <p className="text-lg opacity-80">
            Provide your details and we’ll generate a custom portfolio and deploy it automatically!
          </p>
        </div>

        <div className="card bg-base-200 shadow-md p-6 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.personalInfo).map(([field, value]) => (
                <input
                  key={field}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder={field.replace(/([A-Z])/g, " $1").replace(/^[a-z]/, (c) => c.toUpperCase())}
                  value={value}
                  onChange={(e) => handleChange("personalInfo", field, e.target.value)}
                />
              ))}
            </div>
          </div>

          <EducationForm
            data={formData.education}
            onChange={handleChange}
            onAdd={() => addEntry("education")}
            onRemove={(id) => removeEntry("education", id)}
          />

          <TagInputSection
            title="Experience"
            placeholder="e.g. Frontend Intern at XYZ (2023)"
            value={currentExperience}
            setValue={setCurrentExperience}
            data={formData.experience}
            onAdd={() => handleArrayAdd("experience", currentExperience, setCurrentExperience)}
            onRemove={(index) => handleArrayRemove("experience", index)}
            badgeStyle="badge-neutral"
          />

          <TagInputSection
            title="Projects"
            placeholder="e.g. Portfolio Website using React"
            value={currentProject}
            setValue={setCurrentProject}
            data={formData.projects}
            onAdd={() => handleArrayAdd("projects", currentProject, setCurrentProject)}
            onRemove={(index) => handleArrayRemove("projects", index)}
            badgeStyle="badge-info"
          />

          <TagInputSection
            title="Skills"
            placeholder="JavaScript, Python, etc."
            value={currentSkill}
            setValue={setCurrentSkill}
            data={formData.skills}
            onAdd={() => handleArrayAdd("skills", currentSkill, setCurrentSkill)}
            onRemove={(index) => handleArrayRemove("skills", index)}
            badgeStyle="badge-primary"
          />

          <TagInputSection
            title="Languages"
            placeholder="English, Hindi, etc."
            value={currentLanguage}
            setValue={setCurrentLanguage}
            data={formData.languages}
            onAdd={() => handleArrayAdd("languages", currentLanguage, setCurrentLanguage)}
            onRemove={(index) => handleArrayRemove("languages", index)}
            badgeStyle="badge-accent"
          />

          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Generating..." : "🚀 Generate Portfolio"}
            </button>
          </div>

          {loading && (
            <div className="text-center">
              <p className="text-lg font-semibold">🚀 Deploying your portfolio...</p>
              <span className="loading loading-spinner text-primary mt-4"></span>
            </div>
          )}

          {!loading && vercelUrl && (
            <div className="mt-8 text-center space-y-4">
              <h2 className="text-xl font-bold text-green-600">🎉 Portfolio Deployed!</h2>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="link link-primary">
                📂 View GitHub Repo
              </a>
              <div className="flex justify-center mt-4">
                <QRCode value={vercelUrl} size={180} />
              </div>
              <a href={vercelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-4">
                🌐 View Live Portfolio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
