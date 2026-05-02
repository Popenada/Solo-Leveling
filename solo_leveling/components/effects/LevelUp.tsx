import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import { Modal, Pressable, View } from 'react-native'
import Text from '../ui/Text'
export default function LevelUp(){
    // Trigger the card popup based off of triggerLevelUp equals true
    const { triggerLevelUp, clearLevelUp, levelUp } = usePlayerStore()
    return(
        <View>

            <Modal visible={triggerLevelUp} transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={{ position: 'absolute', inset: 0}} onPress={clearLevelUp} />
                    {/* Card */}
                    <View style={{ backgroundColor: theme.colors.bg, padding: 24, borderRadius: theme.radius.md, width: 300, alignItems: 'center'}}>
                        <Text>LEVELED UP!</Text>
                        <Pressable onPress={clearLevelUp}>
                            <Text>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}