import React from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiSpreadsheet,
  BiUser,
} from "react-icons/bi";

const AddUsersDetails = ({
  showPermissions,
  setShowPermissions,
  rolesList,
  createNewRoleHandler,
  servicesHandler,
  isAgreeTerms,
  setIsAgreeTerms,
  selectedRole,
  handleSelectedRole,
  firstNameValue,
  lastNameValue,
  emailValue,
  setFirstName,
  setLastName,
  setEmail,
  addUser,
}: {
  showPermissions: any;
  setShowPermissions: any;
  rolesList: any;
  createNewRoleHandler: any;
  servicesHandler: any;
  isAgreeTerms: any;
  setIsAgreeTerms: any;
  selectedRole: any;
  handleSelectedRole: any;
  firstNameValue: any;
  lastNameValue: any;
  emailValue: any;
  setFirstName: any;
  setLastName: any;
  setEmail: any;
  addUser: any;
}) => {
  return (
    <>
      <div>Add Users</div>
      <div className="m-5">
        <div className="d-flex align-items-center">
          <div
            className="rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid lightgrey",
              padding: "0.5rem 1rem",
              margin: "0 0",
              marginRight: "0.6rem",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                color: "lightgrey",
              }}
            >
              First Name
            </div>
            <input
              type="text"
              className="border border-0"
              value={firstNameValue}
              onChange={setFirstName}
              style={{
                outline: "none",
                width: "100%",
              }}
              placeholder="Enter First Name"
            />
          </div>
          <div
            className="rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid lightgrey",
              padding: "0.5rem 1rem",
              margin: "0 0",
              marginRight: "1rem",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                color: "lightgrey",
              }}
            >
              Last Name
            </div>
            <input
              type="text"
              className="border border-0"
              value={lastNameValue}
              onChange={setLastName}
              style={{
                outline: "none",
                width: "100%",
              }}
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div
          className="rounded"
          style={{
            backgroundColor: "white",
            border: "1px solid lightgrey",
            padding: "0.5rem 1rem",
            margin: "1.5rem 0 1rem 0",
            width: "98%",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "lightgrey",
            }}
          >
            User Email or ID
          </div>
          <input
            type="email"
            className="border border-0"
            value={emailValue}
            onChange={setEmail}
            style={{
              outline: "none",
              width: "100%",
            }}
            placeholder="Enter Email or ID"
          />
        </div>
        <div>
          <div
            className="d-flex align-items-center"
            style={{
              color: "grey",
              margin: "1rem 0 1rem 0 ",
            }}
          >
            <BiSpreadsheet className="me-2" />
            <div>Services</div>
          </div>
          <div
            style={{
              color: "grey",
              fontSize: "1rem",
            }}
          >
            Dear User if you want to select multiple service so you can click on
            select service.
          </div>
          <div
            className="rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid lightgrey",
              padding: "1rem 1rem",
              margin: "1.5rem 0 1rem 0",
              width: "98%",
            }}
            onClick={servicesHandler}
          >
            <div className="d-flex justify-content-between">
              <div
                style={{
                  fontSize: "1rem",
                  color: "red",
                }}
              >
                Services Selected
              </div>
              <div className="d-flex align-items-center">
                <div>All</div>
                <BiChevronDown />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between my-4 align-items-center">
            <div
              className="d-flex align-items-center"
              style={{
                color: "grey",
              }}
            >
              <BiUser className="me-2" /> <div>Role</div>
            </div>
            <div className="text-danger" onClick={createNewRoleHandler}>
              + Add New Role
            </div>
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            {rolesList?.map((role: any, index: number) => (
              <label
                key={index}
                style={{
                  width: "25%",
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    selectedRole ? role.roleId === selectedRole.roleId : false
                  }
                  id="admin-checkbox"
                  onChange={() => handleSelectedRole(role)}
                  style={{
                    marginRight: "1rem",
                    accentColor: "red",
                  }}
                />
                {role.roleName}
              </label>
            ))}
          </div>
          <div
            style={{
              color: "grey",
              margin: "1rem 0 1rem 0 ",
            }}
            className="d-flex align-items-center"
            onClick={() => setShowPermissions(!showPermissions)}
          >
            <div className="me-2">See permissions</div>
            {showPermissions ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {showPermissions ? (
            <>
              <div
                className="d-flex align-items-center "
                style={{
                  color: "grey",
                  margin: "1rem 0 1rem 0 ",
                }}
              >
                <BiSpreadsheet className="me-2" />
                <div>Permissions</div>
              </div>
              <ul>
                <li>Service Booking Permission</li>
                <li>Service Edit Permission</li>
                <li>Service Delete Permission</li>
                <li>Permission 4</li>
                <li>New Permission 5</li>
              </ul>
            </>
          ) : null}
          <div
            style={{
              color: "grey",
            }}
          >
            You are Allowing the below user to access your account to perform
            action on your behalf
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                id="admin-checkbox"
                checked={isAgreeTerms}
                onChange={setIsAgreeTerms}
                style={{
                  marginRight: "0.4rem",
                }}
              />
              I agree to the <b>Terms of Services</b>
            </label>
          </div>
          {isAgreeTerms ? (
            <div className="d-flex justify-content-end" onClick={addUser}>
              <button className="btn btn-danger">
                <b>Invite</b>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default AddUsersDetails;
