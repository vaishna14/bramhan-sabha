import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Icon,
    Input,
    Radio,
    TextArea,
    Dropdown, Form

} from 'semantic-ui-react';
import {FormData} from "../Services/FormData"
import { useSelector, useDispatch } from 'react-redux';
import "./PersonalDetails.css";
import "./App.css";
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';

function Details() {
    const dispatch = useDispatch();
    const detailsType = useSelector((state) => state.personal.displayType)

    const [gender, setGender] = useState("");
    const [alive, setAlive] = useState(true);
    const [addPermanent, setAddPermanent] = useState(false);
    const fatherAlive = useSelector((state) => state.personal.fatherAlive);
    const motherAlive = useSelector((state) => state.personal.motherAlive);
    const aliveOptions = [
        { key: "Yes", text: "Yes", value: true },
        { key: "No", text: "No", value: false },
    ]
    const [formDetails,setFormDetails] = useState({});
    const bloodGroup = [
        { key: 'A+', text: 'A+', value: 'A+' },
        { key: 'A-', text: 'A-', value: 'A-' },
        { key: 'B+', text: 'B+', value: 'B+' },
        { key: 'B-', text: 'B-', value: 'B-' },
        { key: 'AB+', text: 'AB+', value: 'AB+' },
        { key: 'AB-', text: 'AB-', value: 'AB-' },
        { key: 'O+', text: 'O+', value: 'O+' },
        { key: 'O-', text: 'O-', value: 'O-' },
    ]

    const occupation = [
        { key: "Occupation", text: "Occupation", value: "Occupation" },
        { key: "Business", text: "Business", value: "Business" },
        { key: "Retired", text: "Retired", value: "Retired" },
        { key: "None", text: "None", value: "None" },
    ]

    const earnings = [
        { key: "<5", text: "<5LPA", value: "<5" },
        { key: "5-10", text: "5-10LPA", value: "5-10" },
        { key: "10-20", text: "10-20LPA", value: "10-20" },
        { key: ">20", text: ">20LPA", value: ">20" },
    ]

    const education = [
        { key: "<SSC", text: "Below SSC", value: "<SSC" },
        { key: "SSC", text: "SSC", value: "SSC" },
        { key: "HSC", text: "HSC", value: "HSC" },
        { key: "Diploma", text: "Diploma", value: "Diploma" },
        { key: "Graduation", text: "Graduation", value: "Graduation" },
        { key: "PG", text: "Post-Graduation", value: "PG" },
        { key: "PhD", text: "PhD", value: "PhD" },
    ]

    const maritalStatus = [
        { key: "Single", text: "Single", value: "Single" },
        { key: "Married", text: "Married", value: "Married" },
        { key: "Widow", text: "Widow", value: "Widow" },
        { key: "Divorced", text: "Divorced", value: "Divorced" },

    ]

    const aliveSelected = (e, { name, value }) => {
        setAlive(value);
    }

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


    const formChange = (e,{name, value})=>{
        let form = formDetails;
        form[name] = value;
        console.log(form);
        setFormDetails(form);
        if(name === "alive"){
            setAlive(value)
        }
        if(name === "mother_alive"){
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
        if(name === "father_alive"){
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
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        console.log(formDetails);
        FormData({form:formDetails,type:"personal"});
    }


    return (
        <div>
            <Form onSubmit={formSubmit}>
                <Form.Group>
            <div className="display-flex mb-1p">
                <h4 className="mx-auto header-title">Full name</h4>
                <div className="mx-5p">
                    <Form.Input placeholder="First Name"  list='languages' type="text" id="first_name"  errorText="Please enter a valid title." name="first_name" onChange={formChange} />
                    {/* <Input  placeholder='Choose language...' /> */}
                    <datalist id='languages' className="abc">
                        <option value='Vaishnavi'>Vaishnavi Kishor Vaidya (Aruna)</option>
                        <option value='Vaishnavi'>Vaishnavi Kishor Vaidya (ABC)</option>
                        <option value='Vaishnavi'>Dutch</option>
                    </datalist>
                </div>
                <div className="mx-5p"> <Form.Input   placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." name="middle_name" onChange={formChange} /> </div>
                <div className="mx-5p"><Form.Input   placeholder="Last Name" type="text" id="last_name" name="last_name" onChange={formChange} /> </div>
            </div>
            </Form.Group>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Gender</h4>
                <Form.Radio
                    className="mx-5p"
                    label='Male'
                    name='gender'
                    value='M'
                    checked={gender === "M"}
                    onChange={() => { setGender("M");formChange("e",{name:"gender", value:"M"})}}
                    
                />
                <Form.Radio
                    className="mx-5p"
                    label='Female'
                    name='gender'
                    value='F'
                    checked={gender === "F"}
                    onChange={() => { setGender("F");formChange("e",{name:"gender", value:"F"}) }}
                />
            </div>
            {
                gender === "F" && (<>
                    <div className="display-flex mb-1p">
                        <h4 className="mx-auto header-title">Maiden name</h4>
                        <div className="mx-5p">
                            <Form.Input placeholder="First Name" type="text" id="first_name" errorText="Please enter a valid title."  name="maiden_first_name" onChange={formChange} /> </div>
                        <div className="mx-5p"> <Form.Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." name="maiden_middle_name" onChange={formChange}/> </div>
                        <div className="mx-5p"><Form.Input placeholder="Last Name" type="text" id="last_name" name="maiden_last_name" onChange={formChange}/> </div>
                    </div>
                    <div className="display-flex mb-1p">
                        <h4 className="mx-auto header-title">Maiden City</h4>
                        <div className="mx-5p">
                            <Form.Input placeholder="Maiden City" type="text"  errorText="Please enter a valid title." name="maiden_city" onChange={formChange}/> </div>
                    </div>
                </>
                )
            }
            <div className="display-flex mb-1p">
                <h4 className="header-title">Alive</h4>
                <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="alive" onChange={formChange} />
                {
                    !alive && (
                        <span className="mx-5p"> Date of Death
                            <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="date_of_death" onChange={formChange} />
                        </span>
                    )

                }


            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Marrital Status</h4>
                <Form.Dropdown placeholder='Select' search selection options={maritalStatus} name="marital_status" onChange={formChange}/>
            </div>
            {
                detailsType === "personal" && (
                    <>

                        <div className="display-flex mb-1p">
                            <h4 className="header-title">Father Alive</h4>
                            <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="father_alive" onChange={formChange} />
                            {
                                fatherAlive && motherAlive && (
                                    <div className="mx-5p display-flex"> Mother Alive
                                        <Form.Dropdown className="mx-5p" placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange}/>
                                    </div>
                                )}
                            {!fatherAlive && (
                                <span className="mx-5p"> Date of Death
                                    <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="father_death" onChange={formChange} />
                                </span>
                            )}
                        </div>
                        {
                            (!fatherAlive || !motherAlive) && (
                                <div className="display-flex mb-1p">
                                    <h4 className="header-title">Mother Alive</h4>
                                    <Form.Dropdown placeholder='Select' search selection options={aliveOptions} name="mother_alive" onChange={formChange}/>
                                    {
                                        !motherAlive && (
                                            <span className="mx-5p"> Date of Death
                                                <Form.Input className="mx-5p" type="date" placeholder='Date of Death' name="mother_death" onChange={formChange}/>
                                            </span>
                                        )}
                                </div>

                            )
                        }
                    </>)}
            <div className="display-flex mb-1p">
                <h4 className="header-title">Blood Group</h4>
                <Form.Dropdown placeholder='Select Blood Group' disabled={!alive} clearable search selection options={bloodGroup} name="blood_group" onChange={formChange} />

                <span className="mx-5p"> Birth Date
                    <Input className="mx-5p" type="date" name="birth_date" onChange={formChange}/>

                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Education</h4>
                <Form.Dropdown disabled={!alive} placeholder='Select Latest Education' clearable search selection options={education} name="education" onChange={formChange}/>
                <span className="mx-5p "> Details{"  "}
                    <Form.Input disabled={!alive} className="mx-5p" placeholder="Education-detail" type="text" name="education_detail" onChange={formChange}/>
                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Occupation/Business</h4>
                <Form.Dropdown disabled={!alive} placeholder='Select Type' clearable search selection options={occupation} name="occupation" onChange={formChange}/>
                <span className="mx-5p"> Name
                    <Form.Input disabled={!alive} className="mx-5p" placeholder="Name of Occupation/Business " type="text" name="occupation_detail" onChange={formChange}/>
                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Earnings</h4>
                <Form.Dropdown disabled={!alive} placeholder='Select Type' clearable search selection options={earnings} name="earning" onChange={formChange}/>

            </div>
            {
                <>
                    <div className="display-flex mb-1p">
                        <h4 className="header-title">Address</h4>
                        <Form.TextArea className="current-address" placeholder='Add your address' style={{ minHeight: 100 }} name="address" onChange={formChange}/>
                    </div>
                    
                    <div className="margin-title ">
                    <Form.Group>
                        <Form.Input type="text" className="mx-5p" label="City" placeholder="City" name="address_city" onChange={formChange}/>
                        <Form.Input type="number" className="mx-5p" label="Pin Code" placeholder="Pin-Code" name="address_pincode" onChange={formChange}/>
                        </Form.Group>
                        <Form.Group>
                        {
                            detailsType === "personal" && (
                                <Form.Input type="text" className="mx-5p mt-1p" label="WardName" placeholder="Ward Name" name="address_ward" onChange={formChange}/>

                            )
                        }
                        {
                            alive === true && (
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

                        <Form.TextArea className="current-address" placeholder='Add your permanent address' style={{ minHeight: 100 }} name="permanent_address" onChange={formChange}/>
                    </div>
                    <div className="margin-title mb-1p mt-1p">
                        <Form.Input type="text" className="mx-5p" label="City" placeholder="City" name="permanent_city" onChange={formChange}/>
                        <Form.Input type="number" className="mx-5p" label="Pin Code" placeholder="000-000" name="permanent_pincode" onChange={formChange}/>
                    </div>
                </>
            )}
             <Form.Group>
            <div className="display-flex mb-1p mt-1p">
                <h4 className="header-title">Contact no.</h4>
               
                <Form.Input disabled={!alive} iconPosition='left' className="mx-5p" placeholder='Personal no.' type="number" name="personal_number" onChange={formChange}>
                    <Icon name='phone' />
                    <input   />
                </Form.Input>
                <Form.Input disabled={!alive} iconPosition='left' className="mx-5p"  placeholder='WhatsApp no.' type="number" name="whatsapp_number" onChange={formChange}>
                <Icon className="mx-5p" name='whatsapp' />
                    <input   className="mx-5p"/>
                </Form.Input>
            </div>
            </Form.Group>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Email address</h4>
                <Form.Input disabled={!alive} iconPosition='left' className="mx-5p" placeholder='Email' type="email" name="email" onChange={formChange}>
                    <Icon name='at' />
                    <input   className="mx-5p"/>
                </Form.Input>
            </div>
            
            <Form.Button content='Submit' />
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
