import { Text } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function IconSymbol({ name, size = 24, color = '#000' }: IconProps) {
  // Map of icon names to emojis
  const iconMap: { [key: string]: string } = {
    'house.fill': '🏠',
    'magnifyingglass': '🔍',
    'heart.fill': '❤️',
    'person.fill': '👤',
  };

  return (
    <Text style={{ fontSize: size, color }}>
      {iconMap[name] || '•'}
    </Text>
  );
}
