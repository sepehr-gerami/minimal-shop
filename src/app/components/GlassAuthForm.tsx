"use client";

import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/AuthStore";

type Mode = "login" | "register";

export default function GlassAuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const username = useAuthStore((state) => state.username);
  const saveInfo = useAuthStore((state) => state.saveInfo);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null); 

   useEffect(()=>{
    emailRef.current?.focus()
   },[]) 
   
   

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setError(null);
    setMode(next);
  };

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      if (
        mode === "register" &&
        password !== repeatPassword
      ) {
        setError("Passwords do not match");
        return;
      }

      saveInfo(
        1,
        email,
        "test-token-123"
      );

      localStorage.setItem(
        "token",
        "test-token-123"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          username: email,
        })
      );

      console.log("zustand:", useAuthStore.getState());
    } catch {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6 bg-[#1a0f08]"
      style={{ fontFamily: "Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="pointer-events-none absolute -top-32 -left-24 h-105 w-105 rounded-full opacity-55 blur-[70px] bg-[radial-gradient(circle,#ff8a3d,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-95 w-95 rounded-full opacity-55 blur-[70px] bg-[radial-gradient(circle,#ffb74d,transparent_70%)]" />
      <div className="pointer-events-none absolute top-[40%] right-[15%] h-70 w-70 rounded-full opacity-35 blur-[70px] bg-[radial-gradient(circle,#ff5e3a,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-105 rounded-3xl border border-white/[0.14] bg-white/[0.07] p-9 px-7 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[22px] backdrop-saturate-[1.4]">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex p-2 text-sm text-orange-300  items-center justify-center rounded-lg bg-linear-to-br from-[#ff9a4d] to-[#ff6a3d] font-extrabold">
            Minimal Sop
          </div>

        </div>

        <div className="relative mb-7 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/6 p-1">
          <button
            type="button"
            className={`relative z-10 rounded-xl cursor-pointer py-2.5 text-sm font-semibold transition-colors duration-300 ${mode === "login" ? "text-[#1a0f08]" : "text-white/55"
              }`}
            onClick={() => switchMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`relative z-10 rounded-xl cursor-pointer py-2.5 text-sm font-semibold transition-colors duration-300 ${mode === "register" ? "text-[#1a0f08]" : "text-white/55"
              }`}
            onClick={() => switchMode("register")}
          >
            Sign up
          </button>
          <motion.div
            className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-[10px] bg-linear-to-br from-[#ffac5c] to-[#ff7a3d]"
            animate={{ x: mode === "login" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-white/60">name</label>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="sepehr"
                      required
                      className="w-full rounded-xl border-[1.5px] border-white/[0.14] bg-white/6 px-4 py-3 text-[14.5px] text-white outline-none transition-colors duration-150 placeholder:text-white/30 focus:border-[#FE8A00] focus:bg-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-medium text-white/60">last name</label>
                    <input
                      type="text"
                      placeholder="gerami"
                      required
                      className="w-full rounded-xl border-[1.5px] border-white/[0.14] bg-white/6 px-4 py-3 text-[14.5px] text-white outline-none transition-colors duration-150 placeholder:text-white/30 focus:border-[#FE8A00] focus:bg-white/10"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-medium text-white/60">Email or mobile number</label>
                <div className="relative flex items-center">

                  <input
                    ref={emailRef}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border-[1.5px] border-white/[0.14] bg-white/6 py-3 pr-9 pl-4 text-[14.5px] text-white outline-none transition-colors duration-150 placeholder:text-white/30 focus:border-[#FE8A00] focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-medium text-white/60">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-xl border-[1.5px] border-white/[0.14] bg-white/6 py-3 pr-12 pl-4 text-[14.5px] text-white outline-none transition-colors duration-150 placeholder:text-white/30 focus:border-[#FE8A00] focus:bg-white/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-white/60 hover:text-white"
                  >
                    {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-medium text-white/60">Repeat password</label>
                  <div className="relative flex items-center">
                    <i className="ti ti-lock absolute right-3.5 h-4 w-4 text-base text-white/50" aria-hidden="true" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-xl border-[1.5px] border-white/[0.14] bg-white/6 py-3 pr-9 pl-4 text-[14.5px] text-white outline-none transition-colors duration-150 placeholder:text-white/30 focus:border-[#FE8A00] focus:bg-white/10"
                    />
                        <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-white/60 hover:text-white"
                  >
                  </button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="-mt-1 flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-[12.5px] text-white/60">
                    <input type="checkbox" className="h-3.5 w-3.5 cursor-pointer bg-[#FE8A00]" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-[12.5px] cursor-pointer font-semibold text-[#FE8A00]">
                    Forgot your password?
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-400/15 px-3.5 py-2.5 text-center text-[13px] text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 flex min-h-12.5 items-center cursor-pointer justify-center rounded-xl bg-[#FE8A00] py-3.5 text-[15px] font-bold text-[#1a0f08] transition-all duration-150 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="h-4.5 w-4.5 animate-spin rounded-full border-[2.5px] border-[#1a0f08]/30 border-t-[#1a0f08]" />
                ) : mode === "login" ? (
                  "Login"
                ) : (
                  "Create an account"
                )}
              </button>

              <p className="mt-1 text-center text-[13px] text-white/55">
                {mode === "login" ? (
                  <>
                    Dont have an account?{" "}
                    <button
                      type="button"
                      className="text-[13px] cursor-pointer font-semibold text-[#ffac5c]"
                      onClick={() => switchMode("register")}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Have you already registered?{" "}
                    <button
                      type="button"
                      className="text-[13px] font-semibold text-[#ffac5c]"
                      onClick={() => switchMode("login")}
                    >
                      Login
                    </button>
                    <div className="text-center text-white text-sm">
                      User: {username}
                    </div>
                  </>
                )}
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}