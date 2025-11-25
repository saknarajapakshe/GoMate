import { useAppSelector } from '@/hooks/useRedux';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <FontAwesome5 name="bus" size={80} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.title}>GoMate</Text>
      

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
    backgroundColor: '#37ab30',
  },
  logoContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 165, 0, 0.3)',
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
