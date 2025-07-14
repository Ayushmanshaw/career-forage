import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  header: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
});

const ModernTemplate = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>{data.personalInfo.fullName}</Text>
      <View style={styles.section}>
        <Text>{data.personalInfo.email}</Text>
        <Text>{data.personalInfo.phone}</Text>
        {data.personalInfo.linkedIn && <Text>{data.personalInfo.linkedIn}</Text>}
        {data.personalInfo.portfolio && <Text>{data.personalInfo.portfolio}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Professional Summary</Text>
        <Text>{data.professionalSummary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Work Experience</Text>
        {data.workExperience.map((exp, idx) => (
          <View key={idx}>
            <Text>{exp.jobTitle} at {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})</Text>
            <Text>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Education</Text>
        {data.education.map((edu, idx) => (
          <View key={idx}>
            <Text>{edu.degree} - {edu.institution} ({edu.graduationYear})</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ModernTemplate;