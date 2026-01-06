import { useEffect } from "react";
import { useScreentime } from "./screentime";
import { useInView } from "react-intersection-observer";

export const useWatchQuestion = (id: number, isQuestion: boolean) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const { start, end, reset, sendScreentime } = useScreentime(id);

  if (inView) {
    start();
  } else {
    end();
  }

  useEffect(() => {
    // I don't wanna use it!
    if (!inView) {
      // 画面から見えなくなったら送信
      sendScreentime(isQuestion).then(reset);
    }
  }, [inView]);

  return {
    ref,
  };
};
