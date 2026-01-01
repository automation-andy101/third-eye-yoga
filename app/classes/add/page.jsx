"use server";

import Heading from "/components/Heading";
import AddClassForm from "@/components/AddClassForm";
import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";

const AddClassPage = async () => {
    const teachers = await getAllTeachers();
    const { isAdmin } = await checkAuth();

    if (!isAdmin) {
        return <p>You are not authorised to view this page.</p>;
    }

    return (
        <>
            <Heading title="Add a class" />
            <AddClassForm teachers={teachers} />
        </>
    )
};

export default AddClassPage;