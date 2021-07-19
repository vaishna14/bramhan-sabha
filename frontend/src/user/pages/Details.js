import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
    Input,
    Radio,
    TextArea,
    Dropdown

} from 'semantic-ui-react';
import "./PersonalDetails.css";
import "./App.css";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

function Details() {
    const [detailsType, setDetailsType] = useState("personal");
    const [gender, setGender] = useState("");
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
                    gender == "F" && (
                        <div className="display-flex mb-1p">
                        <h4 className="mx-auto header-title">Maiden name</h4>
                        <div className="mx-5p">
                            <Input placeholder="First Name" type="text" id="first_name" errorText="Please enter a valid title." /> </div>
                        <div className="mx-5p"> <Input placeholder="Middle Name" type="text" id="middle_name" errorText="Please enter a valid title." /> </div>
                        <div className="mx-5p"><Input placeholder="Last Name" type="text" id="last_name" /> </div>
                    </div>
                    )
                }
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Blood Group</h4>
                    <Dropdown placeholder='Select Blood Group' clearable search selection options={bloodGroup} />

                    <span className="mx-5p"> Birth Date
                    <Input className="mx-5p"  type="date" />

                    </span>
                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Education</h4>
                    <Dropdown placeholder='Select Latest Education' clearable search selection options={education} />
                    <span className="mx-5p "> Details{"  "}
                        <Input className="mx-5p" placeholder="Education-detail" type="text"/>
                    </span>
                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Occupation/Business</h4>
                    <Dropdown placeholder='Select TYpe' clearable search selection options={occupation} />
                    <span className="mx-5p"> Name
                        <Input className="mx-5p" placeholder="Name of Occupation/Business " type="string" />
                    </span>
                </div>
                <div className="display-flex mb-1p">
                <h4 className="header-title">Earnings</h4>
                <Dropdown placeholder='Select TYpe' clearable search selection options={earnings} />

                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Current Address</h4>
                    <TextArea className="current-address" placeholder='Add your current address' style={{ minHeight: 100 }} />
                </div>
                <div className="margin-title">
                    <Input type="text" className="mx-5p" label="City" placeholder="City" />
                    <Input type="number" className="mx-5p" label="Pin Code" placeholder="Pin-Code" />
                    <Input type="text" className="mx-5p" label="WardName" placeholder="Pin-Code" />
                </div>
                <div className="display-flex mt-1p">
                    <h4 className="header-title">Permanent Address</h4>
                    <Checkbox label='Same as current address' />
                </div>
                <div className="margin-title mb-1p">
                    <TextArea className="current-address" placeholder='Add your permanent address' style={{ minHeight: 100 }} />
                </div>

                <div className="margin-title mb-1p mt-1p">
                    <Input type="text" className="mx-5p" label="City" placeholder="City" />
                    <Input type="number" className="mx-5p" label="Pin Code" placeholder="000-000" />
                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Contact no.</h4>
                    <Input iconPosition='left' className="mx-5p" label="Home" placeholder='Phone no.'>
                        {/* <Icon name='phone' />
                    <input /> */}
                    </Input>
                    <Input iconPosition='left' className="mx-5p" label="Personal" placeholder='Personal no.'>
                        <Icon name='phone' />
                        <input />
                    </Input>

                </div>
                <div className="display-flex mb-1p">
                    <h4 className="header-title">Email address</h4>
                    <Input iconPosition='left' className="mx-5p" placeholder='Email'>
                        <Icon name='at' />
                        <input />
                    </Input>
                </div>
            </div>
        
    )
}

export default Details
