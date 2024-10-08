'use client';
import opentype, { Font } from 'opentype.js';
import styles from './IChingPage.module.css';

import { Hexagram } from '@utils/utils';
import { Hex } from '@components/Hex/Hex';
import ReactRough, { Rectangle } from 'rough-react-wrapper';
import { useViewport } from '../../hooks/useViewport';
import { useEffect, useState } from 'react';

// Fix types for wrapper to accept children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyReactRough = ReactRough as (props: any) => React.JSX.Element;

const hexagram = new Hexagram();

const changingHex = hexagram.getChangingHex();

const IChingPage = () => {
  const { height, width } = useViewport();

  const [font, setFont] = useState<Font>();

  useEffect(() => {
    const getFont = async () => {
      const foo = await opentype.load('./ital.otf');
      console.log({ font: foo });
      setFont(foo);
    };

    getFont();
  }, []);

  if (!font) {
    return;
  }

  return (
    <main className={styles.iChingPageWrapper}>
      {height && width && (
        <div className="background">
          <MyReactRough renderer={'svg'} width={width} height={height}>
            <Rectangle
              width={width}
              height={height}
              x={0}
              y={0}
              fill="#d0d7de"
              roughness={5}
              stroke="none"
              hachureGap={1}
            />
          </MyReactRough>
        </div>
      )}
      <section className={styles.hexContainer}>
        <Hex hexagram={hexagram} />

        {changingHex && <Hex hexagram={changingHex} />}
      </section>
      <section className={styles.textContainer}>
        {hexagram.hexagramNumber}. {hexagram.hexagramName}
        <br />
        <br />
        {hexagram.text}
        {changingHex ? (
          <>
            <br />
            <h1>LINES:</h1>{' '}
            <ul>
              {hexagram.changingLinesText.map(line => (
                <li key={line}>
                  {line}
                  <br />
                </li>
              ))}
            </ul>
          </>
        ) : (
          ''
        )}
        <br />
        <hr />
        {changingHex && (
          <>
            {changingHex.hexagramNumber}. {changingHex.hexagramName}
            <br />
            <br />
            {changingHex.text}
          </>
        )}
      </section>
    </main>
  );
};

export default IChingPage;
