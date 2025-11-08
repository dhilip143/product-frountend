import React from 'react';

const AdminDashboard = () => {
    return (
        // Main container with max width and horizontal padding (mimics red lines)
        <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="w-full max-w-4xl"> {/* max-w-4xl is an approximation of the image's width */}

                {/* --- KPI Cards Section --- */}
                <div className="grid grid-cols-2 gap-5 mb-8">
                    
                    {/* Total Stores Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-lg font-medium text-gray-700 text-center">
                            Total Stores
                        </p>
                        {/* You would typically place a large number here */}
                    </div>

                    {/* Total Sales Person Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="text-lg font-medium text-gray-700 text-center">
                            Total sales person
                        </p>
                        {/* You would typically place a large number here */}
                    </div>
                </div>

                {/* --- Toggle Buttons Section --- */}
                <div className="flex justify-center mb-10">
                    <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        
                        {/* Sales Button (Active/Selected) */}
                        <button
                            className="px-6 py-2 text-sm font-medium bg-gray-700 text-white rounded-l-lg transition-colors duration-200 focus:outline-none"
                            // In a real app, you would add an onClick handler
                        >
                            Sales
                        </button>

                        {/* Delivery Button (Inactive) */}
                        <button
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border-l border-gray-300 rounded-r-lg transition-colors duration-200 focus:outline-none hover:bg-gray-100"
                            // In a real app, you would add an onClick handler
                        >
                            Delivery
                        </button>
                    </div>
                </div>

                {/* --- Data Table Section --- */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    {/* Table Headers */}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                        no.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                                        Store name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
                                        Sales person Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Placeholder for data rows */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;