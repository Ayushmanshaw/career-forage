// services/portfolioBuilder.js
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const customizeTemplate = async (formData) => {
  const tempDir = path.join(__dirname, '..', 'temp', `${Date.now()}`);
  const templateDir = path.join(__dirname, '..', 'template');
  await fs.copy(templateDir, tempDir);

  const htmlPath = path.join(tempDir, 'index.html');
  const rawTemplate = await fs.readFile(htmlPath, 'utf-8');

  // Compile the template using Handlebars
  const template = Handlebars.compile(rawTemplate);

  // Format education array (each item is an object)
  const formattedEducation = (formData.education || []).map((edu) => ({
    degree: edu.degree || '',
    institution: edu.institution || '',
    fieldOfStudy: edu.fieldOfStudy || '',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    marks: edu.marks || '',
  }));

  // Prepare template context
  const context = {
    fullName: formData.personalInfo?.fullName || '',
    email: formData.personalInfo?.email || '',
    profession: formData.profession || '',
    about: formData.about || '',
    linkedin: formData.personalInfo?.linkedin || '',
    githubLink: formData.personalInfo?.github || '',
    education: formattedEducation,
    experience: formData.experience || [],
    projects: formData.projects || [],
    skills: formData.skills || [],
    languages: formData.languages || [],
  };

  // Generate the final HTML
  const renderedHTML = template(context);
  await fs.writeFile(htmlPath, renderedHTML);

  return tempDir;
};
