// Pop up modal that uses data from workout database
import Text from "@/components/ui/Text";
import { theme } from "@/constants/theme";
import { WORKOUTS } from "@/constants/workouts";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from 'react-native';
export default function WorkoutDetail() {
    // Looks up quest id from url when router.push({quest.id}) is passed to url
    // Take id from url
    const { id } = useLocalSearchParams()
    console.log('workout id received:', id)

    const workout = WORKOUTS.find(w => w.questId === id)
    console.log('workout found:', workout)

    if (!workout) return <View style={{flex:1, backgroundColor: 'red'}}><Text>not found: {String(id)}</Text></View>

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
            <View style={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}>

                {/* Header */}
                <View style={{ gap: theme.spacing.xs }}>
                    <Text variant="label" style={{ color: theme.colors.purple}}>
                        RANK {workout.difficulty}
                    </Text>
                    <Text variant="heading">{workout.timeRemaining} MINUTES REMAINING</Text>
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
                        {workout.statRewards.strength && (
                    <Text variant="caption">STR +{workout.statRewards.strength}</Text>
                )}
                    {workout.statRewards.agility && (
                    <Text variant="caption">AGI +{workout.statRewards.agility}</Text>
                )}
                    {workout.statRewards.vitality && (
                    <Text variant="caption">END +{workout.statRewards.vitality}</Text>
                )}
                </View>
                {/* Begin Button */}
                <Pressable onPress={() => {}} style={{
                    backgroundColor: theme.colors.purple,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.md,
                    alignItems: 'center',
                }}>
                <Text variant="heading" style={{ color: theme.colors.text }}>BEGIN MISSION</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}