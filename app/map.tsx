import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubtext}>Interactive map will be displayed here</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Colombo Fort Station</Text>
        <Text style={styles.sheetSubtitle}>Bus & Train Terminal</Text>
        <View style={styles.sheetInfo}>
          <Text style={styles.sheetLabel}>Status: </Text>
          <Text style={styles.sheetValue}>Active</Text>
        </View>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
  },
  mapEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  mapText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#737373',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  backIcon: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  controls: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlIcon: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  locationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8D153A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationIcon: {
    fontSize: 20,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 12,
  },
  sheetInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sheetLabel: {
    fontSize: 14,
    color: '#737373',
  },
  sheetValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00534E',
  },
  directionsButton: {
    backgroundColor: '#8D153A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  directionsText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
