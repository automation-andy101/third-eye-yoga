"use server";

import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";
import Heading from "@/components/Heading";
import TeacherListPage from "@/components/TeacherListPage";

const AdminTeacherPage = async () => {
  const teachers = await getAllTeachers();
  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="[Admin] Teachers" />

        <TeacherListPage getAllTeachers={getAllTeachers} />
    </div>
  </div>
  );
};

export default AdminTeacherPage;
