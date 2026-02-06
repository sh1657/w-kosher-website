// Vercel Serverless Function - Upload file to Monday.com item
// Uses multipart/form-data to upload to Monday.com /v2/file endpoint

const MONDAY_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU3MTQxNTA4MSwiYWFpIjoxMSwidWlkIjo0MjgzMDM3NywiaWFkIjoiMjAyNS0xMC0wOFQwOToxOTo1MS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY3NTgyNzEsInJnbiI6ImV1YzEifQ.EMr7yqc38Nd0iwuB0WgooRamRr5vHfpG7zpwG6cZ584';

// Disable Vercel's default body parsing so we can handle multipart ourselves
module.exports.config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb'
        }
    }
};

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const MONDAY_API_KEY = process.env.MONDAY_API_KEY || MONDAY_TOKEN;

    try {
        const { itemId, columnId, fileName, fileBase64, fileType } = req.body;

        if (!itemId || !columnId || !fileBase64) {
            return res.status(400).json({ error: 'Missing required fields: itemId, columnId, fileBase64' });
        }

        // Convert base64 to Buffer
        const fileBuffer = Buffer.from(fileBase64, 'base64');
        const safeFileName = fileName || 'file.pdf';

        // Build multipart form data manually for Monday.com /v2/file endpoint
        const boundary = '----MondayFileUpload' + Date.now();
        const query = `mutation ($file: File!) { add_file_to_column(item_id: ${itemId}, column_id: "${columnId}", file: $file) { id } }`;

        const bodyParts = [];

        // Part 1: query
        bodyParts.push(
            `--${boundary}\r\n`,
            `Content-Disposition: form-data; name="query"\r\n\r\n`,
            `${query}\r\n`
        );

        // Part 2: file as "variables[file]"
        bodyParts.push(
            `--${boundary}\r\n`,
            `Content-Disposition: form-data; name="variables[file]"; filename="${safeFileName}"\r\n`,
            `Content-Type: ${fileType || 'application/octet-stream'}\r\n\r\n`
        );

        // We need to combine text parts + binary part + closing boundary
        const textBefore = Buffer.from(bodyParts.join(''));
        const textAfter = Buffer.from(`\r\n--${boundary}--\r\n`);
        const fullBody = Buffer.concat([textBefore, fileBuffer, textAfter]);

        const response = await fetch('https://api.monday.com/v2/file', {
            method: 'POST',
            headers: {
                'Authorization': MONDAY_API_KEY,
                'API-Version': '2024-10',
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            body: fullBody
        });

        const result = await response.json();

        if (result.errors) {
            console.error('Monday file upload error:', JSON.stringify(result.errors));
            return res.status(500).json({ error: 'Monday.com file upload failed', details: result.errors });
        }

        const assetId = result.data?.add_file_to_column?.id;
        console.log(`✅ File uploaded: ${safeFileName} → item ${itemId}, column ${columnId}, asset ${assetId}`);

        return res.status(200).json({ success: true, assetId });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'File upload failed', message: error.message });
    }
};
