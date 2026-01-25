import Heading from "@/components/Heading";
import WeekSchedule from "@/components/WeekSchedule";
import getClassesForDay from '../actions/getClassesForDay';

export default function ClassesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Heading title="Class Schedule" />
        <WeekSchedule getClassesForDay={getClassesForDay} />
      </div>
    </div>
  )
}
