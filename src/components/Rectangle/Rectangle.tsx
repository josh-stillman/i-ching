import { useEffect, useRef } from 'react';
import roughAnimated from 'rough-animated';

interface Props {
  width: number;
  height: number;
  fill?: string;
  fillStyle?: string;
  fillWeight?: number;
  roughness?: number;
  animationDelay?: number;
  hachureGap?: number;
  animationDuration?: number;
  animationDurationFillPercentage?: number;
  stroke: string;
}

export const AnimatedRectangle = ({
  width,
  height,
  stroke = 'black',
  fill = 'black',
  fillStyle = 'hachure',
  fillWeight = 1,
  roughness = 1,
  hachureGap = 7,
  animationDelay = 0,
  animationDuration = 1500,
  animationDurationFillPercentage = 0.7,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const PADDING = 4;

  useEffect(() => {
    const resetShape = () => {
      if (!svgRef.current) {
        return;
      }

      const rc = roughAnimated.svg(svgRef.current);

      svgRef.current.replaceChildren(
        rc.rectangle(PADDING, PADDING, width, height, {
          animate: true,
          roughness,
          animationDelay,
          animationDuration,
          animationDurationFillPercentage,
          fillStyle,
          fillWeight,
          hachureGap,
          fill,
          stroke,
        })
      );
    };

    resetShape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill, stroke]);

  return (
    <svg
      ref={svgRef}
      width={width + PADDING * 2} // TODO: make padding internal to width?
      height={height + PADDING * 2}
    />
  );
};
