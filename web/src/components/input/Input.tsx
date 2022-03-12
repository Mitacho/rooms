import { useField } from "formik";
import styles from "./Input.module.css";

type InputFieldProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  helperText?: string;
  fullWidth?: boolean;
};

export default function Input({
  label,
  helperText,
  fullWidth,
  ...props
}: InputFieldProps): JSX.Element {
  const [field, { error }] = useField(props);
  return (
    <fieldset
      className={`${styles.container} ${
        fullWidth ? styles.containerFullWidth : undefined
      }`}
    >
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {helperText ? (
        <span className="form-helper-text break-word">{helperText}</span>
      ) : null}
      {error ? (
        <span className={`${styles.error} break-word`}>{error}</span>
      ) : null}
    </fieldset>
  );
}
