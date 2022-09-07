import classes from "./MealInput.module.css";
import { forwardRef } from "react";

const MealInput = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default MealInput;
