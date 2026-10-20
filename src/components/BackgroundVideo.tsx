import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import posterImg from '../assets/project-poster.jpg';
import { PROJECT_INFO } from '../data/mission';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Auto-play was prevented (browser policy or low power mode)
          console.debug('Background video autoplay was prevented:', err);
        });
      }
    }
  }, [prefersReducedMotion]);

  return (
    <div className="bg-video-wrapper" aria-hidden="true">
      {/* Video element with multiple local and remote sources */}
      <video
        ref={videoRef}
        className="bg-video"
        poster={posterImg}
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/project-video.mp4" type="video/mp4" />
        <source src={PROJECT_INFO.videoRemoteUrl} type="video/mp4" />
      </video>

      {/* Fallback image if video fails to render or for reduced motion */}
      {prefersReducedMotion && (
        <img
          src={posterImg}
          alt=""
          className="bg-video-poster"
        />
      )}

      {/* Deep aerospace gradient veil */}
      <div className="bg-video-veil" />
    </div>
  );
};
