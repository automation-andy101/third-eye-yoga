import Hero from "@/components/home/Hero";
import Offerings from "@/components/home/Offerings";
import WeeklyClasses from "@/components/home/WeeklyClasses";
import TeachersPreview from "@/components/home/TeachersPreview";
import HomeCTA from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Offerings />
      <WeeklyClasses />
      <TeachersPreview />
      <HomeCTA />
    </>
  );
}

// import Heading from "@/components/Heading";
// import WeekSchedule from "@/components/WeekSchedule";
// import getClassesForDay from './actions/getClassesForDay';

// export default function Page() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         <Heading title="Class Schedule" />
//         <WeekSchedule getClassesForDay={getClassesForDay} />
//       </div>
//     </div>
//   )
// }
