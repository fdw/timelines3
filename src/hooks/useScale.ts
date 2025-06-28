import {useContext} from 'react';
import {ScaleContext} from '../contexts/ScaleContextType';

export function useScale(date: Date|string): number {
  const context = useContext(ScaleContext);
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider');
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const { pixelsPerYear } = context;
  return dateObj.getFullYear() * pixelsPerYear;
}

export function useScaleFunction(): (_: Date) => number {
  const context = useContext(ScaleContext);
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider');
  }

  const { pixelsPerYear } = context;

  return function (date: Date): number {
    return date.getFullYear() * pixelsPerYear;
  }
}