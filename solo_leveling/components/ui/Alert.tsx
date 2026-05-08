import { theme } from '@/constants/theme'
import { Modal, Pressable, View } from 'react-native'
import Text from './Text'

interface Props {
    visible: boolean
    title: string
    message: string
    onClose: () => void
}

export default function Alert({ visible, title, message, onClose }: Props) {
    return (
        <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                alignItems: 'center',
                justifyContent: 'center',
                padding: theme.spacing.lg,
            }}>
                <View style={{
                    backgroundColor: theme.colors.card,
                    borderRadius: theme.radius.lg,
                    borderWidth: 1,
                    borderColor: theme.colors.borderBright,
                    padding: theme.spacing.lg,
                    width: '100%',
                    gap: theme.spacing.md,
                    ...theme.shadows.purple,
                }}>
                    <Text style={{
                        fontFamily: theme.fonts.display,
                        fontSize: 16,
                        fontWeight: '700',
                        color: theme.colors.text,
                        letterSpacing: 2,
                    }}>
                        {title.toUpperCase()}
                    </Text>

                    <Text style={{
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        color: theme.colors.textDim,
                        lineHeight: 20,
                    }}>
                        {message}
                    </Text>

                    <Pressable
                        onPress={onClose}
                        style={{
                            backgroundColor: theme.colors.purple,
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.sm,
                            alignItems: 'center',
                            marginTop: theme.spacing.xs,
                        }}
                    >
                        <Text style={{
                            fontFamily: theme.fonts.display,
                            fontSize: 12,
                            fontWeight: '700',
                            color: theme.colors.text,
                            letterSpacing: 2,
                        }}>
                            CONFIRM
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
