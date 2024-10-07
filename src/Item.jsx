import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
   "https://backend-staging.beleef.com.au/api/v1/marketingPrice";

const MarketingPriceList = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchItems = async () => {
         try {
            const response = await axios.get(API_BASE_URL);
            const categoriesWithCheckedItems = response.data.map(
               (category) => ({
                  ...category,
                  items: category.items.map((item) => ({
                     ...item,
                     isChecked: false,
                  })),
               })
            );
            console.log(categoriesWithCheckedItems);
            setItems(categoriesWithCheckedItems); // Assuming response.data contains the items
         } catch (err) {
            console.error("Error fetching data:", err); // Log the full error for more details
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchItems();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div>
         <h1>Marketing Prices</h1>
         <ul>
            {items.map((item) => (
               <li key={item.id}>
                  {" "}
                  <h2>{item.name}</h2> <p>Price: ${item.price}</p>{" "}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default MarketingPriceList;
