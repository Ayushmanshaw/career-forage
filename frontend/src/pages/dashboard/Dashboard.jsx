import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import SectionTabs from "../../components/Dashboard/SectionTabs";
import ResumeList from "../../components/Dashboard/ResumeList";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const { user, isLoaded } = useUser(); // ✅ Added isLoaded
  const { getToken } = useAuth();

  const [activeSection, setActiveSection] = useState("Resume");
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = await getToken();

        const response = await fetch(
          `http://localhost:5000/api/resumes?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch resumes");
        setResumes(data);
      } catch (err) {
        console.error("❌ Failed to fetch resumes:", err);
      }
    };

    if (isLoaded && user) fetchResumes(); // ✅ ensure user is loaded
  }, [isLoaded, user]);

  const handleDownload = (resume) => {
    const blob = new Blob([JSON.stringify(resume)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resume.data.personalInfo.fullName || "resume"}.json`;
    link.click();
  };

  const handleDelete = async (resumeId) => {
    try {
      const token = await getToken();

      const response = await fetch(
        `http://localhost:5000/api/resumes/${resumeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete");

      // 🧹 Remove the deleted resume from UI
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
    } catch (err) {
      console.error("❌ Failed to delete resume:", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-100 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.firstName || "Guest"}
        </h1>

        <SectionTabs
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {activeSection === "Resume" && (
          <ResumeList
            resumes={resumes}
            onDownload={handleDownload}
            onDelete={handleDelete} // ✅ Pass delete handler here
          />
        )}

        {activeSection !== "Resume" && (
          <div className="text-center py-12 text-lg text-gray-500">
            {activeSection} section coming soon...
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
