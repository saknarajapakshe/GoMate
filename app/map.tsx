import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAppSelector } from '@/hooks/useRedux';

export default function MapScreen() {
  const router = useRouter();
  const buses = useAppSelector((state) => state.transport.buses);
  const trains = useAppSelector((state) => state.transport.trains);
  const destinations = useAppSelector((state) => state.transport.destinations);

  // Sample locations in Colombo, Sri Lanka
  const stations = [
    { id: 1, name: 'Colombo Fort Station', type: 'train', coordinate: { latitude: 6.9344, longitude: 79.8507 } },
    { id: 2, name: 'Pettah Bus Terminal', type: 'bus', coordinate: { latitude: 6.9387, longitude: 79.8550 } },
    { id: 3, name: 'Maradana Station', type: 'train', coordinate: { latitude: 6.9271, longitude: 79.8612 } },
    { id: 4, name: 'Bambalapitiya Station', type: 'train', coordinate: { latitude: 6.8890, longitude: 79.8542 } },
    { id: 5, name: 'Mount Lavinia Station', type: 'train', coordinate: { latitude: 6.8368, longitude: 79.8631 } },
    { id: 6, name: 'Galle Face Terminal', type: 'bus', coordinate: { latitude: 6.9271, longitude: 79.8454 } },
    { id: 7, name: 'Kandy Road Bus Stop', type: 'bus', coordinate: { latitude: 6.9497, longitude: 79.8608 } },
    { id: 8, name: 'Kollupitiya Station', type: 'train', coordinate: { latitude: 6.9148, longitude: 79.8509 } },
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={station.coordinate}
            title={station.name}
            description={station.type === 'train' ? 'Train Station' : 'Bus Terminal'}
            pinColor={station.type === 'train' ? '#37ab30' : '#FF6B35'}
          />
        ))}
      </MapView>

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
  map: {
    flex: 1,
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
    backgroundColor: '#37ab30',
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
    color: '#37ab30',
  },
  directionsButton: {
    backgroundColor: '#37ab30',
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
