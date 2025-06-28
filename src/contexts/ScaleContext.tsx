import { useState, useMemo, useRef, useEffect, type ReactNode, type ReactElement } from 'react';
import { ScaleContext } from './ScaleContextType';

// ScaleProvider component
export function ScaleProvider({ children }: { children: ReactNode }): ReactElement {
  const [pixelsPerYear, setPixelsPerYear] = useState<number>(10);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the available width
  useEffect(() => {
    function updateWidth(): void {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Calculate pixels per year based on width and a fixed range (current year)
        const currentYear = new Date().getFullYear();
        setPixelsPerYear(width / currentYear);
      }
    }

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const value = useMemo(() => ({ pixelsPerYear }), [pixelsPerYear]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <ScaleContext.Provider value={value}>
        {children}
      </ScaleContext.Provider>
    </div>
  );
}
