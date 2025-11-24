import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const FILTER_OPTIONS = ['All', 'Popular', 'Nearby', 'Timetables'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search routes, destinations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚌</Text>
          </View>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>Colombo - Galle Highway</Text>
            <Text style={styles.resultSubtitle}>Express Bus · 2h 30min</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚂</Text>
          </View>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>Kandy - Ella Scenic</Text>
            <Text style={styles.resultSubtitle}>Train · 6h 45min</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏖️</Text>
          </View>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>Mirissa Beach</Text>
            <Text style={styles.resultSubtitle}>Destination · South Coast</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mapPreview}>
          <Text style={styles.mapText}>🗺️ View on Map</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#8D153A',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FDB913',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#737373',
  },
  mapPreview: {
    backgroundColor: '#00534E',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
