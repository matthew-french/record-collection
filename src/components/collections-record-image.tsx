'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import record from '@/public/static/images/record.webp'

interface CollectionsRecordImage {
  src: string
  alt: string
  width: number
  height: number
  className: string
}

const imageCache = new Set()

const CollectionsRecordImage = ({
  src,
  alt,
  width,
  height,
  className,
}: CollectionsRecordImage) => {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [isInView, setIsInView] = useState(false) // Renamed isPriority to isInView for clarity
  const imageRef = useRef(null)

  useEffect(() => {
    if (imageCache.has(src)) {
      setLoading(false)
      return
    }
    setCurrentSrc(src)
    setLoading(true)
    setAttempts(0)
  }, [src])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting) // Use isInView here
        })
      },
      {
        rootMargin: '10%',
        threshold: 0.1,
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setLoading(false)
    imageCache.add(src)
  }

  const handleError = () => {
    const maxAttempts = 3
    const delay = Math.pow(2, attempts) * 1000

    if (attempts < maxAttempts) {
      setTimeout(() => {
        setCurrentSrc(`${src}?retry=${attempts}`)
        setAttempts(attempts + 1)
        setLoading(true)
      }, delay)
    } else {
      setCurrentSrc('@/public/static/images/record.webp')
      setLoading(false)
    }
  }

  return (
    <div ref={imageRef} className="relative">
      <div className="relative aspect-w-1 aspect-h-1 z-10">
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={isInView} // Use isInView to determine priority
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center dark:text-gray-400 z-0">
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default CollectionsRecordImage
