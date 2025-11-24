import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const TAB_OPTIONS = ['Buses', 'Trains', 'Destinations'];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Buses');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Traveler! 👋</Text>
        <Text style={styles.subtitle}>Where would you like to go today?</Text>
      </View>

      <View style={styles.tabContainer}>
        {TAB_OPTIONS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🚌</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Colombo - Kandy Express</Text>
            <Text style={styles.cardDescription}>Direct route via highway</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🚂</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ella - Colombo Train</Text>
            <Text style={styles.cardDescription}>Scenic mountain route</Text>
            <View style={[styles.badge, styles.badgePopular]}>
              <Text style={styles.badgeText}>Popular</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🏖️</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Galle Beach Route</Text>
            <Text style={styles.cardDescription}>Coastal journey</Text>
            <View style={[styles.badge, styles.badgeUpcoming]}>
              <Text style={styles.badgeText}>Upcoming</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#737373',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  tabActive: {
    backgroundColor: '#8D153A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImagePlaceholder: {
    height: 160,
    backgroundColor: '#FDB913',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 60,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#00534E',
  },
  badgePopular: {
    backgroundColor: '#8D153A',
  },
  badgeUpcoming: {
    backgroundColor: '#E57200',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDB913',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: '#1a1a1a',
    fontWeight: '300',
  },
});
