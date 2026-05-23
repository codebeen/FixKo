import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
  const { 
    title, client, address, propertySize, rate, 
    example, schedule, contact, tasks: tasksParam, status, activeTab 
  } = useLocalSearchParams();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${hrs} : ${pad(mins)} : ${pad(secs)}`;
  };

  const allTasksChecked = tasks.every(task => task.done);

  return (
    <BaseMain theme="navy" scrollable={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={() => setIsRunning(true)}
                activeOpacity={0.7}
                style={styles.controlTouch}
              >
                <Feather
                  name="play"
                  color={isRunning ? '#ccc' : THEME.blue}
                  size={20}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsRunning(false)}
                activeOpacity={0.7}
                style={styles.controlTouch}
              >
                <View style={[styles.pauseCircle, !isRunning && { backgroundColor: '#ccc' }]}>
                  <Feather name="pause" color="white" size={20} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsRunning(false);
                  setSeconds(0);
                }}
                activeOpacity={0.7}
                style={styles.controlTouch}
              >
                <Feather
                  name="square"
                  color={THEME.blue}
                  size={18}
                />
              </TouchableOpacity>
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
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btn, !allTasksChecked && styles.disabledBtn]}
          disabled={!allTasksChecked}
          onPress={() => router.push({
            pathname: '/booking/UploadProof',
            params: {
              title: title || '',
              client: client || '',
              address: address || '',
              propertySize: propertySize || '',
              rate: rate || '',
              example: example || '',
              schedule: schedule || '',
              contact: contact || '',
              tasks: tasksParam || '',
              status: status || '',
              activeTab: activeTab || ''
            }
          })}
          activeOpacity={allTasksChecked ? 0.8 : 1}
        >
          <Text style={[styles.btnText, !allTasksChecked && styles.disabledBtnText]}>
            Mark as Completed
          </Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#001851',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: THEME.accent,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '90%',
  },
  disabledBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#001540'
  },
  disabledBtnText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  controlTouch: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});