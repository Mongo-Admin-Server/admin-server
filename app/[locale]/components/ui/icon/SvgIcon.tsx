import CaretUpDown from '@/shared/icons/caretUpDown.svg';
import Eye from '@/shared/icons/eye.svg';
import EyeSlash from '@/shared/icons/eyeSlash.svg';
import Trash from '@/shared/icons/trash.svg';
import Edit from '@/shared/icons/edit.svg';
import Sun from '@/shared/icons/sun.svg';
import Gear from '@/shared/icons/gear.svg';
import Logout from '@/shared/icons/logout.svg';
import Close from '@/shared/icons/close.svg';

interface IconTypes {
  [key: string]: React.ComponentType<{
    fill?: string;
    className: string;
    onClick?: () => void;
  }>;
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
  edit: Edit,
  sun: Sun,
  gear: Gear,
  logout: Logout,
  close: Close,
};

const SvgIcon = ({ icon_name, fill, onClick }: SvgIconProps) => {
  const Icon = iconTypes[icon_name];

  return (
    <Icon
      className={onClick ? 'pointer-cursor' : ''}
      fill={fill}
      onClick={onClick}
    />
  );
};

export default SvgIcon;
