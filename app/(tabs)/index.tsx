import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { TransportRoute } from '@/services/api';
import { RootState } from '@/store';
import { toggleFavourite } from '@/store/slices/favouritesSlice';
import { fetchBuses, fetchDestinations, fetchTrains, setSelectedRoute } from '@/store/slices/transportSlice';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
  { label: 'Buses', icon: 'bus' as const, type: 'fa5' as const },
  { label: 'Trains', icon: 'train' as const, type: 'fa5' as const },
  { label: 'Destinations', icon: 'map-pin' as const, type: 'feather' as const },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return '#37ab30';
    case 'Popular':
      return '#37ab30';
    case 'Upcoming':
      return '#37ab30';
    default:
      return '#737373';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bus':
      return { name: 'bus', type: 'fa5' };
    case 'train':
      return { name: 'train', type: 'fa5' };
    case 'destination':
      return { name: 'map-pin', type: 'feather' };
    default:
      return { name: 'circle', type: 'feather' };
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Buses');
  const [refreshing, setRefreshing] = useState(false);

  const { buses, trains, destinations, isLoading } = useAppSelector((state: RootState) => state.transport);
  const { items: favourites } = useAppSelector((state: RootState) => state.favourites);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { isDarkMode } = useAppSelector((state: RootState) => state.theme);

  const styles = getStyles(isDarkMode);

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
    return favourites.some((item: { id: string }) => item.id === id);
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
        
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TAB_OPTIONS.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, activeTab === tab.label && styles.tabActive]}
            onPress={() => setActiveTab(tab.label)}
          >
            {tab.type === 'fa5' ? (
              <FontAwesome5 
                name={tab.icon} 
                size={14} 
                color={activeTab === tab.label ? '#ffffff' : '#737373'} 
                style={styles.tabIcon}
              />
            ) : (
              <Feather 
                name={tab.icon as any} 
                size={16} 
                color={activeTab === tab.label ? '#ffffff' : '#737373'} 
                style={styles.tabIcon}
              />
            )}
            <Text style={[styles.tabText, activeTab === tab.label && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {isLoading && data.length === 0 ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#37ab30" />
          <Text style={styles.loadingText}>Loading {activeTab.toLowerCase()}...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#37ab30']} />
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
                  color={isFavourite(item.id) ? '#37ab30' : '#ffffff'}
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
                    {getTypeIcon(item.type).type === 'fa5' ? (
                      <FontAwesome5 name={getTypeIcon(item.type).name as any} size={10} color="#37ab30" />
                    ) : (
                      <Feather name={getTypeIcon(item.type).name as any} size={12} color="#37ab30" />
                    )}
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
                      <Feather name="star" size={12} color="#37ab30" />
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

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#f8f8f8',
  },
  header: {
    backgroundColor: '#37ab30',
    paddingTop: 55,
    paddingBottom: 35,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#f8f8f8',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    borderWidth: 1,
    borderColor: isDarkMode ? '#333333' : '#d0d0d0',
  },
  tabActive: {
    backgroundColor: '#37ab30',
    borderColor: '#37ab30',
  },
  tabIcon: {
    marginRight: 5,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: isDarkMode ? '#a0a0a0' : '#333333',
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
    color: isDarkMode ? '#a0a0a0' : '#737373',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#f8f8f8',
    paddingTop: 16,
  },
  card: {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  cardDescription: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
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
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#e8f5e9',
  },
  typeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#37ab30',
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
