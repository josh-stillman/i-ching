import { Hexagram } from '../../../utils/utils';
import styles from './HexTextDisplay.module.css';

interface Props {
  hexagram: Hexagram;
}

export const HexTextDisplay = ({ hexagram }: Props) => {
  return (
    <>
      <p className={styles.hexTitle}>{hexagram.hexagramTitleText}</p>
      <br />
      {hexagram.text}
      <br />
      <br />
    </>
  );
};
