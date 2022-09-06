import HeaderCartButton from "./HeaderButton/HeaderCartButton";
import classes from "./Header.module.css";
import mealsImg from "../../assets/images/meals.jpeg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Table of food" />
      </div>
    </>
  );
};

export default Header;
