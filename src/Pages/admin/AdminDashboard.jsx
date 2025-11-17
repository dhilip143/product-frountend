// import React, { useEffect, useState } from "react";

// const DashboardLayout = () => {
//   const [totalSalesPersons, setTotalSalesPersons] = useState(0);
//   const [totalShops, setTotalShops] = useState(0);

//   useEffect(() => {
//     const fetchTotalSalesPersons = async () => {
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:8000/blog/get_total_salesregister/"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch total sales person data");
//         }

//         const data = await response.json();

//         // Updated response handling
//         if (data.count_salesregister !== undefined) {
//           setTotalSalesPersons(data.count_salesregister);
//         } else {
//           setTotalSalesPersons(0);
//         }
//       } catch (error) {
//         console.error("Error fetching total sales person:", error);
//       }
//     };

//     const fetchTotalShops = async () => {
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:8000/blog/total-shops/"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch total shops data");
//         }

//         const data = await response.json();

//         // Handle shop count response
//         if (data.count_shop !== undefined) {
//           setTotalShops(data.count_shop);
//         } else {
//           setTotalShops(0);
//         }
//       } catch (error) {
//         console.error("Error fetching total shops:", error);
//       }
//     };

//     fetchTotalSalesPersons();
//     fetchTotalShops();
//   }, []);

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="w-full max-w-4xl">
//         {/* --- KPI Cards Section --- */}
//         <div className="grid grid-cols-2 gap-5 mb-8">
//           {/* Total Stores Card */}
//           <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//             <p className="text-lg font-medium text-gray-700 text-center">
//               Total Stores
//             </p>
//             <p className="text-3xl font-bold text-center text-gray-800 mt-2">
//               {totalShops}
//             </p>
//           </div>

//           {/* Total Sales Person Card */}
//           <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//             <p className="text-lg font-medium text-gray-700 text-center">
//               Total Sales Person
//             </p>
//             <p className="text-3xl font-bold text-center text-gray-800 mt-2">
//               {totalSalesPersons}
//             </p>
//           </div>
//         </div>

//         {/* --- Toggle Buttons Section --- */}
//         <div className="flex justify-center mb-10">
//           <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            // <button
            //   className="px-6 py-2 text-sm font-medium bg-gray-700 text-white rounded-l-lg transition-colors duration-200 focus:outline-none"
            // >
            //   Sales
            // </button>

            // <button
            //   className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border-l border-gray-300 rounded-r-lg transition-colors duration-200 focus:outline-none hover:bg-gray-100"
            // >
            //   Delivery
            // </button>
//           </div>
//         </div>

//         {/* --- Data Table Section --- */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
//                     no.
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
//                     Store name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
//                     Sales person Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ...
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React, { useEffect, useState } from "react";

const DashboardLayout = () => {
  const [totalSalesPersons, setTotalSalesPersons] = useState(0);
  const [totalShops, setTotalShops] = useState(0);
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const fetchTotalSalesPersons = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/blog/get_total_salesregister/"
        );

        if (!response.ok) throw new Error("Failed to fetch total sales");

        const data = await response.json();
        setTotalSalesPersons(data.count_salesregister ?? 0);
      } catch (error) {
        console.error("Error fetching total sales person:", error);
      }
    };

    const fetchTotalShops = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/blog/total-shops/");

        if (!response.ok) throw new Error("Failed to fetch shops");

        const data = await response.json();
        setTotalShops(data.count_shop ?? 0);
      } catch (error) {
        console.error("Error fetching total shops:", error);
      }
    };

    const fetchSalesRegisterList = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/blog/salesregister_list/"
        ); // ✅ Correct API Used

        if (!response.ok) throw new Error("Failed to fetch sales list");

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setSalesList(data.data);
        } else {
          setSalesList([]);
        }
      } catch (error) {
        console.error("Error fetching sales list:", error);
      }
    };

    fetchTotalSalesPersons();
    fetchTotalShops();
    fetchSalesRegisterList();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-4xl">


        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 text-center">Total Stores</p>
            <p className="text-3xl font-bold text-center text-gray-800 mt-2">
              {totalShops}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 text-center">Total Sales Person</p>
            <p className="text-3xl font-bold text-center text-gray-800 mt-2">
              {totalSalesPersons}
            </p>
          </div>
        </div>
           
             <button
              className="px-6 py-2 text-sm font-medium bg-gray-700 text-white rounded-l-lg transition-colors duration-200 focus:outline-none"
            >
              Sales
            </button>

            <button
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border-l border-gray-300 rounded-r-lg transition-colors duration-200 focus:outline-none hover:bg-gray-100"
            >
              Delivery
            </button>
       
        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          
          <div className="overflow-x-auto">
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-xs text-gray-500 uppercase">No.</th>
                  <th className="px-6 py-3 text-xs text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-xs text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-xs text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-xs text-gray-500 uppercase">Address</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {salesList.length > 0 ? (
                  salesList.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{item.firstname}</td>
                      <td className="px-6 py-4 text-sm">{item.email}</td>
                      <td className="px-6 py-4 text-sm">{item.phonenumber}</td>
                      <td className="px-6 py-4 text-sm">{item.address}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No Sales Register Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
