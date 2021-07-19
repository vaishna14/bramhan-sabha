import React from 'react';
import { Divider, Header, Image, Segment } from 'semantic-ui-react';

function FamilyStruc() {
    return (
        <>
           <Segment>
    <Header as='h3'>Parent Information</Header>
    <Image src='/images/wireframe/short-paragraph.png' />

    <Divider section />

    <Header as='h3'>Kid Information</Header>
    <Image src='/images/wireframe/short-paragraph.png' />
  </Segment> 
        </>
    )
}

export default FamilyStruc
