// Vercel Serverless Function - Monday.com Integration for W-Kosher Questionnaire
// Boards: Companies (5091352636), Products (5091352664), Ingredients (5091352669)

const MONDAY_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU3MTQxNTA4MSwiYWFpIjoxMSwidWlkIjo0MjgzMDM3NywiaWFkIjoiMjAyNS0xMC0wOFQwOToxOTo1MS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY3NTgyNzEsInJnbiI6ImV1YzEifQ.EMr7yqc38Nd0iwuB0WgooRamRr5vHfpG7zpwG6cZ584';

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const MONDAY_API_KEY = process.env.MONDAY_API_KEY || MONDAY_TOKEN;

    // Board IDs (created via API)
    const COMPANIES_BOARD = '5091352636';
    const PRODUCTS_BOARD = '5091352664';
    const INGREDIENTS_BOARD = '5091352669';

    // Generate reference number
    const refNumber = 'WK-' + Date.now().toString(36).toUpperCase();

    try {
        const data = req.body;
        const today = new Date().toISOString().split('T')[0];

        // ========== 1. Create Company Item ==========
        const companyColumnValues = {
            // Company Info
            "text_mm099307": data.company?.id || '',                    // Company ID / Tax ID
            "text_mm09vzdx": data.company?.address || '',               // Address
            "text_mm09j9v0": data.company?.city || '',                  // City
            "text_mm09563n": data.company?.country || '',               // Country
            "text_mm09ffqj": data.company?.postalCode || '',            // Postal Code
            "phone_mm0952xz": { phone: data.company?.phone || '', countryShortName: '' }, // Phone
            "link_mm09jvpz": { url: data.company?.website || '', text: data.company?.website || '' }, // Website
            // Contact Person (Filler)
            "text_mm09cjzc": data.filler?.name || '',                   // Contact Name
            "text_mm09670j": data.filler?.position || '',               // Contact Position
            "email_mm0990gw": { email: data.filler?.email || '', text: data.filler?.email || '' }, // Contact Email
            "text_mm094f13": data.filler?.phone || '',                  // Contact Phone
            // Responsible Person
            "text_mm09yx61": data.responsible?.name || '',              // Responsible Name
            "text_mm09emgs": data.responsible?.position || '',          // Responsible Position
            "email_mm091m9w": { email: data.responsible?.email || '', text: data.responsible?.email || '' }, // Responsible Email
            "text_mm09803x": data.responsible?.phone || '',             // Responsible Phone
            // Background - Kosher Interest
            "long_text_mm092925": { text: data.background?.reason || '' },  // Kosher Reason
            "text_mm09nchf": data.background?.hadPrevious || '',        // Had Previous Kosher
            "text_mm09avm8": data.background?.previousAgency || '',     // Previous Agency
            "text_mm09escf": data.background?.producesNonKosher || '',  // Produces Non-Kosher
            "long_text_mm09vbpv": { text: data.background?.nonKosherProducts || '' }, // Non-Kosher Products
            "text_mm099k9c": data.background?.sameBuilding || '',       // Same Building
            "text_mm09t0ph": data.background?.sameLine || '',           // Same Production Line
            // Meta
            "text_mm092anp": data.language || 'en',                     // Language
            "date_mm099zx6": { date: today },                           // Submission Date
            "text_mm09kpv": refNumber,                                  // Reference Number
            "color_mm09vksn": { index: 0 }                               // Status (0=Working on it → rename to 'New' in Monday UI)
        };

        const companyResult = await mondayQuery(MONDAY_API_KEY, `
            mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
                create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
                    id
                    name
                }
            }
        `, {
            boardId: COMPANIES_BOARD,
            itemName: data.company?.name || 'New Company',
            columnValues: JSON.stringify(companyColumnValues)
        });

        const companyItemId = companyResult.data?.create_item?.id;
        if (!companyItemId) {
            console.error('Failed to create company:', JSON.stringify(companyResult));
            return res.status(500).json({
                error: 'Failed to create company in Monday.com',
                details: companyResult.errors || companyResult
            });
        }

        // ========== 2. Create Product Items ==========
        const productItemIds = {};
        let productsCreated = 0;

        if (data.products && data.products.length > 0) {
            for (const product of data.products) {
                const productValues = {
                    "text_mm09nysa": data.company?.name || '',             // Company Name
                    "text_mm094hkp": product.code || '',                   // Product Code
                    "long_text_mm09qge6": { text: product.description || '' }, // Description
                    "color_mm091h5j": getCategoryIndex(product.category),  // Category (status)
                    "text_mm09n6t5": product.line || '',                    // Production Line
                    "long_text_mm09s2f3": { text: product.remarks || '' },  // Remarks
                    "text_mm09x5gc": refNumber                             // Reference Number
                };

                try {
                    const productResult = await mondayQuery(MONDAY_API_KEY, `
                        mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
                            create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
                                id
                                name
                            }
                        }
                    `, {
                        boardId: PRODUCTS_BOARD,
                        itemName: product.name || `Product ${product.code || ''}`,
                        columnValues: JSON.stringify(productValues)
                    });

                    const productItemId = productResult.data?.create_item?.id;
                    if (productItemId) {
                        const key = product.code || String(product.id);
                        productItemIds[key] = productItemId;
                        productsCreated++;
                    } else {
                        console.error('Product creation failed:', JSON.stringify(productResult));
                    }
                } catch (e) {
                    console.error('Product error:', e.message);
                }
            }
        }

        // ========== 3. Create Ingredient Items ==========
        let ingredientsCreated = 0;
        const ingredientItems = []; // { itemId, productCodes }

        if (data.ingredients && data.ingredients.length > 0) {
            for (const ingredient of data.ingredients) {
                // Map product codes to product names for readable display
                const usedInProducts = (ingredient.productCodes || []).join(', ');

                const ingredientValues = {
                    "text_mm09z5vw": data.company?.name || '',             // Company Name
                    "text_mm09hesr": usedInProducts,                       // Used in Products
                    "color_mm09pd2p": getFunctionIndex(ingredient.function), // Function (status)
                    "text_mm09pxns": ingredient.supplier || '',             // Supplier
                    "text_mm09z4h": ingredient.origin || '',                // Country of Origin
                    "text_mm09q56v": ingredient.certType || '',             // Certification Type
                    "text_mm09jvh": ingredient.animal || '',                // Animal Origin
                    "long_text_mm09s177": { text: ingredient.remarks || '' }, // Remarks
                    "text_mm09gkks": refNumber                             // Reference Number
                };

                // Add cert expiry date if provided
                if (ingredient.certExpiry) {
                    ingredientValues["date_mm09ep6"] = { date: ingredient.certExpiry };
                }

                try {
                    const ingResult = await mondayQuery(MONDAY_API_KEY, `
                        mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
                            create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
                                id
                            }
                        }
                    `, {
                        boardId: INGREDIENTS_BOARD,
                        itemName: ingredient.name || 'Unnamed Ingredient',
                        columnValues: JSON.stringify(ingredientValues)
                    });
                    const ingItemId = ingResult.data?.create_item?.id;
                    if (ingItemId) {
                        ingredientsCreated++;
                        ingredientItems.push({ itemId: ingItemId, productCodes: ingredient.productCodes || [] });
                    }
                } catch (e) {
                    console.error('Ingredient error:', e.message);
                }
            }
        }

        // ========== 4. Auto-link items via Connect Boards columns ==========
        await autoLinkItems(MONDAY_API_KEY, {
            companyItemId,
            productItemIds,      // { productCode: mondayItemId }
            ingredientItems,     // [{ itemId, productCodes }]
            COMPANIES_BOARD,
            PRODUCTS_BOARD,
            INGREDIENTS_BOARD
        });

        // ========== 5. Log summary ==========
        console.log(`✅ Questionnaire submitted: ${data.company?.name} | Ref: ${refNumber} | Products: ${productsCreated} | Ingredients: ${ingredientsCreated}`);

        return res.status(200).json({
            success: true,
            referenceNumber: refNumber,
            companyId: companyItemId,
            productsCreated,
            ingredientsCreated,
            // Return item IDs for file uploads (frontend will upload files separately)
            productItems: productItemIds,       // { productCode: mondayItemId }
            ingredientItemIds: ingredientItems.map(i => ({
                itemId: i.itemId,
                productCodes: i.productCodes
            })),
            // File column IDs for uploads
            fileColumns: {
                companyDocs: 'file_mm0ac1g2',     // Companies board: Documents
                productLabel: 'file_mm0aja07',     // Products board: Label File
                ingredientCert: 'file_mm0aq0mk',   // Ingredients board: Kosher Certificate
                ingredientSpec: 'file_mm0angtq'     // Ingredients board: Spec Sheet
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

// ========== Helper Functions ==========

// Monday.com GraphQL query
async function mondayQuery(apiKey, query, variables = {}) {
    const response = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey,
            'API-Version': '2024-10'
        },
        body: JSON.stringify({ query, variables })
    });
    return response.json();
}

// Map product category to Monday status index
// Default Monday labels: 0=Working on it, 1=Done, 2=Stuck
// Users should customize these labels in Monday.com UI:
// Products: 0=Dairy, 1=Meat, 2=Pareve, 3=Passover
function getCategoryIndex(category) {
    const map = { dairy: 0, meat: 1, pareve: 2, passover: 3 };
    return category in map ? { index: map[category] } : {};
}

// Map ingredient function to Monday status index
// Users should customize these labels in Monday.com UI:
// Ingredients: 0=Main, 1=Additive, 2=Preservative, 3=Flavoring, 4=Coloring, 5=Emulsifier
function getFunctionIndex(func) {
    const map = { main: 0, additive: 1, preservative: 2, flavoring: 3, coloring: 4, emulsifier: 5, other: 6 };
    return func in map ? { index: map[func] } : {};
}

// Auto-link items via Connect Boards columns (if they exist)
// User must manually create Connect Boards columns in Monday.com UI:
//   Products board: "Company" → connects to W-Kosher Companies board
//   Ingredients board: "Company" → connects to W-Kosher Companies board
//   Ingredients board: "Products" → connects to W-Kosher Products board
async function autoLinkItems(apiKey, { companyItemId, productItemIds, ingredientItems, COMPANIES_BOARD, PRODUCTS_BOARD, INGREDIENTS_BOARD }) {
    try {
        // Query board columns to find any board_relation (Connect Boards) columns
        const boardsResult = await mondayQuery(apiKey, `{
            boards(ids: [${PRODUCTS_BOARD}, ${INGREDIENTS_BOARD}]) {
                id
                columns { id type settings_str }
            }
        }`);

        const boards = boardsResult.data?.boards || [];
        if (boards.length === 0) return;

        for (const board of boards) {
            const connectCols = (board.columns || []).filter(c => c.type === 'board_relation');
            if (connectCols.length === 0) continue;

            for (const col of connectCols) {
                let settings = {};
                try { settings = JSON.parse(col.settings_str || '{}'); } catch(e) {}
                const connectedBoardIds = (settings.boardIds || []).map(String);

                // ---- Products board: link to Company ----
                if (board.id === PRODUCTS_BOARD && connectedBoardIds.includes(COMPANIES_BOARD)) {
                    const allProductItemIds = Object.values(productItemIds);
                    for (const prodItemId of allProductItemIds) {
                        try {
                            await mondayQuery(apiKey, `
                                mutation ($boardId: ID!, $itemId: ID!, $colValues: JSON!) {
                                    change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $colValues) { id }
                                }
                            `, {
                                boardId: PRODUCTS_BOARD,
                                itemId: prodItemId,
                                colValues: JSON.stringify({ [col.id]: { item_ids: [companyItemId] } })
                            });
                        } catch(e) { console.error('Link product→company error:', e.message); }
                    }
                }

                // ---- Products board: link to Ingredients ----
                if (board.id === PRODUCTS_BOARD && connectedBoardIds.includes(INGREDIENTS_BOARD)) {
                    // For each product, find which ingredients use it and link them
                    for (const [productCode, prodItemId] of Object.entries(productItemIds)) {
                        const linkedIngIds = ingredientItems
                            .filter(ing => (ing.productCodes || []).includes(productCode))
                            .map(ing => ing.itemId);
                        if (linkedIngIds.length > 0) {
                            try {
                                await mondayQuery(apiKey, `
                                    mutation ($boardId: ID!, $itemId: ID!, $colValues: JSON!) {
                                        change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $colValues) { id }
                                    }
                                `, {
                                    boardId: PRODUCTS_BOARD,
                                    itemId: prodItemId,
                                    colValues: JSON.stringify({ [col.id]: { item_ids: linkedIngIds } })
                                });
                            } catch(e) { console.error('Link product→ingredients error:', e.message); }
                        }
                    }
                }

                // ---- Ingredients board: link to Company ----
                if (board.id === INGREDIENTS_BOARD && connectedBoardIds.includes(COMPANIES_BOARD)) {
                    for (const ing of ingredientItems) {
                        try {
                            await mondayQuery(apiKey, `
                                mutation ($boardId: ID!, $itemId: ID!, $colValues: JSON!) {
                                    change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $colValues) { id }
                                }
                            `, {
                                boardId: INGREDIENTS_BOARD,
                                itemId: ing.itemId,
                                colValues: JSON.stringify({ [col.id]: { item_ids: [companyItemId] } })
                            });
                        } catch(e) { console.error('Link ingredient→company error:', e.message); }
                    }
                }

                // ---- Ingredients board: link to Products ----
                if (board.id === INGREDIENTS_BOARD && connectedBoardIds.includes(PRODUCTS_BOARD)) {
                    for (const ing of ingredientItems) {
                        // Map ingredient's productCodes to Monday item IDs
                        const linkedProdIds = (ing.productCodes || [])
                            .map(code => productItemIds[code])
                            .filter(Boolean);
                        if (linkedProdIds.length > 0) {
                            try {
                                await mondayQuery(apiKey, `
                                    mutation ($boardId: ID!, $itemId: ID!, $colValues: JSON!) {
                                        change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $colValues) { id }
                                    }
                                `, {
                                    boardId: INGREDIENTS_BOARD,
                                    itemId: ing.itemId,
                                    colValues: JSON.stringify({ [col.id]: { item_ids: linkedProdIds } })
                                });
                            } catch(e) { console.error('Link ingredient→products error:', e.message); }
                        }
                    }
                }
            }
        }
        console.log('✅ Auto-link completed');
    } catch(e) {
        console.error('Auto-link skipped (no Connect Boards columns?):', e.message);
    }
}
