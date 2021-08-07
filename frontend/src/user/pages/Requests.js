import React, { useEffect, useContext, useState } from 'react';
import { Table, Menu, Icon, Button, Modal } from "semantic-ui-react";
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import "./Requests.css"

function Requests() {
  const auth = useContext(AuthContext);
  const [requestUser, setRequestUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    getRequests();    
  }, [])


  const getRequests = ()=>{
    axios({
      method: "get",
      url: `http://localhost:4000/api/users/requests`,
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log(response.data);
      setRequestUser(response.data.list);
    }).catch((err) => {
      console.log(err);
    })
  }

  // useEffect(() => {
  //   console.log(requestUser)
  //   if (requestUser.length > 0) {
  //     axios({
  //       method: "post",
  //       url: `http://localhost:4000/api/users/requestsUsers`,
  //       data: requestUser,
  //       headers: {
  //         Authorization: 'Bearer ' + auth.token
  //       }
  //     }).then((response) => {
  //       console.log(response.data);
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }, [requestUser])


  const showDetails = (id)=>{
    console.log(id);
    setOpen(true);
    setId(id)
    axios({
      method: "get",
      url: `http://localhost:4000/api/users/showDetails/${id}`,
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log(response.data.detail);
      setFormDetails(response.data.detail);
    }).catch((err) => {
      console.log(err);
    })
  };


  const approveUser = ()=>{
    setOpen(false)
    axios({
      method: "post",
      url: `http://localhost:4000/api/users/approveUser/${id}`,
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log(response.data.detail);
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setId("");
      getRequests(); 
    })
  }

  useEffect(()=>{
    console.log(requestUser)
  },[requestUser])


  return (
    <>
    <div className="approve-table" >
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Area</Table.HeaderCell>
            <Table.HeaderCell>Approval</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            requestUser.map(item => {
              return (
                !item.approve && (
                  
                    <Table.Row>
                      <Table.Cell>{item.first_name} {item.middle_name}  {item.last_name}</Table.Cell>
                      <Table.Cell>{item.address_ward || ""}</Table.Cell>
                      {
                        (item.address_ward !== "Vivek Nagar") ?
                          (
                            <Table.HeaderCell disabled>Approved by Sunil Purankar on 22-07-2021
                            </Table.HeaderCell>
                          )
                          : (
    
    
                            <Table.HeaderCell disabled={item.address_ward !== "Vivek Nagar"} >
                              <Button negative>Decline</Button>
                              <Button positive onClick={()=>showDetails(item._id)}>Show</Button>
                            </Table.HeaderCell>
                          )
                      }
                    </Table.Row>
                  

                )
              )
             
            })
          }




        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
<div>
     <Modal
      closeIcon
      closeOnEscape
        size="large"
        open={open}
        onClose={()=>{setOpen(false); setId("")}}
        centered={false}
      >
        <Modal.Header>Account Details</Modal.Header>
        <Modal.Content>
        <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Section</Table.HeaderCell>
        <Table.HeaderCell>Details</Table.HeaderCell>
        {/* <Table.HeaderCell>Status</Table.HeaderCell> */}
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>{formDetails.first_name} {formDetails.middle_name} {formDetails.last_name}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Gender</Table.Cell>
        <Table.Cell>{formDetails.gender}</Table.Cell>
        {/* <Table.Cell>Requires call</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Gotra</Table.Cell>
        <Table.Cell>{formDetails.gotra}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row >
        <Table.Cell>Alive</Table.Cell>
        <Table.Cell>{formDetails.alive}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Marrital Status</Table.Cell>
        <Table.Cell>{formDetails.marital_status}</Table.Cell>
        {/* <Table.Cell warning>Requires call</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Father Alive</Table.Cell>
        <Table.Cell >{formDetails.father_alive}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Mother Alive</Table.Cell>
        <Table.Cell >{formDetails.mother_alive}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Blood Group</Table.Cell>
        <Table.Cell >{formDetails.blood_group}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Birth Date</Table.Cell>
        <Table.Cell >{formDetails.birth_date}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Education </Table.Cell>
        <Table.Cell >{formDetails.education}   {formDetails.education_detail}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Occupation </Table.Cell>
        <Table.Cell >{formDetails.occupation}  {formDetails.occupation_detail}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Earnings </Table.Cell>
        <Table.Cell >{formDetails.earning}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Address </Table.Cell>
        <Table.Cell >{formDetails.address} {formDetails.address_city} </Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Contact No </Table.Cell>
        <Table.Cell >{formDetails.personal_number}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Whatsapp No </Table.Cell>
        <Table.Cell >{formDetails.whatsapp_number}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      <Table.Row>
        <Table.Cell>Email  </Table.Cell>
        <Table.Cell >{formDetails.email}</Table.Cell>
        {/* <Table.Cell>None</Table.Cell> */}
      </Table.Row>
      
    </Table.Body>
  </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={()=>{setOpen(false);setId("")}}>
            No
          </Button>
          <Button positive onClick={approveUser}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
      </>
  )
}

export default Requests
