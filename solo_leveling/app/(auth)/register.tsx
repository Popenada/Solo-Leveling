import Alert from "@/components/ui/Alert";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { registerUser } from "@/lib/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ visible: false, title: '', message: '' })
  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setAlert({visible: true, title: 'Error', message: "Please fll all fields"})
      return;
    }

    if (password !== confirmPassword) {
      setAlert({visible: true, title: "Error", message: "Passwords do not match"})
      return;
    }

    if (password.length < 6) {
      setAlert({visible: true, title: "Error", message: "Password must be at least 6 characters"})
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(email, password, username);

      if (result?.needsEmailConfirmation) {
        setAlert({visible: true, title: "Confirm Email", message: "Email needs confirmation"})
      } else {
        setAlert({visible: true, title: "Success", message: "Account created!"})
        router.replace("/(tabs)/Profile");
      }
    } catch (err: any) {
      setAlert({visible: true, title: "Registration failed", message: "Something went wrong"})
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
    fontSize: 15,
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: theme.spacing.lg, gap: theme.spacing.md }}>

        <View style={{ gap: theme.spacing.xs, marginBottom: theme.spacing.md }}>
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 28,
            fontWeight: '900',
            color: theme.colors.text,
            letterSpacing: 2,
          }}>
            ARISE
          </Text>
          <Text style={{
            fontFamily: theme.fonts.body,
            fontSize: 14,
            color: theme.colors.textDim,
            letterSpacing: 1,
          }}>
            Create your hunter profile
          </Text>
        </View>

        <TextInput
          placeholder="Hunter Name"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={theme.colors.textDim}
          style={inputStyle}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={theme.colors.textDim}
          style={inputStyle}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.colors.textDim}
          style={inputStyle}
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor={theme.colors.textDim}
          style={inputStyle}
        />

        <Pressable
          onPress={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: theme.colors.purple,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            alignItems: 'center',
            ...theme.shadows.purple,
          }}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.text} />
          ) : (
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 14,
              fontWeight: '700',
              color: theme.colors.text,
              letterSpacing: 2,
            }}>
              BEGIN JOURNEY
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/login")} style={{ alignItems: 'center' }}>
          <Text style={{
            fontFamily: theme.fonts.body,
            fontSize: 13,
            color: theme.colors.purpleLight,
            letterSpacing: 1,
          }}>
            Already a hunter? Login
          </Text>
        </Pressable>

      </View>
      {/* Alert message component */}
      <Alert
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(a => ({ ...a, visible: false }))}
      />
    </SafeAreaView>
  );
}
