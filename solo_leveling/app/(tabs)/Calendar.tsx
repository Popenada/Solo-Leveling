
import { View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card'
import { theme } from '@/constants/theme';
import CountdownTimer from '@/components/ui/CountdownTimer';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar'
export default function CalendarScreen() {
  const handleAddQuest = () => {};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg2}}>
      <View style={{ flex: 1, backgroundColor: theme.colors.bg}}>
        CALENDAR SCREEN
        <Button
          label="Finish Quest"
          onPress={handleAddQuest}
        />
      </View>
      <CountdownTimer seconds={300} autoStart={true} variant="quest" onComplete={() => { console.log('Timer finished')}}/>
      <ProgressBar progress={30}/>
      <Badge rank='A'/>
    </SafeAreaView>
  );
}
