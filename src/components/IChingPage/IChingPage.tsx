'use client';

// import { useEffect, useRef } from 'react';
// import roughAnimated from 'rough-animated';

import styles from './IChingPage.module.css';
import { Hexagram } from '@utils/utils';
import { Hex } from '@components/Hex/Hex';
// import { useViewport } from '../../hooks/useViewport';

const hexagram = new Hexagram();

const changingHex = hexagram.getChangingHex();

const IChingPage = () => {
  // const svgRef = useRef<SVGSVGElement>(null);
  // const { height, width } = useViewport();

  // useEffect(() => {
  //   const resetShape = () => {
  //     if (!svgRef.current) {
  //       return;
  //     }

  //     const rc = roughAnimated.svg(svgRef.current);

  //     svgRef.current.replaceChildren(
  //       rc.rectangle(0, 0, width, height, {
  //         animate: false,
  //         fillStyle: 'hachure',
  //         hachureGap: 1.5,
  //         fill: '#e1e5eb',
  //         stroke: 'none',
  //       })
  //     );
  //   };

  //   resetShape();
  // }, []);

  return (
    <main className={styles.iChingPageWrapper}>
      {/* {height && width && (
        <svg
          className="background"
          width={width}
          height={height}
          ref={svgRef}
        ></svg>
      )} */}
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
            <p className={styles.linesHeader}>Changing Lines:</p>{' '}
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
        {changingHex && (
          <>
            <hr />
            <br />
          </>
        )}
        {changingHex && (
          <>
            {changingHex.hexagramNumber}. {changingHex.hexagramName}
            <br />
            <br />
            {changingHex.text}
            <br />
          </>
        )}
      </section>
    </main>
  );
};

export default IChingPage;
