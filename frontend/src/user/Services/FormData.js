import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { pure } from 'recompose';
import axios from "axios";

export const FormData = (props)=>{  
    console.log(props);
    props.form["type"] = props.type;
    props.form["isExist"] = props.isExist
    props.form["formId"] = props.formId
    let body =props.form;
    let token = props.token
    if(props.kidId){
      props.form["kidId"] = props.kidId
      props.form["kidCount"] = props.kidCount
    }
    axios({
        method: 'post',
        url: 'https://test05092021.herokuapp.com/api/users/addUserDetails',
        data: body,
        headers: {
            Authorization: 'Bearer ' + token
          }
        // Authorization: 'Bearer ' + token
      }).then(function (response) {
        return(response.data)
    //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    }).catch((e)=>{
        console.log(e)
        return;
    });


    // axios({
    //     method: 'post',
    //     url: 'https://test05092021.herokuapp.com/api/users/userDetails',
    //     ...body
    //   })
    //     .then(function (response) {
    //         return(response.data)
    //     //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    //     }).catch((e)=>{
    //         console.log(e)
    //         return;
    //     });

}

// function FormData() {

//     // GET request for remote image in node.js
   

  
// }

// // Wrap component using the `pure` HOC from recompose
// export default FormData;