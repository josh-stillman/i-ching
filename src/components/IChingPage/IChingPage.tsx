'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import roughAnimated from 'rough-animated';

import styles from './IChingPage.module.css';
import { Hexagram } from '../../utils/utils';
import { Hex } from '../Hex/Hex';
import { HexTextDisplay } from '../TextDisplay/HexTextDisplay/HexTextDisplay';

const IChingPage = () => {
  const [hexagram, setHexagram] = useState<Hexagram>();
  const changingHex = useMemo(() => hexagram?.getChangingHex(), [hexagram]);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const svgRef = useRef<SVGSVGElement>(null);

  const { innerWidth: width, innerHeight: height } = window;
  const svgWidth = innerWidth * 2.5;
  const svgHeight = innerHeight * 2.5;

  const toggleDarkMode = () => {
    document.documentElement.style.colorScheme = darkMode ? 'light' : 'dark';
    setDarkMode(d => !d);
  };

  const castHexagram = (
    forceHexagramNumber?: number | null,
    forceChangingLines?: number[]
  ) => {
    const newHexagram = new Hexagram({
      forceHexagramNumber,
      forceChangingLines,
    });

    setHexagram(newHexagram);

    history.pushState(
      {},
      '',
      `/?hex=${newHexagram.hexagramNumber}${newHexagram.changingLines.length ? `&lines=${newHexagram.changingLines.join(',')}` : ''}`
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const forceHexagramNumber = searchParams.get('hex')
      ? parseInt(searchParams.get('hex')!)
      : null;

    const forceChangingLines = searchParams
      .get('lines')
      ?.split(',')
      .map(l => +l)
      .filter(l => +l >= 1 && +l <= 6);

    castHexagram(forceHexagramNumber, forceChangingLines);
  }, []);

  useEffect(() => {
    const resetShape = () => {
      if (!svgRef.current) {
        return;
      }

      const rc = roughAnimated.svg(svgRef.current);

      // const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log({ darkMode });

      svgRef.current.replaceChildren(
        rc.rectangle(0, 0, svgWidth, svgHeight, {
          animate: false,
          fillStyle: 'hachure',
          hachureGap: darkMode ? 0.5 : 1.5,
          fill: darkMode ? 'rgb(94,94,94)' : '#e1e5eb',
          stroke: 'none',
        })
      );
    };
    resetShape();
  }, [darkMode, svgHeight, svgWidth]);

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
            <Hex hexagram={hexagram} darkMode={darkMode} />

            {changingHex && <Hex hexagram={changingHex} darkMode={darkMode} />}
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
          <button onClick={toggleDarkMode}>toggle dark mode</button>
        </>
      )}
    </main>
  );
};

export default IChingPage;
