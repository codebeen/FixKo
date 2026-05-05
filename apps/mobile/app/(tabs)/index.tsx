import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const TAGS = [
  { label: 'Connection', type: 'dashed' },
  { label: 'Trust', type: 'dashed' },
  { label: 'Consistency', type: 'solid' },
  { label: 'Bridging Filipinos', type: 'dashed' },
  { label: 'Reliability', type: 'dashed' },
  { label: 'Opportunity', type: 'dashed' },
  { label: 'Efficiency', type: 'dashed' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Supporting Filipino Workers,{'\n'}
          <Text style={styles.subtitle}>Serving Every Home.</Text>
        </Text>
        <Text style={styles.description}>
          Empowering the hands that build our nation. We bridge the gap between 
          the hardworking Filipino and the homes that need them most.
        </Text>

        <View style={styles.tagCloud}>
          {TAGS.map((tag, i) => (
            <View key={i} style={[styles.tag, styles[`${tag.type}Tag`]]}>
              <Text style={[styles.tagText, tag.type === 'solid' && styles.solidText]}>
                {tag.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>I Already have an Account</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001449', padding: 25 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: 'normal', fontStyle: 'italic', color: '#CCC' },
  description: { color: '#BBB', textAlign: 'center', fontSize: 13, marginTop: 15, paddingHorizontal: 10 },
  
  tagCloud: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 10, 
    marginTop: 40 
  },
  tag: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  dashedTag: { borderWidth: 1, borderColor: '#FFF', borderStyle: 'dashed' },
  solidTag: { backgroundColor: '#FFF' },
  tagText: { color: '#FFF', fontSize: 14 },
  solidText: { color: '#001449', fontWeight: 'bold' },

  footer: { gap: 20, alignItems: 'center', marginBottom: 20 },
  button: { backgroundColor: '#7EB1F1', width: '100%', padding: 16, borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#001449', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#FFF', fontWeight: '600' }
});