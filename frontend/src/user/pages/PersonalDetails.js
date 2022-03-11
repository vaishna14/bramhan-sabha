import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Divider,
  List,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../shared/context/auth-context";
import "./PersonalDetails.css";
import "./App.css";
import Details from "./Details";
import axios from "axios";
import Dashboard from "../components/Dashboard";
import useWindowSize from "../../shared/util/useWindoSize";

function PersonalDetails() {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const detailsType = useSelector((state) => state.personal.displayType);
  const [childCount, setChildCount] = useState([]);
  const [child, setChild] = useState([]);
  const [childDetails, setChildDetails] = useState([]);
  const [childHead, setChildHead] = useState(1);
  const [visible,setVisible] = useState(true);
  const { width } = useWindowSize();
  const profile = useSelector((state) => state.personal.profile);


  useEffect(()=>{
    if(width <1200){
      setVisible(false)
    }else{
      setVisible(true)
    }
  },[width])

  const addChild = () => {
    setChildCount(childCount + 1);
    let newChild = child;
    newChild.push(childCount + 1);
    let childDetailsList = childDetails;
    let count = childCount + 1;
    let obj = { first_name: "Child" + count, _id: "" };
    childDetailsList.push(obj);
    console.log(childDetailsList);
  };

  useEffect(() => {
    console.log(childCount);
  }, [childCount]);

  useEffect(() => {
    dispatch({
      type: "message",
      message: [],
    });
    if (detailsType === "family") {
      axios({
        method: "get",
        // url: `https://test27102021.herokuapp.com/api/users/kids`,
        url: `http://localhost:4000/api/users/kids`,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
        .then((response) => {
          console.log(response.data);
          setChild(response.data.kidCount);
          setChildCount(response.data.kidCount.length);
          let kids = response.data.kidCount;
          let maleChild = response.data.kidsListMale;
          let femalChild = response.data.kidsListFemale;
          let childDetailsList = [];
          console.log(kids);
          kids.map((item) => {
            maleChild.map((male) => {
              if (item == male._id) {
                childDetailsList.push(male);
              }
              return;
            });
            femalChild.map((female) => {
              if (item == female._id) {
                childDetailsList.push(female);
              }
              return;
            });
          });
          setChildDetails(childDetailsList);
          console.log(childDetailsList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [detailsType]);

  const showChildDetails = (childId, childName, childCount) => {
    dispatch({
      type: "display_type",
      displayType: "kids",
    });
    dispatch({
      type: "profile",
      profile: false,
    });
    dispatch({
      type: "child_count",
      child_count: childCount,
    });
    dispatch({
      type: "child_id",
      child_id: childId,
    });
    console.log(childName);
    setChildHead(childName);
  };

  return (
    <div className={`${width <500 ? "personal_sidebar_200" : "personal_sidebar_100"}`}>
      <Sidebar.Pushable as={Segment} style={{ overflow: "hidden" }}>
        <Sidebar
          as={Menu}
          animation="push"
          direction="left"
          icon="labeled"
          inverted
          vertical
          visible={profile}
          width="thin"
        >
          <Menu.Item
            as="a"
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
            <Icon name="user" />
            Personal
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => {
              dispatch({
                type: "display_type",
                displayType: "family",
              });
            }}
          >
            <Icon name="home" />
            Family
          </Menu.Item>
          {auth.adminArea && (
            <Menu.Item
            as="a"
            onClick={() => {
              dispatch({
                type: "display_type",
                displayType: "other",
              });
              dispatch({
                type: "profile",
                profile: false,
              });
            }}
          >
            <Icon name="clipboard list" />
            Other
          </Menu.Item>
          )
          }
          
        </Sidebar>
        <Sidebar
          as={Menu}
          animation="push"
          direction="right"
          icon="labeled"
          inverted
          vertical
          visible={detailsType === "family"}
          width="thin"
        >
          <Menu.Item
            as="a"
            onClick={() => {
              dispatch({
                type: "display_type",
                displayType: "parent",
              });
              dispatch({
                type: "profile",
                profile: false,
              });
            }}
          >
            <Icon name="home" />
            Parent Information
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="users" />
            Kids Information
          </Menu.Item>
          <Menu.Item>
            {childCount > 0 && (
              <List as="ol">
                {childDetails.map((item, index) => {
                  return (
                    <List.Item
                      as="a"
                      key={item._id}
                      onClick={() => {
                        showChildDetails(item._id, item.first_name, index + 1);
                      }}
                    >
                      {item.first_name}
                    </List.Item>
                  );
                })}
              </List>
            )}
            <Button onClick={addChild}>Add Child Details</Button>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment relaxed="very" className="form-segment">
            {detailsType === "other" ? (
              <Dashboard />
            ) : (
              <>
                <Grid className={`${visible ? "" : "display-grid"}`} columns={2}>
                  <Grid.Column className={`${visible ? "" : "width-100p"}`}>
                    {(detailsType === "personal" ||
                      detailsType === "family") && (
                      <div>
                        <Header as="h1" className="personal-info">
                          Personal Information
                        </Header>
                        <Details type="personal" />
                      </div>
                    )}
                    {detailsType === "parent" && (
                      <div>
                        <Header as="h3">Father Information</Header>
                        <Details type="father" />
                      </div>
                    )}
                    {detailsType === "kids" && (
                      <div>
                        <Header as="h3" className="personal-info">
                          Child {childHead}
                        </Header>
                        <Details type="kids" />
                        <Button onClick={addChild}>Add Child</Button>
                      </div>
                    )}
                  </Grid.Column>
                  <Grid.Column className={`${visible ? "" : "width-100p"}`}>
                    {" "}
                    {(detailsType === "personal" ||
                      detailsType === "family") && (
                      <div>
                        <Header as="h1" className="personal-info">
                          Partner Information
                        </Header>
                        <Details type="partner" />
                      </div>
                    )}
                    {detailsType === "parent" && (
                      <div>
                        <Header as="h3">Mother Information</Header>
                        <Details type="mother" />
                      </div>
                    )}
                    {detailsType === "kids" && (
                      <div>
                        <Header as="h3" className="personal-info">
                          Child {childHead} Spouse
                        </Header>
                        <Details type="kids_spouse" />
                      </div>
                    )}
                  </Grid.Column>
                </Grid>
                {
                  width >1200 && (
                    <Divider vertical />

                  )
                }
              </>
            )}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

export default PersonalDetails;
