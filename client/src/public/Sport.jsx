import React from "react";
import { useFetchDepartmentQuery } from "../redux/apis/adminApi";

const Sport = () => {
    const { data, isLoading, isError } = useFetchDepartmentQuery();



    return <>



        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">🏆 School Sports Activities</h1>

            <div className="space-y-10 max-w-6xl mx-auto">
                {data
                    ?.filter((item) => item.category === "sport")
                    .map((item) => (
                        <div key={item.id} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 ">
                                {item.name}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {item.images?.map((img) => (
                                    <img
                                        // key={index}
                                        src={img}
                                        alt="images"
                                        className="w-64 h-64 "
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-gray-600 mt-4">
                                <span className="font-medium">Coach:</span> Mr. {item.head}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    </>
};

export default Sport;
