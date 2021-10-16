import { Request, Response } from "express";
import { ProtectedRequest, tennisApiResponseType } from "../ts/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { formatTennisApiResponse } from "../utils/dataFormatting";

const getMatchesByDate = async (req: ProtectedRequest, res: Response) => {
  try {
    const { Date } = req.body;
    const config = {
      headers: {
        "x-rapidapi-host": process.env.X_RapidAPI_Host,
        "x-rapidapi-key": process.env.x_rapidapi_key,
      },
      params: { Category: "tennis", Date },
    } as AxiosRequestConfig;

    const tennisApiResponse = await axios.get<tennisApiResponseType>(
      "https://livescore6.p.rapidapi.com/matches/v2/list-by-date",
      config
    );

    const formattedResults = formatTennisApiResponse(tennisApiResponse.data);

    res.status(200).send(formattedResults);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export const tennisControllers = {
  getMatchesByDate,
};
