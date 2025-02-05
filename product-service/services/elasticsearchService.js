const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: process.env.ELASTICSEARCH_URL });

const indexProduct = async (product) => {
    await client.index({
        index: 'products',
        id: product.id,
        body: {
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
        },
    });
};

const searchProducts = async (query) => {
    const result = await client.search({
        index: 'products',
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['title', 'description', 'category'],
                },
            },
        },
    });
    return result.body.hits.hits;
};

module.exports = { indexProduct, searchProducts };
