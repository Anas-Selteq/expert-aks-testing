import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { getUserDetail } from "@/helper";
// import { useSelector } from "react-redux";
import { BiDotsVerticalRounded, BiFilter, BiSearch } from "react-icons/bi";
import Link from "next/link";

const Profile_page = () => {
  //   const { profile } = useSelector((state: any) => state);
  const [profileData, setProfileData] = useState<any>([]);
  useEffect(() => {
    // getUserDetail(8).then((res) => {
    //   setProfileData(res?.result);
    // });
  }, []);

  const userObjects = [
    {
      name: "Usman khan",
      imageUrl: "/assets/Images/img4.png",
      expertId: "84395",
      email: "usmanKhan@gmail.com",
      roles: "Admin",
      status: false,
      active: true,
    },
    {
      name: "Muhammad Atif",
      imageUrl: "/assets/Images/img4.png",
      expertId: "84398",
      email: "Atif_Ahmed@gmail.com",
      roles: "Sales",
      status: true,
      active: true,
    },
    {
      name: "Junaid Ahmed khan",
      imageUrl: "/assets/Images/img4.png",
      expertId: "84392",
      email: "junaid_akram@gmail.com",
      roles: "Sales",
      status: false,
      active: false,
    },
    {
      name: "Junaid Axhar",
      imageUrl: "/assets/Images/img4.png",
      expertId: "234526",
      email: "Junaid_Axhar@gmail.com",
      roles: "Account Holder",
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

  return (
    <div className="col-md-12 bg-white">
      {/* <Dashboard sidebar={sideMenu}> */}
      <div className="container total_height_dashboard mt-1 pt-4 pb-5">
        <div className="row">
          {/* Sidenavigation code  */}

          <div className="col-md-9 ">
            <div className="d-flex justify-content-between align-items-center">
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
            </div>
            <div className="mx-5 my-4">
              {userObjects.map((user, index) => (
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
              ))}
            </div>
          </div>
        </div>
        {/* </Dashboard> */}
      </div>
    </div>
  );
};

export default Profile_page;
