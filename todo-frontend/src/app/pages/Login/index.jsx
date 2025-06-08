import React, { useState } from "react";
import ToastHelper from "../../helpers/toast";
import { loginUser } from "./services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import CookieHelper from "../../helpers/cookie";
import { authExpireAt } from "../../helpers/auth";
import COOKIE from "../../constants/cookie";

export function Login() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.email) {
      errs.email = "Email is required";
    }

    if (!form.password) {
      errs.password = "Password is required";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(form);
      const { accessToken, refreshToken, email, username, id } =
        response.data.result;

      const expiresAt = authExpireAt(response.headers.expires);
      CookieHelper.setDataBulk(
        [
          { key: "access_token", data: accessToken },
          { key: "refresh_token", data: refreshToken },
          { key: "auth_expires", data: expiresAt },
        ],
        COOKIE.attributes
      );
      setForm({});
      handleLogin({ email, username, id });
      navigate("/todo", {
        replace: true,
      });
    } catch (error) {
      const err = error?.response?.data?.errors?.length
        ? error?.response?.data?.errors[0]?.msg
        : "Something went wrong. Please try again.";
      ToastHelper.ErrorToast(err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email <span style={styles.required}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            Password <span style={styles.required}>*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.accountAlreadyExists}>
          Create a new account,{" "}
          <a
            href="/register"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  form: {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: "320px",
    gap: "1.2rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
  },
  required: {
    color: "red",
    marginLeft: "0.2rem",
  },
  input: {
    padding: "0.65rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "-0.2rem",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  accountAlreadyExists: {
    textAlign: "center",
    fontSize: "0.9rem",
  },
};
