import CreateQuestModal from "@/components/quest/CreateQuestModal";
import QuestList from "@/components/quest/QuestList";
import LevelUp from "@/components/effects/LevelUp";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { useQuestStore } from "@/store/useQuestStore";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function QuestBoardScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const lastDailyReset = useQuestStore(s => s.lastDailyReset)
  const lastWeeklyReset = useQuestStore(s => s.lastWeeklyReset)
  const [dailyTimeLeft, setDailyTimeLeft] = useState('')
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState('')
  const checkAndReset = useQuestStore(s => s.checkAndReset)

  const formatCountdown = (diff: number) => {
    if (diff <= 0) return '00:00:00'
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  useEffect(() => {
    const tick = () => {
      const dailyDiff = lastDailyReset + 24 * 60 * 60 * 1000 - Date.now()
      const weeklyDiff = lastWeeklyReset + 7 * 24 * 60 * 60 * 1000 - Date.now()

      // If dailyDiff and weeklyDiff hit 0 checkAndReset quests not just in layout
      if (dailyDiff <= 0 || weeklyDiff <= 0) checkAndReset()
      setDailyTimeLeft(formatCountdown(dailyDiff))
      setWeeklyTimeLeft(formatCountdown(weeklyDiff))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [lastDailyReset, lastWeeklyReset])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing.md,
          paddingBottom: 0,
        }}>
          <View style={{ gap: 2 }}>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 16,
              fontWeight: '700',
              color: theme.colors.text,
              letterSpacing: 2,
            }}>
              QUEST BOARD
            </Text>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 9,
              color: theme.colors.textDim,
              letterSpacing: 1,
            }}>
              DAILY {dailyTimeLeft}
            </Text>
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 9,
              color: theme.colors.purple,
              letterSpacing: 1,
            }}>
              WEEKLY {weeklyTimeLeft}
            </Text>
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: theme.colors.purple,
              borderRadius: theme.radius.sm,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              ...theme.shadows.purple,
            }}
          >
            <Text style={{
              fontFamily: theme.fonts.display,
              fontSize: 12,
              fontWeight: '700',
              color: theme.colors.text,
              letterSpacing: 1,
            }}>
              + NEW
            </Text>
          </Pressable>
        </View>

        <QuestList />
      </View>

      <CreateQuestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <LevelUp />
    </SafeAreaView>
  );
}
