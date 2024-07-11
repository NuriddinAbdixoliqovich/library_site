import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";

const initialState = {
  firstName: "",
  userName: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { firstName, userName, email, password } = formValue;

  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (userName && password) {
      await loginUser({ userName, password });
    } else {
      toast.error("Iltimos maydonni to'ldiring");
    }
  };

  const handleRegister = async () => {
    if (firstName && email && userName && password) {
      await registerUser({ firstName, email, userName, password });
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Login muvaffaqiyatli bajarildi");
      dispatch(
        setUser({ token: loginData.token, name: loginData.result.name })
      );
      navigate("/home");
    }

    if (isRegisterSuccess) {
      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi");
      dispatch(
        setUser({ token: registerData.token, name: registerData.result.name })
      );
      navigate("/home");
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  //   useEffect(() => {
  //     if (isLoginError) {
  //       toast.error((loginError as any).data.message);
  //     }

  //     if (isRegisterError) {
  //       toast.error((registerError as any).data.message);
  //     }
  //   }, [isLoginError, isRegisterError]);

  return (
    <div className="flex items-center gap-4 m-auto max-w-[1300px]">
      <div className="container py-4 h-100">
        <div className="">
          <div>
            <div className="">
              <div className="p-4 ">
                <div className="pb-5 mb-5 mt-4">
                  <h2 className="font-bold mb-2  text-3xl text-center">
                    {!showRegister ? "Kirish" : "Ro'yxatdan o'tish"}
                  </h2>
                  {showRegister && (
                    <>
                      <div className="form-white mb-4 flex  flex-col gap-2 items-start">
                        <label
                          className="text-center text-[18px]"
                          htmlFor="firstName"
                        >
                          Firstname *
                        </label>
                        <TextField
                          className="w-[300px]"
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          placeholder="firstName"
                          id="firstName"
                        />
                      </div>
                      <div className="form-white mb-8 flex  flex-col gap-2 items-start">
                        <label
                          className="text-center text-[18px]"
                          htmlFor="email"
                        >
                          Email *
                        </label>
                        <TextField
                          className="w-[300px]"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          placeholder="email"
                          id="email"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-white mb-4 flex  flex-col gap-2 items-start">
                    <label
                      className="text-center text-[18px]"
                      htmlFor="username"
                    >
                      Username *
                    </label>
                    <TextField
                      className="w-[300px]"
                      type="text"
                      name="userName"
                      value={userName}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Username"
                      id="username"
                    />
                  </div>
                  <div className="form-white mb-8 flex  flex-col gap-2 items-start">
                    <label
                      className="text-center text-[18px]"
                      htmlFor="password"
                    >
                      Password *
                    </label>
                    <TextField
                      className="w-[300px]"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Password"
                      id="password"
                    />
                  </div>
                  {!showRegister ? (
                    <Button
                      className=""
                      type="button"
                      variant="contained"
                      fullWidth
                      onClick={() => handleLogin()}
                    >
                      Kirish
                    </Button>
                  ) : (
                    <Button
                      className=""
                      type="button"
                      variant="contained"
                      fullWidth
                      onClick={() => handleRegister()}
                    >
                      Ro'yxatdan o'tish
                    </Button>
                  )}
                </div>
                <div>
                  <h5 className="">
                    {!showRegister ? (
                      <>
                        <p
                          className="font-bold text-blue-500 cursor-pointer"
                          onClick={() => setShowRegister(true)}
                        >
                          Ro'yxatdan o'tish
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className="font-bold text-blue-500 cursor-pointer"
                          onClick={() => setShowRegister(false)}
                        >
                          Kirish
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url('/src/assets/images/library.jpeg')] h-[100vh] w-[1500px] bg-cover bg-center bg-no-repeat flex items-center">
        <h1 className="text-white text-5xl ps-12 font-bold">
          Online Kutubxona!
        </h1>
      </div>
    </div>
  );
};

export default Auth;
