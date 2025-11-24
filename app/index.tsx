import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🚌</Text>
        </View>
      </View>

      <Text style={styles.title}>GoMate</Text>
      <Text style={styles.subtitle}>Your Travel Companion</Text>

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
    backgroundColor: '#8D153A',
  },
  logoContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 64,
  },
  title: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    letterSpacing: 2,
  },
  loadingContainer: {
    marginTop: 48,
  },
});
