import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../../styles/components/calendar.module.css";
// import 'react-big-calendar/lib/sass/styles';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD
import moment from "moment";

const localizer = momentLocalizer(moment);

const events: any = [];

const MyCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          margin: "50px",
        }}
      />
    </div>
  );
};

export default MyCalendar;
