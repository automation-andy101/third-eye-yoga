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
        <>
            <Heading title="Edit Class" />
            <EditClassForm yogaClass={yogaClass} teachers={teachers} />
        </>
    )
}

export default EditClassPage