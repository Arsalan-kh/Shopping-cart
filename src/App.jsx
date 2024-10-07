import { useState, useEffect } from "react";
import "./App.css";
import { marketingItems, accordionData } from "./helper";
import {
   Disclosure,
   DisclosureButton,
   DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { formatCurrency } from "./utils/utils";

import useFetchCategories from "./hooks/useFetchItems";
// import MarketingPriceList from "./Item";
function App() {
   const { categories, setCategories, loading, error } = useFetchCategories();
   const [agentContribution, setAgentContribution] = useState("$0");
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
      console.log("categoryes", categories);
      setCategories((prevCategories) =>
         prevCategories.map((category) => ({
            ...category,
            items: category.items.map((item) =>
               item._id === id ? { ...item, isChecked: !item.isChecked } : item
            ),
         }))
      );
   };

   const handleAgentContributionChange = (e) => {
      const value = e.target.value;
      // Use split to remove the dollar sign and extract numeric part
      const numericValue = value.split("$")[1]?.replace(/,/g, "") || "0"; // Get numeric part after the dollar sign
      const parsedValue = Math.max(0, parseFloat(numericValue) || 0); // Parse the number and ensure it's non-negative

      setAgentContribution(formatCurrency(parsedValue)); // Set formatted value
   };

   const handleAgentContributionCheckboxChange = () => {
      setIsAgentContributionChecked(!isAgentContributionChecked);
   };

   // Calculate total price for selected items
   const totalPrice = categories.reduce(
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
   const finalTotal = Math.max(
      0,
      isAgentContributionChecked
         ? totalPrice -
              parseFloat(agentContribution.replace(/^\$/, "").replace(/,/g, ""))
         : totalPrice // Extract numeric value from formatted agent contribution
   );

   return (
      <div className=" mx-auto">
         <h1 className="text-2xl mb-5 text-center">MARKETING</h1>

         <table className="w-full  flex justify-end border-lightgray">
            <tbody>
               {/* Loop through items and categories */}
               {categories.map((category, categoryIndex) => (
                  <>
                     {/* Category Heading Row with Chevron */}
                     <Disclosure>
                        {({ open }) => (
                           <>
                              <DisclosureButton className="w-full cursor-pointer bg-lightgray p-4 flex items-center justify-between">
                                 <h2 className="">{category.category}</h2>
                                 <ChevronDownIcon
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                       open ? "rotate-180" : ""
                                    }`}
                                 />
                              </DisclosureButton>
                              {/* Items for this category */}
                              <DisclosurePanel className="origin-top transition duration-200 ease-out">
                                 {category.items.map((item) => (
                                    <tr
                                       key={item._id}
                                       className="hover:bg-slate-50 border-b border-slate-200 flex justify-between "
                                    >
                                       <td className="py-2 px-3">
                                          {item.name}
                                       </td>
                                       <div className="">
                                          <td className="py-2 px-3 ">
                                             {formatCurrency(item.price)}
                                          </td>
                                          <td className="py-2 px-3 ">
                                             <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                onChange={() =>
                                                   handleCheckboxChange(
                                                      item._id
                                                   )
                                                }
                                             />
                                          </td>
                                       </div>
                                    </tr>
                                 ))}
                              </DisclosurePanel>
                           </>
                        )}
                     </Disclosure>
                  </>
               ))}

               {/* Agent Contribution Row */}
               <tr className="hover:bg-slate-50 border-b border-slate-200 flex justify-between">
                  <td className="py-2 px-3 ">Agent Contribution</td>
                  <div>
                     <td
                        onChange={handleAgentContributionChange}
                        className="py-2 px-3 "
                     >
                        <input
                           type="text"
                           className="w-full text-right "
                           placeholder="$0"
                           value={agentContribution}
                           onChange={handleAgentContributionChange}
                        />
                     </td>
                     <td className="py-2 px-3 ">
                        <input
                           type="checkbox"
                           checked={isAgentContributionChecked}
                           onChange={handleAgentContributionCheckboxChange}
                        />
                     </td>
                  </div>
               </tr>

               {/* Total Row */}
               <tr className="hover:bg-slate-50 font-semibold flex justify-between">
                  <td className="py-2 px-3 border-t text-center">TOTAL</td>
                  <td className="py-2 px-3 border-t text-center">
                     {formatCurrency(finalTotal)}
                  </td>
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
         {/* <MarketingPriceList /> */}
      </div>
   );
}
export default App;
