// AddClassPage.jsx
"use server";

import Heading from "/components/Heading";
import checkAuth from "@/app/actions/checkAuth";
import getAllTeachers from "@/app/actions/getAllTeachers";
import deleteClass from "@/app/actions/deleteClass";
import Link from "next/link";
import getClassesForDay from "@/app/actions/getClassesForDay";
import AdminYogaClassesPage from "@/components/AdminYogaClassesPage";
import ClassCardBase from "@/components/class-cards/ClassCardBase";
import ClassCardAdminActions from "@/components/class-cards/ClassCardAdminActions";


const AdminClassesPage = async () => {
  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="Classses" subtitle="Admin area" />

        <AdminYogaClassesPage getClassesForDay={getClassesForDay} />
    </div>
  </div>
  );
};

export default AdminClassesPage;
