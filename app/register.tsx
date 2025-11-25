import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { clearError, register as registerUser } from '@/store/slices/authSlice';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

// Validation schema
const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type RegisterFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(clearError());
    const result = await dispatch(
      registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
    if (registerUser.fulfilled.match(result)) {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather name="user-plus" size={40} color="#ffffff" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join GoMate and start your journey</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={18} color="#54c502" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          {/* Name Row */}
          <View style={styles.nameRow}>
            {/* First Name */}
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>First Name</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputWrapper, errors.firstName && styles.inputError]}>
                    <TextInput
                      style={styles.input}
                      placeholder="First"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                  </View>
                )}
              />
              {errors.firstName && (
                <Text style={styles.errorMessage}>{errors.firstName.message}</Text>
              )}
            </View>

            {/* Last Name */}
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Last Name</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputWrapper, errors.lastName && styles.inputError]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Last"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                  </View>
                )}
              />
              {errors.lastName && (
                <Text style={styles.errorMessage}>{errors.lastName.message}</Text>
              )}
            </View>
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.username && styles.inputError]}>
                  <Feather name="at-sign" size={20} color="#737373" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Choose a username"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            {errors.username && (
              <Text style={styles.errorMessage}>{errors.username.message}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <Feather name="mail" size={20} color="#737373" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                  <Feather name="lock" size={20} color="#737373" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#737373"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password.message}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                  <Feather name="lock" size={20} color="#737373" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Feather
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#737373"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorMessage}>{errors.confirmPassword.message}</Text>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text style={styles.registerButtonText}>Create Account</Text>
                <Feather name="arrow-right" size={20} color="#ffffff" />
              </>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#54c502',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#737373',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(141, 21, 58, 0.1)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  errorText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#54c502',
    flex: 1,
  },
  form: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#54c502',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a1a',
  },
  errorMessage: {
    marginTop: 4,
    fontSize: 12,
    color: '#54c502',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54c502',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    gap: 8,
  },
  registerButtonDisabled: {
    backgroundColor: '#c4879a',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    color: '#737373',
  },
  linkText: {
    fontSize: 15,
    color: '#54c502',
    fontWeight: '700',
  },
});
