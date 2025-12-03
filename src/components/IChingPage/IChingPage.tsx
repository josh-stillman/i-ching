'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import roughAnimated from 'rough-animated';

import styles from './IChingPage.module.css';
import { Hexagram } from '../../utils/utils';
import { Hex } from '../Hex/Hex';
// import { useSearchParams } from 'next/navigation';
import { HexTextDisplay } from '../TextDisplay/HexTextDisplay/HexTextDisplay';
// import { useRouter } from 'next/navigation';

const IChingPage = () => {
  // const searchParams = useSearchParams();

  // const router = useRouter();

  const [hexagram, setHexagram] = useState<Hexagram>();
  const changingHex = useMemo(() => hexagram?.getChangingHex(), [hexagram]);

  const svgRef = useRef<SVGSVGElement>(null);

  const { innerWidth: width, innerHeight: height } = window;
  const svgWidth = innerWidth * 2.5;
  const svgHeight = innerHeight * 2.5;

  useEffect(() => {
    //   const forceHexagramNumber = searchParams.get('hex')
    //     ? parseInt(searchParams.get('hex')!)
    //     : null;

    //   const forceChangingLines = searchParams
    //     .get('lines')
    //     ?.split(',')
    //     .map(l => +l)
    //     .filter(l => +l >= 1 && +l <= 6);

    //   castHexagram(forceHexagramNumber, forceChangingLines);
    castHexagram();
  }, []);

  useEffect(() => {
    const resetShape = () => {
      if (!svgRef.current) {
        return;
      }

      const rc = roughAnimated.svg(svgRef.current);

      svgRef.current.replaceChildren(
        rc.rectangle(0, 0, svgWidth, svgHeight, {
          animate: false,
          fillStyle: 'hachure',
          hachureGap: 1.5,
          fill: '#e1e5eb',
          stroke: 'none',
        })
      );
    };

    resetShape();
  }, []);

  const castHexagram = (
    forceHexagramNumber?: number | null,
    forceChangingLines?: number[]
  ) => {
    const newHexagram = new Hexagram({
      forceHexagramNumber,
      forceChangingLines,
    });

    setHexagram(newHexagram);

    // router.replace(
    //   `/?hex=${newHexagram.hexagramNumber}${newHexagram.changingLines.length ? `&lines=${newHexagram.changingLines.join(',')}` : ''}`
    // );
  };

  return (
    <main className={styles.iChingPageWrapper}>
      {height && width && (
        <svg
          className="background"
          width={svgWidth}
          height={svgHeight}
          ref={svgRef}
        ></svg>
      )}
      {hexagram && (
        <>
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
          <button
            className={styles.recastButton}
            onClick={() => castHexagram()}
          >
            Cast Again
          </button>
        </>
      )}
    </main>
  );
};

export default IChingPage;
