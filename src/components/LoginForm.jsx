import React from "react";
import Form from "./FormBuilder";

const FORM_CONFIG = {
  onSubmit: () => {
    console.log("submit");
    alert("hey");
  },
  wrapperClass: "dd",
  id: "contact-form",
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
    vehicle: {
      id: "vehicle",
      name: "vehicle",
      type: "checkbox-group",
      value: {},
      classes: {
        wrapperClass: "k",
        errorClass: "k"
      },
      onChange: e => {
        console.log({ target: e.target });
      },
      options: [
        {
          id: "car",
          label: "Car",
          value: "car",
          classes: {
            wrapperClass: "k",
            inputClass: "l",
            errorClass: "k"
          }
        },
        {
          id: "bike",
          label: "Bike",
          value: "bike",
          classes: {
            wrapperClass: "k",
            inputClass: "l",
            errorClass: "k"
          }
        }
      ]
    },
    subscribe: {
      type: "checkbox",
      id: "subscribe",
      label: "Choose to get updates.",
      name: "subscribe",
      value: "subscribe",
      initialChecked: false,
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
    gender: {
      id: "gender",
      label: "Select Gender",
      type: "radio",
      name: "gender",
      value: "",
      classes: {
        wrapperClass: "k",
        errorClass: "k"
      },
      onChange: e => {
        console.log({ target: e.target });
      },
      validations: ["req"],
      options: [
        {
          id: "male",
          label: "Male",
          value: "male",
          classes: {
            wrapperClass: "k",
            inputClass: "l"
          }
        },
        {
          id: "female",
          label: "Female",
          value: "female",
          classes: {
            wrapperClass: "k",
            inputClass: "l"
          }
        }
      ]
    },
    maritalStatus: {
      type: "select",
      id: "maritalStatus",
      label: "Marital Status ",
      placeholder: "Select Your Gender",
      value: "",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      options: [
        { name: "Single", value: "single", className: "hek" },
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
