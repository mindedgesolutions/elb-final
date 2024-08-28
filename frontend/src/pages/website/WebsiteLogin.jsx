import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LinkedinIcon, Twitter } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { Form, Link, useNavigation } from "react-router-dom";
import { nanoid } from "nanoid";

const socialArray = [
  { icon: LinkedinIcon, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: FaGoogle, href: "#", size: 24 },
];

const WebsiteLogin = () => {
  document.title = `Sign In | ${import.meta.env.VITE_APP_TITLE}`;
  const [showPassword, setShowPassword] = useState("password");
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <>
      <section
        className={`w-breadcrumb-area bg-[url('@/assets/website/img/common/breadcrumb-bg.png')]`}
      >
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="position-relative z-2">
                <h2 className="section-title-light mb-2">Sign In</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb w-breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={`/`} className="text-decoration-none">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active text-white"
                      aria-current="page"
                    >
                      Login
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-110# bg-offWhite">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 p-3 p-lg-5 offset-lg-3">
              <div className="bg-white rounded-3 p-4">
                <div className="mb-5">
                  <h2 className="section-title mb-2">Log in</h2>
                  <p className="section-desc">Welcome to Easy Lending Buddy</p>
                </div>
                <Form method="post" autoComplete="off">
                  <div className="form-container d-flex flex-column gap-4">
                    <div className="form-input">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-lime-300">*</span>
                      </label>
                      <input
                        type="email"
                        name="username"
                        placeholder="your_email@domain.com"
                        className="form-control shadow-none"
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-lime-300">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword}
                          name="password"
                          placeholder="********"
                          className="form-control shadow-none"
                        />
                        <span
                          className="input-group-text cursor-pointer border border-l"
                          onClick={() =>
                            setShowPassword(
                              showPassword === "password" ? "text" : "password"
                            )
                          }
                        >
                          {showPassword === "password" ? (
                            <Eye
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeOff
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2 form-input">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="remember"
                          className="form-check"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="form-check-label"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div>
                        <Link to={`#`} className="form-forget-pass">
                          Forget Password
                        </Link>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="w-btn-secondary-lg bluebg_btn"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging In..." : "Log In"}
                      </button>
                    </div>
                  </div>
                </Form>
                <div className="py-5">
                  <div className="form-divider d-flex justify-content-center align-items-center">
                    <span className="form-divider-text">OR</span>
                  </div>
                </div>
                <div className="d-flex gap-3 justify-content-center align-items-center social-login">
                  {socialArray.map((icon) => {
                    return (
                      <Button
                        key={nanoid()}
                        variant="link"
                        size="icon"
                        className="group p-4 bg-gray-100 rounded-full hover:bg-purple-950 transition duration-500 ease-in-out"
                      >
                        <Link to={icon.href}>
                          <icon.icon
                            size={icon.size}
                            className="text-gray-900 group-hover:text-gray-100"
                          />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <p className="text-center form-text signup-text">
                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default WebsiteLogin;
