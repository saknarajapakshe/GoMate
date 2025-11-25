import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { TransportRoute } from '@/services/api';
import { toggleFavourite } from '@/store/slices/favouritesSlice';
import { fetchRouteById } from '@/store/slices/transportSlice';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedRoute, isLoading } = useAppSelector((state) => state.transport);
  const { items: favourites } = useAppSelector((state) => state.favourites);
  const { isDarkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (id) {
      dispatch(fetchRouteById(id));
    }
  }, [id]);

  const isFavourite = (routeId: string) => {
    return favourites.some((item: TransportRoute) => item.id === routeId);
  };

  const handleFavouritePress = () => {
    if (selectedRoute) {
      dispatch(toggleFavourite(selectedRoute));
    }
  };

  const styles = getStyles(isDarkMode);

  if (isLoading || !selectedRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#37ab30" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: selectedRoute.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={isDarkMode ? '#ffffff' : '#1a1a1a'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {/* Share functionality */}}
          >
            <Feather name="share-2" size={24} color={isDarkMode ? '#ffffff' : '#1a1a1a'} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.typeContainer}>
                {getTypeIcon(selectedRoute.type).type === 'fa5' ? (
                  <FontAwesome5 name={getTypeIcon(selectedRoute.type).name as any} size={14} color="#37ab30" />
                ) : (
                  <Feather name={getTypeIcon(selectedRoute.type).name as any} size={16} color="#37ab30" />
                )}
                <Text style={styles.typeText}>{selectedRoute.type}</Text>
              </View>
              <Text style={styles.title}>{selectedRoute.title}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getStatusColor(selectedRoute.status) }]}>
              <Text style={styles.badgeText}>{selectedRoute.status}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{selectedRoute.description}</Text>

          {/* Rating */}
          {selectedRoute.rating && (
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Feather
                    key={star}
                    name="star"
                    size={18}
                    color={star <= Math.floor(selectedRoute.rating!) ? '#37ab30' : '#e0e0e0'}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>
                {selectedRoute.rating} ({selectedRoute.reviews} reviews)
              </Text>
            </View>
          )}

          {/* Route Information */}
          {(selectedRoute.origin || selectedRoute.destination) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Route Information</Text>
              <View style={styles.routeCard}>
                {selectedRoute.origin && (
                  <View style={styles.routePoint}>
                    <View style={styles.routeDotStart} />
                    <View style={styles.routePointContent}>
                      <Text style={styles.routeLabel}>From</Text>
                      <Text style={styles.routeValue}>{selectedRoute.origin}</Text>
                    </View>
                  </View>
                )}
                {selectedRoute.origin && selectedRoute.destination && (
                  <View style={styles.routeLine} />
                )}
                {selectedRoute.destination && (
                  <View style={styles.routePoint}>
                    <View style={styles.routeDotEnd} />
                    <View style={styles.routePointContent}>
                      <Text style={styles.routeLabel}>To</Text>
                      <Text style={styles.routeValue}>{selectedRoute.destination}</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Trip Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip Details</Text>
            <View style={styles.detailsGrid}>
              {selectedRoute.duration && (
                <View style={styles.detailCard}>
                  <Feather name="clock" size={24} color="#37ab30" />
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{selectedRoute.duration}</Text>
                </View>
              )}
              {selectedRoute.price && (
                <View style={styles.detailCard}>
                  <Feather name="tag" size={24} color="#37ab30" />
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={styles.detailValue}>{selectedRoute.price}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Schedule */}
          {selectedRoute.schedule && selectedRoute.schedule.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Schedule</Text>
              <View style={styles.scheduleGrid}>
                {selectedRoute.schedule.map((time: string, index: number) => (
                  <View key={index} style={styles.scheduleItem}>
                    <Feather name="clock" size={14} color="#737373" />
                    <Text style={styles.scheduleTime}>{time}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.favouriteButton,
            isFavourite(selectedRoute.id) && styles.favouriteButtonActive,
          ]}
          onPress={handleFavouritePress}
        >
          <Feather
            name="heart"
            size={24}
            color={isFavourite(selectedRoute.id) ? '#37ab30' : '#737373'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Feather name="arrow-right" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#37ab30',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    lineHeight: 30,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    lineHeight: 24,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
    borderRadius: 16,
    padding: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDotStart: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#37ab30',
    marginRight: 16,
  },
  routeDotEnd: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#37ab30',
    marginRight: 16,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: isDarkMode ? '#333333' : '#d0d0d0',
    marginLeft: 6,
    marginVertical: 4,
  },
  routePointContent: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    marginBottom: 2,
  },
  routeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  detailCard: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    textAlign: 'center',
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
    borderRadius: 12,
  },
  scheduleTime: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 30,
    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? '#333333' : '#f0f0f0',
  },
  favouriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  favouriteButtonActive: {
    backgroundColor: 'rgba(141, 21, 58, 0.1)',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37ab30',
    borderRadius: 16,
    paddingVertical: 18,
    gap: 8,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
