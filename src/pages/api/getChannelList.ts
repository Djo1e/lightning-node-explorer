import { ChannelInfoResponse } from "@/components/data-table";
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
              node2_policy: {
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

function mapApiResponse(data: Data): ChannelInfoResponse {
  const list = data.data.getNode.graph_info.channels.channel_list.list;
  const channels = list.map((item) => {
    const { node2_pub, node2_policy, short_channel_id, node2_info, capacity } =
      item;

    return {
      id: node2_pub,
      pubkey: node2_pub,
      alias: node2_info.node.alias,
      disabled: node2_policy.disabled,
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

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const GRAPHQL_ENDPOINT = "https://api.amboss.space/graphql";

  const query = `
    query Pagination($pubkey: String!, $page: PageInput, $order: OrderChannelInput) {
      getNode(pubkey: $pubkey) {
        graph_info {
          channels {
            channel_list(page: $page, order: $order) {
              pagination {
                limit
                offset
              }
              list {
                block_age
                capacity
                chan_point
                last_update
                last_update_date
                long_channel_id
                node1_pub
                node2_pub
                short_channel_id
                node2_policy {
                  disabled
                }
                node2_info {
                  node {
                    alias
                  }
                }
              }
            }
            total_capacity
            num_channels
          }
          last_update
          node {
            alias
          }
        }
      }
    }
  `;

  const variables = {
    pubkey:
      "03a1f3afd646d77bdaf545cceaf079bab6057eae52c6319b63b5803d0989d6a72f",
    page: {
      limit: 10,
      offset: 0,
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
        query,
        variables,
      }),
    });

    const data = (await response.json()) as Data;
    res.status(200).json(mapApiResponse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
