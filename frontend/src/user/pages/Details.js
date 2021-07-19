import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Icon,
    Input,
    Radio,
    TextArea,
    Dropdown

} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import "./PersonalDetails.css";
import "./App.css";
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';

function Details() {
    const dispatch = useDispatch();
    const detailsType = useSelector((state) => state.personal.displayType)

    const [gender, setGender] = useState("");
    const [alive, setAlive] = useState("Yes");
    const [addPermanent, setAddPermanent] = useState(false);
    const fatherAlive = useSelector((state) => state.personal.fatherAlive);
    const motherAlive = useSelector((state) => state.personal.motherAlive);
    const aliveOptions = [
        { key: "Yes", text: "Yes", value: true },
        { key: "No", text: "No", value: false },
    ]
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
        // setFatherAlive(value);
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
        // setMotherAlive(value);
        dispatch({
            type: 'display_type',
            "displayType": "parent"
        });
        dispatch(
            {
                type: 'motherAlive',
                "motherAlive": value
            });
    }




    return (
        <div>
            <div className="display-flex mb-1p">
                <h4 className="mx-auto header-title">Full name</h4>
                <div className="mx-5p">
                    <Input placeholder="First Name" list='languages' type="text" id="first_name" errorText="Please enter a valid title." />
                    {/* <Input  placeholder='Choose language...' /> */}
                    <datalist id='languages' className="abc">
                        <option value='Vaishnavi'>Vaishnavi Kishor Vaidya (Aruna)</option>
                        <option value='Vaishnavi'>Vaishnavi Kishor Vaidya (ABC)</option>
                        <option value='Vaishnavi'>Dutch</option>
                    </datalist>
                </div>
                <div className="mx-5p"> <Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." /> </div>
                <div className="mx-5p"><Input placeholder="Last Name" type="text" id="last_name" /> </div>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Gender</h4>
                <Radio
                    className="mx-5p"
                    label='Male'
                    name='M'
                    value='this'
                    checked={gender === "M"}
                    onChange={() => { setGender("M") }}
                />
                <Radio
                    className="mx-5p"
                    label='Female'
                    name='F'
                    value='this'
                    checked={gender === "F"}
                    onChange={() => { setGender("F") }}
                />
            </div>
            {
                gender === "F" && (<>
                    <div className="display-flex mb-1p">
                        <h4 className="mx-auto header-title">Maiden name</h4>
                        <div className="mx-5p">
                            <Input placeholder="First Name" type="text" id="first_name" errorText="Please enter a valid title." /> </div>
                        <div className="mx-5p"> <Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." /> </div>
                        <div className="mx-5p"><Input placeholder="Last Name" type="text" id="last_name" /> </div>
                    </div>
                    <div className="display-flex mb-1p">
                        <h4 className="mx-auto header-title">Maiden City</h4>
                        <div className="mx-5p">
                            <Input placeholder="Maiden City" type="text" id="first_name" errorText="Please enter a valid title." /> </div>
                    </div>
                    </>
                )
            }
            <div className="display-flex mb-1p">
                <h4 className="header-title">Alive</h4>
                <Dropdown placeholder='Select' search selection options={aliveOptions} onChange={aliveSelected} />
                <span className="mx-5p"> Marital Status
                    <Dropdown className="mx-5p" placeholder='Select' search selection options={maritalStatus} />

                </span>

            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Marrital Status</h4>
                <Dropdown placeholder='Select' search selection options={maritalStatus} />
            </div>
            {
                detailsType === "personal" && (
                    <>

                        <div className="display-flex mb-1p">
                            <h4 className="header-title">Father Alive</h4>
                            <Dropdown placeholder='Select' search selection options={aliveOptions} onChange={fatherSelected} />
                            {
                                fatherAlive && motherAlive && (
                                    <span className="mx-5p"> Mother Alive
                                        <Dropdown className="mx-5p" placeholder='Select' search selection options={aliveOptions} onChange={motherSelected} />
                                    </span>
                                )}
                            {!fatherAlive && (
                                <span className="mx-5p"> Date of Death
                                    <Input className="mx-5p" type="date" placeholder='Date of Death' />
                                </span>
                            )}
                        </div>
                        {
                            (!fatherAlive || !motherAlive) && (
                                <div className="display-flex mb-1p">
                                    <h4 className="header-title">Mother Alive</h4>
                                    <Dropdown placeholder='Select' search selection options={aliveOptions} onChange={motherSelected} />
                                    {
                                        !motherAlive && (
                                            <span className="mx-5p"> Date of Death
                                                <Input className="mx-5p" type="date" placeholder='Date of Death' />
                                            </span>
                                        )}
                                </div>

                            )
                        }
                    </>)}
            <div className="display-flex mb-1p">
                <h4 className="header-title">Blood Group</h4>
                <Dropdown placeholder='Select Blood Group' disabled={alive === "No"} clearable search selection options={bloodGroup} />

                <span className="mx-5p"> Birth Date
                    <Input className="mx-5p" type="date" />

                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Education</h4>
                <Dropdown disabled={alive === "No"} placeholder='Select Latest Education' clearable search selection options={education} />
                <span className="mx-5p "> Details{"  "}
                    <Input disabled={alive === "No"} className="mx-5p" placeholder="Education-detail" type="text" />
                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Occupation/Business</h4>
                <Dropdown disabled={alive === "No"} placeholder='Select Type' clearable search selection options={occupation} />
                <span className="mx-5p"> Name
                    <Input disabled={alive === "No"} className="mx-5p" placeholder="Name of Occupation/Business " type="string" />
                </span>
            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Earnings</h4>
                <Dropdown disabled={alive === "No"} placeholder='Select Type' clearable search selection options={earnings} />

            </div>
            {
                <>
                    <div className="display-flex mb-1p">
                        <h4 className="header-title">Address</h4>
                        <TextArea className="current-address" placeholder='Add your address' style={{ minHeight: 100 }} />
                    </div>
                    <div className="margin-title">
                        <Input type="text" className="mx-5p" label="City" placeholder="City" />
                        <Input type="number" className="mx-5p" label="Pin Code" placeholder="Pin-Code" />
                        {
                            detailsType === "personal" && (
                                <Input type="text" className="mx-5p mt-1p" label="WardName" placeholder="Ward Name" />

                            )
                        }
                        {
                            alive === "Yes" && (
                                <Checkbox label='Add Permanent Address' onChange={() => { setAddPermanent(!addPermanent) }} />
                            )}
                    </div>
                </>
            }
            {addPermanent && (

                <>
                    <div className="display-flex mt-1p">
                        <h4 className="header-title">Permanent Address</h4>

                        <TextArea className="current-address" placeholder='Add your permanent address' style={{ minHeight: 100 }} />
                    </div>


                    <div className="margin-title mb-1p mt-1p">
                        <Input type="text" className="mx-5p" label="City" placeholder="City" />
                        <Input type="number" className="mx-5p" label="Pin Code" placeholder="000-000" />
                    </div>
                </>
            )}
            <div className="display-flex mb-1p mt-1p">
                <h4 className="header-title">Contact no.</h4>
                <Input disabled={alive === "No"} iconPosition='left' className="mx-5p" label="Personal" placeholder='Personal no.'>
                    <Icon name='phone' />
                    <input />
                </Input>
                <Input disabled={alive === "No"} iconPosition='left' className="mx-5p" label="WhatsApp" placeholder='Phone no.' />


            </div>
            <div className="display-flex mb-1p">
                <h4 className="header-title">Email address</h4>
                <Input disabled={alive === "No"} iconPosition='left' className="mx-5p" placeholder='Email'>
                    <Icon name='at' />
                    <input />
                </Input>
            </div>
            <Button>Submit Details</Button>
            {
                detailsType !=="personal" && (
            <Button onClick={()=>{dispatch({
                type: 'display_type',
                "displayType": "personal"
            })}}>Go Back</Button>

                )
            }
        </div>

    )
}

export default Details
