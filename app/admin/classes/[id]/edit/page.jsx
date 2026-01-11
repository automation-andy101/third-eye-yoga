"use server"

import getClassWithTeacherById from '@/app/actions/getClassWithTeacherById';
import EditClassForm from '@/components/EditClassForm';
import Heading from '@/components/Heading'
import React from 'react'
import getAllTeachers from "@/app/actions/getAllTeachers";


const EditClassPage = async ({ params }) => {
    const { id } = params;
    const yogaClass = await getClassWithTeacherById(id);
    const teachers = await getAllTeachers();
    
    return (
        <div className="min-h-screen flex flex-col">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="Edit Class" />
                <EditClassForm yogaClass={yogaClass} teachers={teachers} />
            </div>
        </div>
    )
}

export default EditClassPage