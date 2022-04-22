import React from "react";
import Form from "./FormBuilder";

const FORM_CONFIG = {
  form: {
    onSubmit: () => {
      console.log("submit");
    },
    wrapperClass: ""
  },
  fields: {
    firstName: {
      type: "text",
      id: "firstName",
      name: "firstName",
      value: "",
      label: "First Name",
      classes: {
        wrapper: "",
        input: "",
        error: ""
      },
      isRequired: true,
      validations: ["req"],
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    lastName: {
      type: "text",
      id: "lastName",
      name: "lastName",
      label: "Last Name",
      value: "",
      classes: {
        wrapper: "",
        input: "",
        error: ""
      },
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {}
    }
  }
};

function LoginForm() {
  // console.log("main component");

  return (
    <div>
      LoginForm
      <Form config={FORM_CONFIG} />
    </div>
  );
}

export default LoginForm;
