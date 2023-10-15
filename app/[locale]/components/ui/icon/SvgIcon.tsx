import CaretUpDown from '@/public/icons/caretUpDown.svg';
import Eye from '@/public/icons/eye.svg';
import EyeSlash from '@/public/icons/eyeSlash.svg';
import Trash from '@/public/icons/trash.svg';
import Edit from '@/public/icons/edit.svg';
import Sun from '@/public/icons/sun.svg';
import Gear from '@/public/icons/gear.svg';
import Logout from '@/public/icons/logout.svg';
import Close from '@/public/icons/close.svg';
import Flag from '@/public/icons/flag.svg';
import Search from '@/public/icons/search.svg';
import Moon from '@/public/icons/moon.svg';
import Loader from '@/public/icons/loader.svg';
import Refresh from '@/public/icons/refresh.svg';
import Add from '@/public/icons/add.svg';
import Succes from '@/public/icons/success.svg';
import Error from '@/public/icons/error.svg';
import Info from '@/public/icons/info.svg';
import Warning from '@/public/icons/warning.svg';
import ChevronLeft from '@/public/icons/chevronLeft.svg';
import ChevronRight from '@/public/icons/chevronRight.svg';
import ChevronsLeft from '@/public/icons/chevronsLeft.svg';
import ChevronsRight from '@/public/icons/chevronsRight.svg';
import Elipsis from '@/public/icons/elipsis.svg';
import Import from '@/public/icons/import.svg';
import Export from '@/public/icons/export.svg';
import User from '@/public/icons/user.svg';

export interface IconTypes {
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
  import: Import,
  export: Export,
  user: User,
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
