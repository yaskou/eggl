export type Screentime = {
  start: number;
  end: number;
};

export type SendScreentimes = Screentime & {
  id: number;
  isQuestion: boolean;
};
