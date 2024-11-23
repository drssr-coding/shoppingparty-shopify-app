import { GraphQLClient } from 'graphql-request';

interface ShopifyResponse {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        description: string;
        images: {
          edges: Array<{
            node: {
              url: string;
            };
          }>;
        };
        variants: {
          edges: Array<{
            node: {
              price: string;
            };
          }>;
        };
      };
    }>;
  };
}

const shopifyClient = new GraphQLClient(
  `https://${import.meta.env.VITE_SHOP_DOMAIN}/admin/api/2024-01/graphql.json`,
  {
    headers: {
      'X-Shopify-Access-Token': import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  }
);

export const getProducts = async () => {
  const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request<ShopifyResponse>(query);
    return data.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      image: edge.node.images.edges[0]?.node.url,
      price: edge.node.variants.edges[0]?.node.price
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};