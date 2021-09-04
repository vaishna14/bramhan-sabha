import React, { useState, useContext, useEffect } from 'react';
import { Button, Icon, Input, Form, Dimmer, Loader, Message, Dropdown } from 'semantic-ui-react';
import { FormData } from "../Services/FormData";
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import "./PersonalDetails.css";
import "./App.css";
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';

function Details(props) {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    const detailsType = useSelector((state) => state.personal.displayType)
    const [gender, setGender] = useState("");
    const [alive, setAlive] = useState("Yes");
    const [addPermanent, setAddPermanent] = useState(false);
    const [education, setEducation] = useState("");
    const [formDetails, setFormDetails] = useState({});
    const fatherAlive = useSelector((state) => state.personal.fatherAlive);
    const motherAlive = useSelector((state) => state.personal.motherAlive);
    const partnerFatherAlive = useSelector((state) => state.personal.partnerFatherAlive);
    const partnerMotherAlive = useSelector((state) => state.personal.partnerMotherAlive);
    const isLoading = useSelector((state) => state.personal.loading);
    const child_count = useSelector((state) => state.personal.child_count);
    const childId = useSelector((state) => state.personal.child_id);
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
    const [occupationDetails, setOccupationDetails]= useState("");
    const [wardName, setWardName] = useState("");


    const aliveOptions = [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
    ]
    const bloodGroupOptions = [
        { key: 'A+', text: 'A+', value: 'A+' },
        { key: 'A-', text: 'A-', value: 'A-' },
        { key: 'B+', text: 'B+', value: 'B+' },
        { key: 'B-', text: 'B-', value: 'B-' },
        { key: 'AB+', text: 'AB+', value: 'AB+' },
        { key: 'AB-', text: 'AB-', value: 'AB-' },
        { key: 'O+', text: 'O+', value: 'O+' },
        { key: 'O-', text: 'O-', value: 'O-' },
    ]

    const occupationOptions = [
        { key: "Occupation", text: "Occupation", value: "Occupation" },
        { key: "Business", text: "Business", value: "Business" },
        { key: "Retired", text: "Retired", value: "Retired" },
        { key: "Other", text: "Other", value: "Other" },
        { key: "None", text: "None", value: "None" },
    ]

    const earningsOptions = [
        { key: "<5", text: "<5LPA", value: "<5" },
        { key: "5-10", text: "5-10LPA", value: "5-10" },
        { key: "10-20", text: "10-20LPA", value: "10-20" },
        { key: ">20", text: ">20LPA", value: ">20" },
    ]

    const educationOptions = [
        { key: "<SSC", text: "Below SSC", value: "<SSC" },
        { key: "SSC", text: "SSC", value: "SSC" },
        { key: "HSC", text: "HSC", value: "HSC" },
        { key: "Diploma", text: "Diploma", value: "Diploma" },
        { key: "Graduation", text: "Graduation", value: "Graduation" },
        { key: "PG", text: "Post-Graduation", value: "PG" },
        { key: "PhD", text: "PhD", value: "PhD" },
        { key: "Other", text: "Other", value: "Other" }
    ]

    const maritalStatus = [
        { key: "Single", text: "Single", value: "Single" },
        { key: "Married", text: "Married", value: "Married" },
        { key: "Widow", text: "Widow", value: "Widow" },
        { key: "Divorced", text: "Divorced", value: "Divorced" },

    ]

    useEffect(() => {
        // setIsLoading(true);
        dispatch(
            {
                type: 'loading',
                "loading": true
            });
        axios({
            method: "get",
            url: `http://localhost:4000/api/users/getUserDetails/${props.type}/${childId}`,
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }).then((response) => {
            if (props.type === response.data.type) {
                if (response?.data?.detail) {
                    setFormDetails(response?.data?.detail);
                }
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            // setIsLoading(false);
            dispatch(
                {
                    type: 'loading',
                    "loading": false
                });
        })

    }, [])


    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:4000/api/users/suggestions`,
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }).then((response) => {
            let arr = [];
            let gotra = [];
            let occupation = [];
            let education = [];
            let ward = [];
            response.data.list.map(item => {
                let obj = {};
                let objGotra = {};
                let occupationObj = {};
                let educationObj = {};
                let wardObj = {};
                obj.key = item._id;
                obj.text = item.first_name + " " + item.middle_name + " " + item.last_name
                obj.value = item.first_name + " " + item.middle_name + " " + item.last_name
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
                
                if(item.gotra){
                gotra.push(objGotra);
                }
                if(item.occupation_detail){
                    occupation.push(occupationObj);
                }
                if (item.education_detail){
                    education.push(educationObj);
                }
                console.log(item)
                if (item.address_ward && (ward.filter(e => e.text == item.address_ward)).length == 0  ){
                    ward.push(wardObj);
                }

                return;
            })
            setSuggestions(arr);
            setGotraSuggestions(gotra);
            setEducationSuggestions(education);
            setEOccupationSuggestions(occupation);
            setWardNameSuggestions(ward);

        }).catch((err) => {
            console.log(err);
        })
        // .finally(() => {
        //     setIsLoading(false);
        // })
    }, [])


    useEffect(() => {
        // console.log(formDetails);
        setGender(formDetails?.gender);
        setAlive(formDetails?.alive);
        setBloodGroup(formDetails?.blood_group);
        setEducation(formDetails?.education);
        setEarnings(formDetails?.earning)
        setOccupation(formDetails?.occupation);
        setFirstName(formDetails?.first_name);
        setMiddleValue(formDetails?.middle_name);
        setLastValue(formDetails?.last_name);
        dispatch(
            {
                type: 'fatherAlive',
                "fatherAlive": formDetails?.father_alive
            });
        dispatch(
            {
                type: 'motherAlive',
                "motherAlive": formDetails?.mother_alive
            });
    }, [formDetails])


    const fatherSelected = (e, { name, value }) => {
        dispatch({
            type: 'display_type',
            "displayType": "parent"
        });
        dispatch(
            {
                type: 'fatherAlive',
                "fatherAlive": value
            });
    }

    const motherSelected = (e, { name, value }) => {
        dispatch(
            {
                type: 'display_type',
                "displayType": "parent"
            });
        dispatch(
            {
                type: 'motherAlive',
                "motherAlive": value
            });
    }


    const formChange = (e, { name, value }) => {
        let form = formDetails;
        if (!form[name]) {
            form[name] = value;
            if (name === "first_name") {
                let val = value.split(" ");
                form[name] = val[0];
                setFirstName(val[0]);
            }
            if (name === "middle_name") {
                let val = value.split(" ");
                if (!val[1]) {
                    form[name] = value;
                    setLastValue(value);

                } else {
                    form[name] = val[1];
                    setMiddleValue(val[1]);

                }
            }
            if (name === "last_name") {
                let val = value.split(" ");
                if (!val[2]) {
                    form[name] = value;
                    setLastValue(value);

                } else {
                    form[name] = val[2];
                    setLastValue(val[2]);

                }
            }
        } else {
            var newForm = {};
            newForm[name] = value;
            if (name === "first_name") {
                let val = value.split(" ");
                newForm[name] = val[0];
                setFirstName(val[0]);
            }
            if (name === "middle_name") {
                let val = value.split(" ");
                if (!val[1]) {
                    newForm[name] = value;
                    setFirstName(value);

                } else {
                    newForm[name] = val[1];
                    setFirstName(val[1]);

                }
            }
            if (name === "last_name") {
                let val = value.split(" ");
                if (!val[2]) {
                    newForm[name] = value;
                    setFirstName(value);

                } else {
                    newForm[name] = val[2];
                    setFirstName(val[2]);

                }
            }

            let keys = Object.keys(newForm)

            keys.map(x => {
                form[x] = newForm[x]
            })
        }
        if(name == "gotra"){
            setGotra(value)
        }
        if(name == "occupation_detail"){
            setOccupation(value)
        }
        if(name == "education_detail"){
            setEducation(value)
        }
        if(name == "address_ward"){
            setWardName(value)
        }
        setFormDetails(form);
        if (name === "gender" && detailsType === "parent") {
            (props.type === "father") ? form[name] = "M" : form[name] = "F"
        }



        if (name === "alive") {
            setAlive(value)
        }
        else if (name === "blood_group") {
            setBloodGroup(value);
        } else if (name === "occupation") {
            setOccupation(value);
        } else if (name === "education") {
            setEducation(value)
        } else if (name === "earning") {
            setEarnings(value);
        }

        if (name === "mother_alive") {

            if (props.type === "personal") {
                dispatch(
                    {
                        type: 'motherAlive',
                        "motherAlive": value || "No"
                    });
            }
            if (props.type === "partner") {
                dispatch(
                    {
                        type: 'partnerMotherAlive',
                        "partnerMotherAlive": value || "No"
                    });
            }
        }

        if (name === "father_alive") {
            // dispatch({
            //     type: 'display_type',
            //     "displayType": "parent"
            // });
            if (props.type === "personal") {

                dispatch(
                    {
                        type: 'fatherAlive',
                        "fatherAlive": value
                    });
            }
            if (props.type === "partner") {
                dispatch(
                    {
                        type: 'partnerFatherAlive',
                        "partnerFatherAlive": value
                    });
            }
        }
    }

    useEffect(() => {
        if (occupation === "" || occupation === "None") {
            setEarnings("")
        }
    }, [occupation])


    const formSubmit = async (e) => {
        e.preventDefault();
        let existId = "";
        console.log("here");
        let Name = formDetails.first_name + " " + formDetails.middle_name + " " + formDetails.last_name
        suggestions.map(item => {
            if (item.text == Name) {
                existId = item.key
            }
        })
        dispatch(
            {
                type: 'loading',
                "loading": true
            });
            console.log(formDetails);
            console.log(childId)
        await FormData({ form: formDetails, type: props.type, token: auth.token, isExist: existId, formId : auth.formId, kidId: childId , kidCount: child_count });
        dispatch(
            {
                type: 'loading',
                "loading": false
            });
    }

    const handleAddition = (e, { name, value }) => {
        console.log(name)
        
        if(name === "gotra"){
            let suggList = gotraSuggestions;
            setGotraSuggestions([{ text: value, value }, ...suggList],);
        }else if (name == "occupation_detail"){
            let suggList = occupationSuggestions;
            setEOccupationSuggestions([{ text: value, value }, ...suggList],)
        }else if (name == "education_detail"){
            let suggList = educationSuggestions;
            setEducationSuggestions([{ text: value, value }, ...suggList],)
        }else if (name == "address_ward"){
            let suggList = wardNameSuggestions;
            setWardNameSuggestions([{ text: value, value }, ...suggList],)
            console.log([{ text: value, value }, ...suggList],)
        }
        else{
            let suggList = suggestions;
        setSuggestions([{ text: value, value }, ...suggList],);
        }
    }


    return (
        <div>
            <Dimmer active={isLoading} inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
            

            <Form onSubmit={formSubmit}>
            {
                !(formDetails?.approve) && (
                    <Message negative>
                        <Message.Header>Admin needs to approve in order to edit your data.</Message.Header>
                        {/* <p>That offer has expired</p> */}
                    </Message>

                )
            }
                
                    <div className="display-flex mb-1p mt-1p">
                        <h4 className="mx-auto header-title">Form No.</h4>
                        <div className="mx-5p">
                        <h4 className="mx-auto header-title danger">{formDetails?.formId || " "}</h4>
                        </div>
                    </div>
                <Form.Group>
                    <div className="display-flex mb-1p mt-1p">
                        <h4 className="mx-auto header-title">Full name</h4>
                        <div className="mx-5p">
                            <Form.Dropdown
                                options={suggestions}
                                placeholder='FirstName'
                                search
                                selection
                                fluid
                                allowAdditions
                                value={formDetails?.first_name}
                                text={formDetails?.first_name}
                                name="first_name"
                                onAddItem={handleAddition}
                                onChange={formChange}
                            />
                        </div>
                        <div className="mx-5p"> <Form.Dropdown
                            options={suggestions}
                            placeholder='Middle Name'
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
                        />
                        </div>
                        {/* /> <Form.Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." name="middle_name" onChange={formChange} defaultValue={formDetails?.middle_name} /> </div> */}
                        <div className="mx-5p">
                            {/* <Form.Input placeholder="Last Name" type="text" id="last_name" name="last_name" onChange={formChange} defaultValue={formDetails?.last_name} />  */}
                            <Form.Dropdown
                                options={suggestions}
                                placeholder='Last Name'
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
                            />
                        </div>
                    </div>
                </Form.Group>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Gender</h4>
                    <div className="display-flex" style={{ "width": "200px" }}>
                        <Form.Radio
                            className="mx-5p"
                            label='Male'
                            name='gender'
                            value='M'
                            disabled={detailsType === "parent"}
                            checked={gender === "M" || props.type === "father"}
                            onChange={() => { setGender("M"); formChange("e", { name: "gender", value: "M" }) }}

                        />
                        <Form.Radio
                            className="mx-5p"
                            label='Female'
                            name='gender'
                            value='F'
                            disabled={detailsType === "parent"}

                            checked={gender === "F" || props.type === "mother"}
                            onChange={() => { setGender("F"); formChange("e", { name: "gender", value: "F" }) }}
                        />
                    </div>
                    <div className="display-flex mx-5p">
                        <h4>Gotra</h4>
                        <Form.Dropdown
                                options={gotraSuggestions}
                                placeholder='Gotra'
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
                {
                    gender === "F" && (<>
                        <div className="display-flex mb-1p">
                            <h4 className="mx-auto header-title">Maiden name</h4>
                            <div className="mx-5p">
                                <Form.Input placeholder="First Name" type="text" id="first_name" 
                                // errorText="Please enter a valid title." 
                                name="maiden_first_name" onChange={formChange} defaultValue={formDetails?.maiden_first_name} /> </div>
                            <div className="mx-5p"> <Form.Input placeholder="Middle Name" type="text" id="middle_name" 
                            // errorText="Please enter a valid title." 
                            name="maiden_middle_name" onChange={formChange} defaultValue={formDetails?.maiden_middle_name} /> </div>
                            <div className="mx-5p"><Form.Input placeholder="Last Name" type="text" id="last_name" name="maiden_last_name" onChange={formChange} defaultValue={formDetails?.maiden_last_name} /> </div>
                        </div>
                        <div className="display-flex mb-1p">
                            <h4 className="mx-auto header-title">Maiden City</h4>
                            <div className="mx-5p">
                                <Form.Input placeholder="Maiden City" type="text" 
                                // errorText="Please enter a valid title." 
                                name="maiden_city" onChange={formChange} defaultValue={formDetails?.maiden_city} /> </div>
                        </div>
                    </>
                    )
                }
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Alive</h4>
                    <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="alive" onChange={formChange} value={alive} />
                    {
                        alive === "No" && (
                            <div className="display-flex mx-5p"><h4> Date of Death</h4>
                                <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="date_of_death" onChange={formChange} defaultValue={formDetails?.date_of_death} />
                            </div>
                        )

                    }


                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Marrital Status</h4>
                    <Form.Dropdown placeholder='Select' search selection options={maritalStatus} name="marital_status" onChange={formChange} value={formDetails?.marital_status} />
                   
                   {
                       formDetails.marital_status !== "Single" && (

                       
                    <div className="display-flex mx-5p"><h4> Date of Marriage</h4>
                                <Form.Input className="mx-5p" type="date" placeholder='Date of Marriage' name="date_of_marriage" onChange={formChange} defaultValue={formDetails?.date_of_marriage} />
                            </div>
                            ) 
                        }
                </div>
                {
                    detailsType === "personal" && (
                        <>

                            <div className="display-flex mb-1p">
                                <h4 className="header-title">Father Alive</h4>
                                <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="father_alive" onChange={formChange} value={props.type === "partner" ? partnerFatherAlive : fatherAlive} />
                                {
                                    props.type === "personal" ? 
                                    
                                    (<>
                                    
                                    {
                                        formDetails?.father_alive == "Yes"  && formDetails?.mother_alive == "Yes" && (
                                            <div className="mx-5p display-flex"><h4> Mother Alive</h4>
                                                <Form.Dropdown className="mx-5p" placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange}  />
                                            </div>
                                         )} 

                                        {formDetails?.father_alive === "No" && (
                                            <>
                                            <div className="display-flex mx-5p"><h4> Date of Death</h4>
                                                <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="father_death" onChange={formChange} defaultValue={formDetails?.father_death} />
                                            </div>
                                         </>
                                        )}
                                        </>) 
                                    : (<>{
                                            partnerFatherAlive === "Yes" && partnerMotherAlive === "Yes" && (
                                                <div className="mx-5p display-flex"><h4> Mother Alive</h4>
                                                    <Form.Dropdown className="mx-5p" placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange} value={props.type === "partner" ? partnerMotherAlive : motherAlive} />
                                                </div>
                                            )}

                                            {partnerFatherAlive === "No" && (
                                                <div className="display-flex mx-5p"><h4> Date of Death</h4>
                                                    <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="father_death" onChange={formChange} defaultValue={formDetails?.father_death} />
                                                </div>
                                            )}</>)
                                }

                            </div>
                            {
                                props.type === "personal" ? (<>{
                                    (fatherAlive === "No" || motherAlive === "No") && (
                                        <div className="display-flex mb-1p">
                                            <h4 className="header-title">Mother Alive</h4>
                                            <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange} value={props.type === "partner" ? partnerMotherAlive : motherAlive} />
                                            {
                                                motherAlive === "No" && (
                                                    <div className="display-flex mx-5p"><h4> Date of Death</h4>
                                                        <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="mother_death" onChange={formChange} defaultValue={formDetails?.mother_death} />
                                                    </div>
                                                )}
                                        </div>

                                    )
                                } </>) : (<> {
                                    (partnerFatherAlive === "No" || partnerMotherAlive === "No") && (
                                        <div className="display-flex mb-1p">
                                            <h4 className="header-title">Mother Alive</h4>
                                            <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange} value={props.type === "partner" ? partnerMotherAlive : motherAlive} />
                                            {
                                                partnerMotherAlive === "No" && (
                                                    <div className="display-flex mx-5p"><h4> Date of Death</h4>
                                                        <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="mother_death" onChange={formChange} defaultValue={formDetails?.mother_death} />
                                                    </div>
                                                )}
                                        </div>

                                    )
                                }</>)
                            }

                        </>)}
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Blood Group</h4>
                    <Form.Dropdown placeholder='Select Blood Group' disabled={alive === "No"} clearable search selection options={bloodGroupOptions} name="blood_group" onChange={formChange} value={bloodGroup} />

                    <div className="display-flex mx-5p"><h4> Birth Date</h4>
                        <Input className="mx-5p" type="date" name="birth_date" onChange={formChange} defaultValue={formDetails?.birth_date} />

                    </div>
                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Education</h4>
                    <Form.Dropdown disabled={alive === "No"} placeholder='Select Latest Education' clearable search selection options={educationOptions} name="education" onChange={formChange} value={education} />
                    <div className="display-flex mx-5p "><h4> Details</h4>
                    <Form.Dropdown
                                options={educationSuggestions}
                                placeholder='Education Details'
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
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Occupation/Business</h4>
                    <Form.Dropdown disabled={alive === "No"} placeholder='Select Type' clearable search selection options={occupationOptions} name="occupation" onChange={formChange} value={occupation} />
                    <div className="display-flex mx-5p"><h4 > Name</h4>
                    <Form.Dropdown
                                options={occupationSuggestions}
                                placeholder='Occupation Name'
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
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Earnings</h4>
                    <Form.Dropdown disabled={alive === "No"} placeholder='Select Type' clearable search selection options={earningsOptions} name="earning" onChange={formChange} value={earning} />

                </div>
                {
                    <>
                        <div className="display-flex mb-1p">
                            <h4 className="header-title">Address</h4>
                            <Form.TextArea className="current-address" placeholder='Add your address' style={{ minHeight: 100 }} name="address" onChange={formChange} defaultValue={formDetails?.address} />
                        </div>

                        <div className="margin-title ">
                            <Form.Group>
                                <Form.Input type="text" className="mx-5p" label="City" placeholder="City" name="address_city" onChange={formChange} defaultValue={formDetails?.address_city} />
                                <Form.Input type="number" className="mx-5p" label="Pin Code" placeholder="Pin-Code" name="address_pincode" onChange={formChange} defaultValue={formDetails?.address_pincode} />
                            </Form.Group>
                            <Form.Group>
                                {
                                    // detailsType === "personal" && (
                                        <Form.Dropdown
                                options={wardNameSuggestions}
                                placeholder='WardName'
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
                                className="mx-5p"
                            />
                                        // <Form.Input type="text" className="mx-5p mt-1p" label="WardName" placeholder="Ward Name" name="address_ward" onChange={formChange} defaultValue={formDetails?.address_ward} />

                                    // )
                                }
                                {
                                    alive === "Yes" && (
                                        <Form.Checkbox label='Add Permanent Address' onChange={() => { setAddPermanent(!addPermanent) }} />
                                    )}
                            </Form.Group>
                        </div>

                    </>
                }
                {addPermanent && (
                    <>
                        <div className="display-flex mt-1p">
                            <h4 className="header-title">Permanent Address</h4>

                            <Form.TextArea className="current-address" placeholder='Add your permanent address' style={{ minHeight: 100 }} name="permanent_address" onChange={formChange} defaultValue={formDetails?.permanent_address} />
                        </div>
                        <div className="margin-title mb-1p mt-1p">
                            <Form.Input type="text" className="mx-5p" label="City" placeholder="City" name="permanent_city" onChange={formChange} defaultValue={formDetails?.permanent_city} />
                            <Form.Input type="number" className="mx-5p" label="Pin Code" placeholder="000-000" name="permanent_pincode" onChange={formChange} defaultValue={formDetails?.permanent_pincode} />
                        </div>
                    </>
                )}
                <Form.Group>
                    <div className="display-flex mb-1p mt-1p">
                        <h4 className="header-title">Contact no.</h4>

                        <Form.Input disabled={alive === "No"} iconPosition='left' className="mx-5p" placeholder='Personal no.' type="number" name="personal_number" onChange={formChange} defaultValue={formDetails?.personal_number}>
                            <Icon name='phone' />
                            <input />
                        </Form.Input>
                        <Form.Input disabled={alive === "No"} iconPosition='left' className="mx-5p" placeholder='WhatsApp no.' type="number" name="whatsapp_number" onChange={formChange} defaultValue={formDetails?.whatsapp_number}>
                            <Icon className="mx-5p" name='whatsapp' />
                            <input className="mx-5p" />
                        </Form.Input>
                    </div>
                </Form.Group>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Email address</h4>
                    <Form.Input disabled={alive === "No"} iconPosition='left' className="mx-5p" placeholder='Email' type="email" name="email" onChange={formChange} defaultValue={formDetails?.email}>
                        <Icon name='at' />
                        <input className="mx-5p" />
                    </Form.Input>
                </div>

                <Form.Button 
                // disabled={!(formDetails?.approve)} 
                content='Submit' />
                {
                    detailsType !== "personal" && (
                        <Button onClick={() => {
                            dispatch({
                                type: 'display_type',
                                "displayType": "personal"
                            })
                        }}>Go Back</Button>

                    )
                }
            </Form>
        </div>

    )
}

export default Details
