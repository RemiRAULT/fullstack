'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../calendar/custom-calendar.css";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactBigCalendar from '../calendar/page.js';



const Home = () => {
  return (
    <div>
      <ReactBigCalendar />
    </div>
  );
};

export default Home;