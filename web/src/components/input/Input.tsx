import { useField } from "formik";
import styles from "./Input.module.css";

type InputFieldProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  hideErrors?: boolean;
  centered?: boolean;
  noMargin?: boolean;
};

export default function Input({
  label,
  helperText,
  fullWidth,
  hideErrors,
  centered,
  noMargin,
  ...props
}: InputFieldProps): JSX.Element {
  const [field, { error }] = useField(props);
  return (
    <fieldset
      className={`${styles.container} ${
        fullWidth ? styles.containerFullWidth : undefined
      } ${centered ? styles.centered : undefined} ${
        noMargin ? styles.noMargin : undefined
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
      {error && !hideErrors ? (
        <span className={`${styles.error} break-word`}>{error}</span>
      ) : null}
    </fieldset>
  );
}
