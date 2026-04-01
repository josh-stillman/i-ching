import React from 'react';
import { Line } from '../../utils/utils';

import styles from './Hexline.module.css';
import { AnimatedRectangle } from '../Rectangle/Rectangle';

interface Props {
  line: Line;
  order: number;
  duration: number;
  width: number;
  darkMode: boolean;
}

const FILL_STYLE = 'none';

const CHANGING_FILL_WEIGHT = 2;

const INITIAL_ROUGHNESS = 2;

export const HexLine = ({ line, order, duration, width, darkMode }: Props) => {
  const ASPECT_RATIO = 30 / 200;

  const height = width * ASPECT_RATIO;

  const defaultFill = darkMode ? 'rgb(215,215,215)' : 'black';

  const defaultStroke = darkMode ? 'rgb(233,233,233)' : 'black';

  switch (line) {
    case Line.Broken:
      return (
        <BrokenLine
          fill={defaultFill}
          stroke={defaultStroke}
          ariaLabel="Broken Line"
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          width={width}
          height={height}
        />
      );
    case Line.BrokenPlus:
      return (
        <BrokenLine
          fill="tomato"
          stroke={darkMode ? 'tomato' : 'black'}
          ariaLabel="Changing Broken Line"
          fillWeight={CHANGING_FILL_WEIGHT}
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          width={width}
          height={height}
          className="changing"
        />
      );
    case Line.Straight:
      return (
        <StraightLine
          fill={defaultFill}
          stroke={defaultStroke}
          ariaLabel="Unbroken Line"
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          width={width}
          height={height}
        />
      );
    case Line.StraightPlus:
      return (
        <StraightLine
          fill="tomato"
          stroke={darkMode ? 'tomato' : 'black'}
          ariaLabel="Changing Unbroken Line"
          fillWeight={CHANGING_FILL_WEIGHT}
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          className="changing"
          width={width}
          height={height}
        />
      );
    default:
      return null;
  }
};

const BrokenLine = ({
  roughness,
  fill,
  fillWeight,
  order,
  className,
  duration,
  width,
  height,
  ariaLabel,
  stroke,
}: {
  roughness: number;
  ariaLabel: string;
  fill: string;
  fillWeight?: number;
  order: number;
  className?: string;
  duration: number;
  width: number;
  height: number;
  stroke: string;
}) => {
  const segmentDuration = duration / 2;
  const firstSegmentDelay = duration * order;
  const secondSegmentDelay = firstSegmentDelay + segmentDuration;

  return (
    <div
      className={`${styles.line__container} ${className}`}
      style={
        {
          '--order': order,
          width: width,
        } as React.CSSProperties
      }
      aria-label={ariaLabel}
    >
      <AnimatedRectangle
        width={width * 0.375}
        height={height}
        fill={fill}
        fillWeight={fillWeight}
        roughness={roughness}
        fillStyle={FILL_STYLE}
        animationDuration={segmentDuration}
        animationDelay={firstSegmentDelay}
        stroke={stroke}
      />
      <AnimatedRectangle
        width={width * 0.375}
        height={height}
        fill={fill}
        fillWeight={fillWeight}
        roughness={roughness}
        fillStyle={FILL_STYLE}
        animationDuration={segmentDuration}
        animationDelay={secondSegmentDelay}
        stroke={stroke}
      />
    </div>
  );
};

const StraightLine = ({
  roughness,
  fill,
  fillWeight,
  order,
  className,
  duration,
  width,
  height,
  ariaLabel,
  stroke,
}: {
  roughness: number;
  fill: string;
  fillWeight?: number;
  order: number;
  duration: number;
  className?: string;
  width: number;
  height: number;
  ariaLabel: string;
  stroke: string;
}) => (
  <div
    className={`${styles.line__container} ${className ? className : ''}`}
    style={
      {
        '--order': order,
        width,
      } as React.CSSProperties
    }
    aria-label={ariaLabel}
  >
    <AnimatedRectangle
      width={width - 8}
      height={height}
      fill={fill}
      fillWeight={fillWeight}
      animationDelay={duration * order}
      animationDuration={duration}
      roughness={roughness}
      stroke={stroke}
    />
  </div>
);
