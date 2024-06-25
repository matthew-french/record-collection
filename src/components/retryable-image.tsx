import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const RetryableImage = ({ src, alt, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loading, setLoading] = useState(true); // Added loading state
  const [attempts, setAttempts] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setCurrentSrc(src);
    setLoading(true); // Reset loading state when src changes
    setAttempts(0);
  }, [src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPriority(entry.isIntersecting);
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.01,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setLoading(false); // Update loading state when image has loaded
  };

  const handleError = () => {
    const maxAttempts = 3;
    const delay = Math.pow(2, attempts) * 1000;

    if (attempts < maxAttempts) {
      setTimeout(() => {
        setCurrentSrc(`${src}?retry=${attempts}`);
        setAttempts(attempts + 1);
        setLoading(true); // Ensure loading state is true when retrying
      }, delay);
    } else {
      setCurrentSrc('/placeholder.svg');
      setLoading(false); // Ensure loading state is false when giving up
    }
  };

  return (
    <div ref={imageRef} className="relative">
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={isPriority}
          onLoadingComplete={handleLoad}
          onError={handleError}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder content here */}
            Loading...
          </div>
        )}
    </div>
  );
};

export { RetryableImage };
