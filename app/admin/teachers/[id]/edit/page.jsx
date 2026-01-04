// AddClassPage.jsx
"use server";

import Heading from "/components/Heading";
import AddTeacherForm from "@/components/AddTeacherForm";
import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";
import EditTeacherForm from "@/components/EditTeacherForm";

const AddTeacherPage = async () => {
    const { id } = params;
    const teacher = await getTeacherById(id);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="[Admin] Edit teacher" />
                <EditTeacherForm teacher={teacher} />
            </div>
        </div>
    );
};

export default AddTeacherPage;
