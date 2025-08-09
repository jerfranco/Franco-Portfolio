import { useMemo } from 'react';

export default function StaticStar({ style }) {
  // ✅ Lock twinkle and opacity on first render
  const shouldTwinkle = useMemo(() => Math.random() < 0.4, []);
  const baseOpacity = useMemo(() => {
    return shouldTwinkle
      ? Math.random() * 0.3 + 0.7   // brighter twinklers
      : Math.random() * 0.5 + 0.2;  // dimmer static stars
  }, [shouldTwinkle]);

  const size = shouldTwinkle ? '3px' : '2px';

  return (
    <div
      className={`absolute bg-white rounded-full ${shouldTwinkle ? 'animate-twinkle' : ''}`}
      style={{
        width: size,
        height: size,
        opacity: baseOpacity,
        ...style,
      }}
    />
  );
}
