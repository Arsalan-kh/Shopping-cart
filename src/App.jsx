import { useState } from "react";
import "./App.css";
import { marketingItems, accordionData } from "./helper";
import {
   Disclosure,
   DisclosureButton,
   DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
function App() {
   const [items, setItems] = useState(accordionData);
   const [agentContribution, setAgentContribution] = useState(0);

   const [isAgentContributionChecked, setIsAgentContributionChecked] =
      useState(false);

   // // Handle price change
   // const handlePriceChange = (id, newPrice) => {
   //    const value = Math.max(0, parseFloat(newPrice) || 0);
   //    setItems((prevItems) =>
   //       prevItems.map((category) => ({
   //          ...category,
   //          items: category.items.map((item) =>
   //             item.id === id ? { ...item, price: value || 0 } : item
   //          ),
   //       }))
   //    );
   // };

   // Handle checkbox change
   const handleCheckboxChange = (id) => {
      setItems((prevItems) =>
         prevItems.map((category) => ({
            ...category,
            items: category.items.map((item) =>
               item.id === id ? { ...item, isChecked: !item.isChecked } : item
            ),
         }))
      );
   };

   const handleAgentContributionChange = (e) => {
      const value = Math.max(0, parseFloat(e.target.value) || 0);
      setAgentContribution(value);
   };

   const handleAgentContributionCheckboxChange = () => {
      setIsAgentContributionChecked(!isAgentContributionChecked);
   };

   // Calculate total price for selected items
   const totalPrice = items.reduce(
      (total, category) =>
         total +
         category.items.reduce(
            (catTotal, item) =>
               item.isChecked ? catTotal + item.price : catTotal,
            0
         ),
      0
   );

   // Apply agent contribution if applicable
   const finalTotal = isAgentContributionChecked
      ? totalPrice - agentContribution
      : totalPrice;

   return (
      <div className="w-94 mx-auto">
         <h1 className="text-2xl mb-5 text-center">MARKETING</h1>
         {items.map((category, categoryIndex) => (
            <Disclosure className="" key={categoryIndex}>
               {({ open }) => (
                  <>
                     <DisclosureButton className="w-full cursor-pointer border-b-1 bg-lightgray p-1 flex items-center justify-between">
                        <h2 className="text-lg py-3 ">{category.heading}</h2>
                        <ChevronDownIcon
                           className={`w-5 h-5 transition-transform duration-300 ${
                              open ? "rotate-180" : ""
                           }`}
                        />
                     </DisclosureButton>
                     <DisclosurePanel
                        transition
                        className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                     >
                        <table className="w-full  mt-2">
                           <tbody>
                              {category.items.map((item) => (
                                 <tr
                                    key={item.id}
                                    className="hover:bg-slate-50  "
                                 >
                                    <td className="p-2 border-b  border-slate-200">
                                       {item.name}
                                    </td>
                                    <td className="p-2 border-b border-slate-200">
                                       $ {item.price}
                                    </td>
                                    <td className="p-2 border-b border-slate-200">
                                       <input
                                          type="checkbox"
                                          checked={item.isChecked}
                                          onChange={() =>
                                             handleCheckboxChange(item.id)
                                          }
                                       />
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </DisclosurePanel>
                  </>
               )}
            </Disclosure>
         ))}

         {/* Agent Contribution */}
         <table className="w-full mt-5 border border-lightgray">
            <tbody>
               <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                     Agent Contribution
                  </td>
                  <td className="p-4 border-b border-slate-200">
                     <input
                        type="number"
                        className="w-full text-center p-1"
                        value={agentContribution}
                        onChange={handleAgentContributionChange}
                        placeholder="Enter contribution"
                     />
                  </td>
                  <td className="p-4 border-b border-slate-200">
                     <input
                        type="checkbox"
                        checked={isAgentContributionChecked}
                        onChange={handleAgentContributionCheckboxChange}
                     />
                  </td>
               </tr>

               {/* Total */}
               <tr className="hover:bg-slate-50 font-semibold">
                  <td className="p-4 border-t text-center">TOTAL</td>
                  <td className="p-4 border-t text-center">${finalTotal}</td>
                  <td className="p-4 border-t"></td>
               </tr>
            </tbody>
         </table>

         <div className="flex justify-center mt-5">
            <button className="bg-gray-300 text-black px-10 rounded-full">
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
