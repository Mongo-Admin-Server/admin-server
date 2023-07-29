import CaretUpDown from '@shared/icons/caretUpDown.svg';
import Eye from '@shared/icons/eye.svg';
import EyeSlash from '@shared/icons/eyeSlash.svg';
import Trash from '@shared/icons/trash.svg';

interface IconTypes {
  [key: string]: React.ComponentType<{ fill?: string }>;
}

interface SvgIconProps {
  icon_name: string;
  fill?: string;
}

const iconTypes: IconTypes = {
  caretUpDown: CaretUpDown,
  eye: Eye,
  eyeSlash: EyeSlash,
  trash: Trash,
};

const SvgIcon = ({ icon_name, fill }: SvgIconProps) => {
  const Icon = iconTypes[icon_name];

  return (
    <Icon fill={fill} />
  );
}

export default SvgIcon;