import opentype from 'opentype.js';

import { Hexagram, Line } from '@utils/utils';
import { HexLine } from '../HexLine/HexLine';
import styles from './Hex.module.css';
import { RoughText } from '../RoughText/RoughText';

interface Props {
  hexagram: Hexagram;
}

export const Hex = ({ hexagram }: Props) => {
  // animation happens in reverse dom order within each Hex
  const orderOffset = hexagram.isChanged ? 11 : 5;

  return (
    <div>
      <h1
        className={styles.title}
      >{`${hexagram.hexagramNumber}: ${hexagram.hexagramName}`}</h1>
      <RoughText
        text={`${hexagram.hexagramNumber}: ${hexagram.hexagramName}`}
      />

      {hexagram.getLinesDescending().map((line: Line, i: number) => (
        <HexLine
          line={line}
          key={hexagram.hexagramNumber + i}
          order={orderOffset - i}
        />
      ))}
    </div>
  );
};
