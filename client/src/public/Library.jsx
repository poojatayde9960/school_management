import React from "react";
import { useFetchDepartmentQuery } from "../redux/apis/adminApi";

const Library = () => {
    const { data } = useFetchDepartmentQuery()

    const facilities = [
        "Reading Hall with comfortable seating",
        "Digital Library with internet access",
        "Book Lending & Circulation Desk",
        "Reference Section with encyclopedias & handbooks",
        "National & International Journals Section",
        "Access to Online E-Resources and eBooks",
        "Photocopy, Printing, and Scanning Facilities",
        "OPAC (Online Public Access Catalog)",
        "Private Study Cubicles & Group Study Areas",
        "Book Bank for needy students",
        "Library Orientation Sessions",
        "Competitive Exam Book Collection",
    ];

    return <>

        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
                🏆 School Library Activities
            </h1>


            {/* <div className="bg-gray-100 min-h-screen p-6"> */}
            {/* <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">🏆 School Sports Activities</h1> */}

            <div className="space-y-10  ">
                {data
                    ?.filter((item) => item.category === "library")
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
            {/* </div> */}


            <div className="w-full mt-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Library Facilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {facilities && facilities.map((item) => (
                        <div key={item} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                            <p className="text-gray-700 text-sm">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    </>
};

export default Library;





