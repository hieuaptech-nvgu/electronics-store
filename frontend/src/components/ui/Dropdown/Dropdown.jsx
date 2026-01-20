import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import "./Dropdown.css";

const Dropdown = ({
  trigger,
  items = [],
  onSelect,
  size = "md", // sm | md | lg
  variant = "default", // default | primary
  align = "left", // left | right
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={classNames("ui-dropdown", className)}>
      <div className="ui-dropdown__trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && (
        <div
          className={classNames(
            "ui-dropdown__menu",
            `ui-dropdown__menu--${size}`,
            `ui-dropdown__menu--${variant}`,
            `ui-dropdown__menu--${align}`,
          )}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="ui-dropdown__item"
              onClick={() => {
                onSelect?.(item);
                setOpen(false);
              }}
            >
              {item.icon && (
                <span className="ui-dropdown__item-icon">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
