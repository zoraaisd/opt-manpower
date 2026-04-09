import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  groupSize?: number;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  wordClassName?: string;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  groupSize = 2,
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
  wordClassName = ''
}) => {
  const words = sentence.split(separator).filter(Boolean);
  const groups = words.reduce<string[]>((acc, _, index) => {
    if (index % groupSize === 0) {
      acc.push(words.slice(index, index + groupSize).join(separator));
    }
    return acc;
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  const updateFocusRect = () => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!containerRef.current) return;
    if (!groupRefs.current[currentIndex]) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = groupRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  };

  useEffect(() => {
    if (!manualMode && groups.length > 1) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => {
            const next = prev + 1;
            return next >= groups.length ? 0 : next;
          });
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, groups.length]);

  useEffect(() => {
    updateFocusRect();
  }, [currentIndex, groups.length]);

  useEffect(() => {
    updateFocusRect();

    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateFocusRect();
    });

    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateFocusRect);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateFocusRect);
    };
  }, [currentIndex, groups.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!);
    }
  };

  return (
    <div
      className={`relative flex flex-wrap items-center justify-center gap-4 ${className}`.trim()}
      ref={containerRef}
      style={{ outline: 'none', userSelect: 'none' }}
    >
      {groups.map((group, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              groupRefs.current[index] = el;
            }}
            className={`relative inline-block whitespace-nowrap text-[3rem] font-black cursor-pointer ${wordClassName}`.trim()}
            style={
              {
                filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                outline: 'none',
                userSelect: 'none'
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {group}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor
          } as React.CSSProperties
        }
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: 'var(--border-color)',
            filter: 'drop-shadow(0 0 4px var(--border-color))'
          }}
        ></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;
