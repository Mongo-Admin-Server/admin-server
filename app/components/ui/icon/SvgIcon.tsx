import CaretUpDown from '@shared/icons/caretUpDown.svg';
import Eye from '@shared/icons/eye.svg';
import EyeSlash from '@shared/icons/eyeSlash.svg';
import Trash from '@shared/icons/trash.svg';

interface IconTypes {
  [key: string]: React.ComponentType<{ fill?: string, onClick?: () => void }>;
}

interface SvgIconProps {
  icon_name: string;
  fill?: string;
  onClick?: () => void;
}

const iconTypes: IconTypes = {
  caretUpDown: CaretUpDown,
  eye: Eye,
  eyeSlash: EyeSlash,
  trash: Trash,
};

const SvgIcon = ({ icon_name, fill, onClick }: SvgIconProps) => {
  const Icon = iconTypes[icon_name];

  return (
    <Icon fill={fill} onClick={onClick} />
  );
}

export default SvgIcon;