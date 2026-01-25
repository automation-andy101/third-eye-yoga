import ClassCardBase from "../class-cards/ClassCardBase";
import ClassCardBookingActions from "../class-cards/ClassCardBookingActions";
import getClassesForCurrentWeekWithTeachers from "@/app/actions/getClassesForCurrentWeekWithTeachers";
import getClassesForDay from "@/app/actions/getClassesForDay";
import WeeklyClassCard from "./WeaklyClassCard";

const WeeklyClasses = async () => {
  const classes = await getClassesForCurrentWeekWithTeachers();
  // const today = new Date();
  // const dateString = today.toISOString().split("T")[0]; 
  // const classes = await getClassesForDay(dateString);
  console.log(JSON.stringify(classes));

  if (!classes.length) return null;

  return (
    <section className="bg-gray-50 py-16">
      <h2 className="text-2xl text-center mb-8">
        This Week at Third Eye Yoga
      </h2>

      <div className="max-w-4xl mx-auto grid gap-4 px-4">
        {classes.slice(0, 3).map((yogaClass) => (
            <WeeklyClassCard yogaClass={yogaClass} />
        ))}
      </div>
    </section>
  );
};

export default WeeklyClasses;
