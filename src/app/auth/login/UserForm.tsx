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
import Cookies from "js-cookie";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/ad_logo.png";
import { UserSocialApp } from "./UserSocialApp";
import { useForm, Controller } from "react-hook-form";
import { LoginSubmitProp } from "../../../Types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  rememberMe: z.boolean(),
});

export const UserForm = () => {
  const [show, setShow] = useState(false);
  const defaultValues = {
    email: "bittu@gmail.com",
    password: "Ad@12345",
    rememberMe: false,
  };
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
    console.log(data);
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        data
      );

      console.log(login.status);
      if (login.status === 200) {
        Cookies.set("ad_access", login.data.ad_access);
        // if (Cookies.get("ad_access")) {
        //   const isValidUser = await isUserValid();
        //   if (isValidUser) {
        //   }
        // }
        router.push("/dashboard");
        toast.success("login successful");
      } else {
        alert("Please Enter Valid Email Or Password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const isUserValid = async () => {
    try {
      const status = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refetch`,
        {
          withCredentials: true,
        }
      );
      console.log(status.data);
      return status.status === 200 ? true : false;
    } catch (error) {
      console.error("Error checking user validity:", error);
      return false;
    }
  };

  return (
    <div>
      <div>
        <Link className="logo" href={`/dashboard`}>
          <img
            className="img-fluid for-light"
            src={imageOne.src}
            alt="login page"
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
                    type={show ? "text" : "password"}
                    placeholder="Test@123"
                    {...field}
                    className={errors.password ? "is-invalid" : ""}
                  />
                )}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
              <div className="show-hide" onClick={() => setShow(!show)}>
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
    </div>
  );
};
