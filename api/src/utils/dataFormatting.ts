import { tennisApiResponseType, Event } from "../ts/types";

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

type formattedData = {
  Sid: string;
  tournamentTitle: string;
  tournamentType: string;
  events: formattedEventType[];
};

const formatTennisApiResponse = (tennisApiResponse: tennisApiResponseType) => {
  const formattedData = {} as formattedData;

  const { Stages } = tennisApiResponse;

  for (let stage of Stages) {
    formattedData.Sid = stage.Sid;
    formattedData.tournamentTitle = stage.Snm;
    formattedData.tournamentType = stage.Cnm;

    const events = [] as formattedEventType[];
    for (let event of stage.Events) {
      const formattedEvent = {} as formattedEventType;
      formattedEvent.Eid = event.Eid;
      if (event.T1.length === 1 && event.T2.length === 1) {
        formattedEvent.player1Name = event.T1[0].Nm;
        formattedEvent.player2Name = event.T2[0].Nm;
        formattedEvent.type = "singles";
      } else {
        formattedEvent.player1Name = `${event.T1[0].Nm}/${event.T1[1].Nm}`;
        formattedEvent.player2Name = `${event.T2[0].Nm}/${event.T2[1].Nm}`;
        formattedEvent.type = "doubles";
      }
      const results = {} as resultsType;

      if (event.Tr1 === "3") {
        results.winner = formattedEvent.player1Name;
        results.score = createScoreStr(event, true);
      } else if ((event.Tr1 === "2" && event.Tr2 === "0") || event.Tr2 === "1") {
        results.winner = formattedEvent.player1Name;
        results.score = createScoreStr(event, true);
      } else {
        results.winner = formattedEvent.player2Name;
        results.score = createScoreStr(event, false);
      }

      formattedEvent.results = results;
      events.push(formattedEvent);
    }

    formattedData.events = events;
    return formattedData;
  }
};

const createScoreStr = (event: Event, player1Won: boolean) => {
  if (player1Won) {
    return `${event.Tr1S1 || "0"}-${event.Tr2S1 || "0"} ${event.Tr1S2 || "0"}-${
      event.Tr2S2 || "0"
    } ${event.Tr1S3 || "0"}-${event.Tr2S3 || "0"} ${event.Tr1S4 || "0"}-${
      event.Tr2S4 || "0"
    } ${event.Tr1S5 || "0"}-${event.Tr2S5 || "0"}`;
  } else {
    return `${event.Tr2S1 || "0"}-${event.Tr1S1 || "0"} ${event.Tr2S2 || "0"}-${
      event.Tr1S2 || "0"
    } ${event.Tr2S3 || "0"}-${event.Tr1S3 || "0"} ${event.Tr2S4 || "0"}-${
      event.Tr1S4 || "0"
    } ${event.Tr2S5 || "0"}-${event.Tr1S5 || "0"}`;
  }
};

export { formatTennisApiResponse };
