import * as Haptics from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

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
