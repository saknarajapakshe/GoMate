import { useAppSelector } from '@/hooks/useRedux';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Feather name="compass" size={60} color="#86da18" />
        </View>
      </View>

      <Text style={styles.title}>GoMate</Text>
      <Text style={styles.subtitle}>Your Travel Companion in Sri Lanka</Text>

      <View style={styles.taglineContainer}>
        <View style={styles.taglineItem}>
          <Feather name="truck" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.taglineText}>Buses</Text>
        </View>
        <View style={styles.taglineDot} />
        <View style={styles.taglineItem}>
          <Feather name="navigation" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.taglineText}>Trains</Text>
        </View>
        <View style={styles.taglineDot} />
        <View style={styles.taglineItem}>
          <Feather name="map-pin" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.taglineText}>Places</Text>
        </View>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="rgba(255, 255, 255, 0.8)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54c502',
  },
  logoContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(253, 185, 19, 0.3)',
  },
  title: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 24,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taglineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taglineText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  loadingContainer: {
    marginTop: 48,
  },
});
