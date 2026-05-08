import Text from '@/components/ui/Text'
import { theme } from '@/constants/theme'
import { useQuestStore } from '@/store/useQuestStore'
import { useWorkoutStore } from '@/store/useWorkoutStore'
import type { Quest } from '@/types/Quest'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native'

type QuestType = Quest['type']

const TYPES: QuestType[] = ['daily', 'weekly', 'special', 'penalty']
const TYPE_COLORS: Record<QuestType, string> = {
    daily: '#06d6e8',
    weekly: '#7F77DD',
    special: '#f5c842',
    penalty: '#ff4757',
}
const ICONS = ['⚔️', '🏋️', '🏃', '🧘', '💪', '🥊', '🚴', '🤸', '🏊', '🎯']

interface ExerciseInput {
    name: string
    sets: string
    reps: string
    restSeconds: string
}

interface Props {
    visible: boolean
    onClose: () => void
}

export default function CreateQuestModal({ visible, onClose }: Props) {

    // addQuest method to be passed down to addQuest component
    const addQuest = useQuestStore(s => s.addQuest)
    
    // addWorkout method to be passed down to component
    const addWorkout = useWorkoutStore(s => s.addWorkout)

    const [title, setTitle] = useState('')
    const [type, setType] = useState<QuestType>('daily')
    const [xpReward, setXpReward] = useState('50')
    const [icon, setIcon] = useState('I')
    // Exercises as an input array to allow multiple exercises to be added
    const [exercises, setExercises] = useState<ExerciseInput[]>([
        { name: '', sets: '3', reps: '10', restSeconds: '60' }
    ])

    // function to add and edit sets, reps, and rest seconds to each workout
    const addExercise = () => {
        setExercises(prev => [...prev, { name: '', sets: '3', reps: '10', restSeconds: '60' }])
    }

    const removeExercise = (index: number) => {
        setExercises(prev => prev.filter((_, i) => i !== index))
    }

    const updateExercise = (index: number, field: keyof ExerciseInput, value: string) => {
        setExercises(prev => prev.map((ex, i) => i === index ? { ...ex, [field]: value } : ex))
    }

    // Function to create a quest and its corresponding exercise workouts
    const handleCreate = () => {
        if (!title.trim()) return

        const questId = Date.now().toString()
        
        // Use parseInt from textInput in component
        addQuest({
            id: questId,
            type,
            title: title.trim().toUpperCase(),
            icon,
            progress: 0,
            xpReward: parseInt(xpReward) || 50,
            completed: false,
            createdAt: new Date(),
        })

        addWorkout({
            id: `workout-${questId}`,
            questId,
            difficulty: 'D',
            timeRemaining: 30,
            exercises: exercises
                .filter(ex => ex.name.trim())
                .map(ex => ({
                    name: ex.name.trim(),
                    sets: parseInt(ex.sets) || 3,
                    reps: parseInt(ex.reps) || 10,
                    restSeconds: parseInt(ex.restSeconds) || 60,
                })),
            statRewards: { STR: 1 },
            xpReward: parseInt(xpReward) || 50,
        })

        setTitle('')
        setType('daily')
        setXpReward('50')
        setIcon('I')
        setExercises([{ name: '', sets: '3', reps: '10', restSeconds: '60' }])
        onClose()
    }

    const inputStyle = {
        backgroundColor: theme.colors.bg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        color: theme.colors.text,
        fontFamily: theme.fonts.body,
        fontSize: 15,
    }

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
                <ScrollView
                    style={{ maxHeight: '90%' }}
                    contentContainerStyle={{
                        backgroundColor: theme.colors.card,
                        borderTopLeftRadius: theme.radius.lg,
                        borderTopRightRadius: theme.radius.lg,
                        borderWidth: 1,
                        borderColor: theme.colors.borderBright,
                        padding: theme.spacing.lg,
                        gap: theme.spacing.md,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 14, fontWeight: '700', color: theme.colors.text, letterSpacing: 2 }}>
                            NEW QUEST
                        </Text>
                        <Pressable onPress={onClose}>
                            <Text style={{ color: theme.colors.textDim, fontSize: 18 }}>✕</Text>
                        </Pressable>
                    </View>

                    {/* Title */}
                    <TextInput
                        placeholder="Quest title..."
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={theme.colors.textDim}
                        style={inputStyle}
                    />

                    {/* Type selector */}
                    <View style={{ gap: theme.spacing.xs }}>
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim, letterSpacing: 2 }}>TYPE</Text>
                        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                            {TYPES.map(t => (
                                <Pressable
                                    key={t}
                                    onPress={() => setType(t)}
                                    style={{
                                        flex: 1,
                                        padding: theme.spacing.sm,
                                        borderRadius: theme.radius.sm,
                                        borderWidth: 1,
                                        borderColor: type === t ? TYPE_COLORS[t] : theme.colors.border,
                                        backgroundColor: type === t ? `${TYPE_COLORS[t]}1A` : 'transparent',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ fontFamily: theme.fonts.display, fontSize: 8, color: type === t ? TYPE_COLORS[t] : theme.colors.textDim, letterSpacing: 1 }}>
                                        {t.toUpperCase()}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Icon picker */}
                    <View style={{ gap: theme.spacing.xs }}>
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim, letterSpacing: 2 }}>ICON</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                                {ICONS.map(ic => (
                                    <Pressable
                                        key={ic}
                                        onPress={() => setIcon(ic)}
                                        style={{
                                            width: 44, height: 44,
                                            borderRadius: theme.radius.sm,
                                            borderWidth: 1,
                                            borderColor: icon === ic ? theme.colors.purple : theme.colors.border,
                                            backgroundColor: icon === ic ? `${theme.colors.purple}1A` : 'transparent',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 22 }}>{ic}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* XP Reward */}
                    <View style={{ gap: theme.spacing.xs }}>
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim, letterSpacing: 2 }}>XP REWARD</Text>
                        <TextInput
                            placeholder="50"
                            value={xpReward}
                            onChangeText={setXpReward}
                            keyboardType="numeric"
                            placeholderTextColor={theme.colors.textDim}
                            style={inputStyle}
                        />
                    </View>

                    {/* Exercises */}
                    <View style={{ gap: theme.spacing.sm }}>
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.textDim, letterSpacing: 2 }}>EXERCISES</Text>

                        {exercises.map((ex, i) => (
                            <View key={i} style={{
                                backgroundColor: theme.colors.bg,
                                borderRadius: theme.radius.md,
                                borderWidth: 1,
                                borderColor: theme.colors.border,
                                padding: theme.spacing.md,
                                gap: theme.spacing.sm,
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: theme.fonts.display, fontSize: 9, color: theme.colors.purple, letterSpacing: 1 }}>
                                        EXERCISE {i + 1}
                                    </Text>
                                    {exercises.length > 1 && (
                                        <Pressable onPress={() => removeExercise(i)}>
                                            <Text style={{ color: theme.colors.red, fontSize: 12 }}>✕</Text>
                                        </Pressable>
                                    )}
                                </View>
                                <TextInput
                                    placeholder="Exercise name"
                                    value={ex.name}
                                    onChangeText={v => updateExercise(i, 'name', v)}
                                    placeholderTextColor={theme.colors.textDim}
                                    style={inputStyle}
                                />
                                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 8, color: theme.colors.textDim, letterSpacing: 1 }}>SETS</Text>
                                        <TextInput
                                            value={ex.sets}
                                            onChangeText={v => updateExercise(i, 'sets', v)}
                                            keyboardType="numeric"
                                            placeholderTextColor={theme.colors.textDim}
                                            style={inputStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 8, color: theme.colors.textDim, letterSpacing: 1 }}>REPS</Text>
                                        <TextInput
                                            value={ex.reps}
                                            onChangeText={v => updateExercise(i, 'reps', v)}
                                            keyboardType="numeric"
                                            placeholderTextColor={theme.colors.textDim}
                                            style={inputStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 1, gap: 4 }}>
                                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 8, color: theme.colors.textDim, letterSpacing: 1 }}>REST(S)</Text>
                                        <TextInput
                                            value={ex.restSeconds}
                                            onChangeText={v => updateExercise(i, 'restSeconds', v)}
                                            keyboardType="numeric"
                                            placeholderTextColor={theme.colors.textDim}
                                            style={inputStyle}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}

                        <Pressable onPress={addExercise} style={{ alignItems: 'center', padding: theme.spacing.sm }}>
                            <Text style={{ color: theme.colors.purple, fontFamily: theme.fonts.display, fontSize: 11, letterSpacing: 1 }}>
                                + ADD EXERCISE
                            </Text>
                        </Pressable>
                    </View>

                    {/* Submit */}
                    <Pressable
                        onPress={handleCreate}
                        style={{
                            backgroundColor: theme.colors.purple,
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.md,
                            alignItems: 'center',
                            ...theme.shadows.purple,
                        }}
                    >
                        <Text style={{ fontFamily: theme.fonts.display, fontSize: 13, fontWeight: '700', color: theme.colors.text, letterSpacing: 2 }}>
                            CREATE QUEST
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </Modal>
    )
}
