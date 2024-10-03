import { useState } from "react";
import "./App.css";
import { marketingItems } from "./helper";

function App() {
   const [items, setItems] = useState(marketingItems);
   const [agentContribution, setAgentContribution] = useState(0);
   const [isAgentContributionChecked, setIsAgentContributionChecked] =
      useState(false);

   // Function to handle price change in input field
   const handlePriceChange = (id, newPrice) => {
      const value = Math.max(0, parseFloat(newPrice) || 0);
      setItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, price: value || 0 } : item
         )
      );
   };

   // Function to toggle checkbox
   const handleCheckboxChange = (id) => {
      setItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
         )
      );
   };
   const handleAgentContributionChange = (e) => {
      const value = Math.max(0, parseFloat(e.target.value) || 0); // Default to 0 if empty or invalid
      setAgentContribution(value);
   };
   const handleAgentContributionCheckboxChange = () => {
      setIsAgentContributionChecked(!isAgentContributionChecked);
   };

   // Calculate total price for selected items
   const totalPrice = items.reduce(
      (total, item) => (item.isChecked ? total + item.price : total),
      0
   );

   // Subtract agent contribution from the total if checked
   const finalTotal = isAgentContributionChecked
      ? totalPrice - agentContribution
      : totalPrice;
   return (
      <div className="relative flex flex-col">
         <h1 className="text-2xl mb-5 text-center">Marketing</h1>
         <table className="w-80 mx-auto text-left mt-5 table-auto min-w-max border-collapse">
            <tbody>
               {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                     <td className="p-4 border-b border-slate-200 border-r border-slate-300">
                        <p className="block text-center text-sm text-slate-800">
                           {item.name}
                        </p>
                     </td>
                     <td className="p-4 border-b border-slate-200">
                        <input
                           type="number"
                           className="block w-full text-center text-sm text-slate-800 p-1 "
                           value={item.price}
                           onChange={(e) =>
                              handlePriceChange(item.id, e.target.value)
                           }
                           placeholder="Enter price"
                        />
                     </td>
                     <td className="p-4 border-b border-slate-200">
                        <input
                           type="checkbox"
                           className="h-4 w-4"
                           checked={item.isChecked}
                           onChange={() => handleCheckboxChange(item.id)}
                        />
                     </td>
                  </tr>
               ))}
               {/* Agent Contribution row */}
               <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200 border-r border-slate-300">
                     <p className="block text-sm text-center text-slate-800">
                        Agent Contribution
                     </p>
                  </td>
                  <td className="p-4  border-b border-slate-200">
                     <input
                        type="number"
                        className="block w-full text-center text-sm text-slate-800 p-1 "
                        value={agentContribution}
                        onChange={handleAgentContributionChange}
                        placeholder="Enter contribution"
                     />
                  </td>
                  <td className="p-4 border-b border-slate-200">
                     <input
                        type="checkbox"
                        className="h-4 w-4 "
                        checked={isAgentContributionChecked}
                        onChange={handleAgentContributionCheckboxChange}
                     />
                  </td>
               </tr>
               {/* Total row */}
               <tr className="hover:bg-slate-50 font-semibold">
                  <td className="p-4 border-t text-center border-slate-200 border-r border-slate-300">
                     TOTAL
                  </td>
                  <td className="p-4 border-t text-center border-slate-200">
                     ${finalTotal >= 0 ? finalTotal : 0}{" "}
                  </td>
                  <td className="p-4 border-t border-slate-200"></td>
               </tr>
            </tbody>
         </table>
         <div className="flex justify-center mt-5">
            <button className="bg-gray-300 text-black  px-10 rounded-full">
               PAY LATER
            </button>
         </div>
         <div className="flex justify-center mt-2 text-gray-500">
            OR SAVE 6% AND PAY NOW
         </div>
      </div>
   );
}
export default App;
