import { useSegments } from 'expo-router';

export function useUserRole(): 'client' | 'worker' {
  const segments = useSegments() as string[];
  return segments.includes('(worker)') ? 'worker' : 'client';
}
