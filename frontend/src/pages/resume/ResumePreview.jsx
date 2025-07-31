// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { pdf } from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
// import { useUser } from '@clerk/clerk-react';

// // ✅ Centralized import of all templates from index.js inside /Templates
// import {
//   ModernTemplate,
//   ClassicTemplate,
//   ExecutiveTemplate,
//   CreativeTemplate,
// } from "../../Templates";

// const ResumePreview = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const resumeData = state?.resumeData || {};
//   const template = state?.selectedTemplate || "classic";

//   const [isGenerating, setIsGenerating] = useState(false);
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [error, setError] = useState(null);
//   const { user } = useUser();

//   const handleSaveToServer = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/resumes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.id, // Clerk user ID
//           resumeData, // your resume data state
//           template, // selected template ID
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Resume saved successfully!");
//         console.log("Saved:", data);
//       } else {
//         alert("Failed to save resume.");
//         console.error(data.error);
//       }
//     } catch (err) {
//       console.error("Error saving resume:", err);
//       alert("Server error. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     const generatePdf = async () => {
//       setIsGenerating(true);
//       setError(null);

//       try {
//         let TemplateComponent;

//         // ✅ Dynamically switch to the selected template
//         switch (template) {
//           case "classic":
//             TemplateComponent = <ClassicTemplate data={resumeData} />;
//             break;
//           case "executive":
//             TemplateComponent = <ExecutiveTemplate data={resumeData} />;
//             break;
//           case "creative":
//             TemplateComponent = <CreativeTemplate data={resumeData} />;
//             break;
//           case "modern":
//           default:
//             TemplateComponent = <ModernTemplate data={resumeData} />;
//             break;
//         }

//         // ✅ Generate PDF blob using @react-pdf/renderer
//         const blob = await pdf(TemplateComponent).toBlob();
//         setPdfBlob(blob);
//       } catch (err) {
//         console.error("PDF generation error:", err);
//         setError("Failed to generate PDF. Please try again.");
//       } finally {
//         setIsGenerating(false);
//       }
//     };

//     if (Object.keys(resumeData).length > 0) {
//       generatePdf();
//     }
//   }, [resumeData, template]);

//   const handleDownload = () => {
//     if (!pdfBlob) return;
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement("a");

//     // ✅ Download filename will be user's name or 'resume.pdf'
//     link.download = `${
//       resumeData.personalInfo?.fullName?.replace(/[^a-zA-Z0-9]/g, "_") ||
//       "resume"
//     }.pdf`;

//     link.href = url;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const validateResumeData = () => {
//     if (!resumeData.personalInfo?.fullName) return "Full name is required";
//     if (!resumeData.professionalSummary)
//       return "Professional summary is required";
//     if (!resumeData.workExperience?.length)
//       return "At least one work experience is required";
//     return null;
//   };

//   // ✅ Web preview in case PDF fails or for live on-page preview
//   const renderWebTemplate = () => (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-xl font-bold mb-2">
//           {resumeData.personalInfo?.fullName || "Your Name"}
//         </h2>
//         <p>Email: {resumeData.personalInfo?.email}</p>
//         <p>Phone: {resumeData.personalInfo?.phone}</p>
//         {resumeData.personalInfo?.linkedIn && (
//           <p>LinkedIn: {resumeData.personalInfo.linkedIn}</p>
//         )}
//         {resumeData.personalInfo?.portfolio && (
//           <p>Portfolio: {resumeData.personalInfo.portfolio}</p>
//         )}
//       </div>

//       {resumeData.professionalSummary && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
//           <p>
//             {resumeData.professionalSummary.split("\n").map((line, idx) => (
//               <span key={idx}>
//                 {line}
//                 <br />
//               </span>
//             ))}
//           </p>
//         </div>
//       )}

//       {resumeData.workExperience?.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
//           {resumeData.workExperience.map((exp, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-medium">
//                 {exp.jobTitle} at {exp.company}, {exp.location}
//               </p>
//               <p>
//                 {exp.startDate} - {exp.current ? "Present" : exp.endDate}
//               </p>
//               <p>
//                 {exp.description.split("\n").map((line, idx) => (
//                   <span key={idx}>
//                     {line}
//                     <br />
//                   </span>
//                 ))}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {resumeData.education?.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Education</h3>
//           {resumeData.education.map((edu, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-medium">
//                 {edu.degree} - {edu.institution}
//               </p>
//               <p>Year: {edu.graduationYear}</p>
//               {edu.fieldOfStudy && <p>Field: {edu.fieldOfStudy}</p>}
//             </div>
//           ))}
//         </div>
//       )}

//       {resumeData.skills?.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Skills</h3>
//           <p>{resumeData.skills.join(", ")}</p>
//         </div>
//       )}

