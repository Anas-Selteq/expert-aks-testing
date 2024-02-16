import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserDetail } from "@/helper";
import { useSelector } from "react-redux";
import SideBar from "@/Components/components/sidebar";
import { BiDotsVerticalRounded, BiFilter, BiSearch } from "react-icons/bi";
import { Button } from "@/styles/Button.style";
import Link from "next/link";
import { useRouter } from "next/router";

const User = () => {
  const { profile } = useSelector((state: any) => state);
  const [profileData, setProfileData] = useState<any>([]);
  useEffect(() => {
    getUserDetail(8).then((res) => {
      setProfileData(res?.result);
    });
  }, []);

  const userObjects = [
    {
      name: "Usman",
      imageUrl: "/imagess/userp.jpg",
      expertId: "84395",
      email: "usmanKhan@gmail.com",
      roles: "Admin",
      status: false,
      active: true,
    },
    {
      name: "Raheem",
      imageUrl: "/assets/Images/img4.png",
      expertId: "234521",
      email: "Raheem@gmail.com",
      roles: "CEO",
      status: true,
      active: false,
    },
    {
      name: "Bilal",
      imageUrl: "/assets/Images/img4.png",
      expertId: "224522",
      email: "Bilal@gmail.com",
      roles: "Sales",
      status: true,
      active: true,
    },
  ];

  const router = useRouter();

  const adduserscreen = () =>{
    router.push("/userProfile/user/add_users")
  }

  return (
    <SideBar activeIndex={2}>
      {/* <div className="d-flex justify-content-between align-items-center">
        <div>User List</div>
        <div className="d-flex justify-content-center align-items-center">
          <BiSearch size="2.75rem" />
          <p
            style={{
              margin: "0 1.5rem 0 1rem",
              color: "black",
            }}
          >
            Search
          </p>
          <BiFilter size="2.75rem" />
          <p
            style={{
              margin: "0 1.5rem 0 1rem",
              color: "black",
            }}
          >
            Filter
          </p>
          <Link href="/userProfile/user/add_users">
            <button className="btn btn-danger">Add User</button>
          </Link>
        </div>
      </div> */}
      <div
        style={{
          width: "100%",
          fontSize: "18px",
          backgroundColor: "white",
          borderTop: "1px solid lightgray",
          borderBottom: "0.7px solid #dcdcdc",
          fontFamily: "Roboto",
          fontWeight: "800",
          fontStyle: "normal",
          letterSpacing: "normal",
          color: "#404145",
          position: "relative",
          zIndex: "1",
        }}
        className="px-4 "
      >
        <div className="row py-2">
          <div className="col-md-6 col-4 m-auto">
            {" "}
            <span>User List</span>
          </div>
          <div className="col-md-6 col-8 text-end">
          <button
                className="button_set_search px-4"
              >
               <img className="img-fluid" src="/imagess/redicons/search.png" />&nbsp; Search
              </button>
              <button onClick={adduserscreen} className="btn btn-danger btn-sm button_style_danger">Add User</button>
          </div>
        </div>
      </div>
      <div className="mx-md-5 margin_bottom_new  my-4 custom_bottom_all_pages" style={{height:"100vh"}}>
        {userObjects.map((user, index) => (
          <div className="col-md-12 px-3 mt-2 border_for_all_pages">
            <Link href="/userProfile/user/userDetail" className="style_a_tag11">
            <div className="d-flex">
              <div>
                <img className="img-fluid img_set_users" src={user.imageUrl} />
              </div>
              <div className="px-4 pt-3">
                <p className="main_heading_text m-0 p-0">
                  {user.name}{" "}
                  &nbsp;&nbsp;<span
                    className={`${
                      user.status ? "badge bg-success badge_texture_active" : "badge bg-warning badge_texture_pending"
                    } }`}
                  >
                    Success
                  </span>
                </p>
                <p className="main_heading_text1 m-0 p-0">{user.roles}</p>
                <p className="main_heading_text2 m-0 p-0">ID:{user.expertId}</p>
                <p className="main_heading_text3 m-0 p-0">{user.email}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
        {/* {userObjects.map((user, index) => (
          <div
            key={index}
            className="d-flex justify-content-between bg-light rounded mb-3 px-4 py-3"
          >
            <div className="d-flex">
              <div className="me-3">
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  className="rounded-circle"
                  height={100}
                  width={100}
                />
              </div>
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center">
                  <div className="me-3 fs-5 fw-bold">{user.name}</div>
                  <div
                    className={`p-2 ${
                      user.status ? "bg-success" : "bg-warning"
                    } text-light rounded`}
                    style={{
                      fontSize: "0.8rem",
                    }}
                  >
                    {user.status ? "Accepted" : "Pending"}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {user.roles}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {" "}
                  {user.expertId}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {" "}
                  {user.email}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between">
              <div>
                <BiDotsVerticalRounded />
              </div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  role="switch"
                  className="form-check-input"
                  checked={user.active}
                />
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </SideBar>
  );
};

export default User;
