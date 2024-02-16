/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
}

const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name); // this hook will return all relevant data, such as value, error, onChange and other stuff related to the input that has name = props.name
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
};

export default MySelectInput;
