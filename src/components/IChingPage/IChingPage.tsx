import { useEffect, useMemo, useRef, useState } from 'react';
import roughAnimated from 'rough-animated';
import { slide as Menu } from 'react-burger-menu';
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
      <div>
        <Menu noOverlay right width={'min(400px, 100%)'}>
          <span>
            Toggle Dark Mode
            <button className={styles.darkModeButton} onClick={toggleDarkMode}>
              {!darkMode ? (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
                  ></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  className="toggleIcon_nCQi darkToggleIcon_OBbf"
                >
                  <path
                    fill="currentColor"
                    d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
                  ></path>
                </svg>
              )}
            </button>
          </span>
          <br />
          <h2>About</h2>
          <hr />
          <p>
            This app casts hexagrams automatically on page load using random
            numbers to simulate coin tosses.
          </p>
          <br />
          <p>
            If you'd prefer to cast your own, you can enter the hexagram number
            and any changing lines in the url. For example, if you have cast
            Hexagram 41 with the 1st, 3rd, and 6th lines changing, you'd go to{' '}
            <a>https://iching.funkladder.net/?hex=41&lines=1,3,6</a>
          </p>
          <br />
          <p>The text is the Wilhelm/Baynes translation.</p>
        </Menu>
      </div>
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
