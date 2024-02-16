import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AddBusinessUser, GetRoleByBusinessId } from "@/helper";
import AddNewRole from "@/Components/roles_and_permissions/AddUser/add_new_role";
import AddServices from "@/Components/roles_and_permissions/AddUser/add_services";
import AddUsersDetails from "@/Components/roles_and_permissions/AddUser/add_users";
import SideBar from "@/Components/components/sidebar";

const AddUsers = () => {
  const router = useRouter();
  const [showPermissions, setShowPermissions] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [listOfServices, setListOfServices] = useState<any>([]);
  const [selectedRole, setSelectedRole] = useState<any>({});
  // const [isSelectedAllServices, setIsSelectedAllServices] = useState(true);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isNewRoles, setIsNewRoles] = useState(false);
  const [isServices, setIsServices] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState();

  const fetchAllRoles = () => {
    setIsLoading(true);
    GetRoleByBusinessId(parseInt(localStorage.getItem("businessId") as string))
      .then((res) => {
        setRolesList(res.result.role);
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleSelectedRole = (role: any) => {
    if (Object.keys(selectedRole).length === 0) {
      setSelectedRole(role);
    }
    if (selectedRole?.businessId === role?.businessId) {
      setSelectedRole({});
    }
  };

  const goBackFromSelectedServices = (list: any, selectedAllServices: any) => {
    setListOfServices(list);
    // setIsSelectedAllServices(selectedAllServices);
    setIsNewRoles(false);
    setIsServices(false);
  };

  const goBackFromRole = () => {
    setIsNewRoles(false);
    setIsServices(false);
    fetchAllRoles();
  };

  const addUser = () => {
    const businessID = localStorage.getItem("businessId");
    if (businessID === null) {
      alert("Please use the legal first register your business ID");
    } else {
      let SKULists = [];
      for (let i = 0; i < listOfServices.length; i++) {
        SKULists.push(listOfServices[i].serviceSKU);
      }
      const data = {
        userId: 0,
        businessId: businessID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleId: selectedRole?.roleId,
        serviceSKU: SKULists,
        createdBy: businessID,
      };
      AddBusinessUser(data)
        .then((res) => {
          if (res.code === 0) {
            router.push("/userProfile/switch_account");
          } else {
            alert(res.message);
          }
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <SideBar activeIndex={0}>
      <div className="col-md-12 bg-white">
        <div className="container total_height_dashboard mt-1 pt-4 pb-5">
          <div className="row">
            <div className="col-md-9 ">
              {isNewRoles && !isServices ? (
                <AddNewRole goBackHandler={goBackFromRole} />
              ) : !isNewRoles && isServices ? (
                <AddServices
                  goBackHandler={goBackFromSelectedServices}
                  listOfServicesFromParent={listOfServices}
                />
              ) : (
                <AddUsersDetails
                  showPermissions={showPermissions}
                  setShowPermissions={setShowPermissions}
                  rolesList={rolesList}
                  createNewRoleHandler={() => setIsNewRoles(true)}
                  servicesHandler={() => setIsServices(true)}
                  isAgreeTerms={isAgreedToTerms}
                  setIsAgreeTerms={() => setIsAgreedToTerms(!isAgreedToTerms)}
                  selectedRole={selectedRole}
                  handleSelectedRole={handleSelectedRole}
                  firstNameValue={firstName}
                  lastNameValue={lastName}
                  emailValue={email}
                  setFirstName={(e: any) => setFirstName(e.target.value)}
                  setLastName={(e: any) => setLastName(e.target.value)}
                  setEmail={(e: any) => setEmail(e.target.value)}
                  addUser={addUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default AddUsers;
