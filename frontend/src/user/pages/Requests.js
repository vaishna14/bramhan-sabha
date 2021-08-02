import React,{useEffect, useContext, useState} from 'react';
import {Table, Menu, Icon,Button} from "semantic-ui-react";
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import "./Requests.css"

function Requests() {
    const auth = useContext(AuthContext);
    const [requestUser, setRequestUser] = useState([]);

    useEffect(()=>{
        axios({
            method: "get",
            url: `http://localhost:5000/api/users/requests`,
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }).then((response) => {
           console.log(response.data); 
           setRequestUser(response.data.list);
        }).catch((err) => {
            console.log(err);
        }) 
    },[])

    useEffect(()=>{
      console.log(requestUser)
      if(requestUser.length > 0){
        axios({
          method: "post",
          url: `http://localhost:5000/api/users/requestsUsers`,
          data: requestUser,
          headers: {
              Authorization: 'Bearer ' + auth.token
          }
      }).then((response) => {
         console.log(response.data); 
      }).catch((err) => {
          console.log(err);
      }) 
      }
    },[requestUser])

    return (
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
       requestUser.map(item =>{
         return (
<Table.Row>
        <Table.Cell>{item.first_name} {item.middle_name}</Table.Cell>
        <Table.Cell>{item.address_ward || ""}</Table.Cell>
        {
          (item.address_ward !== "Vivek Nagar") ?
          (
            <Table.HeaderCell disabled>Approved by Sunil Purankar on 22-07-2021
            </Table.HeaderCell>
          )
          :(

          
        <Table.HeaderCell disabled={item.address_ward !== "Vivek Nagar"} >
        <Button negative>Decline</Button>
        <Button positive>Approval</Button>
        </Table.HeaderCell>
        )
      }
      </Table.Row>
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
    )
}

export default Requests
