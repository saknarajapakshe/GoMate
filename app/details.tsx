import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.heroImage}>
          <Text style={styles.heroEmoji}>🚌</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Colombo - Kandy Express</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Experience a comfortable journey through scenic routes connecting Colombo to Kandy.
            This express service offers air-conditioned comfort with regular departures throughout
            the day.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Route Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>3 hours 30 minutes</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Distance:</Text>
              <Text style={styles.infoValue}>115 km</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fare:</Text>
              <Text style={styles.infoValue}>LKR 450</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Stops</Text>
            {['Colombo Fort', 'Kadawatha', 'Kiribathgoda', 'Gampaha', 'Kandy'].map((stop, index) => (
              <View key={index} style={styles.stopRow}>
                <View style={styles.stopDot} />
                <Text style={styles.stopText}>{stop}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.favouriteButton}>
            <Text style={styles.favouriteButtonText}>❤️ Add to Favourites</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroImage: {
    height: 250,
    backgroundColor: '#FDB913',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 100,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#00534E',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#737373',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoLabel: {
    fontSize: 16,
    color: '#737373',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8D153A',
    marginRight: 12,
  },
  stopText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  favouriteButton: {
    backgroundColor: '#8D153A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  favouriteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
