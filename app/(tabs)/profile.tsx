import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from '@/store/slices/authSlice';
import { toggleDarkMode } from '@/store/slices/themeSlice';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const { items: favourites } = useAppSelector((state) => state.favourites);
  const { isDarkMode } = useAppSelector((state) => state.theme);

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace('/login');
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Feather name="user" size={40} color="#ffffff" />
            </View>
          )}
        </View>
        <Text style={styles.name}>{user?.name || 'Traveler'}</Text>
        <Text style={styles.email}>{user?.email || 'traveler@gomate.lk'}</Text>
        <Text style={styles.username}>@{user?.username || 'traveler'}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={14} color="#54c502" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Feather name="navigation" size={20} color="#54c502" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statCard}>
          <Feather name="map" size={20} color="#86da18" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Routes</Text>
        </View>
        <View style={styles.statCard}>
          <Feather name="heart" size={20} color="#86da18" />
          <Text style={styles.statNumber}>{favourites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        {/* Dark Mode Toggle */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#1a1a1a' }]}>
              <Feather name="moon" size={18} color="#ffffff" />
            </View>
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#e5e5e5', true: '#54c502' }}
            thumbColor={isDarkMode ? '#86da18' : '#f4f3f4'}
          />
        </View>

        {/* Notifications */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#86da18' }]}>
              <Feather name="bell" size={18} color="#ffffff" />
            </View>
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#737373" />
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#86da18' }]}>
              <Feather name="globe" size={18} color="#ffffff" />
            </View>
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>English</Text>
            <Feather name="chevron-right" size={20} color="#737373" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        {/* Help */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#86da18' }]}>
              <Feather name="help-circle" size={18} color="#1a1a1a" />
            </View>
            <Text style={styles.settingLabel}>Help & FAQ</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#737373" />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#54c502' }]}>
              <Feather name="info" size={18} color="#ffffff" />
            </View>
            <Text style={styles.settingLabel}>About GoMate</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#737373" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => router.push('/settings')}
        >
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: '#737373' }]}>
              <Feather name="settings" size={18} color="#ffffff" />
            </View>
            <Text style={styles.settingLabel}>Settings</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#737373" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>GoMate v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2025 GoMate Sri Lanka</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#54c502',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
    color: '#54c502',
    fontWeight: '500',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#54c502',
    gap: 6,
  },
  editButtonText: {
    color: '#54c502',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#737373',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#737373',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: '#737373',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#a0a0a0',
  },
});
