import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Formulario.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Formulario = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      isValid,
      inputId: id,
    });
  }, []);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      sendRequest(
        "http://localhost:5000/api/servers/create",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
        }),
        { "Content-Type": "application/json" }
      );
      //redirect the user to a diferent page
      console.log(formState.inputs.name); // send this to the backend!
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="centrado">
        <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="inputs">
            <Input
              id="name"
              element="input"
              type="text"
              label="hostname"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid hostname."
              onInput={inputHandler}
            />
          </div>
          <div className="botonSubmit">
            <Button type="submit" disabled={!formState.isValid} block>
              Crear
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Formulario;
