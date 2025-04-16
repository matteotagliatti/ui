"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
  type ReactNode,
} from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

interface ProgressBarTransitionProvider {
  start: () => void;
  stop: () => void;
}

const ProgressBarTransitionCtx =
  createContext<ProgressBarTransitionProvider | null>(null);

interface ProgressBarProgressProvider {
  progress: number;
  isLoading: boolean;
}

const ProgressBarProgressCtx =
  createContext<ProgressBarProgressProvider | null>(null);

const STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  COMPLETING: "COMPLETING",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

const DEFAULT_TIMEOUT = 200;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

function defaultUpdateProgress(
  currentProgress: number,
  easingFunction = easeOutExpo,
  maxProgress: number = 0.95,
): number {
  if (currentProgress >= maxProgress) {
    return maxProgress;
  }

  const remainingProgress = maxProgress - currentProgress;
  const increment = Math.min(remainingProgress, 0.1);
  const t = increment / remainingProgress;
  const easedIncrement = easingFunction(t) * increment;
  const newProgress = currentProgress + easedIncrement;

  return Math.min(newProgress, maxProgress);
}

interface ProviderProps {
  updateProgress?: (progress: number) => number;
  timeout?: number;
  children: ReactNode;
}

type ProgressInternal = (params: Omit<ProviderProps, "children">) => {
  loading: boolean;
  start: () => void;
  stop: () => void;
  progress: number;
};

const useProgressInternal: ProgressInternal = ({
  updateProgress = defaultUpdateProgress,
  timeout = DEFAULT_TIMEOUT,
}) => {
  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === STATUS.COMPLETING) {
      setProgress(1);
      timer = setTimeout(() => {
        setStatus(STATUS.IDLE);
        setProgress(0);
      }, timeout);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleStart = useCallback(() => {
    setStatus(STATUS.LOADING);
  }, []);

  const handleComplete = useCallback(() => {
    setStatus(STATUS.COMPLETING);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const updater = (): void => {
      setProgress((oldProgress) => updateProgress(oldProgress));
    };

    if (status === STATUS.LOADING) {
      timer = setInterval(updater, timeout);
    }

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return {
    loading: status === STATUS.LOADING || status === STATUS.COMPLETING,
    start: handleStart,
    stop: handleComplete,
    progress,
  };
};

export function ProgressBarProvider(props: ProviderProps): React.ReactNode {
  const progress = useProgressInternal({
    timeout: props.timeout,
    updateProgress: props.updateProgress,
  });

  const transitionValue = useMemo(
    () => ({ start: progress.start, stop: progress.stop }),
    [progress.start, progress.stop],
  );

  const progressValue = useMemo(
    () => ({ progress: progress.progress, isLoading: progress.loading }),
    [progress.progress, progress.loading],
  );

  return (
    <ProgressBarTransitionCtx.Provider value={transitionValue}>
      <ProgressBarProgressCtx.Provider value={progressValue}>
        {props.children}
      </ProgressBarProgressCtx.Provider>
    </ProgressBarTransitionCtx.Provider>
  );
}

export function useProgressBarTransition(): ProgressBarTransitionProvider {
  const ctx = useContext(ProgressBarTransitionCtx);

  if (!ctx) {
    throw new Error(
      "ProgressBarTransition not found. Make sure to use `ProgressBarProvider` before using the progress bar.",
    );
  }

  return ctx;
}

export function useProgressBarProgress(): ProgressBarProgressProvider {
  const ctx = useContext(ProgressBarProgressCtx);

  if (!ctx) {
    throw new Error(
      "ProgressBarProgress not found. Make sure to use `ProgressBarProvider` before using the progress bar.",
    );
  }

  return ctx;
}

interface ProgressBarProps {
  className?: string;
}

export function ProgressBar({ className }: ProgressBarProps) {
  const { progress, isLoading } = useProgressBarProgress();
  return (
    <div
      className={cn(
        "bg-primary fixed top-0 left-0 z-[9999] h-1 overflow-hidden transition-[width] duration-200 ease-in-out",
        className,
      )}
      style={{
        width: `${progress * 100}%`,
        visibility: isLoading ? "visible" : "hidden",
      }}
    />
  );
}

function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

export function Link({
  href,
  children,
  replace,
  scroll,
  ...rest
}: {
  href: string;
} & Omit<Parameters<typeof NextLink>[0], "link">): React.ReactElement {
  const router = useRouter();
  const { start, stop } = useProgressBarTransition();
  return (
    <NextLink
      href={href}
      onClick={(e) => {
        if (isModifiedEvent(e)) {
          return;
        }
        e.preventDefault();
        start();
        startTransition(() => {
          if (replace) {
            router.replace(href, { scroll });
          } else {
            router.push(href, { scroll });
          }
          stop();
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
