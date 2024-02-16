import SideBar from "@/Components/components/sidebar";
import { BiChevronDown, BiDotsVertical } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import React from 'react'
import Link from "next/link";

function userDetail() {
  return (
    <SideBar activeIndex={0}>
        <div className="mb-5 pb-5">
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
        className="px-4"
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>User Detail</span>
          </div>
         </div>
      </div>
      <div className="margin_bottom_new  mt-4">

        {/* Main Card  */}
        <div className="col-md-12 border_backsground_color">
            <div className="flex_direction_detail_page align-items-center">
                <div className="">
                    <img className="img-fluid img_height_width_userdetail" src="/imagess/redicons/userBig.png" />
                </div>
                <div className="px-3 ">
                    <p className="m-0 p-0 detailpage_h1">Usman Khan &nbsp;<span className="badge bg-success badge_texture_active pt-0">Active</span></p>
                    <p className="m-0 p-0 detailpage_h2 py-2">Expert ID: 8456</p>
                    <p className="m-0 p-0 detailpage_h3"><img className="img-fluid" src="/imagess/msg.png" />&nbsp;&nbsp;loremipsum@gmail.com</p>
                </div>
            </div>
        </div>
 
        {/* Subcards  */}
        <div className="col-md-12 border_backsground_color mt-3">
            <div className="col-md-12">
           <div className="row">
                <div className="col-md-9 col-10">
                <div className="flex_direction_detail_page align-items-center">
                <div className="">
                    <img className="img-fluid img_height_width_userdetail2" src="/imagess/redicons/userBig.png" />
                </div>
                <div className="px-3 ">
                    <p className="m-0 pt-2 detailpage_h4">Usman Khannd &nbsp;<span className="badge bg-success badge_texture_active pt-0">Active</span></p>
                    <p className="m-0 p-0 detailpage_h5 ">Admin</p>
                </div>
            </div>
                </div>
                <div className="col-md-3 col-2 text_alignment_user_detail px-md-3 px-3">
                <BiDotsVertical className="icon_color_every2" />
                </div>
            </div>
            </div>
            <hr className="background_line mb-2 mt-2" />
            <div className="row">
                <div className="col-md-6 col-6 m-auto">
                <p className="m-0 p-0 detailpage_h6 ">6 Services Assigned</p>
                </div>
                <div className="col-md-6 col-6 text-end px-4">
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                />
                </div>
            </div>
           
        </div>

        <div className="col-md-12 border_backsground_color mt-3">
            <div className="col-md-12">
           <div className="row">
                <div className="col-md-9 col-10">
                <div className="flex_direction_detail_page align-items-center">
                <div className="">
                    <img className="img-fluid img_height_width_userdetail2" src="/imagess/redicons/userBig.png" />
                </div>
                <div className="px-3 ">
                    <p className="m-0 pt-2 detailpage_h4">Usman Khannd &nbsp; <span className="badge bg-success badge_texture_pending pt-0">Pending</span></p>
                    <p className="m-0 p-0 detailpage_h5 ">Admin</p>
                </div>
            </div>
                </div>
                <div className="col-md-3 col-2 text_alignment_user_detail px-md-3 px-3">
                <BiDotsVertical className="icon_color_every2" />
                </div>
            </div>
            </div>
            <hr className="background_line mb-2 mt-2" />
            <div className="row">
                <div className="col-md-6 col-6 m-auto">
                <p className="m-0 p-0 detailpage_h6 ">6 Services Assigned</p>
                </div>
                <div className="col-md-6 col-6 text-end px-4">
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                />
                </div>
            </div>
           
        </div>

        <div className="col-md-12 border_backsground_color mt-3">
            <div className="col-md-12">
           <div className="row">
                <div className="col-md-9 col-10">
                <div className="flex_direction_detail_page align-items-center">
                <div className="">
                    <img className="img-fluid img_height_width_userdetail2" src="/imagess/redicons/userBig.png" />
                </div>
                <div className="px-3 ">
                    <p className="m-0 pt-2 detailpage_h4">Usman Khannd &nbsp; <span className="badge bg-success badge_texture_pending pt-0">Pending</span></p>
                    <p className="m-0 p-0 detailpage_h5 ">Admin</p>
                </div>
            </div>
                </div>
                <div className="col-md-3 col-2 text_alignment_user_detail px-md-3 px-3">
                <BiDotsVertical className="icon_color_every2" />
                </div>
            </div>
            </div>
            <hr className="background_line mb-2 mt-2" />
            <div className="row">
                <div className="col-md-6 col-6 m-auto">
                <p className="m-0 p-0 detailpage_h6 ">6 Services Assigned</p>
                </div>
                <div className="col-md-6 col-6 text-end px-4">
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                />
                </div>
            </div>
           
        </div>

        <div className="col-md-12 border_backsground_color mt-3">
            <div className="col-md-12">
           <div className="row">
                <div className="col-md-9 col-10">
                <div className="flex_direction_detail_page align-items-center">
                <div className="">
                    <img className="img-fluid img_height_width_userdetail2" src="/imagess/redicons/userBig.png" />
                </div>
                <div className="px-3 ">
                    <p className="m-0 pt-2 detailpage_h4">Usman Khannd &nbsp; <span className="badge bg-success badge_texture_pending pt-0">Pending</span></p>
                    <p className="m-0 p-0 detailpage_h5 ">Admin</p>
                </div>
            </div>
                </div>
                <div className="col-md-3 col-2 text_alignment_user_detail px-md-3 px-3">
                <BiDotsVertical className="icon_color_every2" />
                </div>
            </div>
            </div>
            <hr className="background_line mb-2 mt-2" />
            <div className="row">
                <div className="col-md-6 col-6 m-auto">
                <p className="m-0 p-0 detailpage_h6 ">6 Services Assigned</p>
                </div>
                <div className="col-md-6 col-6 text-end px-4">
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                />
                </div>
            </div>
           
        </div>


       

        {/* button  */}
        {/* <div className="text-end mt-5 pt-5">
        <Link href="/userProfile/user" className="style_a_tag11">
        <button className="btn btn-danger ">Save & Continue</button>
        </Link>
        </div> */}
      </div>
      </div>
    </SideBar>
  )
}

export default userDetail
