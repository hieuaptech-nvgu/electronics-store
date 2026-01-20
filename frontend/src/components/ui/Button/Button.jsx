import classNames from "classnames";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  ...props
}) => {
  const classes = classNames(
    "ui-btn",
    `btn--${variant}`,
    `btn--${size}`,
    {
      "btn--disabled": disabled,
      "btn--loading": loading,
    },
    className,
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
