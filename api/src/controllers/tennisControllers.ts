import { Request, Response } from "express";
import { ProtectedRequest } from "../ts/types";
import axios from "axios";

const getMatchesByDate = async (req: ProtectedRequest, res: Response) => {
  try {
    res.status(200).send("getMatchesByDate");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export const tennisControllers = {
  getMatchesByDate,
};
