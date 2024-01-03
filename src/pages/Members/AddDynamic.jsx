import React from "react";
import { Form } from "react-bootstrap"; // Import Form component from react-bootstrap

const AddDynamic = ({ dynamicFields, setDynamicFields, fields }) => {
  const handleOptionChange = (event, value) => {
    const updatedFields = [...dynamicFields];
    const index = updatedFields.findIndex(
      (field) => field[value] !== undefined
    );

    if (index !== -1) {
      updatedFields.splice(index, 1);
    } else {
      updatedFields.push({ [value]: "" });
    }

    setDynamicFields(updatedFields);
  };

  return (
    <Form className="dynamic-form">
      {" "}
      {/* Use Form component */}
      <h3>Choose dynamic field</h3>
      <Form.Check
        type="checkbox"
        label="Programs"
        value="program"
        checked={dynamicFields.some((field) => field["program"] !== undefined)}
        onChange={(e) => handleOptionChange(e, "program")}
      />
      {fields.map((row) => (
        <Form.Check
          key={row.key}
          type="checkbox"
          label={row.label}
          value={row.key}
          checked={dynamicFields.some((field) => field[row.key] !== undefined)}
          onChange={(e) => handleOptionChange(e, row.key)}
        />
      ))}
    </Form>
  );
};

export default AddDynamic;
