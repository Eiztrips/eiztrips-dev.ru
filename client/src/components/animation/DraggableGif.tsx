import { useEffect, useState, useRef } from 'react';
import { fetchRandomCatGif } from '../../services/gif.service';

const DraggableGif: React.FC = () => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [speed, setSpeed] = useState({ x: Math.random() * 0.5 + 0.1, y: Math.random() * 0.5 + 0.1 });

  const gifRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastInteractionTime = useRef<number>(0);

  useEffect(() => {
    const loadGif = async () => {
      const url = await fetchRandomCatGif();
      setGifUrl(url);
    };
    
    loadGif();
  }, []);

  useEffect(() => {
    const setRandomPosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const gifWidth = gifRef.current?.offsetWidth || 150;
      const gifHeight = gifRef.current?.offsetHeight || 150;

      const randomX = Math.random() * (windowWidth - gifWidth);
      const randomY = Math.random() * (windowHeight - gifHeight);

      setPosition({ x: randomX, y: randomY });
    };

    setRandomPosition();

    window.addEventListener('resize', setRandomPosition);
    return () => window.removeEventListener('resize', setRandomPosition);
  }, []);

  const moveGif = () => {
    if (Date.now() - lastInteractionTime.current < 3000 || isDragging) {
      animationRef.current = requestAnimationFrame(moveGif);
      return;
    }

    setPosition(prev => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const gifWidth = gifRef.current?.offsetWidth || 150;
      const gifHeight = gifRef.current?.offsetHeight || 150;

      let newX = prev.x + direction.x * speed.x;
      let newY = prev.y + direction.y * speed.y;
      let newDirectionX = direction.x;
      let newDirectionY = direction.y;

      if (newX <= 0 || newX >= windowWidth - gifWidth) {
        newDirectionX = -newDirectionX;
        setSpeed(prev => ({ 
          x: Math.random() * 0.5 + 0.1, 
          y: prev.y 
        }));
      }

      if (newY <= 0 || newY >= windowHeight - gifHeight) {
        newDirectionY = -newDirectionY;
        setSpeed(prev => ({ 
          x: prev.x, 
          y: Math.random() * 0.5 + 0.1
        }));
      }

      if (newDirectionX !== direction.x || newDirectionY !== direction.y) {
        setDirection({ x: newDirectionX, y: newDirectionY });
      }

      return { 
        x: newX <= 0 ? 0 : (newX >= windowWidth - gifWidth ? windowWidth - gifWidth : newX), 
        y: newY <= 0 ? 0 : (newY >= windowHeight - gifHeight ? windowHeight - gifHeight : newY) 
      };
    });

    animationRef.current = requestAnimationFrame(moveGif);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(moveGif);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    lastInteractionTime.current = Date.now();
    setIsDragging(true);
    
    const gifRect = gifRef.current?.getBoundingClientRect();
    if (gifRect) {
      setDragOffset({
        x: e.clientX - gifRect.left,
        y: e.clientY - gifRect.top
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastInteractionTime.current = Date.now();
    setIsDragging(true);
    
    const gifRect = gifRef.current?.getBoundingClientRect();
    if (gifRect && e.touches[0]) {
      setDragOffset({
        x: e.touches[0].clientX - gifRect.left,
        y: e.touches[0].clientY - gifRect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        setPosition({
          x: e.touches[0].clientX - dragOffset.x,
          y: e.touches[0].clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      lastInteractionTime.current = Date.now();
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!gifUrl) return null;

  return (
    <div 
      ref={gifRef}
      className={`draggable-gif cloud-shape ${isDragging ? 'dragging' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        position: 'fixed',
        zIndex: 10000,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img src={gifUrl} alt="Анимированная гифка" />
    </div>
  );
};

export default DraggableGif;