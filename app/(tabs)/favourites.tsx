import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { TransportRoute } from '@/services/api';
import { RootState } from '@/store';
import { removeFavourite } from '@/store/slices/favouritesSlice';
import { setSelectedRoute } from '@/store/slices/transportSlice';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function FavouritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: favourites } = useAppSelector((state: RootState) => state.favourites);
  const { isDarkMode } = useAppSelector((state: RootState) => state.theme);

  const styles = getStyles(isDarkMode);

  const handleCardPress = (item: TransportRoute) => {
    dispatch(setSelectedRoute(item));
    router.push({ pathname: '/details', params: { id: item.id } });
  };

  const handleRemoveFavourite = (id: string) => {
    dispatch(removeFavourite(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Favourites</Text>
          <Text style={styles.subtitle}>Your saved routes and destinations</Text>
        </View>
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Feather name="heart" size={60} color="#d0d0d0" />
          </View>
          <Text style={styles.emptyText}>No favourites yet</Text>
          <Text style={styles.emptySubtext}>
            Start exploring and add your favorite routes and destinations!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Text style={styles.exploreButtonText}>Explore Routes</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.countText}>{favourites.length} saved items</Text>
          
          {favourites.map((item: TransportRoute) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.typeContainer}>
                    {getTypeIcon(item.type).type === 'fa5' ? (
                      <FontAwesome5 name={getTypeIcon(item.type).name as any} size={10} color="#37ab30" />
                    ) : (
                      <Feather name={getTypeIcon(item.type).name as any} size={12} color="#37ab30" />
                    )}
                    <Text style={styles.typeText}>{item.type}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                {item.duration && (
                  <View style={styles.durationContainer}>
                    <Feather name="clock" size={12} color="#737373" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                  </View>
                )}
                {item.rating && (
                  <View style={styles.ratingContainer}>
                    <Feather name="star" size={12} color="#37ab30" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavourite(item.id)}
              >
                <Feather name="heart" size={22} color="#37ab30" />
              </TouchableOpacity>
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
    backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
  },
  countText: {
    fontSize: 14,
    color: isDarkMode ? '#a0a0a0' : '#737373',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
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
    width: 110,
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '500',
    color: '#37ab30',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  durationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#737373',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  removeButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(141, 21, 58, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#37ab30',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
});
