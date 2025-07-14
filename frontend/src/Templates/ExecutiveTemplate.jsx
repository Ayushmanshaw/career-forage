import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Courier', backgroundColor: '#f3f4f6' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold', fontSize: 13 },
});

const ExecutiveTemplate = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>{data.personalInfo.fullName}</Text>
      <Text>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
      <Text>{data.personalInfo.linkedIn} | {data.personalInfo.portfolio}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Professional Summary</Text>
        <Text>{data.professionalSummary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Work History</Text>
        {data.workExperience.map((exp, idx) => (
          <Text key={idx}>{exp.jobTitle} @ {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Education</Text>
        {data.education.map((edu, idx) => (
          <Text key={idx}>{edu.degree}, {edu.institution}, {edu.graduationYear}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default ExecutiveTemplate;
