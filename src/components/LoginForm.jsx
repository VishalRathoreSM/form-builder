import React from "react";
import Form from "./FormBuilder";

const FORM_CONFIG = {
  onSubmit: () => {
    console.log("submit");
    alert("hey");
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
      validations: [
        {
          type: "minLen",
          args: [3]
        }
      ],
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    email: {
      type: "email",
      id: "email",
      label: "Email",
      value: "",
      placeholder: "Enter your email",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      validations: [
        {
          type: "email",
          args: []
        }
      ],
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    male: {
      type: "checkbox",
      id: "male",
      label: "Male",
      name: "gen",
      value: "male",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    female: {
      type: "checkbox",
      id: "female",
      label: "Female",
      name: "gen",
      value: "female",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      onBlur: () => {},
      onFocus: () => {},
      onChange: () => {
        console.log("in onChange func");
      }
    },
    maritalStatus: {
      type: "select",
      id: "maritalStatus",
      label: "Marital Status ",
      value: "",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      options: [
        { name: "Single", value: "single" },
        { name: "Married", value: "married" }
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
