import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    all: true,
    push: true,
    email: false,
  });
  const [language, setLanguage] = useState('English');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e5e5e5', true: '#54c502' }}
              thumbColor={darkMode ? '#86da18' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>All Notifications</Text>
            <Switch
              value={notifications.all}
              onValueChange={(value) =>
                setNotifications({ ...notifications, all: value })
              }
              trackColor={{ false: '#e5e5e5', true: '#54c502' }}
              thumbColor={notifications.all ? '#86da18' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications.push}
              onValueChange={(value) =>
                setNotifications({ ...notifications, push: value })
              }
              trackColor={{ false: '#e5e5e5', true: '#54c502' }}
              thumbColor={notifications.push ? '#86da18' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={notifications.email}
              onValueChange={(value) =>
                setNotifications({ ...notifications, email: value })
              }
              trackColor={{ false: '#e5e5e5', true: '#54c502' }}
              thumbColor={notifications.email ? '#86da18' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <TouchableOpacity style={styles.languageOption}>
            <View style={styles.radioOuter}>
              {language === 'English' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageOption}>
            <View style={styles.radioOuter}>
              {language === 'Sinhala' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.languageText}>සිංහල (Sinhala)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageOption}>
            <View style={styles.radioOuter}>
              {language === 'Tamil' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.languageText}>தமிழ் (Tamil)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backIcon: {
    fontSize: 28,
    color: '#1a1a1a',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#54c502',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#54c502',
  },
  languageText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  arrow: {
    fontSize: 24,
    color: '#737373',
  },
  versionText: {
    fontSize: 16,
    color: '#737373',
  },
});
