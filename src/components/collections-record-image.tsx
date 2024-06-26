import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CollectionsRecordImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

const imageCache = new Set(); // Cache to store loaded images

const CollectionsRecordImage = ({ src, alt, width, height, className }: CollectionsRecordImage) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageCache.has(src)) {
      setLoading(false); // If image is cached, no need to load again
      return;
    }
    setCurrentSrc(src);
    setLoading(true);
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
        rootMargin: '10%',
        threshold: 0.10,
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
    setLoading(false);
    imageCache.add(src); // Add successfully loaded image to cache
  };

  const handleError = () => {
    const maxAttempts = 3;
    const delay = Math.pow(2, attempts) * 1000; // Adjusted backoff strategy

    if (attempts < maxAttempts) {
      setTimeout(() => {
        setCurrentSrc(`${src}?retry=${attempts}`);
        setAttempts(attempts + 1);
        setLoading(true);
      }, delay);
    } else {
      setCurrentSrc('/placeholder.svg');
      setLoading(false);
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
          <div className="absolute inset-0 flex items-center justify-center dark:text-gray-400">
            Loading...
          </div>
        )}
    </div>
  );
};

export { CollectionsRecordImage };
