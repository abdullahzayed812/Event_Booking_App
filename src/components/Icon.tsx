import React from 'react';
import { icons, LucideProps } from 'lucide-react-native';

export type IconName = keyof typeof icons;

interface IconProps extends Pick<LucideProps, 'color' | 'size'> {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react-native.`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
