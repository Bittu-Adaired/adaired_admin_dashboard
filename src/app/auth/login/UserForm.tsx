"use client";
import {
  CreateAccount,
  DontHaveAccount,
  EmailAddressLogIn,
  OrSignInWith,
  Password,
  RememberMeForNextTime,
  SignIn,
  SignInToAccount,
} from "@/Constant";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/ad_logo.png";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { LoginSubmitProp } from "../../../Types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSocialApp } from "./UserSocialApp";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

// Dynamically load components only when needed (e.g., Alert)
const Alert = dynamic(() => import("reactstrap").then((mod) => mod.Alert));
const ThumbsUp = dynamic(() =>
  import("react-feather").then((mod) => mod.ThumbsUp)
);
const AlertCircle = dynamic(() =>
  import("react-feather").then((mod) => mod.AlertCircle)
);

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  rememberMe: z.boolean(),
});

export const UserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const defaultValues = useMemo(
    () => ({
      email: "bittu@gmail.com",
      password: "Ad@12345",
      rememberMe: false,
    }),
    []
  );

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSubmitProp>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const formSubmitHandle = async (data: LoginSubmitProp) => {
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        data
      );

      // Store user details and tokens
      Cookies.set("userData", JSON.stringify(login.data.userData), {
        expires: 7,
        secure: true,
        sameSite: "None",
      });
      Cookies.set("accessToken", login.data.accessToken, {
        expires: 1 / 24,
        secure: true,
        sameSite: "None",
      });
      Cookies.set("refreshToken", login.data.refreshToken, {
        expires: 1,
        secure: true,
        sameSite: "None",
      });

      // Redirect to dashboard
      if (login.data.refreshToken) {
        router.push("/dashboard");
      }

      // Show success alert
      setAlert({ message: login.data?.message, type: "success" });
    } catch (error) {
      console.error("Error logging in:", error);
      setAlert({
        message:
          error.response?.data?.message || "Login failed. Please try again.",
        type: "error",
      });
    }
  };

  const onDismissAlert = () => {
    setAlert(null);
  };

  // Automatically dismiss alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <div>
      <div>
        <Link className="logo" href={`/dashboard`}>
          <Image
            className="img-fluid for-light"
            src={imageOne.src}
            alt="login page"
            height={100}
            width={150}
          />
        </Link>
      </div>
      <div className="login-main">
        <Form className="theme-form" onSubmit={handleSubmit(formSubmitHandle)}>
          <h4>{SignInToAccount}</h4>
          <p>Enter your email & password to login</p>

          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="test123@gmail.com"
                  {...field}
                  className={errors.email ? "is-invalid" : ""}
                />
              )}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </FormGroup>

          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Test@123"
                    {...field}
                    className={errors.password ? "is-invalid" : ""}
                  />
                )}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
              <div
                className="show-hide"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>

          <FormGroup className="mb-0">
            <div className="checkbox p-0">
              <input
                type="checkbox"
                id="checkbox1"
                {...register("rememberMe")}
              />
              <Label className="text-muted" htmlFor="checkbox1">
                {RememberMeForNextTime}
              </Label>
            </div>
            <div className="text-end mt-3">
              <Button color="primary" block className="w-100" type="submit">
                {SignIn}
              </Button>
            </div>
          </FormGroup>

          <h6 className="text-muted mt-4 or">{OrSignInWith}</h6>
          <UserSocialApp />

          <p className="mt-4 mb-0 text-center">
            {DontHaveAccount}
            <Link
              className="ms-2"
              href={`/others/authentication/registersimple`}
            >
              {CreateAccount}
            </Link>
          </p>
        </Form>
      </div>

      {alert && (
        <div
          className={`toast-container position-fixed z-1000 top-0 end-0 p-3 toast-index toast-rtl`}
        >
          <Alert
            color={alert.type === "success" ? "success" : "danger"}
            isOpen={!!alert}
            toggle={onDismissAlert}
          >
            {alert.type === "success" ? <ThumbsUp /> : <AlertCircle />}
            <p>{alert.message}</p>
          </Alert>
        </div>
      )}
    </div>
  );
};
