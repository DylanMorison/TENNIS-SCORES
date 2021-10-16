import { Request } from "express";

/**
 *TODO: get correct type of user
 */
export type ProtectedRequest = {
  user?: any;
  Date?: string;
} & Request;

type Team = {
  Nm: string;
  ID: string;
  tbd: number;
  EL: any;
  Gd: number;
  Pids: any;
  CoNm: string;
  CoId: string;
};

export type Event = {
  Eid: string;
  Pids: any;
  Eps: string;
  Esid: number;
  Epr: number;
  Ecov: number;
  ErnO: number;
  Ern: number;
  ErnInf: string;
  Ewt: number;
  Et: number;
  Tr1: string;
  Tr2: string;
  Tr1S1: string;
  Tr2S1: string;
  Tr1S2: string;
  Tr2S2: string;
  Tr1S3: string;
  Tr2S3: string;
  Tr1S4: string;
  Tr2S4: string;
  Tr1S5: string;
  Tr2S5: string;
  T1: Team[];
  T2: Team[];
  IncsX: number;
  ComX: number;
  LuX: number;
  StatX: number;
  SubsX: number;
  SDFowX: number;
  SDInnX: number;
  Esd: number;
  LuUT: number;
  Eds: number;
  Edf: number;
  EO: number;
  Eact: number;
  // "Stg":{...}12 items
  Ehid: number;
  // "Sids":{...}3 items
  Pid: number;
  Spid: number;
};

type Stage = {
  Sid: string;
  Snm: string;
  Scd: string;
  Cid: string;
  Cnm: string;
  Csnm: string;
  Ccd: string;
  Ccdiso: string;
  Scu: number;
  Chi: number;
  Shi: number;
  Sdn: string;
  Events: Event[];
};

export type tennisApiResponseType = {
  Stages: Stage[];
};
