import React, { useState, useEffect, useRef } from "react";
import {
    Calendar,
    DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { ServicePageMovement } from "@/Components/service_page_movement";
import {
    getOrderIdInLocalStorage,
    getServiceFromLocalStorage,
} from "@/Components/helper";
import {
    getPurchaseOrderWithId,
    getAllProviderIds,
    getTimeSlots,
    patchPurchaseOrder,
} from "@/helper";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import Layout2 from "@/Components/Layout2/Layout2";
import { useSelector } from "react-redux";
import SideBar from "@/Components/components/sidebar";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";



const Editbookings = () => {
    /* -------------------------------------------------------------------------- */
    /*                                  Variables                                 */
    /* -------------------------------------------------------------------------- */

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [slotsList, setSlotsList] = useState<any>([]);
    const [showhide, setshowhoide] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [providerIdList, setProviderIdList] = useState<number[]>([]);
    const [providerdata, setProviderData] = useState<any | null>(null); // Initialize the providerdata state
    const [actualProviderIdList, setActualProviderIdList] = useState<any>([]);
    const [Updatenewslots, setUpdatenewslots] = useState<any>([]);
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const [Flag1, setFlag1] = useState<any>(false);
    const { profile } = useSelector((state: any) => state);
    const [date, setDate] = useState<DayValue>({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    });
    const [datemob, setDatemob] = useState<any>(`${date?.year}-${date?.month.toString().padStart(2, "0")}-${date?.day.toString().padStart(2, "0")}`);
    const [slotsloading, setSlotsLoading] = useState<any>(false);
    const [dayPart, setDayPart] = useState<string>('');
    const [dayOfWeek, setDayOfWeek] = useState<string>('');
    // for calender ---------------------------------- 
    const currentDate = new Date();
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthh, setMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(currentDate.getDate().toString());
    const calendarRef = useRef<HTMLDivElement | null>(null); // Define the correct type for calendarRef
    const [loadingnew, setLoadingnew] = useState(false);
    const [hasNext, sethasnext] = useState(false);
    const [hasPrev, sethasprev] = useState(false);
    const [bookingnulllocal, setbookingnulllocal] = useState<any>("");
    const [SelectedAppointment, setSelectedAppointment] = useState<any>({})


    const { id } = router.query;
    console.log("SelectedAppointment", SelectedAppointment)
    useEffect(() => {
        if (id && bookingnulllocal) {
            const { appointments }: any = bookingnulllocal;
            const matchingAppointment = appointments.find(appointment => appointment.expertAppointmentId === parseInt(id, 10));

            if (matchingAppointment) {
                setSelectedAppointment(matchingAppointment);
            }
        }
    }, [id, bookingnulllocal]);
    useEffect(() => {
        if (calendarRef.current) {
            if (calendarRef.current.scrollLeft !== undefined) {
                calendarRef.current.scrollLeft += 900; // Adjust the scroll distance as needed
            }
        }
    }, [calendarRef.current])

    // useEffect(() => {
    //     if (id) {
    //       const appointment = bookingnulllocal.find(
    //         (booking: any) => booking.appointments.some((app: any) => app.expertAppointmentId === parseInt(id))
    //       );
    //       if (appointment) {
    //         setSelectedAppointment(appointment);
    //       }
    //     }
    //   }, [id, bookingnulllocal]);


    useEffect(() => {
        // Extract day part from datemob
        const day = datemob.split('-')[2];
        setDayPart(day);
    }, [datemob]);

    useEffect(() => {
        // Extract day part from datemob
        const day = datemob.split('-')[2];
        setDayPart(day);

        // Convert day part to day of the week
        const inputDate = new Date(`${date.year}-${date.month.toString().padStart(2, "0")}-${day}`);
        const dayOfWeek = getDayOfWeek(inputDate);
        setDayOfWeek(dayOfWeek);
    }, [datemob, date]);

    const getDayOfWeek = (inputDate: Date): string => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = inputDate.getDay();
        return daysOfWeek[dayIndex];
    };


    const scrollLeft = () => {
        if (calendarRef.current) {
            if (calendarRef.current.scrollLeft) {
                calendarRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
            }
        }
    };

    const scrollRight = () => {
        if (calendarRef.current) {
            if (calendarRef.current.scrollLeft !== undefined) {
                calendarRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
            }
        }
    };

    // useEffect(() => {
    //   // Scroll to the right by 50% when the component mounts
    //   if (calendarRef.current) {
    //     const containerWidth = calendarRef.current.clientWidth;
    //     calendarRef.current.scrollLeft = containerWidth * 0.5;
    //   }
    // }, []);

    /* -------------------------------------------------------------------------- */
    /*                                  Functions                                 */
    /* -------------------------------------------------------------------------- */
    /* ------------------------- Flow and Purchase Order ------------------------ */
    console.log("solts_seletcted", date);

    // useEffect(() => {
    //   if (monthh + 1 > 12 && Flag1 === false) {
    //     setMonth(0)
    //     setYear(year + 1)
    //     setFlag1(true);
    //   } else if (monthh + 1 === 12 && Flag1 === true) {
    //     setFlag1(false);
    //     setYear(year - 1)
    //   }
    //   console.log("monthh", monthh + 1, Flag1)
    // }, [monthh])

    useEffect(() => {
        if (hasNext === true && hasPrev === false) {
            if (monthh + 1 > 12) {
                setMonth(0)
                setYear(year + 1)
            }

            console.log("monthh", monthh + 1, hasNext, hasPrev)
        } else if (hasNext === false && hasPrev === true) {
            if (monthh + 1 === 12) {

                setYear(year - 1)
            }

            console.log("monthh", monthh + 1, hasNext, hasPrev)
        }


    }, [hasNext, hasPrev, monthh])



    const handleSlotClick = (item: any, index: number) => {
        // Set the selected index and provider data when clicking on the div
        setSelectedIndex(index);
        setProviderData(item);
        setUpdatenewslots(
            item?.map((providerdata: number) => {
                return { providerId: providerdata };
            })
        );
    };

    useEffect(() => {
        const bookingnull: any = localStorage.getItem("bookingdetailforbookingnull");
        const bookingnullstringify = JSON.parse(bookingnull);
        setbookingnulllocal(bookingnullstringify);
    }, [])

    // for pc that will handle both cases -----------------------------------------------------------------------------------
    const clickonpc = () => {
        // console.log("anas", bookingnulllocal)
        // if (bookingnulllocal?.appointments[0]?.bookingDate === null) {
        flowAndPurchaseOrderHandlerbookingnull()
        // } else {
        //     flowAndPurchaseOrderHandler()
        // }
    }

    const flowAndPurchaseOrderHandlerbookingnull = async () => {
        // const bookingdetails: any = localStorage.getItem("bookingdetailforchat");
        // const bookingdetailsparsed: any = JSON.parse(bookingdetails);
        setLoadingnew(true)
        const requestData = {
            customerId: profile?.externalCustomerId,
            providerId: bookingnulllocal?.providerId,
            providerIdNew: bookingnulllocal?.providerId,
            // plexaarAppointmentId: SelectedAppointment?.plexaarAppointmentId === null ? 0 : SelectedAppointment?.plexaarAppointmentId,
            plexaarAppointmentId: SelectedAppointment?.plexaarAppointmentId > 0 || SelectedAppointment?.plexaarAppointmentId != null ? SelectedAppointment?.plexaarAppointmentId : "",
            expertAppointmentId: SelectedAppointment?.expertAppointmentId,
            sku: bookingnulllocal?.hasattribute === "true" ? bookingnulllocal?.attributes[0]?.attributeSku : bookingnulllocal?.serviceSKU,
            oldDate: {
                date: bookingnulllocal?.dateJson[0]?.bookingDate,
                timeFrom: bookingnulllocal?.dateJson[0]?.timeFrom,
                timeTo: bookingnulllocal?.dateJson[0]?.timeTo,
            },
            newDate: {
                date: datemob,
                timeFrom: slotsList[selectedIndex].from,
                timeTo: slotsList[selectedIndex].endTo,
            },
            isOpen: true,
            isCancel: false,
            isEdit: false,
            modifiedBy: profile?.externalCustomerId,
            timeZone: "Europe/London"

        };
        try {
            const response = await axios.post(
                'https://gateway.findanexpert.net/provideravalability_svc/pb/edit/booking-slot',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                }
            );
            setLoadingnew(false)

            // setResponseDatafirstnote(response.data);
            console.log('API Response:', response.data);
            router.push("/AllBookingsNew")
            // setinputtextval("");
            // setLoading(false);
        } catch (error) {
            console.error('API Error:', error);
            setLoadingnew(false)
            // setLoading(false);
        }
    };

    // const flowAndPurchaseOrderHandlermob = async () => {
    //     const bookingdetails: any = localStorage.getItem("bookingdetailforchat");
    //     const bookingdetailsparsed: any = JSON.parse(bookingdetails);

    //     const requestData = {
    //         customerId: profile?.externalCustomerId,
    //         providerId: bookingdetailsparsed?.providerId,
    //         plexaarAppointmentId: bookingdetailsparsed?.appointments[0]?.expertBookingId,
    //         expertAppointmentId: bookingdetailsparsed?.appointments[0]?.plexaarBookingId,
    //         sku: bookingdetailsparsed?.serviceSKU,
    //         isOpen: "true",
    //         oldDate: bookingdetailsparsed?.dateJson[0],
    //         newDate: {
    //             bookingDate: datemob,
    //             timeFrom: slotsList[selectedIndex].from,
    //             timeTo: slotsList[selectedIndex].endTo,
    //             slotCaptured: false,
    //         },
    //         modifiedBy: profile?.externalCustomerId,
    //         timeZone: "Europe/London"

    //     };

    //     try {
    //         const response = await axios.post(
    //             'https://gateway.findanexpert.net/provideravalability_svc/pv/edit/booking-slot',
    //             requestData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json', // Set the content type to JSON
    //                 },
    //             }
    //         );

    //         // setResponseDatafirstnote(response.data);
    //         console.log('API Response:', response.data);
    //         router.push("/AllBookingsNew")
    //         // setinputtextval("");
    //         // setLoading(false);
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         // setLoading(false);
    //     }
    // };

    /* ------------------------------------------------------- Get Purchase Order --------------------------------------- */



    /* -------------------------------------------------------- Get Time Slots ------------------------------------------- */
    // const gettingSlots = () => {
    //   if (providerIdList?.length !== 0) {
    //     setIsLoading(true);
    //     getTimeSlots({
    //       date: `${date?.year}-${date?.month
    //         .toString()
    //         .padStart(2, "0")}-${date?.day.toString().padStart(2, "0")}`,
    //       providerId: providerIdList, // [2, 3],
    //       slotDuration: service?.duration,
    //       timeZone: "Europe/London",
    //       page: 1,
    //       pageSize: 50,
    //       // purchaseOrder?.data?.servicePayload?.duration
    //     })
    //       .then((res) => {
    //         if (res?.result?.providerList?.length === 0) {
    //           alert("No Slots Found");
    //         }
    //         setSlotsList(res?.result?.providerList ?? []);
    //         setSelectedIndex(-1);
    //       })
    //       .catch((e) => alert(e))
    //       .finally(() => setIsLoading(false));
    //   }
    // };



    // `${date?.year}-${date?.month.toString().padStart(2, "0")}-${date?.day.toString().padStart(2, "0")}`
    useEffect(() => {
        const service = getServiceFromLocalStorage();
        const bookingdetails: any = localStorage.getItem("bookingdetailforbookingnull");
        const bookingdetailsparsed: any = JSON.parse(bookingdetails);
        if (bookingdetailsparsed) {
            const postData = async () => {
                try {
                    const data = {
                        date: datemob,
                        providerId: [bookingdetailsparsed?.providerId], // [2, 3],
                        // slotDuration: service?.duration,
                        sku: bookingnulllocal?.hasattribute === "true" ? bookingnulllocal?.attributes[0]?.attributeSku : bookingdetailsparsed?.serviceSKU,
                        timeZone: "Europe/London",
                        businessId: bookingdetailsparsed?.businessId,
                        page: 1,
                        pageSize: 50,
                    };

                    const headers = {
                        'Content-Type': 'application/json',
                        // Add any other headers here
                    };
                    setSlotsLoading(true);

                    const response: any = await axios.post('https://gateway.findanexpert.net/provideravalability_svc/pb/post/slots', data, { headers });
                    if (response?.data?.result?.providerList?.length === 0) {
                        console.log("No Slots Found");
                    }
                    setSlotsList(response?.data?.result?.providerList ?? []);
                    setSelectedIndex(-1);
                    setSlotsLoading(false)
                    // Handle the response from the API
                    // console.log("anas",response?.data?.result?.providerList?.length);
                } catch (error) {
                    // Handle errors here
                    console.error(error);
                    setSlotsLoading(false)
                }
            }
            postData();
        }
    }, [providerIdList, datemob, purchaseOrder, date?.year, date?.month, bookingnulllocal?.attributes]);

    useEffect(() => {
        // console.log("itsanas", purchaseOrder?.data?.serviceSKU)
        const service = getServiceFromLocalStorage();
        const bookingdetails: any = localStorage.getItem("bookingdetailforbookingnull");
        const bookingdetailsparsed: any = JSON.parse(bookingdetails);
        if (bookingdetailsparsed) {
            const postData = async () => {
                try {
                    const data = {
                        date: datemob,
                        providerId: [bookingdetailsparsed?.providerId], // [2, 3],
                        // slotDuration: service?.duration,
                        sku: bookingnulllocal?.hasattribute === "true" ? bookingnulllocal?.attributes[0]?.attributeSku : bookingdetailsparsed?.serviceSKU,
                        timeZone: "Europe/London",
                        businessId: bookingdetailsparsed?.businessId,
                        page: 1,
                        pageSize: 50,
                    };

                    const headers = {
                        'Content-Type': 'application/json',
                        // Add any other headers here
                    };
                    setSlotsLoading(true);

                    const response: any = await axios.post('https://gateway.findanexpert.net/provideravalability_svc/pb/post/slots', data, { headers });
                    if (response?.data?.result?.providerList?.length === 0) {
                        console.log("No Slots Found");
                    }
                    setSlotsList(response?.data?.result?.providerList ?? []);
                    setSelectedIndex(-1);
                    setSlotsLoading(false)
                    // Handle the response from the API
                    // console.log("anas",response?.data?.result?.providerList?.length);
                } catch (error) {
                    // Handle errors here
                    console.error(error);
                    setSlotsLoading(false)
                }
            }
            postData();
        }

    }, [providerIdList, datemob, purchaseOrder, bookingnulllocal?.attributes]);

    // Setting Month Name -------------------------------------------------------------------------------------------------
    const monthName = (month: number) => {
        switch (month) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            default:
                return "Dec";
        }
    };
    const month = monthName(date?.month ?? 1);

    if (isLoading) {
        return (
            <div className="col-md-12 text-center py-5">
                {/* <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}
            </div>
        );
    }


    // custom calender ---------------------------------------------------------------------------------------------------
    const daysInMonth = new Date(year, monthh + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthh, 1).getDay();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // const handleDateClick = (day: any) => {
    //     const formattedDay = day < 10 ? `0${day}` : day;
    //     const formattedMonth = monthh + 1 < 10 ? `0${monthh + 1}` : monthh + 1;
    //     setSelectedDate(day);
    //     // console.log("monthh", )
    //     const newDate: any = `${year}-${formattedMonth}-${formattedDay}`;
    //     console.log(`Selected date: ${year}-${formattedMonth}-${day}`, "hi", newDate);
    //     setDatemob(newDate)
    //     setshowhoide(true);
    // };
    const handleDateClick = (day: any) => {
        const selectedDate = new Date(year, monthh, day);
        const currentDate = new Date();

        // Check if selected date is greater than or equal to the current date
        if (selectedDate >= currentDate || selectedDate.toDateString() === currentDate.toDateString()) {
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = monthh + 1 < 10 ? `0${monthh + 1}` : monthh + 1;

            const selectedDateString = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const currentDateString = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

            setSelectedDate(day);
            const newDate = `${year}-${formattedMonth}-${formattedDay}`;
            console.log(`Selected date: ${selectedDateString}`);
            console.log(`Current date: ${currentDateString}`);
            setDatemob(newDate);
            setshowhoide(true);
        } else {
            // Handle case where selected date is less than the current date
            enqueueSnackbar('Please select current date or date greater than the current date for booking!', { variant: 'warning' });
            // You can add additional logic or feedback for the user if needed
        }
    };

    const generateCalendarpc = () => {
        const calendar = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // for (let i = 0; i < daysOfWeek.length; i++) {
        //   calendar.push(
        //     <div key={`header-${i}`} className="day-header">
        //       {daysOfWeek[i]}
        //     </div>
        //   );
        // }

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div key={`empty-${i}`} className="empty-day" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthh, day);
            const dayOfWeek = daysOfWeek[date.getDay()];

            // const isSelected = day === selectedDate;
            const isSelected: any = day === parseInt(selectedDate, 10);
            const isCurrentDate: any = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const currentDayClass = isCurrentDate ? 'current-day' : '';
            calendar.push(
                <div
                    key={`day-${day}`}
                    // className={`item_card py-2 day${isSelected ? ' selected' : ''}`}
                    className={`item_card_pc day${isSelected ? ' selectedd_pc' : ''} ${currentDayClass}`}
                    onClick={() => handleDateClick(day)}
                >
                    <p className="mb-2 p-0">{dayOfWeek}</p>
                    <p className="m-0 p-0">{day}</p>
                </div>
            );
        }

        return calendar;
    };

    const generateCalendarmob = () => {
        const calendar = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // for (let i = 0; i < daysOfWeek.length; i++) {
        //   calendar.push(
        //     <div key={`header-${i}`} className="day-header">
        //       {daysOfWeek[i]}
        //     </div>
        //   );
        // }

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div key={`empty-${i}`} className="empty-day" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthh, day);
            const dayOfWeek = daysOfWeek[date.getDay()];

            // const isSelected = day === selectedDate;
            const isSelected: any = day === parseInt(selectedDate, 10);
            const isCurrentDate: any = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const currentDayClass = isCurrentDate ? 'current-day' : '';
            calendar.push(
                <div
                    key={`day-${day}`}
                    // className={`item_card py-2 day${isSelected ? ' selected' : ''}`}
                    className={`item_card day${isSelected ? ' selected' : ''} ${currentDayClass}`}
                    onClick={() => handleDateClick(day)}
                >
                    {dayOfWeek} <br />  {day}
                </div>
            );
        }

        return calendar;
    };

    const monthdecrese = () => {

    }

    const monthdecreseneww = () => {
        sethasprev(true);
        sethasnext(false);
        if (monthh === 0) {
            console.log("month")
            setMonth(11)
        } else if (monthh > 0) {
            setMonth(monthh - 1)
            console.log("month2", monthh)
        }
    }

    console.log("month12", monthh)


    return (
        <Layout2>
            <div className="margin_bottom_new mb-md-5 pb-md-5">
                <div className="mx-md-5 my-3">
                    <div className="col-md-12 ">
                        {/* calender only for pc slot select ------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="row on_pc_screeen">
                            <div className="col-md-12">
                                <div className="col-md-12 mt-2">
                                    <h5 className="font-family-poppins font-size-20">
                                        Please Choose Time & Date to Edit Your Booking
                                    </h5>
                                </div>
                                <div className="col-md-12 border_slots_calender py-2">
                                    {/* border_slots_calender */}
                                    <div className="calendar ">
                                        <div className="calendar-header pb-0 pt-2">
                                            <div className="row pb-2">
                                                <div className="col-md-1 col-2" >
                                                    {/* onClick={() => setYear(year - 1)}
                          <img  className="img-fluid" src="/imagess/rightt.png" /> */}
                                                </div>
                                                <div className="col-md-12   col-8 text-center">
                                                    <div className="row">
                                                        <div className="col-md-4"></div>
                                                        <div className="col-md-4 border_date_and_time">
                                                            <div className="row">
                                                                <div className="col-md-1 border_right_new px-0 padding_bottom_new_bottom" onClick={monthdecreseneww}>
                                                                    <span className="" ><FaAngleLeft className="iconsheightwidth" /></span>
                                                                </div>
                                                                <div className="col-md-10 ">
                                                                    <span><strong> {monthNames[monthh]}</strong></span>
                                                                    <span><strong> {year}</strong></span>
                                                                </div>
                                                                <div className="col-md-1 border_left_new_one px-0" onClick={() => { setMonth(monthh + 1), sethasnext(true), sethasprev(false) }}>
                                                                    <span className="" ><FaAngleRight className="iconsheightwidth" /></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4"></div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1 col-2 text-end" >
                                                    {/* onClick={() => setYear(year + 1)}  
                          <img className="img-fluid" src="/imagess/leftt.png" /> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <span className="pe-3" onClick={scrollLeft}><img className="img-fluid pt-2" src="/imagess/lefttop.png" /></span>
                                            {/* {showhide === true ? null :
                        <span className="width_active_date pt-2 text-center" onClick={scrollLeft}>
                          <p className="mb-2 p-0">{dayOfWeek}</p>
                          <p className="m-0 p-0">{dayPart}</p>
                        </span>
                      } */}
                                            <div className="calendar-days_pc pt-2  pb-2" ref={calendarRef} >{generateCalendarpc()}</div>
                                            <span className="ps-3" onClick={scrollRight}><img className="img-fluid pt-2" src="/imagess/righttop.png" /></span>
                                        </div>


                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <div className="col-md-12   px-3 py-1  " >
                                            {slotsloading === true ?
                                                <div className="col-md-12 text-center">
                                                    <div className="spinner-border text-danger" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {slotsList?.length === 0 ? (
                                                        <div>
                                                            <h1>No Slots Found</h1>
                                                        </div>
                                                    ) : (
                                                        <div className="row">
                                                            {slotsList?.map((item: any, index: number) => {
                                                                const formattedTimestart = moment(item["endTo"], "HH:mm:ss").format("HH:mm");
                                                                const formattedTimeend = moment(item["from"], "HH:mm:ss").format("HH:mm");
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className="col-md-3 px-3 text-center mt-1"
                                                                    >
                                                                        <div
                                                                            className={`col-md-12  mb-2 py-2  rounded border_new_slots ${selectedIndex === index &&
                                                                                "active_slots"
                                                                                }`}
                                                                            // onClick={() => setSelectedIndex(index)}
                                                                            onClick={() =>
                                                                                handleSlotClick(item?.providerIds, index)
                                                                            }
                                                                        >
                                                                            <p className={` fonts_slots m-0 p-0 ${selectedIndex === index &&
                                                                                "fonts_slots_active"
                                                                                }`}
                                                                            >
                                                                                <span className="slots_major_text">
                                                                                    {formattedTimeend} - {formattedTimestart} </span>&nbsp;<span className={` slots_color ${selectedIndex === index &&
                                                                                        "slots_color_active"
                                                                                        }`}>+ £0</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12 mt-2">
                                <div className="col-md-12 border_slots_calender  px-3 py-1  " >
                                    {slotsloading === true ?
                                        <div className="col-md-12 text-center">
                                            <div className="spinner-border text-danger" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            {slotsList?.length === 0 ? (
                                                <div>
                                                    <h1>No Slots Found</h1>
                                                </div>
                                            ) : (
                                                <div className="row">
                                                    {slotsList?.map((item: any, index: number) => {
                                                        const formattedTimestart = moment(item["endTo"], "HH:mm:ss").format("HH:mm");
                                                        const formattedTimeend = moment(item["from"], "HH:mm:ss").format("HH:mm");
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="col-md-3 px-1 text-center"
                                                            >
                                                                <div
                                                                    className={`col-md-12  mb-2 py-2 rounded border_new_slots ${selectedIndex === index &&
                                                                        "active_slots"
                                                                        }`}
                                                                    onClick={() =>
                                                                        handleSlotClick(item?.providerIds, index)
                                                                    }
                                                                >
                                                                    <p className="fonts_slots m-0 p-0">
                                                                        {formattedTimeend}
                                                                        -
                                                                        {formattedTimestart}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    }
                                </div>
                            </div> */}
                            <div className="col-md-12 mt-3 mb-3">
                                {selectedIndex >= 0 ? (
                                    <div className="col-md-12 text-center">
                                        <button
                                            type="button"
                                            className="btn btn-danger button_width_slots"
                                            onClick={clickonpc}
                                        >
                                            Save & Continue&nbsp;&nbsp;
                                            {loadingnew ?
                                                <div className="spinner-border text-white spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> :
                                                null
                                            }
                                        </button>
                                    </div>
                                ) :
                                    <div className="col-md-12 text-center">
                                        <button
                                            disabled
                                            type="button"
                                            className="btn btn-danger button_width_slots py-2"
                                        >
                                            Save & Continue&nbsp;&nbsp;
                                            {loadingnew ?
                                                <div className="spinner-border text-white spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> :
                                                null
                                            }
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* For mobile only -------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="calendar mobile_screen_display">
                            <div className="col-md-12 col-12 mt-4 mb-4 text-center">
                                <span className="" onClick={monthdecreseneww}><img className="img-fluid" src="/imagess/rightt.png" /></span>
                                <span><strong> {monthNames[monthh]}</strong></span>
                                <span><strong> {year}</strong></span>
                                <span className="ps-1" onClick={() => { setMonth(monthh + 1), sethasnext(true), sethasprev(false) }}><img className="img-fluid" src="/imagess/leftt.png" /></span>
                            </div>
                            <div className="calendar-days" >{generateCalendarmob()}</div>
                        </div>
                        <div className="pt-4 mobile_screen_display">
                            <h6 className="font-roboto font-size-24 px-2 ">
                                <span className="fa fa-calendar-o"></span>
                                Select Time Slots
                            </h6>
                        </div>
                        <div className="col-md-12 px-md-3  mobile_screen_display" >
                            {slotsloading === true ?
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <>
                                    {slotsList?.length === 0 ? (
                                        <div>
                                            <h6>No Slots Found</h6>
                                        </div>
                                    ) : (
                                        <div className="row px-2">
                                            {slotsList?.map((item: any, index: number) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col-md-6 col-6 px-2 text-center"
                                                    >
                                                        <div
                                                            className={`col-md-12  mb-2 px-md-4 py-2 rounded border ${selectedIndex === index ?
                                                                "bg-danger text-white" : "bg-white font_lightgray"
                                                                }`}
                                                            onClick={() =>
                                                                handleSlotClick(item?.providerIds, index)
                                                            }
                                                        >
                                                            <p className="fonts_slots m-0 p-0">
                                                                {item["from"]} - {item["endTo"]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                        <div className="col-md-12 mt-4 mb-3 mobile_screen_display">
                            {selectedIndex >= 0 ? (
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-danger universal_button_color"
                                        onClick={clickonpc}
                                    >
                                        Save & Continue&nbsp;&nbsp;
                                        {loadingnew ?
                                            <div className="spinner-border text-white spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div> :
                                            null
                                        }
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </Layout2>
    );
};

export default Editbookings;
