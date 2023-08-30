import { ChannelInfoResponse, PAGE_SIZE } from "@/components/data-table";
import { GRAPHQL_ENDPOINT } from "@/lib/constants";
import { GetChannelListQuery } from "@/lib/queries/get-channel-list";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  data: {
    getNode: {
      graph_info: {
        channels: {
          channel_list: {
            pagination: {
              limit: number;
              offset: number;
            };
            list: {
              block_age: number;
              capacity: string;
              chan_point: string;
              last_update: number;
              last_update_date: string;
              long_channel_id: string;
              node1_pub: string;
              node2_pub: string;
              node2_policy?: {
                disabled: boolean;
              };
              node2_info: {
                node: {
                  alias: string;
                };
              };
              short_channel_id: string;
            }[];
          };
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

function mapApiResponse(data: Data): ChannelInfoResponse {
  const list = data.data.getNode.graph_info.channels.channel_list.list;
  const channels = list.map((item) => {
    const { node2_pub, node2_policy, short_channel_id, node2_info, capacity } =
      item;

    return {
      id: node2_pub,
      pubkey: node2_pub,
      alias: node2_info.node.alias,
      disabled: node2_policy?.disabled,
      capacity: Number(capacity),
      shortChannelId: short_channel_id,
    };
  });

  return {
    channels,
    numChannels: data.data.getNode.graph_info.channels.num_channels,
    totalCapacity: data.data.getNode.graph_info.channels.total_capacity,
    lastUpdate: data.data.getNode.graph_info.last_update,
    alias: data.data.getNode.graph_info.node.alias,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pubkey, pageIndex } = req.query as unknown as {
    pubkey: string;
    pageIndex: string;
  };

  const pageIndexNumber = Number(pageIndex);

  const variables = {
    pubkey,
    page: {
      limit: PAGE_SIZE,
      offset: 10 * pageIndexNumber,
    },
    order: {
      by: "capacity",
      direction: "ASC",
    },
  };

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GetChannelListQuery,
        variables,
      }),
    });

    const data: ResponseType = await response.json();

    if ("errors" in data) {
      return res.status(500).json({
        message: data.errors[0].message,
      });
    }

    res.status(200).json(mapApiResponse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
