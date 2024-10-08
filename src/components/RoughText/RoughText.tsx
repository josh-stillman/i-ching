import React, { useEffect, useRef } from 'react';
import opentype, { Font } from 'opentype.js';
import rough from 'roughjs';

interface Props {
  text: string;
}

export const RoughText = ({ text }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const getOpenSans = async () => {
      const foo = await opentype.load('./ital.otf');
      return foo;
    };

    const getSVG = async () => {
      const font = await getOpenSans();

      const wordPath = font.getPath(text, 0, 0, 100);

      const padding = 0;

      const { x1, y1, x2, y2 } = wordPath.getBoundingBox();
      const viewBox = [
        x1 - padding,
        y1 - padding,
        x2 - x1 + padding * 2,
        y2 - y1 + padding * 2,
      ];

      const d = wordPath.toPathData(2); //.replace(/(.{70,100}) /g, '$1\n')
      const style = `height: auto; width: 100%; padding: 1em; box-sizing: border-box;`;
      const svg = svgRef.current!;
      svg.setAttributeNS(null, 'width', `${viewBox[2]}`);
      svg.setAttributeNS(null, 'height', `${viewBox[3]}`);
      svg.setAttributeNS(null, 'style', style);
      svg.setAttributeNS(
        null,
        'viewBox',
        viewBox.map(n => n.toFixed(0)).join(' ')
      );

      const rc = rough.svg(svg);

      // roughOptions = {
      //   maxRandomnessOffset: 2,
      //   roughness: roughness,
      //   bowing: 1,
      //   stroke: strokeColor,
      //   strokeWidth: strokeWidth,
      //   curveTightness: 0,
      //   curveFitting: 0.95,
      //   curveStepCount: 10,
      //   fillStyle: 'zigzag',
      //   fillWeight: fillWeight,
      //   fill: fillColor,
      //   hachureAngle: hachureAngle,
      //   hachureGap: hachureGap,
      //   dashOffset: 0,
      //   dashGap: 0,
      //   zigzagOffset: 0,
      //   seed: 0,
      //   // combineNestedSvgPaths: false,
      //   // disableMultiStroke: false,
      //   // disableMultiStrokeFill: false
      // };

      svg.appendChild(rc.path(wordPath.toPathData(2)));

      return svg;
    };

    getSVG();
  }, []);

  return <svg ref={svgRef}></svg>;
};
