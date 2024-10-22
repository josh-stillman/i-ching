'use client';

import styles from './IChingPage.module.css';

import roughAnimated from 'rough-animated';

import { Hexagram } from '@utils/utils';
import { Hex } from '@components/Hex/Hex';
import ReactRough, { Rectangle } from 'rough-react-wrapper';
import { useViewport } from '../../hooks/useViewport';
import { useEffect, useRef } from 'react';

// Fix types for wrapper to accept children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyReactRough = ReactRough as (props: any) => React.JSX.Element;

const hexagram = new Hexagram();

const changingHex = hexagram.getChangingHex();

const IChingPage = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    resetShape();
  }, []);

  const resetShape = () => {
    if (!svgRef.current) {
      return;
    }

    const rc = roughAnimated.svg(svgRef.current);
    svgRef.current.replaceChildren(
      rc.rectangle(10, 10, 20, 20, {
        animate: true,
        animationDuration: 1500,
        fillStyle: 'hachure',
        fill: 'red',
      })
    );
  };

  const { height, width } = useViewport();

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
              hachureGap={0.5}
            />
          </MyReactRough>
        </div>
      )}
      <div>
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
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
