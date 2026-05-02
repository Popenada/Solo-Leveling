import { theme } from '@/constants/theme'
import { usePlayerStore } from '@/store/usePlayerStore'
import { Modal, Pressable, View } from 'react-native'
import Divider from '../ui/Divider'
import Text from '../ui/Text'
export default function LevelUp(){
    // Trigger the card popup based off of triggerLevelUp equals true
    const { triggerLevelUp, clearLevelUp, levelUp, level } = usePlayerStore()
    return(
        <View>
            <Modal visible={triggerLevelUp} transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={{ position: 'absolute', inset: 0}} onPress={clearLevelUp} />
                    {/* Card */}
                    <View style={{ backgroundColor: theme.colors.bg, padding: 24, borderRadius: theme.radius.md, width: 300, alignItems: 'center'}}>
                        <Text>LEVELED UP!</Text>
                        <Divider/>
                        <View style={{ alignItems: 'center', gap: 4}}>
                            <Text style={{ fontFamily: theme.fonts.display, fontSize: 64, fontWeight: '900', color: theme.colors.purple}}>
                                {level}
                            </Text>
                            <Text style={{ fontFamily: theme.fonts.display, fontSize: 10, color: theme.colors.textDim, letterSpacing: 3}}>
                                New Level
                            </Text>
                        <Divider/>

                        <Pressable onPress={clearLevelUp}>
                            <Text>Continue</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}