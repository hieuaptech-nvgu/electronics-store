import classNames from "classnames";
import "./Field.css";

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  variant = "default",
  size = "md",
  disabled = false,
  message,
  iconLeft,
  iconRight,
  className,
  ...props
}) => {
  const fieldClass = classNames(
    "ui-field",
    `ui-field--${variant}`,
    `ui-field--${size}`,
    {
      "ui-field--disabled": disabled,
      "ui-field--has-left-icon": iconLeft,
      "ui-field--has-right-icon": iconRight,
    },
    className,
  );

  return (
    <div className="ui-field-wrapper">
      {label && <label className="ui-field__label">{label}</label>}

      <div className="ui-field-control">
        {iconLeft && (
          <span className="ui-field__icon ui-field__icon--left">
            {iconLeft}
          </span>
        )}

        <input
          className={fieldClass}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />

        {iconRight && (
          <span className="ui-field__icon ui-field__icon--right">
            {iconRight}
          </span>
        )}
      </div>

      {message && (
        <div className={`ui-field__message ui-field__message--${variant}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Field;
