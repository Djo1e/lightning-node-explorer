import { GRAPHQL_ENDPOINT } from "@/lib/constants";
import { getPopularNodesQuery } from "@/lib/queries/get-popular-nodes";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  data: {
    getPopularNodes: string[];
  };
};

type ErrorType = {
  errors: { message: string; path: string[]; extension: { code: string } }[];
};
type ResponseType = Data | ErrorType;

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getPopularNodesQuery,
      }),
    });

    const data: ResponseType = await response.json();

    if ("errors" in data) {
      return res.status(500).json({
        message: data.errors[0].message,
      });
    }

    res.status(200).json({ popularNodes: data.data.getPopularNodes });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
