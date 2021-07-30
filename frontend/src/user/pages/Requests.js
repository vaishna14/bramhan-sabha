import React,{useEffect, useContext} from 'react';
import {Table} from "semantic-ui-react";
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';

function Requests() {
    const auth = useContext(AuthContext);

    // useEffect(()=>{
    //     axios({
    //         method: "get",
    //         url: `http://localhost:5000/api/users/requests`,
    //         headers: {
    //             Authorization: 'Bearer ' + auth.token
    //         }
    //     }).then((response) => {
    //        console.log(response.data); 
    //     }).catch((err) => {
    //         console.log(err);
    //     }) 
    // },[])

    return (
        <>
             <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Area</Table.HeaderCell>
        <Table.HeaderCell>Approval</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row disabled>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Selected</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell disabled>Jill</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
        </>
    )
}

export default Requests
