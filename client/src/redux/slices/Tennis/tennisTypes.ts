type resultsType = {
  winner?: string;
  score: string;
};

type formattedEventType = {
  Eid: string;
  player1Name: string;
  player2Name: string;
  type: "singles" | "doubles";
  results: resultsType;
};

export type formattedStageType = {
  Sid: string;
  tournamentTitle: string;
  tournamentType: string;
  events: formattedEventType[];
};


export type tennisSliceType = {
  error: string | null;
  loading: boolean;
  matchesByDate: formattedStageType[] | null;
};

export type tennisMatchesByDateFailure = {
  error: string;
};
