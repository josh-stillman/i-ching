import React from 'react';
import { Line } from '@utils/utils';

import styles from './Hexline.module.css';
import { AnimatedRectangle } from '../Rectangle/Rectangle';

interface Props {
  line: Line;
  order: number;
  duration: number;
}

const width = 200;
const height = 30;

const FILL_STYLE = 'none';

const CHANGING_FILL_WEIGHT = 2;

const INITIAL_ROUGHNESS = 2;

export const HexLine = ({ line, order, duration }: Props) => {
  switch (line) {
    case Line.Broken:
      return (
        <BrokenLine
          fill="black"
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
        />
      );
    case Line.BrokenPlus:
      return (
        <BrokenLine
          fill="tomato"
          fillWeight={CHANGING_FILL_WEIGHT}
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          className="changing"
        />
      );
    case Line.Straight:
      return (
        <StraightLine
          fill="black"
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
        />
      );
    case Line.StraightPlus:
      return (
        <StraightLine
          fill="tomato"
          fillWeight={CHANGING_FILL_WEIGHT}
          roughness={INITIAL_ROUGHNESS}
          order={order}
          duration={duration}
          className="changing"
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
}: {
  roughness: number;
  fill: string;
  fillWeight?: number;
  order: number;
  className?: string;
  duration: number;
}) => {
  const segmentDuration = duration / 2;
  const firstSegmentDelay = duration * order;
  const secondSegmentDelay = firstSegmentDelay + segmentDuration;

  return (
    <div
      className={`${styles.line__container} ${className}`}
      style={{ '--order': order } as React.CSSProperties}
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
}: {
  roughness: number;
  fill: string;
  fillWeight?: number;
  order: number;
  duration: number;
  className?: string;
}) => (
  <div
    className={`${styles.line__container} ${className ? className : ''}`}
    style={{ '--order': order } as React.CSSProperties}
  >
    <AnimatedRectangle
      width={width}
      height={height}
      fill={fill}
      fillWeight={fillWeight}
      animationDelay={duration * order}
      animationDuration={duration}
      roughness={roughness}
    />
  </div>
);
