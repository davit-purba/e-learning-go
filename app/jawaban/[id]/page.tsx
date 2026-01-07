import React from 'react'

export default function page({params}: any) {
    const { id } = params
    return (
        <div className="bg-white shadow overflow-hidden">
            <iframe
                src={`/api/service/answer/view/${id}`}
                className="w-full h-[80vh]"
                title="PDF Viewer"
            />
        </div>
    )
}
