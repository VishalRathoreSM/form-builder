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
      initValue: "vishal",
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
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {
        console.log("in onChange func");
      }
    },
    lastName: {
      type: "text",
      id: "lastName",
      label: "Last Name",
      initValue: "rathore",
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
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {
        console.log("in onChange func");
      }
    },
    email: {
      type: "email",
      id: "email",
      label: "Email",
      initValue: "vishal@gmail.com",
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
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {
        console.log("in onChange func");
      }
    },
    vehicle: {
      id: "vehicle",
      type: "checkbox-group",
      initValue: {},
      classes: {
        wrapperClass: "k",
        errorClass: "k"
      },
      onChange: (id, value, e) => {
        console.log({ target: e.target });
      },
      options: [
        {
          id: "car",
          label: "Car",
          classes: {
            wrapperClass: "k",
            inputClass: "l",
            errorClass: "k"
          }
        },
        {
          id: "bike",
          label: "Bike",
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
      initialChecked: false,
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {
        console.log("in onChange func");
      }
    },
    gender: {
      id: "gender",
      label: "Select Gender",
      type: "radio",
      initValue: "",
      classes: {
        wrapperClass: "k",
        errorClass: "k"
      },
      onChange: (id, value, e) => {
        console.log({ target: e.target });
      },
      validations: ["req"],
      options: [
        {
          id: "male",
          label: "Male",
          classes: {
            wrapperClass: "k",
            inputClass: "l"
          }
        },
        {
          id: "female",
          label: "Female",
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
      initValue: "",
      classes: {
        wrapperClass: "k",
        inputClass: "l",
        errorClass: "k"
      },
      options: [
        { name: "Single", value: "single", className: "hek" },
        { name: "Married", value: "married" }
      ],
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {}
    },
    about: {
      type: "textarea",
      id: "about",
      label: "About you ",
      initValue: "",
      placeholder: "about me",
      rows: 3,
      cols: 6,
      classes: {
        wrapperClass: "j",
        inputClass: "k",
        errorClass: "l"
      },
      onBlur: e => {},
      onFocus: e => {},
      onChange: (id, value, e) => {}
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
