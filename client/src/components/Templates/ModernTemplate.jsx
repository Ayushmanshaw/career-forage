import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000',
  },
header: {
  marginBottom: 20,
  borderBottom: '1px solid #ccc',
  paddingBottom: 10,
},
name: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,  // Add more bottom space here
  textAlign: 'center',  // Center align
},
  contact: {
    fontSize: 10,
    textAlign: 'center',
  },

  links: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e3a8a', // blue
    marginBottom: 5,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletSymbol: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
});

// Helper
const safeText = (val) => (val ? String(val) : '');

const ModernTemplate = ({ data = {} }) => {
  const {
    personalInfo = {},
    professionalSummary = '',
    workExperience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
    projects = [],
  } = data;

  const renderBullets = (desc = '') =>
    desc.split('\n').map((line, i) => (
      <View key={i} style={styles.bullet}>
        <Text style={styles.bulletSymbol}>•</Text>
        <Text style={styles.bulletText}>{line.trim()}</Text>
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{safeText(personalInfo.fullName)}</Text>
          <Text style={styles.contact}>
            {safeText(personalInfo.yourLocation)} | {safeText(personalInfo.email)} | {safeText(personalInfo.phone)} | {safeText(personalInfo.portfolio)}
          </Text>
          <Text style={styles.links}>
            {personalInfo.linkedIn && `LinkedIn: ${personalInfo.linkedIn}`}
            {personalInfo.github && ` | GitHub: ${personalInfo.github}`}
          </Text>
        </View>

        {/* Professional Summary */}
        {professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {safeText(exp.jobTitle)} at {safeText(exp.company)}
                </Text>
                <Text>
                  {safeText(exp.startDate)} - {exp.current ? 'Present' : safeText(exp.endDate)}
                </Text>
                {renderBullets(exp.description)}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {safeText(edu.degree)} - {safeText(edu.institution)}
                </Text>
                <Text>Year: {safeText(edu.graduationYear)}</Text>
                {edu.fieldOfStudy && <Text>Field: {safeText(edu.fieldOfStudy)}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 'bold' }}>{safeText(proj.name)}</Text>
                {proj.link && <Text>Link: {proj.link}</Text>}
                {renderBullets(proj.description)}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text>{skills.join(', ')}</Text>
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, i) => (
              <Text key={i}>• {cert}</Text>
            ))}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text>{languages.join(', ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ModernTemplate;
