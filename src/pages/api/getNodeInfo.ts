import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  data: {
    getNode: {
      graph_info: {
        channels: {
          total_capacity: string;
          num_channels: number;
        };
        last_update: string;
        node: {
          alias: string;
        };
      };
    };
  };
};

type ErrorType = {
  errors: { message: string; path: string[]; extension: { code: string } }[];
};
type ResponseType = Data | ErrorType;
export type GetNodeInfoResponseType = {
  nodeInfo: ReturnType<typeof mapApiResponse>;
};

function mapApiResponse(data: Data) {
  const graphInfo = data.data.getNode.graph_info;

  return {
    alias: graphInfo.node.alias,
    lastUpdate: graphInfo.last_update,
    numChannels: graphInfo.channels.num_channels,
    totalCapacity: graphInfo.channels.total_capacity,
  };
}

const query = `
    query GetNode($pubkey: String!) {
      getNode(pubkey: $pubkey) {
        graph_info {
          channels {
            num_channels
            total_capacity
          }
          last_update
          node {
            alias
            pub_key
          }
        }
      }
    }
  `;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GRAPHQL_ENDPOINT = "https://api.amboss.space/graphql";
  const pubkey = req.query.pubkey;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { pubkey },
      }),
    });

    const data: ResponseType = await response.json();

    if ("errors" in data) {
      return res.status(500).json({
        message: data.errors[0].message,
      });
    }

    res.status(200).json({ nodeInfo: mapApiResponse(data) });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
