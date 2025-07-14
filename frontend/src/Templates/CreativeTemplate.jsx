import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 35, backgroundColor: '#fef3c7', fontSize: 11, fontFamily: 'Helvetica' },
  header: { fontSize: 18, marginBottom: 10, color: '#b45309' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold', color: '#92400e' },
});

const CreativeTemplate = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>{data.personalInfo.fullName}</Text>
      <Text>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
      <Text>{data.personalInfo.linkedIn} | {data.personalInfo.portfolio}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Summary</Text>
        <Text>{data.professionalSummary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Experience</Text>
        {data.workExperience.map((exp, i) => (
          <Text key={i}>{exp.jobTitle} - {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Education</Text>
        {data.education.map((edu, i) => (
          <Text key={i}>{edu.degree} - {edu.institution}, {edu.graduationYear}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default CreativeTemplate;