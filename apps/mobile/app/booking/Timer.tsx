import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const THEME = { bg: '#001540', accent: '#5CF263', blue: '#0047FF', border: 'rgba(255,255,255,0.5)' };

// Reusable Task Row Component
interface TaskRowProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const TaskRow = ({ label, isChecked, onToggle }: TaskRowProps) => (
  <TouchableOpacity style={styles.taskItem} onPress={onToggle}>
    <Text style={styles.whiteText}>{label}</Text>
    <View style={[styles.checkbox, isChecked && { backgroundColor: THEME.blue, borderColor: THEME.blue }]}>
      {isChecked && <Feather name="check" color="white" size={14} />}
    </View>
  </TouchableOpacity>
);

interface TaskItem {
  id: string;
  text: string;
  done: boolean;
}

export default function Timer() {
  const router = useRouter();
  const { tasks: tasksParam } = useLocalSearchParams();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    if (tasksParam) {
      let list: string[] = [];
      if (Array.isArray(tasksParam)) {
        list = tasksParam;
      } else if (typeof tasksParam === 'string') {
        try {
          const parsed = JSON.parse(tasksParam);
          if (Array.isArray(parsed)) {
            list = parsed;
          }
        } catch {
          list = tasksParam.split(',').map(t => t.trim());
        }
      }
      setTasks(list.map((t, index) => ({ id: `${index}-${t}`, text: t, done: false })));
    } else {
      // Fallback/Mock tasks if not provided
      setTasks([
        "Sweep & mop floors", "Clean bathroom", "Wipe surfaces", "Dispose trash"
      ].map((t, index) => ({ id: `${index}-${t}`, text: t, done: false })));
    }
  }, [tasksParam]);

  return (
    <BaseMain scrollable={true} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Overview</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>Working Hours</Text>
        <Text style={styles.subtitle}>Track your time while working on this job.</Text>

        <View style={styles.timerCard}>
          <Text style={styles.timerText}>1 : 00 : 00</Text>
          <View style={styles.controls}>
            <Feather name="play" color={THEME.blue} size={20} />
            <View style={styles.pauseCircle}><Feather name="pause" color="white" size={20} /></View>
            <Feather name="square" color={THEME.blue} size={18} />
          </View>
        </View>
      </View>

      <Text style={[styles.title, { marginTop: 50, fontSize: 20 }]}>Task Checklist</Text>
      {tasks.map((item, i) => (
        <TaskRow
          key={item.id}
          label={item.text}
          isChecked={item.done}
          onToggle={() => {
            const newTasks = [...tasks];
            newTasks[i].done = !newTasks[i].done;
            setTasks(newTasks);
          }}
        />
      ))}

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(joboverview)/uploading/uploadingfile/page' as any)}><Text style={styles.btnText}>Mark as Completed</Text></TouchableOpacity>
    </BaseMain>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '700' },
  center: { alignItems: 'center' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 13, marginVertical: 5 },
  timerCard: { width: '100%', borderWidth: 1, borderColor: THEME.border, borderRadius: 15, padding: 30, alignItems: 'center', marginTop: 20 },
  timerText: { color: 'white', fontSize: 50, fontWeight: '600' },
  controls: { position: 'absolute', bottom: -25, backgroundColor: 'white', borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 15, height: 50 },
  pauseCircle: { backgroundColor: THEME.blue, padding: 8, borderRadius: 20 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderWidth: 1, borderColor: THEME.border, borderRadius: 10, marginBottom: 10 },
  whiteText: { color: 'white' },
  checkbox: { width: 22, height: 22, borderWidth: 1, borderColor: 'white', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  btn: { backgroundColor: THEME.accent, padding: 18, borderRadius: 30, marginTop: 20, alignItems: 'center' },
  btnText: { fontWeight: 'bold', fontSize: 16 }
});