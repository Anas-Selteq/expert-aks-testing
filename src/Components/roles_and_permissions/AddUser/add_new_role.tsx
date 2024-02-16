import {
  AddRolePermissions,
  CreateNewRole,
  GetAllMenus,
} from "@/helper";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

const AddNewRole = ({ goBackHandler }: { goBackHandler: any }) => {
  const [enterNewRole, setEnterNewRole] = useState("");

  const [menuModel, setMenuModel] = useState([]);
  const [selectedActions, setSelectedActions] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    GetAllMenus()
      .then((res) => {
        console.log(res);
        setMenuModel(res.result.menuModel);
      })
      .catch((e) => alert(e));
  }, []);

  const handleActionSelection = (menuName: string, action: string) => {
    console.log(selectedActions);
    setSelectedActions((prevSelectedActions) => {
      const updatedSelectedActions = { ...prevSelectedActions };
      if (!updatedSelectedActions.hasOwnProperty(menuName)) {
        updatedSelectedActions[menuName] = [action];
      } else {
        if (updatedSelectedActions[menuName].includes(action)) {
          updatedSelectedActions[menuName] = updatedSelectedActions[
            menuName
          ].filter((selectedAction) => selectedAction !== action);
        } else {
          updatedSelectedActions[menuName] = [
            ...updatedSelectedActions[menuName],
            action,
          ];
        }
      }
      return updatedSelectedActions;
    });
  };

  const goBackToParentHandler = () => {
    const businessID =
      typeof window !== "undefined" && localStorage.getItem("businessId");
    const data = {
      name: enterNewRole,
      createdBy: businessID,
      currency: "string",
      description: "string",
    };
    CreateNewRole(data)
      .then((res) => {
        const keys = Object.keys(selectedActions);
        const RolePermissionData = {
          roleId: res.result.id,
          createdBy: businessID,
          permissions: selectedActions[keys[0]],
        };
        AddRolePermissions(RolePermissionData)
          .then((res) => {
            goBackHandler();
          })
          .catch((e) => alert(e));
      })
      .catch((e) => alert(e));
  };

  return (
    <>
      <div>Add New Role</div>
      <div
        className="rounded"
        style={{
          backgroundColor: "white",
          border: "1px solid lightgrey",
          padding: "0.5rem 1rem",
          margin: "0 0",
          marginTop: "1rem",
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
          New Role
        </div>
        <input
          type="text"
          className="border border-0"
          value={enterNewRole}
          onChange={(e) => setEnterNewRole(e.target.value)}
          style={{
            outline: "none",
            width: "100%",
          }}
          placeholder="Enter New Role"
        />
      </div>
      <div
        className="d-flex align-items-center"
        style={{
          color: "grey",
          margin: "1rem 0 1rem 0",
        }}
      >
        <BiHelpCircle className="me-2" /> <div> Permissions</div>
      </div>
      {menuModel?.map((menu: any, index: number) => {
        return (
          <>
            <div className="rounded border bg-light mb-2 px-3 py-2">
              <div className="text-secondary">{menu.menuName}</div>
              {menu.actions.map((action: any, index: any) => (
                <div key={index} className="mt-3">
                  <label>
                    <input
                      type="checkbox"
                      id={action}
                      style={{
                        marginRight: "1rem",
                        accentColor: "red",
                      }}
                      checked={
                        selectedActions.hasOwnProperty(menu.menuName) &&
                        selectedActions[menu.menuName].includes(action)
                      }
                      onChange={() =>
                        handleActionSelection(menu.menuName, action)
                      }
                    />
                    {action}
                  </label>
                </div>
              ))}
            </div>
          </>
        );
      })}
      {enterNewRole.length <= 6 &&
      Object.keys(selectedActions).length === 0 ? null : (
        <button className="btn btn-danger mt-3" onClick={goBackToParentHandler}>
          Create New Role
        </button>
      )}
    </>
  );
};
export default AddNewRole;
