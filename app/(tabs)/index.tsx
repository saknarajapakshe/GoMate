import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { TransportRoute } from '@/services/api';
import { toggleFavourite } from '@/store/slices/favouritesSlice';
import { fetchBuses, fetchDestinations, fetchTrains, setSelectedRoute } from '@/store/slices/transportSlice';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TAB_OPTIONS = [
  { label: 'Buses', icon: 'truck' as const },
  { label: 'Trains', icon: 'navigation' as const },
  { label: 'Destinations', icon: 'map-pin' as const },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return '#86da18';
    case 'Popular':
      return '#54c502';
    case 'Upcoming':
      return '#86da18';
    default:
      return '#737373';
  }
};

const getTypeIcon = (type: string): keyof typeof Feather.glyphMap => {
  switch (type) {
    case 'bus':
      return 'truck';
    case 'train':
      return 'navigation';
    case 'destination':
      return 'map-pin';
    default:
      return 'circle';
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Buses');
  const [refreshing, setRefreshing] = useState(false);

  const { buses, trains, destinations, isLoading } = useAppSelector((state) => state.transport);
  const { items: favourites } = useAppSelector((state) => state.favourites);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([
      dispatch(fetchBuses()),
      dispatch(fetchTrains()),
      dispatch(fetchDestinations()),
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getCurrentData = (): TransportRoute[] => {
    switch (activeTab) {
      case 'Buses':
        return buses;
      case 'Trains':
        return trains;
      case 'Destinations':
        return destinations;
      default:
        return [];
    }
  };

  const handleCardPress = (item: TransportRoute) => {
    dispatch(setSelectedRoute(item));
    router.push({ pathname: '/details', params: { id: item.id } });
  };

  const handleFavouritePress = (item: TransportRoute) => {
    dispatch(toggleFavourite(item));
  };

  const isFavourite = (id: string) => {
    return favourites.some(item => item.id === id);
  };

  const data = getCurrentData();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Traveler'}! 👋</Text>
          <Text style={styles.subtitle}>Where would you like to go today?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
          <Feather name="settings" size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TAB_OPTIONS.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, activeTab === tab.label && styles.tabActive]}
            onPress={() => setActiveTab(tab.label)}
          >
            <Feather 
              name={tab.icon} 
              size={16} 
              color={activeTab === tab.label ? '#ffffff' : '#737373'} 
              style={styles.tabIcon}
            />
            <Text style={[styles.tabText, activeTab === tab.label && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {isLoading && data.length === 0 ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#54c502" />
          <Text style={styles.loadingText}>Loading {activeTab.toLowerCase()}...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#54c502']} />
          }
        >
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <TouchableOpacity
                style={styles.favouriteButton}
                onPress={() => handleFavouritePress(item)}
              >
                <Feather
                  name="heart"
                  size={20}
                  color={isFavourite(item.id) ? '#54c502' : '#ffffff'}
                />
              </TouchableOpacity>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardDescription} numberOfLines={1}>{item.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.typeTag}>
                    <Feather name={getTypeIcon(item.type)} size={12} color="#54c502" />
                    <Text style={styles.typeText}>{item.type}</Text>
                  </View>
                  {item.duration && (
                    <View style={styles.durationTag}>
                      <Feather name="clock" size={12} color="#737373" />
                      <Text style={styles.durationText}>{item.duration}</Text>
                    </View>
                  )}
                  {item.rating && (
                    <View style={styles.ratingTag}>
                      <Feather name="star" size={12} color="#86da18" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  tabActive: {
    backgroundColor: '#54c502',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#737373',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e0e0e0',
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(141, 21, 58, 0.1)',
  },
  typeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#54c502',
    textTransform: 'capitalize',
  },
  durationTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#737373',
  },
  ratingTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bottomSpacer: {
    height: 20,
  },
});
