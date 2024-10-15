import { z } from "zod";
import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/ad_logo.png";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSocialApp } from "./UserSocialApp";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "nextjs-toploader/app";
import Swal from "sweetalert2";
import { LoginFormInputs } from "@/types/AuthType";
import {
  CreateAccount,
  DontHaveAccount,
  EmailAddressLogIn,
  OrSignInWith,
  Password,
  RememberPassword,
  SignIn,
  SignInToAccount,
} from "@/constant";

// Validation schema
const schema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
  rememberMe: z.boolean(),
});

const UserForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Form default values
  const defaultValues = useMemo(
    () => ({ email: "", password: "", rememberMe: false }),
    []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const formSubmitHandle: SubmitHandler<LoginFormInputs> = useCallback(
    async (data) => {
      try {
        const { data: login } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          data
        );
        const cookieOptions = {
          secure: true,
          sameSite: "none" as const,
          path: "/",
        };

        // Store cookies with correct expiration
        setCookie("userData", JSON.stringify(login.userData || ""), {
          ...cookieOptions,
          maxAge: 8 * 60 * 60, // Expires in 8 hours
        });
        setCookie("accessToken", login.accessToken || "", {
          ...cookieOptions,
          maxAge: 60 * 60, // Expires in 1 hour
        });
        setCookie("refreshToken", login.refreshToken || "", {
          ...cookieOptions,
          maxAge: 8 * 60 * 60, // Expires in 1 week
        });

        if (login.accessToken) {
          await router.push("/dashboard");
          Swal.fire("Login Successful", "Welcome to Adaired!", "success");
        }
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire("Error", "Login failed. Please try again.", "error");
      }
    },
    [router]
  );

  return (
    <div>
      <div>
        <Link className="logo" href="/dashboard">
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
                  id="email"
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
                    id="password"
                    placeholder="Test@123"
                    {...field}
                    className={errors.password ? "is-invalid" : ""}
                  />
                )}
              />
              <div
                className={`show-hide ${errors.password ? "invisible" : ""}`}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <span className="hide" />
                ) : (
                  <span className="show" />
                )}
              </div>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-0">
            <div className="checkbox p-0">
              <Input
                type="checkbox"
                id="checkbox1"
                {...register("rememberMe")}
              />
              <Label className="text-muted" htmlFor="checkbox1">
                {RememberPassword}
              </Label>
            </div>
            <div className="text-end mt-3">
              <Button color="primary" block className="w-100">
                {SignIn}
              </Button>
            </div>
          </FormGroup>

          <h6 className="text-muted mt-4 or">{OrSignInWith}</h6>
          <UserSocialApp />
          <p className="mt-4 mb-0 text-center">
            {DontHaveAccount}
            <Link className="ms-2" href={`/auth/register`}>
              {CreateAccount}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
