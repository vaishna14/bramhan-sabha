import React from 'react';
// import { pure } from 'recompose';
import axios from "axios";

export const FormData = (props)=>{
    console.log(props);
    // console.log(type);
    let body =props.form;
    console.log(body);
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/userDetails',
        data: body
      }).then(function (response) {
        return(response.data)
    //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    }).catch((e)=>{
        console.log(e)
        return;
    });


    // axios({
    //     method: 'post',
    //     url: 'http://localhost:5000/api/users/userDetails',
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