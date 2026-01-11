"use server";

import Heading from "/components/Heading";
import getTeacherById from "@/app/actions/getTeacherById";
import EditTeacherForm from "@/components/EditTeacherForm";

const AddTeacherPage = async ({ params }) => {
    const { id } = params;
    const teacher = await getTeacherById(id);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="[Admin] Edit teacher" subtitle="Admin area" />
                <EditTeacherForm teacher={teacher} />
            </div>
        </div>
    );
};

export default AddTeacherPage;
