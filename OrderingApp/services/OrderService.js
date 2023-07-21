import { getToken, storeToken } from "./TokenStorage";

//const BASE_URL = 'http://10.0.2.2:3912'; //5136
const BASE_URL = 'http://localhost:3913/'

class ApiError extends Error {
    constructor(validationErrors, ...params) {
        super(...params);

        this.validationErrors = validationErrors;
    }
}

function flattenModelStateErrors(modelStateErrors) {
    const validationErrors = [];

    for (const property in modelStateErrors) {
        for (const modelStateError of modelStateErrors[property]) {
            validationErrors.push(modelStateError);
        }
    }
    return validationErrors;
}

export async function getTableData() {
    const url = new URL('api/v1/order/tables', BASE_URL);
   
    const response = await fetch(url, {
        method: 'GET',
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }        
    });
    const data = await response.json();
    
    return data;
}

export async function startNewOrder(order) {
    const finalUrl = new URL('api/v1/order/start', BASE_URL);

    const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    if (response.status === 400) {
        const modelStateErrors = await response.json();
        const validationErrors = flattenModelStateErrors(modelStateErrors);

        throw new ApiError(validationErrors,
            "There was an error saving the order"
        );
    }

    return await response.json();
}

export async function getOrderData() {
    const url = new URL('api/v1/order', BASE_URL);
    const token = await getToken();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        throw new Error('You must be authenticated to access this resource!');
    } else if (response.status === 403) {
        throw new Error('You do not have the authorization to access this resource!');
    }

    const data = await response.json();
    
    return data;
}