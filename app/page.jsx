import classes from "@/data/classes.json";
import ClassCard from "/components/ClassCard";


export default function Home() {
  return (
    <>
      <Heading title="Class Schedule" />
      {
        classes.length > 0 ? (
          classes.map((yogaClass) => (
            <ClassCard yogaClass={yogaClass} key={yogaClass.$id} />
          ))
        ) :
        (
          <p>No classes available</p>
        )
      }
    </>
  );
}
