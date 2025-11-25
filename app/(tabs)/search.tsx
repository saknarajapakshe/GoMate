
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { TransportRoute } from '@/services/api';
import { RootState } from '@/store';
import { toggleFavourite } from '@/store/slices/favouritesSlice';
import { searchRoutes, setSelectedRoute } from '@/store/slices/transportSlice';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,

  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FILTER_OPTIONS = [

  { label: 'All', icon: 'grid' as const },
  { label: 'Popular', icon: 'trending-up' as const },
  { label: 'Nearby', icon: 'map-pin' as const },
  { label: 'Timetables', icon: 'clock' as const },
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

export default function SearchScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const { searchResults, isLoading } = useAppSelector((state: RootState) => state.transport);
  const { items: favourites } = useAppSelector((state: RootState) => state.favourites);
  const { isDarkMode } = useAppSelector((state: RootState) => state.theme);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    // Load initial data
    dispatch(searchRoutes({ query: '', filter: 'All' }));
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(searchRoutes({ query: searchQuery, filter: activeFilter }));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilter]);

  const handleCardPress = (item: TransportRoute) => {
    dispatch(setSelectedRoute(item));
    router.push({ pathname: '/details', params: { id: item.id } });
  };

  const handleFavouritePress = (item: TransportRoute) => {
    dispatch(toggleFavourite(item));
  };

  const isFavourite = (id: string) => {
    return favourites.some((item: TransportRoute) => item.id === id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>

            <Feather name="arrow-left" size={20} color="#ffffff" />

          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
        </View>
        
        {/* Search Input */}
        <View style={styles.searchInputContainer}>

          <Feather name="search" size={18} color="#999" style={styles.searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search routes, destinations..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={18} color="#999" />
            </TouchableOpacity>
          )}

        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter.label}

            style={[styles.filterChip, activeFilter === filter.label && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.label)}
          >
            <Feather
              name={filter.icon}
              size={14}
              color={activeFilter === filter.label ? '#ffffff' : '#333333'}
              style={styles.filterIcon}
            />
            <Text style={[styles.filterText, activeFilter === filter.label && styles.filterTextActive]}>

              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {/* Results */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* View Map Banner */}
        <TouchableOpacity style={styles.mapBanner} onPress={() => router.push('/map')}>
          <View>
            <Text style={styles.mapBannerTitle}>View Map</Text>
            <Text style={styles.mapBannerSubtitle}>See all routes and stops on the map</Text>
          </View>
          <View style={styles.mapIconContainer}>

            <Feather name="map" size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Search Results' : 'Quick Results'}
          </Text>
          <Text style={styles.resultsCount}>{searchResults.length} found</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#37ab30" />
          </View>
        ) : searchResults.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="search" size={48} color="#d0d0d0" />
            <Text style={styles.emptyText}>No results found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        ) : (
          searchResults.map((item: TransportRoute) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultCard}
              onPress={() => handleCardPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.resultImage} />
              <View style={styles.resultContent}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <TouchableOpacity onPress={() => handleFavouritePress(item)}>
                    <Feather
                      name="heart"
                      size={18}
                      color={isFavourite(item.id) ? '#37ab30' : '#d0d0d0'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.resultSubtitle} numberOfLines={1}>{item.description}</Text>
                <View style={styles.resultFooter}>
                  <View style={styles.typeBadge}>
                    {getTypeIcon(item.type).type === 'fa5' ? (
                      <FontAwesome5 name={getTypeIcon(item.type).name as any} size={9} color="#37ab30" />
                    ) : (
                      <Feather name={getTypeIcon(item.type).name as any} size={10} color="#37ab30" />
                    )}
                    <Text style={styles.typeText}>{item.type}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={styles.bottomSpacer} />

      </ScrollView>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
  },
  header: {
    backgroundColor: '#37ab30',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,


  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },


  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 1,
    height: 50,
  },
  searchIcon: {


    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
  },
  filterContainer: {

    flexGrow: 0,
    marginTop: 16,
    marginBottom: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

  },
  filterChip: {
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
  filterChipActive: {
    backgroundColor: '#37ab30',
    borderColor: '#37ab30',
  },
  filterIcon: {

    marginRight: 5,

  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',

    color: isDarkMode ? '#a0a0a0' : '#333333',

  },
  filterTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#37ab30',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  mapBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  mapBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mapIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',

    color: isDarkMode ? '#ffffff' : '#1a1a1a',
  },
  resultsCount: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    marginTop: 4,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: isDarkMode ? '#333333' : '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultImage: {
    width: 100,
    height: 100,
    backgroundColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
  },
  resultContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginRight: 8,
  },
  resultSubtitle: {
    fontSize: 13,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(84, 197, 2, 0.1)',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#37ab30',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },

  bottomSpacer: {
    height: 20,
  },
});

