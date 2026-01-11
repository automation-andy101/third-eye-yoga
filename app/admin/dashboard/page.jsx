import checkAuth from "@/app/actions/checkAuth";
import Heading from "/components/Heading";
import AdminDashboardPage from "@/components/AdminDashboardPage";
import getClassesForDay from "@/app/actions/getClassesForDay";


const dashboardPage = async () => {
    const { isAdmin } = await checkAuth();  

  if (!isAdmin) {
    return <p>You are not authorised to view this page.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Heading title="[Admin] Dashboard" />

            <AdminDashboardPage getClassesForDay={getClassesForDay} />
        </div>
    </div>
  )
}

export default dashboardPage;