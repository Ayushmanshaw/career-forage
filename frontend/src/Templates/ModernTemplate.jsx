import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// 🎨 Define styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 40,
    fontSize: 11.5,
    fontFamily: "Helvetica",
    lineHeight: 1.6, // slightly reduced line height
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 0,
    marginBottom: 0, // reduced
    textAlign: "center",
    color: "#003366",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16, // tighter spacing
    marginTop: 10,
    letterSpacing: 0.5,
  },
  contact: {
    fontSize: 10.5,
    color: "#003366",
  },
  sectionTitle: {
    textDecoration: "underline",
    fontSize: 13,
    fontWeight: "bold",
    color: "#003366",
    marginTop: 8,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 11.5,
    color: "#111111",
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 1,
    fontSize: 11,
    color: "#333333",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 6, // tighter section spacing
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  column: {
    width: "48%",
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    marginVertical: 6, // reduced vertical spacing
  },
});


const ModernTemplate = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {data.personalInfo.fullName || "John Doe"}
        </Text>
        <Text style={styles.contact}>
          {data.personalInfo.email} • {data.personalInfo.phone} •{" "}
          {data.personalInfo.linkedIn}
        </Text>
        <Text style={styles.contact}>{data.personalInfo.portfolio}</Text>
      </View>

      {/* 🧾 Professional Summary */}
      {data.professionalSummary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text>{data.professionalSummary}</Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* 💼 Work Experience */}
      {data.workExperience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.subTitle}>
                {exp.jobTitle}, {exp.company} - {exp.location || ""}
              </Text>
              <Text>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </Text>
              {exp.description &&
                exp.description.split("\n").map((line, idx) => (
                  <Text key={idx} style={styles.bullet}>
                    • {line}
                  </Text>
                ))}
            </View>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      {/* 🧪 Projects + 🛠 Skills in two-column layout */}
      {(data.projects?.length > 0 || data.skills?.length > 0) && (
        <View style={{ ...styles.section, ...styles.twoColumn }}>
          {/* Projects */}
          {data.projects?.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <Text key={index} style={styles.bullet}>
                  • {project}
                </Text>
              ))}
            </View>
          )}

          {/* Technical Skills */}
          {data.skills?.length > 0 && (
            <View style={{ ...styles.column, marginLeft: 80 }}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.bullet}>
                  • {skill}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

      <View style={styles.divider} />

      {/* 🎓 Education + 🛠 Skills */}
      <View style={{ ...styles.section, ...styles.twoColumn }}>
        {/* Education */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.subTitle}>
                {edu.degree || "Degree"} -{" "}
                {edu.fieldOfStudy || "Field of Study"}
              </Text>
              <Text>{edu.institution || "Institution Name"}</Text>
              <Text>
                {edu.startDate || "Start Date"} - {edu.endDate || "End Date"} •{" "}
                {edu.marks || "Marks"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* 📜 Certifications + 🌐 Languages */}
      {(data.certifications?.length > 0 || data.languages?.length > 0) && (
        <View style={{ ...styles.section, ...styles.twoColumn }}>
          {/* Certifications */}
          <View style={styles.column}>
            {data.certifications?.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert, index) => (
                  <Text key={index} style={styles.bullet}>
                    • {cert}
                  </Text>
                ))}
              </>
            )}
          </View>

          {/* Languages */}
          <View style={{ ...styles.column, marginLeft: 20 }}>
            {data.languages?.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Languages</Text>
                <Text>{data.languages.join(", ")}</Text>
              </>
            )}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ModernTemplate;
