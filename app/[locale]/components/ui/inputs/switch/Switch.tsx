import styles from './switch.module.scss';

import GenericButton from "@components/ui/button/GenericButton";

interface SwitchProps {
  selected: string;
  options: string[];
  onChange: (value: string) => void;
}

const Switch = ({ selected, options, onChange }: SwitchProps) => {
  return (
    <div className={styles['switch-container']}>
      {options.map((option, index) => (
        <GenericButton
          key={index}
          transparent={selected !== option}
          variant={selected === option ? 'info' : undefined}
          outline
          center
          onClick={() => onChange(option)}
        >
          {option}
        </GenericButton>
      ))}
    </div>
  );
}

export default Switch;