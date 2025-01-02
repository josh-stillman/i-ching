import { Hexagram, Line } from '@utils/utils';
import { HexLine } from '../HexLine/HexLine';
import styles from './Hex.module.css';

interface Props {
  hexagram: Hexagram;
}

export const Hex = ({ hexagram }: Props) => {
  // animation happens in reverse dom order within each Hex
  const orderOffset = hexagram.isChanged ? 11 : 5;

  // animation stuff:
  // group delay for changing hex

  // duration = total duration / 6
  // broken lines get divided into two.
  // delay = duration * order -1

  const TOTAL_DURATION = 10000;

  return (
    <div>
      <h1
        className={styles.title}
      >{`${hexagram.hexagramNumber}: ${hexagram.hexagramName}`}</h1>

      {hexagram.getLinesDescending().map((line: Line, i: number) => (
        <HexLine
          line={line}
          key={hexagram.hexagramNumber + i}
          order={orderOffset - i}
          duration={TOTAL_DURATION / 6}
        />
      ))}
    </div>
  );
};
