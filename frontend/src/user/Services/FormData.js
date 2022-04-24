import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { pure } from 'recompose';
import axios from "axios";

export const FormData = async (props)=>{  
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
   const response = await axios({
        method: 'post',
        // url: 'https://test27102021.herokuapp.com/api/users/addUserDetails',
        url: 'https://test1803bs.herokuapp.com/api/users/addUserDetails',
        data: body,
        headers: {
            Authorization: 'Bearer ' + token
          }
        // Authorization: 'Bearer ' + token
      }).then(function (response) {
        console.log(response.data)
        return response.data;
    //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    }).catch((e)=>{
        console.log(e)
        return e;
    });

return response;
  

}
