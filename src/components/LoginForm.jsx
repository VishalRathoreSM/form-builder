import React from "react";
import Form from "./FormBuilder";

const FORM_CONFIG = {
  onSubmit: () => {
    console.log("submit");
  },
  wrapperClass: "dd",
  title: { text: "Form", class: "ll" },
  submitBtn: {
    id: "submit-form-btn-id",
    content: "Submit",
    class: "sub"
  },
  fields: {
    firstName: {
      type: "text",
      id: "firstName",
      value: "",
      label: "First Name",
      placeholder: "",
      classes: {
        wrapperClass: "a",
        inputClass: "b",
        errorClass: "c"
      },
      validations: [
        "req",
        {
          type: "req",
          msg: "required field",
          args: []
        },
        value => {
          if (value !== 1) {
            return "value is not unity";
          }
          return;
        },
        {
          type: "notUnity",
          validator: value => {
            if (Number(value) !== 1) {
              return "value is not unity";
            }
            return;
          }
        }
      ],
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    lastName: {
      type: "text",
      id: "lastName",
      label: "Last Name",
      value: "",
      placeholder: "last name",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {}
    },
    gender: {
      type: "select",
      id: "gender",
      label: "Gender: ",
      value: "",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      options: [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" }
      ],
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {}
    },
    about: {
      type: "textarea",
      id: "about",
      label: "About you ",
      value: "",
      placeholder: "about me",
      rows: 3,
      classes: {
        wrapperClass: "j",
        inputClass: "k",
        errorClass: "l"
      },
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {}
    }
  }
};

function LoginForm() {
  return (
    <div>
      <Form config={FORM_CONFIG} />
    </div>
  );
}

export default LoginForm;
