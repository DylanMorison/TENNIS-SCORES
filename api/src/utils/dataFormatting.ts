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

type formattedStageType = {
  Sid: string;
  tournamentTitle: string;
  tournamentType: string;
  events: formattedEventType[];
};

type formattedTennisApiResponseType = {
  stages: formattedStageType[];
};

const formatTennisApiResponse = (tennisApiResponse: tennisApiResponseType) => {
  const formattedTennisApiResponse = [];

  for (let stage of tennisApiResponse.Stages) {
    const formattedData = {} as formattedStageType;
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
        results.score = createScoreStr(event, true, formattedEvent);
      } else if ((event.Tr1 === "2" && event.Tr2 === "0") || event.Tr2 === "1") {
        results.winner = formattedEvent.player1Name;
        results.score = createScoreStr(event, true, formattedEvent);
      } else {
        results.winner = formattedEvent.player2Name;
        results.score = createScoreStr(event, false, formattedEvent);
      }

      formattedEvent.results = results;
      events.push(formattedEvent);
    }

    formattedData.events = events;
    formattedTennisApiResponse.push(formattedData);
  }

  return formattedTennisApiResponse;
};

const createScoreStr = (
  event: Event,
  player1Won: boolean,
  formattedEvent: formattedEventType
) => {
  const { player1Name, player2Name } = formattedEvent;
  let scoreStr;
  if (player1Won) {
    scoreStr = `${player1Name} d. ${player2Name}\n${event.Tr1S1 || "??"}-${
      event.Tr2S1 || "??"
    } ${event.Tr1S2 || "??"}-${event.Tr2S2 || "??"} ${event.Tr1S3 || "??"}-${
      event.Tr2S3 || "??"
    } ${event.Tr1S4 || "??"}-${event.Tr2S4 || "??"} ${event.Tr1S5 || "??"}-${
      event.Tr2S5 || "??"
    }`;
  } else {
    scoreStr = `${player2Name} d. ${player1Name}\n${event.Tr2S1 || "??"}-${
      event.Tr1S1 || "??"
    } ${event.Tr2S2 || "??"}-${event.Tr1S2 || "??"} ${event.Tr2S3 || "??"}-${
      event.Tr1S3 || "??"
    } ${event.Tr2S4 || "??"}-${event.Tr1S4 || "??"} ${event.Tr2S5 || "??"}-${
      event.Tr1S5 || "??"
    }`;
  }
  while (scoreStr.includes("??-??")) {
    scoreStr = scoreStr.replace("??-??", "");
  }
  return scoreStr.trim();
};

export { formatTennisApiResponse };
