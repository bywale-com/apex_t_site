import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PRELOADER_VIDEO_SRC = "/video/preloader-always-on-call.mp4";
const TOWER_PRELOADER_MOBILE_VIDEO_SRC = "/video/tower-preloader-mobile.mp4";

export type PreloaderLocationState = { playPreloader?: boolean };

type PreloaderContextValue = {
  playPreloader: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloader must be used within PreloaderProvider");
  }
  return ctx;
}

function PreloaderLayer({
  runId,
  active,
  onRequestDismiss,
}: {
  runId: number;
  active: boolean;
  onRequestDismiss: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dismissed = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    onRequestDismiss();
  }, [onRequestDismiss]);

  useEffect(() => {
    dismissed.current = false;
  }, [runId, active]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [runId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobileViewport(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Lock scroll + dark body only while the overlay is shown. Do NOT clear on `active` false
  // (exit animation would fade over a white body and flash). Cleared in AnimatePresence onExitComplete.
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#000000";
  }, [active]);

  useEffect(() => {
    if (!active || !reducedMotion) return;
    const t = window.setTimeout(dismiss, 500);
    return () => window.clearTimeout(t);
  }, [active, runId, reducedMotion, dismiss]);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {
      dismiss();
    });
  }, [dismiss]);

  const clearBodyPreloaderLock = useCallback(() => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("background-color");
  }, []);

  const videoSrc = isMobileViewport
    ? TOWER_PRELOADER_MOBILE_VIDEO_SRC
    : PRELOADER_VIDEO_SRC;

  return (
    <AnimatePresence onExitComplete={clearBodyPreloaderLock}>
      {active ? (
        <motion.div
          key={`preloader-${runId}`}
          className="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {!reducedMotion ? (
            <video
              ref={videoRef}
              className="global-preloader__video"
              key={`${runId}:${videoSrc}`}
              playsInline
              muted
              onLoadedData={tryPlay}
              onEnded={dismiss}
              onError={dismiss}
              aria-hidden
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="global-preloader__reduced" aria-hidden />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true);
  const [runId, setRunId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const playPreloader = useCallback(() => {
    setRunId((k) => k + 1);
    setActive(true);
  }, []);

  useEffect(() => {
    const state = location.state as PreloaderLocationState | null;
    if (location.pathname !== "/") return;
    if (!state?.playPreloader) return;
    setRunId((k) => k + 1);
    setActive(true);
    navigate(
      { pathname: "/", search: location.search, hash: location.hash },
      { replace: true, state: {} },
    );
  }, [
    location.pathname,
    location.key,
    location.state,
    navigate,
    location.search,
    location.hash,
  ]);

  const onRequestDismiss = useCallback(() => {
    setActive(false);
  }, []);

  const value: PreloaderContextValue = { playPreloader };

  return (
    <PreloaderContext.Provider value={value}>
      {children}
      <PreloaderLayer
        runId={runId}
        active={active}
        onRequestDismiss={onRequestDismiss}
      />
    </PreloaderContext.Provider>
  );
}
