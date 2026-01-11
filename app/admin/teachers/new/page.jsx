// AddClassPage.jsx
"use server";

import Heading from "/components/Heading";
import AddTeacherForm from "@/components/AddTeacherForm";
import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";

const AddTeacherPage = async () => {
  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="Add a new teacher" subtitle="Admin area" />
        <AddTeacherForm />
      </div>
    </div>
  );
};

export default AddTeacherPage;
