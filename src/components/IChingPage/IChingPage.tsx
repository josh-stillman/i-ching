'use client';

// import { useEffect, useRef } from 'react';
// import roughAnimated from 'rough-animated';

import styles from './IChingPage.module.css';
import { Hexagram } from '@utils/utils';
import { Hex } from '@components/Hex/Hex';
// import { useViewport } from '../../hooks/useViewport';
import { useSearchParams } from 'next/navigation';
import { HexTextDisplay } from '../TextDisplay/HexTextDisplay/HexTextDisplay';

const IChingPage = () => {
  const searchParams = useSearchParams();

  const forceHexagramNumber = searchParams.get('hex')
    ? parseInt(searchParams.get('hex')!)
    : null;

  const forceChangingLines = searchParams
    .get('lines')
    ?.split(',')
    .map(l => +l)
    .filter(l => +l >= 1 && +l <= 6);

  const hexagram = new Hexagram({
    forceHexagramNumber,
    forceChangingLines,
  });

  const changingHex = hexagram.getChangingHex();
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
        <HexTextDisplay hexagram={hexagram} />

        {changingHex ? (
          <>
            <p className={styles.linesHeader}>Changing Lines</p>
            <br />
            {hexagram.changingLinesText.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <p>
                {line}

                {i !== hexagram.changingLinesText.length - 1 && (
                  <>
                    <br />
                    <br />
                    <hr style={{ margin: '0 auto', width: '25%' }} />
                  </>
                )}
                <br />
              </p>
            ))}
          </>
        ) : (
          ''
        )}

        {changingHex && (
          <>
            <br />
            <hr />
            <br />
            <HexTextDisplay hexagram={changingHex} />
          </>
        )}
      </section>
    </main>
  );
};

export default IChingPage;
