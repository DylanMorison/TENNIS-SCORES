import { Request } from "express";

/**
 *TODO: get correct type of user
 */
export type ProtectedRequest = {
  user?: any;
} & Request;
