import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Explore Public Transport',
    description: 'Find buses, trains, and destinations across Sri Lanka with ease',
    icon: 'compass' as const,
    bgColor: '#54c502',
  },
  {
    title: 'Find Routes & Schedules',
    description: 'Real-time schedules and route information at your fingertips',
    icon: 'map' as const,
    bgColor: '#86da18',
  },
  {
    title: 'Save Favorites & Plan',
    description: 'Keep track of your favorite routes and plan your journeys ahead',
    icon: 'heart' as const,
    bgColor: '#86da18',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentSlide + 1) * width,
        animated: true,
      });
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
        <Feather name="chevron-right" size={16} color="#54c502" />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <View style={[styles.iconContainer, { backgroundColor: slide.bgColor }]}>
              <Feather name={slide.icon} size={60} color="#ffffff" />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlide === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
        <Feather name="arrow-right" size={20} color="#ffffff" />
      </TouchableOpacity>

      {currentSlide === slides.length - 1 && (
        <View style={styles.authOptions}>
          <Text style={styles.authText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  skipButton: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 4,
  },
  skipText: {
    color: '#54c502',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#54c502',
    width: 28,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54c502',
    marginHorizontal: 24,
    marginBottom: 20,
    paddingVertical: 18,
    borderRadius: 14,
    gap: 10,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  authOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 6,
  },
  authText: {
    fontSize: 15,
    color: '#737373',
  },
  loginLink: {
    fontSize: 15,
    color: '#54c502',
    fontWeight: '700',
  },
});
