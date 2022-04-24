import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import InputVal from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_PASSWORD
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {  Icon } from "semantic-ui-react";
import "./Auth.css";
import Recaptcha from "react-recaptcha"

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [verified, setVerified] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

    const errorDisplay = () => {
    return (<>
      <ul  style={{"text-align": "left"}}>
        <li>Length more than 8 characters.</li>
        <li>Should include one Upper case</li>
        <li>Should include one Upper case</li>
        <li>Should include one Special Character</li>
        <li>Should include one digit</li>
        {/* <p>duh</p>
        <p>duh</p>
        <p>duh</p> */}
    </ul>
  </>)}

  const switchModeHandler = () => {
    if (!isLoginMode) {
      console.log(formState)
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if(verified){
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "https://test27102021.herokuapp.com/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.isAdmin,
          responseData.formId,
          responseData.adminArea
        );
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "https://test27102021.herokuapp.com/api/users/signup",
          "POST",
          formData
        );

        auth.login(
          responseData.userId,
          responseData.token,
          responseData.isAdmin,
          responseData.formId,
          responseData.adminArea
        );
      } catch (err) {}
    }}else{
      alert("PLease verify you are not a robot !")
    }
  };

  const callback = ()=>{
    console.log("called")
  }

  const verifyCallback = (response)=>{
    if(response){
      setVerified(true);
    }else{
      setVerified(false);
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <InputVal
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <InputVal
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />

          <InputVal
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_PASSWORD()]}
            // errorText="Password should contain uppercase, lowercase, special characters and numeric values and length should be more than 8 characters."
            errorText={errorDisplay()}
            onInput={inputHandler}
          />

<Recaptcha
    sitekey="6Lc5gP4cAAAAAPSb6m5dke2p7DVTooOlXv47Gz6F"
    render="explicit"
    onloadCallback={callback}
    verifyCallback={verifyCallback}
  />  
  <div className="mt-1p" >
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          </div>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
