// netlify/functions/get-submissions.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Replace with your Netlify Site ID
    const siteId = process.env.NETLIFY_SITE_ID;

    // Replace with your Netlify API Token (ensure it has read permissions for forms)
    const apiToken = process.env.NETLIFY_API_TOKEN;

    // The form name you configured
    const formId = 'ultimate-assessment';

    // Netlify Forms API endpoint
    const url = `https://api.netlify.com/api/v1/sites/${siteId}/forms/${formId}/submissions`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to fetch submissions' }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
