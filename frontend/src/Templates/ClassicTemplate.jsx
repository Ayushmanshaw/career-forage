import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer';

// 🔧 Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#0b3d91',
    padding: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contact: {
    marginTop: 5,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0b3d91',
    marginTop: 15,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 10,
  },
  twoColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  column: {
    width: '48%',
  },
});

const ClassicTemplate = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'John Doe'}</Text>
        <Text style={styles.contact}>
          {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.linkedIn}
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

      {/* 💼 Work Experience */}
      {data.workExperience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.workExperience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.subTitle}>
                {exp.jobTitle}, {exp.company} - {exp.location || ' '}
              </Text>
              <Text>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
              {exp.description && exp.description.split('\n').map((line, idx) => (
                <Text key={idx} style={styles.bullet}>• {line}</Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* 🎓 Education + 🛠 Skills */}
      <View style={{ ...styles.section, ...styles.twoColumn }}>
        {/* Education */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 4 }}>
              <Text style={styles.subTitle}>
                {edu.degree}, {edu.institution}
              </Text>
              <Text>{edu.graduationYear}</Text>
              {edu.fieldOfStudy && <Text>{edu.fieldOfStudy}</Text>}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills?.map((skill, index) => (
            <Text key={index} style={styles.bullet}>• {skill}</Text>
          ))}
        </View>
      </View>

      {/* 📜 Certifications */}
      {data.certifications?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <Text key={index} style={styles.bullet}>• {cert}</Text>
          ))}
        </View>
      )}

      {/* 🌐 Languages */}
      {data.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text>{data.languages.join(', ')}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default ClassicTemplate;
