import { useCallback, useEffect, useMemo, useRef } from "react";

interface UseAudioManagerOptions {
  enabled: boolean;
  defaultMusicTrack: string;
  levelMusicTrack?: string | null;
}

export function useAudioManager({
  enabled,
  defaultMusicTrack,
  levelMusicTrack,
}: UseAudioManagerOptions) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const activeMusicTrack = useMemo(
    () => levelMusicTrack ?? defaultMusicTrack,
    [defaultMusicTrack, levelMusicTrack],
  );

  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio();
      musicRef.current.loop = true;
      musicRef.current.volume = 0.35;
    }

    const player = musicRef.current;

    if (!enabled) {
      player.pause();
      player.currentTime = 0;
      return;
    }

    if (
      player.src !==
      new URL(activeMusicTrack, window.location.origin).toString()
    ) {
      player.src = activeMusicTrack;
      player.load();
    }

    void player.play().catch(() => {
      // Browser autoplay restrictions can block playback until user interaction.
    });
  }, [activeMusicTrack, enabled]);

  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  const playSoundEffect = useCallback(
    (track: string) => {
      if (!enabled) {
        return;
      }

      const audio = new Audio(track);
      audio.volume = 0.7;
      void audio.play().catch(() => {
        // Ignore transient playback errors (e.g., missing file or autoplay policy).
      });
    },
    [enabled],
  );

  return {
    playSoundEffect,
  };
}
