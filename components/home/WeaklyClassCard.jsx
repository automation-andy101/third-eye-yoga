"use client";

import ClassCardBase from "../class-cards/ClassCardBase";
import ClassCardBookingActions from "../class-cards/ClassCardBookingActions";

const WeeklyClassCard = ({ yogaClass }) => {
  return (
    <ClassCardBase
      yogaClass={yogaClass}
      actions={(status) => (
        <ClassCardBookingActions
          yogaClass={yogaClass}
          status={status}
        />
      )}
    />
  );
};

export default WeeklyClassCard;
