export const GetChannelListQuery = `
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
