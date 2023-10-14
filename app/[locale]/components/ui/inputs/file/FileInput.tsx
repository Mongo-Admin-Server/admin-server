import SvgIcon from '@components/ui/icon/SvgIcon';

import styles from './fileInput.module.scss';

interface FileInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ onChange }: FileInputProps) => {
  return (
    <section className={styles['file-input']}>
      <label htmlFor="img" className={styles['file-input--label']}>
        <SvgIcon icon_name="upload" />
        <span>Choose a file</span>
      </label>
      <input
        type="file"
        id="img"
        name="img"
        accept=".csv"
        className={styles['file-input--input']}
        onChange={(e) => onChange(e)}
      />
    </section>
  );
};

export default FileInput;
