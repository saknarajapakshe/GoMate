import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FavouritesScreen() {
  const favourites = [
    { id: 1, title: 'Colombo - Kandy', type: 'Bus', emoji: '🚌' },
    { id: 2, title: 'Ella - Colombo', type: 'Train', emoji: '🚂' },
    { id: 3, title: 'Galle Beach', type: 'Destination', emoji: '🏖️' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
        <Text style={styles.subtitle}>Your saved routes and destinations</Text>
      </View>

      <ScrollView style={styles.content}>
        {favourites.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.emoji}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardType}>{item.type}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeIcon}>❤️</Text>
            </TouchableOpacity>
          </View>
        ))}

        {favourites.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⭐</Text>
            <Text style={styles.emptyText}>No favourites yet</Text>
            <Text style={styles.emptySubtext}>Start adding your favorite routes!</Text>
          </View>
        )}
      </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#737373',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDB913',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    color: '#737373',
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    fontSize: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#737373',
  },
});
