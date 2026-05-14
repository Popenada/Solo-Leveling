import Alert from "@/components/ui/Alert";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { loginUser } from "@/lib/auth";
import { fetchHunterProfile, fetchQuests, fetchWorkouts } from "@/lib/hunter";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useQuestStore } from "@/store/useQuestStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LoginScreen() {
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ visible: false, title: '', message: '' })
  const showAlert = (title: string, message: string) => 
  setAlert({ visible: true, title, message })

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({ visible: true, title: 'Error', message: "Please fill all fields"})
      return;
    }

    try {
      setLoading(true);
      // result variable returns user information from loginUser method from /lib/auth
      const result = await loginUser(email, password);

      // Check if user information exists
      if (!result?.user || !result?.session) {
        setAlert({ visible: true, title: 'Login failed', message: "No active session returned from login"})
        return;
      }
      
      // Create profile state from hunter API call fetch from loadProfile information id
      // Fetches hunter profile information from supabase to be passed to userPlayerStore to match unique id to player data
      const profile = await fetchHunterProfile(result.user.id)
      const quests = await fetchQuests(result.user.id)
      const workouts = await fetchWorkouts(result.user.id)
      //console.log('profile fetched: ', profile)
      console.log('quests fetched: ', quests)
      usePlayerStore.getState().loadProfile(profile)
      useQuestStore.getState().loadQuests(quests)
      useWorkoutStore.getState().loadWorkouts(workouts)
      router.replace("/(tabs)/QuestBoard");
    } catch (err: any) {
      if (err.code === 'invalid_credentials'){
        setAlert({ visible: true, title: 'Login failed', message: "Invalid email or username"})
      } else if (err.code === 'over_email_send_rate_limit') {
        setAlert( { visible: true, title: "Too many attempts", message: "Please wait before trying again"})
      } else {
        setAlert( { visible: true, title: "Login failed", message: err.message})
      }
    } finally {
      setLoading(false);
    }
  };

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
            WELCOME BACK
          </Text>
          <Text style={{
            fontFamily: theme.fonts.body,
            fontSize: 14,
            color: theme.colors.textDim,
            letterSpacing: 1,
          }}>
            Hunter, your journey awaits
          </Text>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={theme.colors.textDim}
          style={{
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 15,
          }}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.colors.textDim}
          style={{
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            fontSize: 15,
          }}
        />

        <Pressable
          onPress={handleLogin}
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
              ENTER GATE
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/register")} style={{ alignItems: 'center' }}>
          <Text style={{
            fontFamily: theme.fonts.body,
            fontSize: 13,
            color: theme.colors.purpleLight,
            letterSpacing: 1,
          }}>
            No account? Register as Hunter
          </Text>
        </Pressable>
        
      </View>
      <Alert
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(a => ({ ...a, visible: false }))}
        />
    </SafeAreaView>
  );
}