//       {resumeData.certifications?.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Certifications</h3>
//           <ul className="list-disc pl-6">
//             {resumeData.certifications.map((cert, index) => (
//               <li key={index}>{cert}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {resumeData.languages?.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Languages</h3>
//           <p>{resumeData.languages.join(", ")}</p>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-base-100 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Your Resume Preview</h1>
//             <button onClick={handleSaveToServer} className="btn btn-success mt-4">
//                 Save to Dashboard
//             </button>
//         </div>

//         {/* Error Message if PDF fails */}
//         {error && (
//           <div className="alert alert-error mb-8">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current shrink-0 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* 🔍 Web preview fallback */}
//         {/* <div className="bg-white shadow-2xl p-8 rounded-lg">
//           {renderWebTemplate()}
//         </div> */}

//         <PDFViewer
//           width="100%"
//           height={800}
//           className="mb-12 border rounded-lg"
//         >
//           {template === "modern" ? (
//             <ModernTemplate data={resumeData} />
//           ) : template === "classic" ? (
//             <ClassicTemplate data={resumeData} />
//           ) : template === "executive" ? (
//             <ExecutiveTemplate data={resumeData} />
//           ) : (
//             <CreativeTemplate data={resumeData} />
//           )}
//         </PDFViewer>
//         <div className="flex justify-end">
//           <div className="flex gap-4">
//             <button
//               onClick={() =>
//                 navigate("/resume/form", {
//                   state: { resumeData, selectedTemplate: template },
//                 })
//               }
//               className="btn btn-primary"
//             >
//               Edit Resume
//             </button>

//             <button
//               onClick={() => {
//                 const validationError = validateResumeData();
//                 if (validationError) {
//                   alert(validationError);
//                   return;
//                 }
//                 handleDownload();
//               }}
//               className="btn btn-primary"
//               disabled={isGenerating || !pdfBlob}
//             >
//               {isGenerating ? (
//                 <>
//                   <span className="loading loading-spinner"></span>
//                   Generating...
//                 </>
//               ) : (
//                 "Download PDF"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;





import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { useUser, useAuth } from "@clerk/clerk-react";

// ✅ Centralized import of all templates
import {
  ModernTemplate,
  ClassicTemplate,
  ExecutiveTemplate,
  CreativeTemplate,
} from "../../Templates";

const ResumePreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const resumeData = state?.resumeData || {};
  const template = state?.selectedTemplate || "classic";

  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [renderedTemplate, setRenderedTemplate] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useUser();
  const { getToken } = useAuth();

  const handleSaveToServer = async () => {
    try {
      const token = await getToken();
      const response = await fetch("https://career-forage.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          resumeData,
          template,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Resume saved successfully!");
        console.log("Saved:", data);
      } else {
        alert("Failed to save resume.");
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    const generatePdf = async () => {
      setIsGenerating(true);
      setError(null);

      try {
        let TemplateComponent;

        switch (template) {
          case "classic":
            TemplateComponent = ClassicTemplate;
            break;
          case "executive":
            TemplateComponent = ExecutiveTemplate;
            break;
          case "creative":
            TemplateComponent = CreativeTemplate;
            break;
          case "modern":
          default:
            TemplateComponent = ModernTemplate;
            break;
        }

        const element = <TemplateComponent data={resumeData} />;
        const blob = await pdf(element).toBlob();

        setRenderedTemplate(element);
        setPdfBlob(blob);
      } catch (err) {
        console.error("PDF generation error:", err);
        setError("Failed to generate PDF. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };

    if (Object.keys(resumeData).length > 0) {
      generatePdf();
    }
  }, [resumeData, template]);

  const handleDownload = () => {
    if (!pdfBlob) return;

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");

    link.download = `${
      resumeData.personalInfo?.fullName?.replace(/[^a-zA-Z0-9]/g, "_") ||
      "resume"
    }.pdf`;

    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const validateResumeData = () => {
    if (!resumeData.personalInfo?.fullName) return "Full name is required";
    if (!resumeData.professionalSummary)
      return "Professional summary is required";
    if (!resumeData.workExperience?.length)
      return "At least one work experience is required";
    return null;
  };

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Resume Preview</h1>
          <button
            onClick={handleSaveToServer}
            className="btn btn-success mt-4"
          >
            Save to Dashboard
          </button>
        </div>

        {/* ❗ Error message */}
        {error && (
          <div className="alert alert-error mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ✅ PDFViewer shows only when renderedTemplate is ready */}
        {renderedTemplate && (
          <PDFViewer width="100%" height={800} className="mb-12 border rounded-lg">
            {renderedTemplate}
          </PDFViewer>
        )}

        {/* 🔘 Action Buttons */}
        <div className="flex justify-end">
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate("/resume/form", {
                  state: { resumeData, selectedTemplate: template },
                })
              }
              className="btn btn-primary"
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
                "Download PDF"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
