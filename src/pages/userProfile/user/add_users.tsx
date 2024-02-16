import React, { useState } from "react";
import SideBar from "@/Components/components/sidebar";
import AddUsersDetails from "@/Components/userroles/add_users";
import AddNewRole from "@/Components/userroles/add_new_role";
import AddServices from "@/Components/userroles/add_services";

const AddUsers = () => {
  const [showPermissions, setShowPermissions] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [listOfServices, setListOfServices] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [isSelectedAllServices, setIsSelectedAllServices] = useState(false);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isNewRoles, setIsNewRoles] = useState(false);
  const [isServices, setIsServices] = useState(false);

  const rolesList = [
    {
      title: "Admin",
      checked: true,
    },
    {
      title: "Finance",
      checked: false,
    },
    {
      title: "Sale",
      checked: true,
    },
    {
      title: "Marketing",
      checked: true,
    },
    {
      title: "Developer",
      checked: true,
    },
    {
      title: "App Manager",
      checked: false,
    },
    {
      title: "Customer Support ",
      checked: false,
    },
    {
      title: "Marketing",
      checked: true,
    },
  ];

  const gobackHandler = (list: any, selectedAllServices: any) => {
    setListOfServices(list);
    setIsSelectedAllServices(selectedAllServices);
    setIsNewRoles(false);
    setIsServices(false);
  };

  const goBackFromRole = (role: any, bookings: any, legal: any) => {
    console.log("ROLE::", role, "BOOKINGS::", bookings, "LEGAL::", legal);
    setIsNewRoles(false);
    setIsServices(false);
  };

  return (
    <SideBar activeIndex={2}>
        {isNewRoles && !isServices ? (
          <AddNewRole goBackHandler={goBackFromRole} />
        ) : !isNewRoles && isServices ? (
          <AddServices
            goBackHandler={gobackHandler}
            listOfServicesFromParent={listOfServices}
          />
        ) : (
          <AddUsersDetails
            showPermissions={showPermissions}
            setShowPermissions={setShowPermissions}
            rolesList={rolesList}
            createNewRoleHandler={() => setIsNewRoles(true)}
            listOfServices={listOfServices}
            isSelectedAllServices={isSelectedAllServices}
            servicesHandler={() => setIsServices(true)}
            isAgreeTerms={isAgreedToTerms}
            setIsAgreeTerms={() => setIsAgreedToTerms(!isAgreedToTerms)}
          />
        )}
    </SideBar>
  );
};

export default AddUsers;
