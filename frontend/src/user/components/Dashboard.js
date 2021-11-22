import React, { useState, useEffect, useContext } from "react";
import { HotTable } from "@handsontable/react";
import { AuthContext } from "../../shared/context/auth-context";
import "handsontable/dist/handsontable.min.css";
import "./Dashboard.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MenuList from "./Menu";
import { CSVLink, CSVDownload } from "react-csv";
import {
  Dropdown,
  Message,
  Icon,
  Input,
  Menu,
  Checkbox,
  Dimmer,
  Loader,
  Button,
} from "semantic-ui-react";

function Dashboard() {
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  const key = useSelector((state) => state.personal.column_select);
  const [columns, setColumn] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [columnSelect, setColumnSelect] = useState([]);
  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [fetchDisabled, setFetchDisabled] = useState(false);
  const [displayHeaders, setDisplayHeaders] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const isLoading = useSelector((state) => state.personal.loading);


  useEffect(()=>{
  const check=  data.sort(function(a, b){
    console.log(a);
      if(a[0] < b[0]) { return -1; }
      if(a[0] > b[0]) { return 1; }
      return 0;
  });
  console.log('===========check=========================');
  console.log(check);
  console.log('===========check=========================');
  },[data])

  const headOptions = {
    first_name: "First Name",
    middle_name: "Middle Name",
    last_name: "Last Name",
    gender: "Gender",
    gotra: "Gotra",
    alive: "Alive",
    marital_status: "Marital Status",
    earning: "Earnings",
    address_ward: "WardName",
    personal_number: "Contact",
    email: "Email",
    education: "Education",
    education_detail: "Education Details",
    blood_group: "Blood Group",
    birth_date: "Birth Date",
    address_city: "City",
    address_district: "District",
    permanent_pincode: "Pin Code",
  };

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
    // console.log(value);
    // console.log(value.join(" "));
    let text = value.length - 1;
    // console.log(headOptions[value[text]]);
    let head = headers;
    head.push(headOptions[value[text]]);
    // console.log(head)
    setHeaders(head);
    setColumnSelect(value);
    setFetchDisabled(false);
    dispatch({
      type: "column_select",
      column_select: value.join(" "),
    });
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const onFetch = () => {
    setData([]);
    setHeaders([]);
    setDisplayHeaders([]);
    fetchTableDetails("getAll");
    fetchTableDetails("getAllFemale");
  };

  const fetchTableDetails = (val) => {
    setDisplayHeaders([]);
    dispatch({
      type: "loading",
      loading: true,
    });
    dispatch({
      type: "message",
      message: [],
    });
    axios({
      method: "post",
      url: `http://localhost:4000/api/users/${val}`,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
      data: { key: key },
    })
      .then((response) => {
        setDisplayHeaders(headers);
        //  console.log(response.data);
        let dataVal = [];
        (response.data?.list || []).map((item) => {
          // let val = Object.values(item);
          let row = [];
          columnSelect.map((keys) => {
            // console.log(keys);
            if (keys === "gender") {
              console.log(keys);
              val == "getAll" ? row.push("M") : row.push("F");
            } else if (keys === "birth_date") {
              // console.log(item[keys]);
              if (item[keys]) {
                let initDate = item[keys];
                let date =
                  initDate.substring(8, 10) +
                  "-" +
                  initDate.substring(5, 7) +
                  "-" +
                  initDate.substring(0, 4);
                row.push(date);
              } else {
                row.push("");
              }
            } else {
              item[keys] ? row.push(item[keys]) : row.push("");
            }
          });
          dataVal.push(row);
        });
        //  console.log(dataVal);
        // let addData = [];
        // maleData.push(dataVal);
        val == "getAll" ? setMaleData(dataVal) : setFemaleData(dataVal);
        // console.log(maleData);
        // maleData = maleData[0].concat(maleData[1]);
        // setData(maleData);
        setHeaders(headers);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
        setFetchDisabled(true);
      });
  };

  useEffect(() => {
    const dataNew = [...maleData, ...femaleData];
    setData(dataNew);
    dispatch({
      type: "loading",
      loading: false,
    });
  }, [maleData, femaleData]);

  useEffect(() => {
    let columnType = [];
    if (data.length > 0 && columnSelect.length > 0) {
      columnSelect.map((item) => {
        if (item == "earning" || item == "personal_number") {
          columnType.push({ type: "numeric" });
        } else if (item == "birth_date") {
          columnType.push({ type: "date" });
        } else {
          columnType.push({ type: "text" });
        }
      });
    }
    // console.log(columnType);
    setColumn(columnType);
  }, [key, data]);

  return (
    <>
      <Menu>
        {/* <Dropdown
          className="menu-dropdown"
          multiple
          selection
          item
          fluid
          options={options}
          text="Choose an option"
          onChange={changeSelection}
        /> */}
        <Dropdown
          placeholder="Please select below columns..."
          fluid
          multiple
          selection
          options={options}
          onChange={changeSelection}
        />
        <Menu.Item>
          <Button
            color="facebook"
            onClick={onFetch}
            disabled={fetchDisabled || headers.length == 0}
          >
            <Icon name="table" /> Fetch data
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button color="instagram" disabled={displayHeaders.length == 0}>
            <Icon name="download" />{" "}
            <CSVLink
              data={data}
              headers={headers}
              filename="BramhanSabha_Report.csv"
            >
              Export data
            </CSVLink>
          </Button>
        </Menu.Item>
      </Menu>
      <>
        {(columnSelect.length == 0 && data.length == 0) ? (
          <Message
            error
            header="Please select above columns to display table"
          />
        ) : (
          <>
            
            <div id="hot-app" className="hot-table-val">
            {isLoading && (
              <Dimmer active={isLoading} inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            )}
              <HotTable
                data={data}
                colHeaders={displayHeaders}
                rowHeaders={true}
                columns={columns}
                columnSorting={true}
                filters={true}
                filter={true}
                dropdownMenu={true}
                licenseKey={"non-commercial-and-evaluation"}
                readOnly={true}
                dragToScroll={true}
                // width="500"
                // height="200"
                // stretchH='all'
                // height="100"
                manualColumnResize={true}
                // colWidths= {120}
                // width= '2000'
                // height='100%'
              />
            </div>
          </>
        )}
      </>
    </>
  );
}

export default Dashboard;
