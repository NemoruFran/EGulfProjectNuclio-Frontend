import "./loginform.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { API_ROOT } from "../../utils/apiHost/apiHost";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const onSubmit = (data) => {
    const jsondata = JSON.stringify(data);
    if (Object.keys(errors).length !== 0) {
      alert(JSON.stringify(errors));
    } else {
      fetch(`${API_ROOT}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsondata,
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("token", json);
          history.goBack();
        })
        .catch((errors) => console.log(JSON.stringify(errors)));
    }
  };

  return (
    <div className="_loginformContainer">
      <span> Login </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          type="text"
          placeholder="E-mail"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.type === "required" && (
          <span className="_alertText" role="alert">
            E-mail required!
          </span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="_alertText" role="alert">
            Incorrect E-mail format!
          </span>
        )}
        <input
          id="password"
          aria-invalid={errors.password ? "true" : "false"}
          type="text"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <span className="_alertText" role="alert">
            Password required!
          </span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="_alertText" role="alert">
            Password must have at least 6 characters!
          </span>
        )}
        <input className="_buttonInput" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
