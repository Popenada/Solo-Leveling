// Pop up modal that uses data from workout database
import ProgressBar from "@/components/ui/ProgressBar";
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { saveHunterProfile, saveQuests, saveWorkouts } from "@/lib/hunter";
import { supabase } from "@/lib/supabase";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useQuestStore } from "@/store/useQuestStore";
import { useWorkoutStore } from "@/store/useWorkoutStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from 'react-native';
export default function WorkoutDetail() {
    const [started, setStarted] = useState(false)

    const setCompletedToday = usePlayerStore(s => s.setCompletedToday)
    // Declare UsePlayerStore functions to add stats on completion of quests
    const addStats = usePlayerStore(s => s.addStats)
    const addXP = usePlayerStore(s => s.addXP)
    const addQuestCount = usePlayerStore(s => s.addQuestCount)
    // Declare UseQuestStore functions to be passed into component of modal
    const completeQuest = useQuestStore(s => s.completeQuest)
    const updateQuestProgress = useQuestStore(s => s.updateQuestProgress)
    const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

    // Store workout by retrieving and calling function to identify quest id to hardcoded constant quests
    const getWorkoutByQuestId = useWorkoutStore(s => s.getWorkoutByQuestId)
    const { id } = useLocalSearchParams()
    // Fetch workout corresponding via quest id
    const workout = getWorkoutByQuestId(id as string)

    if (!workout) return <View style={{flex:1, backgroundColor: 'red'}}><Text>not found: {String(id)}</Text></View>
    const progress = (completedExercises.size / workout.exercises.length) * 100

    return (
        
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
            <View style={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}>

                {/* Header */}
                <View style={{ gap: theme.spacing.xs }}>
                    <Text variant="label" style={{ color: theme.colors.purple}}>
                        RANK {workout.difficulty}
                    </Text>
                    <Text variant="heading">{workout.timeRemaining} MINUTES ESTIMATED</Text>
                </View>

                {/* Exercises */}
                {workout.exercises.map((ex, i) => (
                    <View key={i} style={{
                    backgroundColor: theme.colors.card,
                    borderRadius: theme.radius.md,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    padding: theme.spacing.md,
                    gap: theme.spacing.xs,
                }}>
                    <Text variant="heading">{ex.name}</Text>
                    <Text variant="caption">{ex.sets} sets × {ex.reps} reps</Text>
                    <Text variant="caption" style={{ color: theme.colors.textDim }}>
                        {ex.restSeconds}s rest
                    </Text>
                    </View>
                ))}
                
                {/* Stat Rewards */}
                <View style={{ gap: theme.spacing.xs }}>
                    <Text variant="label" style={{ color: theme.colors.gold }}>STAT REWARDS</Text>
                        {workout.statRewards.STR && (
                    <Text variant="caption">STR +{workout.statRewards.STR}</Text>
                )}
                    {workout.statRewards.AGI && (
                    <Text variant="caption">AGI +{workout.statRewards.AGI}</Text>
                )}
                    {workout.statRewards.INT && (
                    <Text variant="caption">END +{workout.statRewards.INT}</Text>
                )}
                </View>
                
                {/* Begin / Checklist */}
                {started ? (
                    <View style={{ gap: theme.spacing.md }}>
                        <ProgressBar progress={progress} color={theme.colors.purple} />
                        {workout.exercises.map((ex, i) => (
                            <Pressable
                                key={i}
                                onPress={() => {
                                    setCompletedExercises(prev => {
                                        const next = new Set(prev)
                                        next.has(i) ? next.delete(i) : next.add(i)
                                        const newProgress = (next.size / workout.exercises.length) * 100

                                        // Render workout detail first before calling updateQuest so doesn't trigger zustand state update preventing double render
                                        setTimeout(() => updateQuestProgress(id as string, newProgress), 0)
                                        return next
                                    })
                                }}
                                style={{
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.radius.md,
                                    borderWidth: 1,
                                    borderColor: completedExercises.has(i) ? theme.colors.purple : theme.colors.border,
                                    padding: theme.spacing.md,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: theme.spacing.md,
                                }}
                            >
                                <Text style={{ color: completedExercises.has(i) ? theme.colors.purple : theme.colors.textDim }}>
                                    {completedExercises.has(i) ? '✓' : '○'}
                                </Text>
                                <Text variant="heading">{ex.name}</Text>
                            </Pressable>
                        ))}
                        
                        {/* Complete Button */}
                        {progress === 100 && (
                            <Pressable
                                onPress={async () => {
                                    addStats({
                                        STR: workout.statRewards.STR,
                                        AGI: workout.statRewards.AGI,
                                        INT: workout.statRewards.INT,
                                        VIT: workout.statRewards.VIT,
                                    })
                                    addXP(workout.xpReward)
                                    completeQuest(id as string)
                                    addQuestCount()
                                    setCompletedToday(true)
                                    // Declare state of player using usePlayerStore
                                    const state = usePlayerStore.getState()
                                    const quests = useQuestStore.getState().quests
                                    const workouts = useWorkoutStore.getState().workouts
                                    const { data: { user } } = await supabase.auth.getUser()
                                    await saveHunterProfile(user!.id, state)
                                    await saveQuests(user!.id, quests)
                                    await saveWorkouts(user!.id, workouts)
                                    router.back()
                                }}
                                style={{
                                    backgroundColor: theme.colors.gold,
                                    borderRadius: theme.radius.md,
                                    padding: theme.spacing.md,
                                    alignItems: 'center',
                                }}
                            >
                                <Text variant="heading" style={{ color: theme.colors.bg }}>COMPLETE MISSION</Text>
                            </Pressable>
                        )}
                    </View>
                ) : (
                    <Pressable onPress={() => setStarted(true)} style={{
                        backgroundColor: theme.colors.purple,
                        borderRadius: theme.radius.md,
                        padding: theme.spacing.md,
                        alignItems: 'center',
                    }}>
                        <Text variant="heading" style={{ color: theme.colors.text }}>BEGIN MISSION</Text>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    )
}