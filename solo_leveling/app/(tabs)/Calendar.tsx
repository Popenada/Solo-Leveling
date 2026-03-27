
import { View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card'
import {theme} from '@/constants/theme'

export default function CalendarScreen() {
  const handleAddQuest = () => {};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg}}>
      <View style={{ flex: 1, backgroundColor: theme.colors.bg}}>
        CALENDAR SCREEN
        <Button
          label="Finish Quest"
          onPress={handleAddQuest}
        />
      </View>
    </SafeAreaView>
  );
}
