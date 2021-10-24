import React, { useState } from "react";
import { Dropdown, Icon, Input, Menu, Checkbox } from "semantic-ui-react";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";

function MenuList() {
    const [columnSelect, setColumnSelect] = useState([]);
  const dispatch = useDispatch();

  const options = [
    { key: "first_name", text: "First Name", value: "first_name" },
    { key: "middle_name", text: "Middle Name", value: "middle_name" },
    { key: "last_name", text: "Last Name", value: "last_name" },
    { key: "gender", text: "Gender", value: "gender" },
    { key: "gotra", text: "Gotra", value: "gotra" },
    { key: "alive", text: "Alive", value: "alive" },
    { key: "marital_status", text: "Marital Status", value: "marital_status" },
    { key: "earning", text: "Earnings", value: "earning" },
    { key: "address_ward", text: "WardName", value: "address_ward" },
    { key: "personal_number", text: "Contact", value: "personal_number" },
    { key: "email", text: "Email", value: "email" },
    { key: "education", text: "Education", value: "education" },
    {
      key: "education_detail",
      text: "Education Details",
      value: "education_detail",
    },
    { key: "blood_group", text: "Blood Group", value: "blood_group" },
    { key: "birth_date", text: "Birth Date", value: "birth_date" },
    { key: "address_city", text: "City", value: "address_city" },
    { key: "address_district", text: "District", value: "address_district" },
    { key: "address_tehsil", text: "Tehsil", value: "address_tehsil" },
    { key: "permanent_pincode", text: "Pin Code", value: "permanent_pincode" },
  ];

  const changeSelection = (e, { value }) => {
    //   console
    console.log(value);
    console.log(value.join(" "));
    setColumnSelect(value.join(" "));
    dispatch({
        type: "column_select",
        column_select: value.join(" "),
      });
  };

  return (
    <>
      <Menu vertical>
        <Dropdown
          className="menu-dropdown"
          multiple
          selection
          item
          fluid
          options={options}
          text="Choose an option"
          onChange={changeSelection}
          //   renderLabel={renderLabel}
        />
        <Menu.Item>
            <button >Fetch Data</button>
        </Menu.Item>
      </Menu>
    </>
  );
}
export default MenuList;
