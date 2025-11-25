import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store';
import { addFavourite } from '@/store/slices/favouritesSlice';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

// Dark mode map style
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export default function MapScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const buses = useAppSelector((state: RootState) => state.transport.buses);
  const trains = useAppSelector((state: RootState) => state.transport.trains);
  const destinations = useAppSelector((state: RootState) => state.transport.destinations);
  const { isDarkMode } = useAppSelector((state: RootState) => state.theme);
  const favourites = useAppSelector((state: RootState) => state.favourites.items);

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromCoordinate, setFromCoordinate] = useState<any>(null);
  const [toCoordinate, setToCoordinate] = useState<any>(null);
  const [selectingFor, setSelectingFor] = useState<'from' | 'to' | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const styles = getStyles(isDarkMode);

  // Sample locations in London, UK
  const stations = [
    { id: 1, name: 'Kings Cross Station', type: 'train', coordinate: { latitude: 51.5309, longitude: -0.1235 } },
    { id: 2, name: 'Victoria Coach Station', type: 'bus', coordinate: { latitude: 51.4950, longitude: -0.1451 } },
    { id: 3, name: 'Paddington Station', type: 'train', coordinate: { latitude: 51.5154, longitude: -0.1755 } },
    { id: 4, name: 'Euston Station', type: 'train', coordinate: { latitude: 51.5282, longitude: -0.1337 } },
    { id: 5, name: 'Liverpool Street Station', type: 'train', coordinate: { latitude: 51.5179, longitude: -0.0813 } },
    { id: 6, name: 'Oxford Street Bus Stop', type: 'bus', coordinate: { latitude: 51.5155, longitude: -0.1419 } },
    { id: 7, name: 'Heathrow Central', type: 'bus', coordinate: { latitude: 51.4700, longitude: -0.4543 } },
    { id: 8, name: 'Victoria Station', type: 'train', coordinate: { latitude: 51.4952, longitude: -0.1441 } },
  ];

  const handleMarkerPress = (station: any) => {
    if (selectingFor === 'from') {
      setFromLocation(station.name);
      setFromCoordinate(station.coordinate);
      setSelectingFor(null);
    } else if (selectingFor === 'to') {
      setToLocation(station.name);
      setToCoordinate(station.coordinate);
      setSelectingFor(null);
    }
  };

  const handleFindRoutes = () => {
    if (fromLocation && toLocation) {
      setShowRoutes(true);
    }
  };

  // Helper function to match location names flexibly
  const locationMatches = (routeLocation: string, selectedLocation: string) => {
    const route = routeLocation.toLowerCase();
    const selected = selectedLocation.toLowerCase();
    
    // Extract key words (ignore "Station", "Central", etc.)
    const routeWords = route.split(/\s+/).filter(w => !['station', 'central', 'terminal', 'bus', 'coach'].includes(w));
    const selectedWords = selected.split(/\s+/).filter(w => !['station', 'central', 'terminal', 'bus', 'coach'].includes(w));
    
    // Check if any significant word matches
    return routeWords.some(rw => selectedWords.some(sw => 
      rw.includes(sw) || sw.includes(rw) || rw === sw
    ));
  };

  const availableRoutes = [...buses, ...trains].filter(route => {
    if (!fromLocation || !toLocation) return false;
    
    // Check if route origin/destination match selected locations
    const fromMatch = route.origin && locationMatches(route.origin, fromLocation);
    const toMatch = route.destination && locationMatches(route.destination, toLocation);
    
    // Also check reverse direction
    const reverseFromMatch = route.destination && locationMatches(route.destination, fromLocation);
    const reverseToMatch = route.origin && locationMatches(route.origin, toLocation);
    
    return (fromMatch && toMatch) || (reverseFromMatch && reverseToMatch);
  });

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
    setShowRoutes(false);
  };

  const handleSaveRoute = () => {
    if (selectedRoute) {
      const isFavourite = favourites.some((fav: { id: string }) => fav.id === selectedRoute.id);
      
      if (isFavourite) {
        Alert.alert('Already Saved', 'This route is already in your favourites!');
      } else {
        dispatch(addFavourite(selectedRoute));
        Alert.alert(
          'Route Saved!',
          'The route has been added to your favourites.',
          [
            {
              text: 'View Favourites',
              onPress: () => router.push('/(tabs)'),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={isDarkMode ? darkMapStyle : undefined}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
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
            onPress={() => handleMarkerPress(station)}
          />
        ))}

        {fromCoordinate && (
          <Marker
            coordinate={fromCoordinate}
            pinColor="#4CAF50"
            title="From"
          />
        )}

        {toCoordinate && (
          <Marker
            coordinate={toCoordinate}
            pinColor="#F44336"
            title="To"
          />
        )}

        {selectedRoute && fromCoordinate && toCoordinate && (
          <Polyline
            coordinates={[fromCoordinate, toCoordinate]}
            strokeColor="#37ab30"
            strokeWidth={4}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color={isDarkMode ? '#ffffff' : '#1a1a1a'} />
      </TouchableOpacity>

      {/* Bottom Sheet - From/To Input or Route Results */}
      {!showRoutes && !selectedRoute && (
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Plan Your Journey</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.locationDot, { backgroundColor: '#4CAF50' }]} />
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setSelectingFor('from')}
            >
              <Text style={styles.inputLabel}>From</Text>
              <Text style={styles.inputValue}>
                {fromLocation || 'Select on map'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.locationDot, { backgroundColor: '#F44336' }]} />
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setSelectingFor('to')}
            >
              <Text style={styles.inputLabel}>To</Text>
              <Text style={styles.inputValue}>
                {toLocation || 'Select on map'}
              </Text>
            </TouchableOpacity>
          </View>

          

          <TouchableOpacity 
            style={[styles.directionsButton, (!fromLocation || !toLocation) && styles.disabledButton]}
            onPress={handleFindRoutes}
            disabled={!fromLocation || !toLocation}
          >
            <Text style={styles.directionsText}>Find Routes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Route Options */}
      {showRoutes && (
        <View style={[styles.bottomSheet, styles.routesSheet]}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Available Routes</Text>
          <Text style={styles.sheetSubtitle}>
            {fromLocation} → {toLocation}
          </Text>

          <ScrollView style={styles.routesList}>
            {availableRoutes.length > 0 ? (
              availableRoutes.map((route) => (
                <TouchableOpacity
                  key={route.id}
                  style={styles.routeCard}
                  onPress={() => handleRouteSelect(route)}
                >
                  <View style={styles.routeHeader}>
                    <Text style={styles.routeTitle}>{route.title}</Text>
                    <View style={[styles.routeTypeBadge, route.type === 'train' ? styles.trainBadge : styles.busBadge]}>
                      <Text style={styles.routeTypeBadgeText}>
                        {route.type === 'train' ? '🚂' : '🚌'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.routeDescription}>{route.description}</Text>
                  <View style={styles.routeDetails}>
                    <Text style={styles.routeDetail}>⏱ {route.duration}</Text>
                    <Text style={styles.routeDetail}>💷 {route.price}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noRoutesContainer}>
                <Text style={styles.noRoutesText}>No direct routes found</Text>
                <Text style={styles.noRoutesSubtext}>Try different locations</Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setShowRoutes(false)}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Selected Route Details */}
      {selectedRoute && (
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={styles.routeHeader}>
            <Text style={styles.sheetTitle}>{selectedRoute.title}</Text>
            <View style={[styles.routeTypeBadge, selectedRoute.type === 'train' ? styles.trainBadge : styles.busBadge]}>
              <Text style={styles.routeTypeBadgeText}>
                {selectedRoute.type === 'train' ? '🚂' : '🚌'}
              </Text>
            </View>
          </View>
          <Text style={styles.sheetSubtitle}>{selectedRoute.description}</Text>
          
          <View style={styles.routeInfoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{selectedRoute.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>{selectedRoute.price}</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.secondaryButton, styles.halfButton]}
              onPress={() => {
                setSelectedRoute(null);
                setShowRoutes(true);
              }}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.primaryButton, styles.halfButton]}
              onPress={handleSaveRoute}
            >
              <Text style={styles.primaryButtonText}>Save Route</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.secondaryButton, { marginTop: 8 }]}
            onPress={() => {
              setSelectedRoute(null);
              setFromLocation('');
              setToLocation('');
              setFromCoordinate(null);
              setToCoordinate(null);
            }}
          >
            <Text style={styles.secondaryButtonText}>Start New Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0a0a0a' : '#f0f0f0',
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
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    bottomSheet: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    routesSheet: {
      maxHeight: '70%',
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: isDarkMode ? '#333333' : '#e5e5e5',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    sheetTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      marginBottom: 8,
    },
    sheetSubtitle: {
      fontSize: 14,
      color: isDarkMode ? '#b3b3b3' : '#737373',
      marginBottom: 16,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 12,
    },
    inputButton: {
      flex: 1,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: isDarkMode ? '#333333' : '#e5e5e5',
    },
    inputLabel: {
      fontSize: 12,
      color: isDarkMode ? '#b3b3b3' : '#737373',
      marginBottom: 4,
    },
    inputValue: {
      fontSize: 15,
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      fontWeight: '500',
    },
    instructionText: {
      fontSize: 13,
      color: '#37ab30',
      textAlign: 'center',
      marginVertical: 8,
      fontStyle: 'italic',
    },
    directionsButton: {
      backgroundColor: '#37ab30',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
    },
    disabledButton: {
      backgroundColor: isDarkMode ? '#333333' : '#cccccc',
    },
    directionsText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    routesList: {
      maxHeight: '60%',
    },
    routeCard: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f8f8',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDarkMode ? '#333333' : '#e5e5e5',
    },
    routeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    routeTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      flex: 1,
    },
    routeTypeBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    trainBadge: {
      backgroundColor: '#37ab30',
    },
    busBadge: {
      backgroundColor: '#FF6B35',
    },
    routeTypeBadgeText: {
      fontSize: 14,
    },
    routeDescription: {
      fontSize: 13,
      color: isDarkMode ? '#b3b3b3' : '#737373',
      marginBottom: 8,
    },
    routeDetails: {
      flexDirection: 'row',
      gap: 16,
    },
    routeDetail: {
      fontSize: 13,
      color: isDarkMode ? '#b3b3b3' : '#666666',
    },
    noRoutesContainer: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    noRoutesText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#b3b3b3' : '#737373',
      marginBottom: 4,
    },
    noRoutesSubtext: {
      fontSize: 14,
      color: isDarkMode ? '#666666' : '#999999',
    },
    secondaryButton: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#e5e5e5',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 12,
    },
    secondaryButtonText: {
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      fontSize: 16,
      fontWeight: '600',
    },
    routeInfoGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    infoItem: {
      flex: 1,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      borderRadius: 12,
      padding: 12,
    },
    infoLabel: {
      fontSize: 12,
      color: isDarkMode ? '#b3b3b3' : '#737373',
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '700',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
    },
    halfButton: {
      flex: 1,
      marginTop: 0,
    },
    primaryButton: {
      backgroundColor: '#37ab30',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
