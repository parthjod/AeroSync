import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import posterImg from '../assets/project-poster.jpg';

const CDN_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch((err) => {
        console.debug('Background video autoplay was prevented, waiting for interaction:', err);
      });
    }

    // Fallback trigger if browser restricts autoplay until first interaction
    const handleFirstInteraction = () => {
      if (video && !prefersReducedMotion && video.paused) {
        video.play().catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="bg-video-wrapper" aria-hidden="true">
      {/* Video element with direct src and fallback source */}
      <video
        ref={videoRef}
        src={CDN_VIDEO_URL}
        className="bg-video"
        poster={posterImg}
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={CDN_VIDEO_URL} type="video/mp4" />
        <source src="/project-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback image if reduced motion is requested */}
      {prefersReducedMotion && (
        <img
          src={posterImg}
          alt=""
          className="bg-video-poster"
        />
      )}

      {/* Translucent aerospace veil ensuring high contrast without hiding the video */}
      <div className="bg-video-veil" />
    </div>
  );
};
