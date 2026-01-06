import React from 'react'
import { useGetApplicationsQuery } from '../redux/apis/applicationApi'
import clsx from 'clsx'

const ApplicationPanel = () => {
    const { data, isLoading, isError, error } = useGetApplicationsQuery()

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading applications...</div>
    if (isError) return <div className="p-8 text-center text-red-500">Error loading applications: {error?.message}</div>

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-slate-800">Admission Applications</h2>
                    <p className="text-slate-500 text-sm mt-1">Review and manage student admission requests</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-slate-50 text-slate-600 font-serif text-sm uppercase tracking-wide">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th className="py-4">Applicant</th>
                                <th className="py-4">Class</th>
                                <th className="py-4">Contact</th>
                                <th className="py-4">Address</th>
                                <th className="py-4">Gender</th>
                                <th className="py-4">DOB</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data?.result && data.result.map((item, index) => (
                                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                                    <th className="pl-6 text-slate-400 font-normal">{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-slate-800">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.email}</div>
                                    </td>
                                    <td>
                                        <div className="badge badge-ghost font-medium">{item.classValue || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-slate-600">{item.number}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm text-slate-600 min-w-[200px] whitespace-normal break-words">
                                            {item.address}
                                        </div>
                                    </td>
                                    <td className="text-slate-600 capitalize">{item.gender || "N/A"}</td>
                                    <td className="text-slate-600 font-mono text-sm">{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!data?.result?.length && (
                    <div className="text-center py-12 text-slate-400">
                        <div className="mb-3">
                            <svg className="w-12 h-12 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <p>No admission applications found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApplicationPanel
