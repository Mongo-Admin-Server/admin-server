import CaretUpDown from '@/shared/icons/caretUpDown.svg';
import Eye from '@/shared/icons/eye.svg';
import EyeSlash from '@/shared/icons/eyeSlash.svg';
import Trash from '@/shared/icons/trash.svg';
import Edit from '@/shared/icons/edit.svg';
import Sun from '@/shared/icons/sun.svg';
import Gear from '@/shared/icons/gear.svg';
import Logout from '@/shared/icons/logout.svg';
import Close from '@/shared/icons/close.svg';
import Flag from '@/shared/icons/flag.svg';
import Search from '@/shared/icons/search.svg';
import Moon from '@/shared/icons/moon.svg';
import Loader from '@/shared/icons/loader.svg';
import Refresh from '@/shared/icons/refresh.svg';
import Add from '@/shared/icons/add.svg';
import Succes from '@/shared/icons/success.svg';
import Error from '@/shared/icons/error.svg';
import Info from '@/shared/icons/info.svg';
import Warning from '@/shared/icons/warning.svg';
import ChevronLeft from '@/shared/icons/chevronLeft.svg';
import ChevronRight from '@/shared/icons/chevronRight.svg';
import ChevronsLeft from '@/shared/icons/chevronsLeft.svg';
import ChevronsRight from '@/shared/icons/chevronsRight.svg';
import Elipsis from '@/shared/icons/elipsis.svg';

interface IconTypes {
  [key: string]: React.ComponentType<{
    fill?: string;
    className: string;
    onClick?: () => void;
  }>;
}

interface SvgIconProps {
  icon_name: string;
  className?: string;
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
  flag: Flag,
  search: Search,
  moon: Moon,
  loader: Loader,
  refresh: Refresh,
  add: Add,
  success: Succes,
  error: Error,
  info: Info,
  warning: Warning,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  elipsis: Elipsis,
};

const SvgIcon = ({ icon_name, className, onClick }: SvgIconProps) => {
  const Icon = iconTypes[icon_name];

  return (
    <Icon
      className={`${className} ${onClick ? 'pointer-cursor' : ''}`}
      onClick={onClick}
    />
  );
};

export default SvgIcon;
