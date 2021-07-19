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
    Divider,
    Dropdown,
    List

} from 'semantic-ui-react';
import "./PersonalDetails.css";
import "./App.css";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Details from './Details';
import FamilyInfo from './FamilyInfo';
import FamilyStruc from './FamilyStruc';

function PersonalDetails() {
    const [detailsType, setDetailsType] = useState("personal");
    const [gender, setGender] = useState("");
    const [childCount, setChildCount] = useState(0);
    const [child, setChild] = useState([]);
    const [childHead, setChildHead] = useState(1);

    const addChild = () => {
        setChildCount(childCount + 1);
        let newChild = child
        newChild.push(childCount + 1);
        setChild(newChild);
    }

    const showChildDetails = (childName)=>{
        setDetailsType("kids");
        console.log(childName);
        setChildHead(childName);
    }

    return (
        <div className="personal_sidebar">
            <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
                <Sidebar
                    as={Menu}
                    animation="push"
                    direction="left"
                    icon='labeled'
                    inverted
                    vertical
                    visible={true}
                    width='thin'
                >
                    <Menu.Item as='a' onClick={() => { setDetailsType("personal") }}>
                        <Icon name='user' />
                        Personal
                    </Menu.Item>
                    <Menu.Item as='a' onClick={() => { setDetailsType("family") }}>
                        <Icon name='home' />
                        Family
                    </Menu.Item>
                    {/* <Menu.Item as='a' onClick={() => { setDetailsType("family") }}>
                        <Icon name='home' />
                        Education and Occupation Details
                    </Menu.Item> */}
                    <Menu.Item as='a' onClick={() => { setDetailsType("other") }}>
                        <Icon name='clipboard list' />
                        Other
                    </Menu.Item>
                </Sidebar>
                <Sidebar
                    as={Menu}
                    animation='push'
                    direction='right'
                    icon='labeled'
                    inverted
                    vertical
                    visible={detailsType === "family"}
                    width='thin'
                >
                    <Menu.Item as='a' onClick={() => { setDetailsType("parent") }}>

                        <Icon name='home' />

                        Parent Information

                    </Menu.Item>
                    <Menu.Item as='a' >
                        <Icon name='users' />Kids Information</Menu.Item>
                    <Menu.Item>
                        {
                            childCount > 0 && (<List as='ol'>
                                {
                                    child.map((item, index) => {
                                        return (
                                            <List.Item as='a' onClick={() => { showChildDetails(item)}}>Child {item}</List.Item>)
                                    }
                                    )
                                }
                            </List>)

                        }
                        <Button onClick={addChild} >Add Child Details</Button>

                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher >
                    <Segment relaxed='very' className="form-segment">
                        <Grid columns={2}>
                            <Grid.Column>
                                {
                                    (detailsType === "personal" || detailsType === "family") && (
                                        <div>
                                            <Header as='h1' className="personal-info" >Personal Information</Header>
                                            <Details type={detailsType}/>
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "parent" && (
                                        <div>
                                            <Header as="h3">Father Information</Header>
                                            <Details type={detailsType}/>
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "kids" && (
                                        <div>
                                            <Header as="h3" className="personal-info">Child {childHead}</Header>
                                            <Details type={detailsType}/>
                                            <Button onClick={addChild}>Add Child</Button>
                                        </div>
                                    )
                                }
                            </Grid.Column>
                            <Grid.Column> {
                                (detailsType === "personal" || detailsType === "family") && (

                                    <div>
                                        <Header as='h1' className="personal-info" >Partner Information</Header>
                                        <Details type={detailsType}/>
                                    </div>
                                )
                            }
                                {
                                    detailsType === "parent" && (
                                        <div>
                                            <Header as="h3">Mother Structure</Header>
                                            <Details type={detailsType}/>
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "kids" && (
                                        <div>
                                            <Header as="h3" className="personal-info">Child {childHead} Spouse</Header>
                                            <Details type={detailsType}/>
                                        </div>
                                    )
                                }</Grid.Column>
                        </Grid>
                        <Divider vertical />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export default PersonalDetails
