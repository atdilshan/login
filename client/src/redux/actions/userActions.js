import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/signin", reqObj);
    if (response.data === "Email or Password is incorrect!") {
        message.error(response.data);
    } else {
        localStorage.setItem("user", JSON.stringify(response.data));

        message.success("Login success!");

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong!");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/signup", reqObj);
    if (response.data === "User already exists") {
      message.error(response.data);
    } else if (response.data === "User registered successfully") {
        message.success(response.data);
        setTimeout(() => {
            window.location.href='/'
        }, 500);
    } else {
        message.error(response.data);
    }

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};
