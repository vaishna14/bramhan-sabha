import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Icon,
  Input,
  Form,
  Dimmer,
  Loader,
  Message,
  Dropdown,
} from "semantic-ui-react";
import { FormData } from "../Services/FormData";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./PersonalDetails.css";
import "./App.css";
import Dashboard from "../components/Dashboard";
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import useWindowSize from "../../shared/util/useWindoSize";

function Details(props) {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const detailsType = useSelector((state) => state.personal.displayType);
  const [gender, setGender] = useState("");
  const [alive, setAlive] = useState("Yes");
  const [addPermanent, setAddPermanent] = useState(false);
  const [education, setEducation] = useState("");
  const [formDetails, setFormDetails] = useState({});
  const fatherAlive = useSelector((state) => state.personal.fatherAlive);
  const motherAlive = useSelector((state) => state.personal.motherAlive);
  const partnerFatherAlive = useSelector(
    (state) => state.personal.partnerFatherAlive
  );
  const partnerMotherAlive = useSelector(
    (state) => state.personal.partnerMotherAlive
  );
  const isLoading = useSelector((state) => state.personal.loading);
  const message = useSelector((state) => state.personal.message);
  const child_count = useSelector((state) => state.personal.child_count);
  const childId = useSelector((state) => state.personal.child_id);
  const marital_status = useSelector((state) => state.personal.marital_status);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [occupation, setOccupation] = useState("");
  const [earning, setEarnings] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [gotraSuggestions, setGotraSuggestions] = useState([]);
  const [educationSuggestions, setEducationSuggestions] = useState([]);
  const [occupationSuggestions, setEOccupationSuggestions] = useState([]);
  const [wardNameSuggestions, setWardNameSuggestions] = useState([]);
  const [dataListSelect, setDataListSelect] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleValue] = useState("");
  const [lastName, setLastValue] = useState("");
  const [gotra, setGotra] = useState("");
  const [educationDetails, setEDucationDetails] = useState("");
  const [occupationDetails, setOccupationDetails] = useState("");
  const [marriage, setMarriage] = useState("");
  const [wardName, setWardName] = useState("");
  const { width } = useWindowSize();
  const [visible, setVisible] = useState("");


  useEffect(()=>{

    if(width < 500){
      console.log("display-grid");
      console.log("height-200rem")
    }

  },[width])

  const today =  new Date().getFullYear()+"-"+ (new Date().getMonth()<10 ? "0":"")+ new Date().getMonth()+"-"+(new Date().getDate()<10 ?"0":"")+ new Date().getDate()

  const aliveOptions = [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];
  const bloodGroupOptions = [
    { key: "A+", text: "A+", value: "A+" },
    { key: "A-", text: "A-", value: "A-" },
    { key: "B+", text: "B+", value: "B+" },
    { key: "B-", text: "B-", value: "B-" },
    { key: "AB+", text: "AB+", value: "AB+" },
    { key: "AB-", text: "AB-", value: "AB-" },
    { key: "O+", text: "O+", value: "O+" },
    { key: "O-", text: "O-", value: "O-" },
  ];

  const occupationOptions = [
    { key: "Occupation", text: "Occupation", value: "Occupation" },
    { key: "Business", text: "Business", value: "Business" },
    { key: "Retired", text: "Retired", value: "Retired" },
    { key: "Other", text: "Other", value: "Other" },
    { key: "None", text: "None", value: "None" },
  ];

  const earningsOptions = [
    { key: "<5", text: "<5LPA", value: "<5" },
    { key: "5-10", text: "5-10LPA", value: "5-10" },
    { key: "10-20", text: "10-20LPA", value: "10-20" },
    { key: ">20", text: ">20LPA", value: ">20" },
  ];

  const educationOptions = [
    { key: "<SSC", text: "Below SSC", value: "<SSC" },
    { key: "SSC", text: "SSC", value: "SSC" },
    { key: "HSC", text: "HSC", value: "HSC" },
    { key: "Diploma", text: "Diploma", value: "Diploma" },
    { key: "Graduation", text: "Graduation", value: "Graduation" },
    { key: "PG", text: "Post-Graduation", value: "PG" },
    { key: "PhD", text: "PhD", value: "PhD" },
    { key: "Other", text: "Other", value: "Other" },
  ];

  const maritalStatus = [
    { key: "Single", text: "Single", value: "Single" },
    { key: "Married", text: "Married", value: "Married" },
    { key: "Widow", text: "Widow", value: "Widow" },
    { key: "Divorced", text: "Divorced", value: "Divorced" },
  ];

  useEffect(() => {
    // setIsLoading(true);
    dispatch({
      type: "loading",
      loading: true,
    });
    dispatch({
        type: "message",
        message: [],
      });
    axios({
      method: "get",
      url: `https://test27102021.herokuapp.com/api/users/getUserDetails/${props.type}/${childId}`,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((response) => {
        if (props.type === response.data.type) {
          if (response?.data?.detail) {
            setFormDetails(response?.data?.detail);
            console.log(response?.data?.detail);
            if(props.type !== "partner" && props.type !=="mother" && props.type !== "kids_spouse"){
            dispatch({
                type: "marital_status",
                marital_status: response?.data?.detail?.marital_status,
              });
            }
            setSubmitDisable(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
        dispatch({
          type: "loading",
          loading: false,
        });
      });
  }, []);

  useEffect(() => {
    dispatch({
        type: "message",
        message: [],
      });
    axios({
      method: "get",
      url: `https://test27102021.herokuapp.com/api/users/suggestions`,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((response) => {
        let arr = [];
        let gotra = [];
        let occupation = [];
        let education = [];
        let ward = [];
        response.data.list.map((item) => {
          let obj = {};
          let objGotra = {};
          let occupationObj = {};
          let educationObj = {};
          let wardObj = {};
          obj.key = item._id;
          obj.text =
            item.first_name + " " + item.middle_name + " " + item.last_name;
          obj.value =
            item.first_name + " " + item.middle_name + " " + item.last_name;
          obj.first_name = item.first_name;

          objGotra.key = item.gotra;
          objGotra.text = item.gotra;
          objGotra.value = item.gotra;

          occupationObj.key = item.occupation_detail;
          occupationObj.text = item.occupation_detail;
          occupationObj.value = item.occupation_detail;

          educationObj.key = item.education_detail;
          educationObj.text = item.education_detail;
          educationObj.value = item.education_detail;

          wardObj.key = item.address_ward;
          wardObj.text = item.address_ward;
          wardObj.value = item.address_ward;

          arr.push(obj);

          if (item.gotra) {
            gotra.push(objGotra);
          }
          if (item.occupation_detail) {
            occupation.push(occupationObj);
          }
          if (item.education_detail) {
            education.push(educationObj);
          }
          if (
            item.address_ward &&
            ward.filter((e) => e.text == item.address_ward).length == 0
          ) {
            ward.push(wardObj);
          }

          return;
        });
        setSuggestions(arr);
        setGotraSuggestions(gotra);
        setEducationSuggestions(education);
        setEOccupationSuggestions(occupation);
        setWardNameSuggestions(ward);
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //     setIsLoading(false);
    // })
  }, []);

  useEffect(() => {
    // console.log(formDetails);
    setGender(formDetails?.gender);
    setAlive(formDetails?.alive);
    setBloodGroup(formDetails?.blood_group);
    setEducation(formDetails?.education);
    setEarnings(formDetails?.earning);
    setOccupation(formDetails?.occupation);
    setFirstName(formDetails?.first_name);
    setMiddleValue(formDetails?.middle_name);
    setLastValue(formDetails?.last_name);
    dispatch({
      type: "fatherAlive",
      fatherAlive: formDetails?.father_alive,
    });
    dispatch({
      type: "motherAlive",
      motherAlive: formDetails?.mother_alive,
    });
  }, [formDetails]);

  const fatherSelected = (e, { name, value }) => {
    dispatch({
      type: "display_type",
      displayType: "parent",
    });
    dispatch({
      type: "fatherAlive",
      fatherAlive: value,
    });
    dispatch({
      type: "profile",
      profile: false,
    });
  };

  const motherSelected = (e, { name, value }) => {
    dispatch({
      type: "display_type",
      displayType: "parent",
    });
    dispatch({
      type: "motherAlive",
      motherAlive: value,
    });
    dispatch({
      type: "profile",
      profile: false,
    });
  };

  const formChange = (e, { name, value }) => {
    dispatch({
      type: "profile",
      profile: false,
    });
    let form = formDetails;
    if (!form[name]) {
      form[name] = value;
      if (name === "first_name") {
        let val = value.split(" ");
        form[name] = val[0].replace(/[^a-zA-Z ]/g, "");
        setFirstName(val[0].replace(/[^a-zA-Z ]/g, ""));
      }
      if (name === "middle_name") {
        let val = value.split(" ");
        if (!val[1]) {
          form[name] = value.replace(/[^a-zA-Z ]/g, "");
          setLastValue(value.replace(/[^a-zA-Z ]/g, ""));
        } else {
          form[name] = val[1].replace(/[^a-zA-Z ]/g, "");
          setMiddleValue(val[1].replace(/[^a-zA-Z ]/g, ""));
        }
      }
      if (name === "last_name") {
        let val = value.split(" ");
        if (!val[2]) {
          form[name] = value.replace(/[^a-zA-Z ]/g, "");
          setLastValue(value.replace(/[^a-zA-Z ]/g, ""));
        } else {
          form[name] = val[2].replace(/[^a-zA-Z ]/g, "");
          setLastValue(val[2].replace(/[^a-zA-Z ]/g, ""));
        }
      }
    } else {
      var newForm = {};
      newForm[name] = value;
      if (name === "first_name") {
        let val = value.split(" ");
        newForm[name] = val[0].replace(/[^a-zA-Z ]/g, "");
        setFirstName(val[0].replace(/[^a-zA-Z ]/g, ""));
      }
      if (name === "middle_name") {
        let val = value.split(" ");
        if (!val[1]) {
          newForm[name] = value.replace(/[^a-zA-Z ]/g, "");
          setFirstName(value.replace(/[^a-zA-Z ]/g, ""));
        } else {
          newForm[name] = val[1].replace(/[^a-zA-Z ]/g, "");
          setFirstName(val[1].replace(/[^a-zA-Z ]/g, ""));
        }
      }
      if (name === "last_name") {
        let val = value.split(" ");
        if (!val[2]) {
          newForm[name] = value.replace(/[^a-zA-Z ]/g, "");
          setFirstName(value.replace(/[^a-zA-Z ]/g, ""));
        } else {
          newForm[name] = val[2].replace(/[^a-zA-Z ]/g, "");
          setFirstName(val[2].replace(/[^a-zA-Z ]/g, ""));
        }
      }

      let keys = Object.keys(newForm);

      keys.map((x) => {
        form[x] = newForm[x];
      });
    }
    if (name == "gotra") {
      setGotra(value.replace(/[^a-zA-Z ]/g, ""));
    }
    if (name == "occupation_detail") {
      setOccupation(value.replace(/[^a-zA-Z ]/g, ""));
    }
    if (name == "education_detail") {
      setEducation(value.replace(/[^a-zA-Z ]/g, ""));
    }
    if (name == "address_ward") {
      setWardName(value.replace(/[^a-zA-Z ]/g, ""));
    }
    if (name == "marital_status") {
      setMarriage(value.replace(/[^a-zA-Z ]/g, ""));
      if(props.type == "personal" || props.type == "kids" || props.type == "father"){
      dispatch({
        type: "marital_status",
        marital_status: value.replace(/[^a-zA-Z ]/g, ""),
      });
    }else{
        dispatch({
            type: "marital_status",
            marital_status: "",
          });
    }
    }
    setFormDetails(form);
    if (name === "gender" && detailsType === "parent") {
      props.type === "father" ? (form[name] = "M") : (form[name] = "F");
    }

    if (name === "alive") {
      setAlive(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (name === "blood_group") {
      setBloodGroup(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (name === "occupation") {
      setOccupation(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (name === "education") {
      setEducation(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (name === "earning") {
      setEarnings(value.replace(/[^a-zA-Z ]/g, ""));
    }

    if (name === "mother_alive") {
      if (props.type === "personal") {
        dispatch({
          type: "motherAlive",
          motherAlive: value || "No",
        });
      }
      if (props.type === "partner") {
        dispatch({
          type: "partnerMotherAlive",
          partnerMotherAlive: value || "No",
        });
      }
    }

    if (name === "father_alive") {
      // dispatch({
      //     type: 'display_type',
      //     "displayType": "parent"
      // });
      if (props.type === "personal") {
        dispatch({
          type: "fatherAlive",
          fatherAlive: value,
        });
      }
      if (props.type === "partner") {
        dispatch({
          type: "partnerFatherAlive",
          partnerFatherAlive: value,
        });
      }
    }
  };

  useEffect(() => {
    if (occupation === "" || occupation === "None") {
      setEarnings("");
    }
  }, [occupation]);


  const formSubmit = async (e) => {
    e.preventDefault();
    let existId = "";
    // console.log("here");
    let Name =
      formDetails.first_name +
      " " +
      formDetails.middle_name +
      " " +
      formDetails.last_name;
    suggestions.map((item) => {
      if (item.text == Name) {
        existId = item.key;
      }
    });
    dispatch({
      type: "loading",
      loading: true,
    });
    // console.log(formDetails);
    // console.log(childId);
    const val = await FormData({
      form: formDetails,
      type: props.type,
      token: auth.token,
      isExist: existId,
      formId: auth.formId,
      kidId: childId,
      kidCount: child_count,
    });
    //    console.log(val);
    if (val) {
    //   console.log(val);
      dispatch({
        type: "message",
        message: [val,props.type]
      });
      dispatch({
        type: "loading",
        loading: false,
      });
    } else {
    //   console.log("no datya");
      dispatch({
        type: "loading",
        loading: false,
      });
      dispatch({
        type: "message",
        message: ["Something went wrong. Please contact admin."],
      });
    }
  };

  const handleAddition = (e, { name, value }) => {
    // console.log(name);

    if (name === "gotra") {
      let suggList = gotraSuggestions;
      setGotraSuggestions([{ text: value, value }, ...suggList]);
    } else if (name == "occupation_detail") {
      let suggList = occupationSuggestions;
      setEOccupationSuggestions([{ text: value, value }, ...suggList]);
    } else if (name == "education_detail") {
      let suggList = educationSuggestions;
      setEducationSuggestions([{ text: value, value }, ...suggList]);
    } else if (name == "address_ward") {
      let suggList = wardNameSuggestions;
      setWardNameSuggestions([{ text: value, value }, ...suggList]);
    } else {
      let suggList = suggestions;
      setSuggestions([{ text: value, value }, ...suggList]);
    }
  };

  useEffect(() => {
    // console.log(formDetails);
    // console.log(!formDetails?.approve);
    // console.log(formDetails.approve == undefined);
    // if(Object.entries){
    //     setSubmitDisable()
    // }
    // console.log(Object.entries(formDetails));
    if (Object.entries(formDetails).length == 0) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(!formDetails?.approve);
    }
  }, [formDetails]);

  return (
    <div>
      <Dimmer active={isLoading} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
<>
{
    (props.type == "partner" || props.type =="mother" || props.type == "kids_spouse") && marital_status == "Single" ? (
        <Message info close>
            <Message.Header> No partner details. As user is not Married.</Message.Header>
          </Message>
    ) : (

    <>
      <Form onSubmit={formSubmit}>
        {submitDisable && (
          <Message negative>
            <Message.Header>
              Admin needs to approve in order to edit your data.
            </Message.Header>
            {/* <p>That offer has expired</p> */}
          </Message>
        )}

        {(message[1] == props.type && message[0]) && (
          <Message info close>
            <Message.Header> {message[0]}</Message.Header>
          </Message>
        )}

        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p mt-1p`}>
          <h4 className={`mx-auto ${width <1100 ? "width-30p" : "width-10p"}`}>Form No.</h4>
          <div className="mx-5p">
            <h4 className={`mx-auto ${width <1100 ? "width-30p" : "width-10p"} danger`}>
              {formDetails?.formId || " "}
            </h4>
          </div>
        </div>
        <Form.Group>
          <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p mt-1p width-100p`}>
            <h4 className={`mx-auto ${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Full name</h4>
            <div className="mx-5p">
              <Form.Dropdown
                required
                options={suggestions}
                placeholder="FirstName"
                search
                selection
                fluid
                allowAdditions
                value={formDetails?.first_name}
                text={formDetails?.first_name}
                name="first_name"
                onAddItem={handleAddition}
                onChange={formChange}
                className="mb-1p mt-1p"
              />
            </div>
            <div className="mx-5p">
              {" "}
              <Form.Dropdown
                required
                options={suggestions}
                placeholder="Middle Name"
                search
                selection
                fluid
                allowAdditions
                value={formDetails?.middle_name}
                text={formDetails?.middle_name}
                id="middle_name"
                name="middle_name"
                onAddItem={handleAddition}
                onChange={formChange}
                className="mb-1p mt-1p"
              />
            </div>
            {/* /> <Form.Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." name="middle_name" onChange={formChange} defaultValue={formDetails?.middle_name} /> </div> */}
            <div className="mx-5p">
              {/* <Form.Input placeholder="Last Name" type="text" id="last_name" name="last_name" onChange={formChange} defaultValue={formDetails?.last_name} />  */}
              <Form.Dropdown
                required
                options={suggestions}
                placeholder="Last Name"
                search
                selection
                fluid
                allowAdditions
                value={formDetails?.last_name}
                text={formDetails?.last_name || ""}
                id="last_name"
                name="last_name"
                onAddItem={handleAddition}
                onChange={formChange}
                className="mb-1p mt-1p"
              />
            </div>
          </div>
        </Form.Group>
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <div className={`width-50p ${width <500 ? "display-grid" : "display-flex"}`}>
          <h4 className={`${width <1100 ? "width-20p" : "width-20p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Gender</h4>
          <div className={`${width <500 ? "display-grid" : "display-flex"}`} style={{ width: "200px" }}>
            <Form.Radio
              required
              className="mx-5p"
              label="Male"
              name="gender"
              value="M"
              disabled={detailsType === "parent"}
              checked={gender === "M" || props.type === "father"}
              onChange={() => {
                setGender("M");
                formChange("e", { name: "gender", value: "M" });
              }}
            />
            <Form.Radio
              required
              className="mx-5p"
              label="Female"
              name="gender"
              value="F"
              disabled={detailsType === "parent"}
              checked={gender === "F" || props.type === "mother"}
              onChange={() => {
                setGender("F");
                formChange("e", { name: "gender", value: "F" });
              }}
            />
          </div>
          </div>
          <div className={`${width <500 ? "display-grid" : "display-flex"} mx-5p width-50p`}>
            <h4 className={`${width <1100 ? "width-20p" : "width-20p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Gotra</h4>
            <Form.Dropdown
              options={gotraSuggestions}
              placeholder="Gotra"
              search
              selection
              fluid
              allowAdditions
              value={formDetails?.gotra}
              text={formDetails?.gotra || ""}
              id="gotra"
              name="gotra"
              onAddItem={handleAddition}
              onChange={formChange}
              className="mx-5p"
            />
            {/* <Form.Input type="text" placeholder="Gotra" className="mx-5p" onChange={formChange} name="gotra" defaultValue={formDetails?.gotra} /> */}
          </div>
        </div>
        {gender === "F" && (
          <>
            <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
              <h4 className={`mx-auto ${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Maiden name</h4>
              <div className="mx-5p">
                <Form.Input
                  required
                  placeholder="First Name"
                  type="text"
                  id="first_name"
                  // errorText="Please enter a valid title."
                  name="maiden_first_name"
                  onChange={formChange}
                  defaultValue={formDetails?.maiden_first_name}
                />{" "}
              </div>
              <div className="mx-5p">
                {" "}
                <Form.Input
                  required
                  placeholder="Middle Name"
                  type="text"
                  id="middle_name"
                  // errorText="Please enter a valid title."
                  name="maiden_middle_name"
                  onChange={formChange}
                  defaultValue={formDetails?.maiden_middle_name}
                />{" "}
              </div>
              <div className="mx-5p">
                <Form.Input
                  required
                  placeholder="Last Name"
                  type="text"
                  id="last_name"
                  name="maiden_last_name"
                  onChange={formChange}
                  defaultValue={formDetails?.maiden_last_name}
                />{" "}
              </div>
            </div>
            <div className={`${width <500 ? "display-grid" : "display-flex"}  mb-1p`}>
              <h4 className={`mx-auto ${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Maiden City</h4>
              <div className="mx-5p">
                <Form.Input
                  required
                  placeholder="Maiden City"
                  type="text"
                  // errorText="Please enter a valid title."
                  name="maiden_city"
                  onChange={formChange}
                  defaultValue={formDetails?.maiden_city}
                />{" "}
              </div>
            </div>
          </>
        )}
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Alive</h4>
          <Form.Dropdown
            required
            placeholder="Select"
            search
            selection
            options={aliveOptions}
            name="alive"
            onChange={formChange}
            value={alive}
          />
          {alive === "No" && (
            <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
               <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Death</h4>
              <Form.Input
                required
                className="mx-5p"
                type="date"
                placeholder="Date of Death"
                name="date_of_death"
                max={today}
                onChange={formChange}
                defaultValue={formDetails?.date_of_death}
              />
            </div>
          )}
        </div>
        {
            props.type !== "partner" && props.type !=="mother" && props.type !== "kids_spouse" && (

            
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Marital Status</h4>
          <Form.Dropdown
            required
            placeholder="Select"
            search
            selection
            options={maritalStatus}
            name="marital_status"
            onChange={formChange}
            value={formDetails?.marital_status}
          />

          {formDetails.marital_status !== "Single" && (
            <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
               <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Marriage</h4>
              <Form.Input
                required
                className="mx-5p"
                type="date"
                max={today}
                placeholder="Date of Marriage"
                name="date_of_marriage"
                onChange={formChange}
                defaultValue={formDetails?.date_of_marriage}
              />
            </div>
          )}
        </div>
        )
    }
        {detailsType === "personal" && (
          <>
            <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
              <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? "font-smaller" : ""}`}>Father Alive</h4>
              <Form.Dropdown
                required
                placeholder="Select"
                search
                selection
                options={aliveOptions}
                name="father_alive"
                onChange={formChange}
                value={
                  props.type === "partner" ? partnerFatherAlive : fatherAlive
                }
              />
              {props.type === "personal" ? (
                <>
                  {formDetails?.father_alive == "Yes" &&
                    formDetails?.mother_alive == "Yes" && (
                      <div className={`mx-5p ${width <500 ? "display-grid" : "display-flex"}`}>
                         <h4 className={`${(width <1500 && width>1200) ? " font-smaller" : ""}`}> Mother Alive</h4>
                        <Form.Dropdown
                          required
                          className="mx-5p"
                          placeholder="Select"
                          search
                          selection
                          options={aliveOptions}
                          name="mother_alive"
                          onChange={formChange}
                        />
                      </div>
                    )}

                  {formDetails?.father_alive === "No" && (
                    <>
                      <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
                         <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Death</h4>
                        <Form.Input
                          required
                          className="mx-5p"
                          type="date"
                          max={today}
                          placeholder="Date of Death"
                          name="father_death"
                          onChange={formChange}
                          defaultValue={formDetails?.father_death}
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {partnerFatherAlive === "Yes" &&
                    partnerMotherAlive === "Yes" && (
                      <div className={`mx-5p ${width <500 ? "display-grid" : "display-flex"}`}>
                         <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Mother Alive</h4>
                        <Form.Dropdown
                          required
                          className="mx-5p"
                          placeholder="Select"
                          search
                          selection
                          options={aliveOptions}
                          name="mother_alive"
                          onChange={formChange}
                          value={
                            props.type === "partner"
                              ? partnerMotherAlive
                              : motherAlive
                          }
                        />
                      </div>
                    )}

                  {partnerFatherAlive === "No" && (
                    <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
                       <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Death</h4>
                      <Form.Input
                        required
                        className="mx-5p"
                        type="date"
                        max={today}
                        placeholder="Date of Death"
                        name="father_death"
                        onChange={formChange}
                        defaultValue={formDetails?.father_death}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            {props.type === "personal" ? (
              <>
                {(fatherAlive === "No" || motherAlive === "No") && (
                  <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
                    <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Mother Alive</h4>
                    <Form.Dropdown
                      required
                      placeholder="Select"
                      search
                      selection
                      options={aliveOptions}
                      name="mother_alive"
                      onChange={formChange}
                      value={
                        props.type === "partner"
                          ? partnerMotherAlive
                          : motherAlive
                      }
                    />
                    {motherAlive === "No" && (
                      <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
                         <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Death</h4>
                        <Form.Input
                          required
                          className="mx-5p"
                          type="date"
                          max={today}
                          placeholder="Date of Death"
                          name="mother_death"
                          onChange={formChange}
                          defaultValue={formDetails?.mother_death}
                        />
                      </div>
                    )}
                  </div>
                )}{" "}
              </>
            ) : (
              <>
                {" "}
                {(partnerFatherAlive === "No" ||
                  partnerMotherAlive === "No") && (
                  <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
                    <h4 className={`${width <1100 ? "width-30p" : "width-10p"}`}>Mother Alive</h4>
                    <Form.Dropdown
                      required
                      placeholder="Select"
                      search
                      selection
                      options={aliveOptions}
                      name="mother_alive"
                      onChange={formChange}
                      value={
                        props.type === "partner"
                          ? partnerMotherAlive
                          : motherAlive
                      }
                    />
                    {partnerMotherAlive === "No" && (
                      <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
                         <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Date of Death</h4>
                        <Form.Input
                          required
                          className="mx-5p"
                          type="date"
                          max={today}
                          placeholder="Date of Death"
                          name="mother_death"
                          onChange={formChange}
                          defaultValue={formDetails?.mother_death}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Blood Group</h4>
          <Form.Dropdown
            required
            placeholder="Select Blood Group"
            disabled={alive === "No"}
            clearable
            search
            selection
            options={bloodGroupOptions}
            name="blood_group"
            onChange={formChange}
            value={bloodGroup}
          />

          <div className={`${width <500 ? "display-grid" : "display-flex"} width-70p mx-5p`}>
             <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Birth Date</h4>
            <Input
              required
              className="mx-5p"
              type="date"
              max={today}
              name="birth_date"
              onChange={formChange}
              defaultValue={formDetails?.birth_date}
            />
          </div>
        </div>
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Education</h4>
          <Form.Dropdown
            required
            disabled={alive === "No"}
            placeholder="Select Latest Education"
            clearable
            search
            selection
            options={educationOptions}
            name="education"
            onChange={formChange}
            value={education}
          />
          <div className={`${width <500 ? "display-grid" : "display-flex"} mx-5p`}>
             <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Details</h4>
            <Form.Dropdown
              required
              options={educationSuggestions}
              placeholder="Education Details"
              search
              selection
              fluid
              allowAdditions
              value={formDetails?.education_detail}
              text={formDetails?.education_detail || ""}
              id="education_detail"
              name="education_detail"
              onAddItem={handleAddition}
              onChange={formChange}
              disabled={alive === "No"}
              className="mx-5p"
            />
            {/* <Form.Input disabled={alive === "No"} className="mx-5p" placeholder="Education-detail" type="text" name="education_detail" onChange={formChange} defaultValue={education === "" ? "" : formDetails?.education_detail} /> */}
          </div>
        </div>
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Profession</h4>
          <Form.Dropdown
            required
            disabled={alive === "No"}
            placeholder="Select Type"
            clearable
            search
            selection
            options={occupationOptions}
            name="occupation"
            onChange={formChange}
            value={occupation}
          />
          <div className={`${width <500 ? "display-grid" : "display-flex"} mx-5p`}>
             <h4 className={` ${(width <1500 && width>1200) ? "font-smaller" : ""}`}> Name</h4>
            <Form.Dropdown
              required
              options={occupationSuggestions}
              placeholder="Occupation Name"
              search
              selection
              fluid
              allowAdditions
              value={formDetails?.occupation_detail}
              text={formDetails?.occupation_detail || ""}
              id="occupation_detail"
              name="occupation_detail"
              onAddItem={handleAddition}
              onChange={formChange}
              disabled={alive === "No"}
              className="mx-5p"
            />
            {/* <Form.Input disabled={alive === "No"} className="mx-5p" placeholder="Name of Occupation/Business " type="text" name="occupation_detail" onChange={formChange} defaultValue={occupation === "" ? "" : formDetails?.occupation_detail} /> */}
          </div>
        </div>
        <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Earnings</h4>
          <Form.Dropdown
            required
            disabled={alive === "No"}
            placeholder="Select Type"
            clearable
            search
            selection
            options={earningsOptions}
            name="earning"
            onChange={formChange}
            value={earning}
          />
        </div>
        {
          <>
            <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p`}>
              <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Address</h4>
              <Form.TextArea
                required
                className={`current-address ${width <500 ? "width-70p" : ""}`}
                placeholder="Add your address"
                style={{ minHeight: 100 }}
                name="address"
                onChange={formChange}
                defaultValue={formDetails?.address}
              />
            </div>

            <div className={`${width <500 ? "" : ""} `}>
              <Form.Group>
                <Form.Input
                  required
                  type="text"
                  className={`mx-5p ${(width <1500 && width>1200) ? " font-smaller" : ""}`}
                  label="City"
                  placeholder="City"
                  name="address_city"
                  onChange={formChange}
                  defaultValue={formDetails?.address_city}
                />
                <Form.Input
                  required
                  type="number"
                  className={`mx-5p mb-1p mt-1p ${(width <1500 && width>1200) ? " font-smaller" : ""}`}
                  label="Pin Code"
                  placeholder="Pin-Code"
                  name="address_pincode"
                  onChange={formChange}
                  defaultValue={formDetails?.address_pincode}
                />
              </Form.Group>
              <Form.Group>
                {
                  // detailsType === "personal" && (
                  <Form.Dropdown
                    required
                    options={wardNameSuggestions}
                    placeholder="WardName"
                    search
                    selection
                    fluid
                    allowAdditions
                    value={formDetails?.address_ward}
                    text={formDetails?.address_ward || ""}
                    id="address_ward"
                    name="address_ward"
                    onAddItem={handleAddition}
                    onChange={formChange}
                    disabled={alive === "No"}
                    className="mx-5p width-100p mb-1p mt-1p"
                  />
                  // <Form.Input type="text" className="mx-5p mt-1p" label="WardName" placeholder="Ward Name" name="address_ward" onChange={formChange} defaultValue={formDetails?.address_ward} />

                  // )
                }
                {alive === "Yes" && (
                  <Form.Checkbox
                    label="Add Permanent Address"
                    onChange={() => {
                      setAddPermanent(!addPermanent);
                    }}
                  />
                )}
              </Form.Group>
            </div>
          </>
        }
        {addPermanent && (
          <>
            <div className={`${width <500 ? "display-grid width-70p" : "display-flex"}  mt-1p`}>
              <h4 className={`${width <1100 ? "width-30p" : "width-10p"}`}>Permanent Address</h4>

              <Form.TextArea
                required
                className={`${width <500 ? "width-70p" : ""}  current-address`}
                placeholder="Add your permanent address"
                style={{ minHeight: 100 }}
                name="permanent_address"
                onChange={formChange}
                defaultValue={formDetails?.permanent_address}
              />
            </div>
            <div className={`${width <500 ? "width-70p" : "margin-title"} mb-1p mt-1p `}>
              <Form.Input
                required
                type="text"
                className="mx-5p"
                label="City"
                placeholder="City"
                name="permanent_city"
                onChange={formChange}
                defaultValue={formDetails?.permanent_city}
              />
              <Form.Input
                required
                type="number"
                className="mx-5p"
                label="Pin Code"
                placeholder="000-000"
                name="permanent_pincode"
                onChange={formChange}
                defaultValue={formDetails?.permanent_pincode}
              />
            </div>
          </>
        )}
        {/* <Form.Group> */}
          <div className={`${width <500 ? "display-grid" : "display-flex"} mb-1p mt-1p`}>
            <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Contact no.</h4>

            <Form.Input
              disabled={alive === "No"}
              iconPosition="left"
              className="mx-5p "
              placeholder="Personal no."
              type="number"
              name="personal_number"
              onChange={formChange}
              defaultValue={formDetails?.personal_number}
             
            >
              <Icon name="phone" />
              <input />
            </Form.Input>
            <Form.Input
              required
              disabled={alive === "No"}
              iconPosition="left"
              className="mx-5p "
              placeholder="WhatsApp no."
              type="number"
              name="whatsapp_number"
              onChange={formChange}
              defaultValue={formDetails?.whatsapp_number}
            >
              <Icon className="mx-5p" name="whatsapp" />
              <input className="mx-5p" />
            </Form.Input>
          </div>
        {/* </Form.Group> */}
        <div className={`${width <500 ? "display-grid width-70p" : "display-flex"} mb-1p`}>
          <h4 className={`${width <1100 ? "width-30p" : "width-10p"} ${(width <1500 && width>1200) ? " font-smaller" : ""}`}>Email address</h4>
          <Form.Input
            disabled={alive === "No"}
            iconPosition="left"
            className="mx-5p"
            placeholder="Email"
            type="email"
            name="email"
            onChange={formChange}
            defaultValue={formDetails?.email}
          >
            <Icon name="at" />
            <input className="mx-5p" />
          </Form.Input>
        </div>

        <Form.Button disabled={submitDisable} content="Submit" />
        {detailsType !== "personal" && (
          <Button
            onClick={() => {
              dispatch({
                type: "display_type",
                displayType: "personal",
              });
              dispatch({
                type: "profile",
                profile: false,
              });
            }}
          >
            Go Back
          </Button>
        )}
      </Form>
      </>
    )
}
</>
    </div>
  );
}

export default Details;
