import { useRef } from "react";
import { useFetcher } from "react-router";
import type { Screentime, SendScreentimes } from "~/types/screentime";

export const useScreentime = (id: number) => {
  const ref = useRef<Screentime>({
    start: 0,
    end: 0,
  });
  const fetcher = useFetcher();

  const start = () => {
    const now = new Date().getTime();
    ref.current.start = now;
  };
  const end = () => {
    const now = new Date().getTime();
    ref.current.end = now;
  };
  const reset = () => {
    ref.current = {
      start: 0,
      end: 0,
    };
  };

  const sendScreentime = async (isQuestion: boolean) => {
    const s = ref.current;
    if (!s.start || !s.end || s.start >= s.end) return;

    const json = {
      id,
      isQuestion,
      ...s,
    } satisfies SendScreentimes;
    await fetcher.submit(json, {
      method: "POST",
      encType: "application/json",
      action: "/api/stat/screentime",
    });
  };

  return {
    start,
    end,
    reset,
    sendScreentime,
  };
};
