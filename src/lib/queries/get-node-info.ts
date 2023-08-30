export const getNodeInfoQuery = `
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
