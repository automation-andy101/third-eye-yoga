import checkAuth from "@/app/actions/checkAuth";
import Heading from "/components/Heading";
import AdminDashboardPage from "@/components/AdminDashboardPage";

import getClassesForCurrentWeekWithTeachers from "@/app/actions/getClassesForCurrentWeekWithTeachers";
import getAllTeachers from "@/app/actions/getAllTeachers";
import getClassBookingsForCurrentWeek from "@/app/actions/getClassBookingsForCurrentWeek";

const DashboardPage = async () => {
  const { isAdmin } = await checkAuth();

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  const classes = await getClassesForCurrentWeekWithTeachers();
  const teachers = await getAllTeachers();
  const bookings = await getClassBookingsForCurrentWeek();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="Dashboard" subtitle="Admin area" />

        <AdminDashboardPage
          classes={classes ?? []}
          teachers={teachers ?? []}
          bookings={bookings ?? []}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
