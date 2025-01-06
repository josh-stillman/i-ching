import { Hexagram, Line } from '@utils/utils';
import { HexLine } from '../HexLine/HexLine';
import styles from './Hex.module.css';
import { useViewport } from '../../hooks/useViewport';

interface Props {
  hexagram: Hexagram;
}

export const Hex = ({ hexagram }: Props) => {
  const { width } = useViewport();

  const gap = width * 0.075;
  const padding = width * 0.05 * 2;
  const availableHexWidth = width - gap - padding;

  const hexWidth = availableHexWidth / 2;

  const clampedWidth = Math.min(200, hexWidth);

  const finalWidth =
    !hexagram.isChanged && !hexagram.isChanging ? 200 : clampedWidth;

  // animation happens in reverse dom order within each Hex
  const orderOffset = hexagram.isChanged ? 11 : 5;

  // animation stuff:
  // group delay for changing hex

  // duration = total duration / 6
  // broken lines get divided into two.
  // delay = duration * order -1

  const TOTAL_DURATION = 10000;

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
      >{`${hexagram.hexagramNumber}: ${hexagram.hexagramName}`}</h1>

      {hexagram.getLinesDescending().map((line: Line, i: number) => (
        <HexLine
          width={finalWidth}
          line={line}
          key={hexagram.hexagramNumber + i}
          order={orderOffset - i}
          duration={TOTAL_DURATION / 6}
        />
      ))}
    </div>
  );
};
