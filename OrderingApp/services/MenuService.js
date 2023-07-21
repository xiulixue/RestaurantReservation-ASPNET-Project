import axios from 'axios';

//const BASE_URL = 'http://10.0.2.2:3913';
const BASE_URL = 'http://localhost:3913/'

export async function getMenuData() {
    const url = new URL('api/v2/menuitem', BASE_URL);
   
    // const token = await getToken();
    const response = await fetch(url, {
        method: 'GET',
        // headers: {
        //     "Authorization": `Bearer ${token}`
        //  }       
    });
    const data = await response.json();
    
    return data;
}


export async function getMenuItemDetail(itemId) {
    const url = new URL(`api/v2/menuitem/${itemId}`, BASE_URL);

    const response = await fetch(url, {
        method: 'GET',    
    });

    const data = await response.json();
    
    return data;
}

export async function CreateNewItem(newItem) {
    const finalUrl = new URL('api/v2/menuitem', BASE_URL);

    const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    });

    return await response.json();
}

export async function deleteItem(itemId) {
    const finalUrl = new URL(`api/v2/menuitem/${itemId}`, BASE_URL);
  
    const response = await fetch(finalUrl, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete menu item');
    }
}

export const updateMenuItem = async (itemId, updatedItem) => {
  const apiUrl = new URL(`api/v2/menuitem/${itemId}`, BASE_URL);

  try {
    const response = await axios.put(apiUrl, updatedItem);
    return response.data;
  } catch (error) {
    throw error;
  }

//   const response = await fetch(apiUrl, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedItem),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update menu item.");
//   }

//   return;
};