import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    Grid,
    Header,
    Icon,
    Menu,
    Segment,
    Sidebar,
    Divider,
    List

} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../shared/context/auth-context';
import "./PersonalDetails.css";
import "./App.css";
import Details from './Details';
import axios from "axios";


function PersonalDetails() {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    const detailsType = useSelector((state) => state.personal.displayType);
    const [childCount, setChildCount] = useState([]);
    const [child, setChild] = useState([]);
    const [childDetails, setChildDetails] = useState([]);
    const [childHead, setChildHead] = useState(1);

    const addChild = () => {
        setChildCount(childCount + 1);
        let newChild = child
        newChild.push(childCount + 1);

    }

    useEffect(()=>{
        if(detailsType=== "family"){
            axios({
                method: "get",
                url: `http://localhost:5000/api/users/kids`,
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            }).then((response) => {
               console.log(response.data); 
               setChild(response.data.kidCount);
               setChildCount(response.data.kidCount.length);
                let kids = response.data.kidCount;
                let maleChild = response.data.kidsListMale;
                let femalChild = response.data.kidsListFemale;
                let childDetailsList =[];
                kids.map(item =>{
                    maleChild.map(male =>{
                        if(item == male._id){
                            childDetailsList.push(male);
                        }else{
                            femalChild.map(female =>{
                                if (item == female._id){
                                childDetailsList.push(female); 
                                }
                            })
                        }
                    })
                })
               setChildDetails(childDetailsList);
                console.log(childDetailsList);


            }).catch((err) => {
                console.log(err);
            }) 
        }

    },[detailsType])

    const showChildDetails = (childId, childName, childCount) => {
        dispatch({
            type: 'display_type',
            "displayType": "kids"
        });
        dispatch({
            type: 'child_count',
            "child_count": childCount
        });
        dispatch({
            type: 'child_id',
            "child_id": childId
        });
        console.log(childName)
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
                    <Menu.Item as='a' onClick={() => {
                        dispatch({
                            type: 'display_type',
                            "displayType": "personal"
                        });
                    }}>
                        <Icon name='user' />
                        Personal
                    </Menu.Item>
                    <Menu.Item as='a' onClick={() => {
                        dispatch({
                            type: 'display_type',
                            "displayType": "family"
                        });
                    }}>
                        <Icon name='home' />
                        Family
                    </Menu.Item>
                    <Menu.Item as='a' onClick={() => {
                        dispatch({
                            type: 'display_type',
                            "displayType": "other"
                        });
                    }}>
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
                    <Menu.Item as='a' onClick={() => {
                        dispatch({
                            type: 'display_type',
                            "displayType": "parent"
                        });
                    }}>

                        <Icon name='home' />

                        Parent Information

                    </Menu.Item>
                    <Menu.Item as='a' >
                        <Icon name='users' />Kids Information</Menu.Item>
                    <Menu.Item>
                        {
                            childCount > 0 && (<List as='ol'>
                                {
                                    childDetails.map((item, index) => {
                                        return (
                                            <List.Item as='a' onClick={() => { showChildDetails(item._id, item.first_name, index+1) }}>{item.first_name}</List.Item>)
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
                                            <Details type="personal" />
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "parent" && (
                                        <div>
                                            <Header as="h3">Father Information</Header>
                                            <Details type="father"/>
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "kids" && (
                                        <div>
                                            <Header as="h3" className="personal-info">Child {childHead}</Header>
                                            <Details type="kids"/>
                                            <Button onClick={addChild}>Add Child</Button>
                                        </div>
                                    )
                                }
                            </Grid.Column>
                            <Grid.Column> {
                                (detailsType === "personal" || detailsType === "family") && (

                                    <div>
                                        <Header as='h1' className="personal-info" >Partner Information</Header>
                                        <Details type="partner" />
                                    </div>
                                )
                            }
                                {
                                    detailsType === "parent" && (
                                        <div>
                                            <Header as="h3">Mother Structure</Header>
                                            <Details type="mother"/>
                                        </div>
                                    )
                                }
                                {
                                    detailsType === "kids" && (
                                        <div>
                                            <Header as="h3" className="personal-info">Child {childHead} Spouse</Header>
                                            <Details type="kids"/>
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
