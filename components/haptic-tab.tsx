import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ComponentProps } from 'react';

export function HapticTab(props: ComponentProps<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity
      {...props}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
}
