import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
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
            short_channel_id: string;
          };
        }[];
      };
    };
  };
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
              }
            }
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

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers, like authorization headers
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    res.status(500).json(data.errors);
  } else {
    res.status(200).json(data.data);
  }
}
