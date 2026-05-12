import HunterProfile from "@/components/player/HunterProfile";
import QuestCard from "@/components/quest/QuestCard";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useQuestStore } from "@/store/useQuestStore";
import { router, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const nav = useRouter();
  const { addXP, xp, xp_to_next_level } = usePlayerStore()

  // Render up to 3 quests from quest list
  const quests = useQuestStore(s => s.quests).slice(0, 3)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) nav.replace("/(auth)/login");
    }
    loadUser();
  }, [nav]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    nav.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.md, gap: theme.spacing.lg }}>

        <HunterProfile />

        {/* Active Quests */}
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 11,
              color: theme.colors.textDim,
              letterSpacing: 2,
            }}>
              ACTIVE QUESTS
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/QuestBoard')}>
              <Text style={{
                fontFamily: theme.fonts.display,
                fontSize: 10,
                color: theme.colors.purple,
                letterSpacing: 1,
              }}>
                VIEW ALL
              </Text>
            </Pressable>
          </View>

          {quests.length === 0 ? (
            <Text style={{ color: theme.colors.textDim, fontFamily: theme.fonts.body }}>
              No active quests
            </Text>
          ) : (
            quests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))
          )}
        </View>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.red,
            padding: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: theme.fonts.display,
            fontSize: 12,
            color: theme.colors.red,
            letterSpacing: 2,
          }}>
            LOGOUT
          </Text>
        </Pressable>

        {/* Dev only */}
        <Pressable onPress={() => addXP(xp_to_next_level - xp)} style={{ alignItems: 'center' }}>
          <Text style={{ color: theme.colors.textDim, fontSize: 11 }}>Force Level Up</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
