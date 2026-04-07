"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { SeasonInfo } from "../utils/Season";
import { Config } from "../config/config";
import axios from "axios";
import { useProfileStore } from "../packages/zustand/profile";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const { image } = SeasonInfo(Config.CURRENT_SEASON);
  const profile = useProfileStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

  async function checkAllowlist() {
    try {
      const res = await axios.get(
        `http://127.0.0.1:3900/actinium/v1/api/allowlist`,
        {
          params: { key: Config.AUTH_KEY },
        }
      );

      return res.data.allowed;
    } catch (err) {
      console.error("Allowlist check failed:", err);
      return false;
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const allowed = await checkAllowlist();
    if (!allowed) {
      alert("Launcher key is invalid. Contact @netcable.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${Config.BACKEND_URL}:${Config.BACKEND_PORT}/account/api/oauth/token`,
        {
          grant_type: "password",
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
              `${Config.CLIENT_ID}:${Config.CLIENT_SECRET}`
            )}`,
          },
        }
      );

      profile.login({
        accountId: res.data.account_id,
        displayName: res.data.displayName,
        email: email,
        password: password,
      });

      setShowWelcome(true);

      setTimeout(() => {
        router.replace("/");
      }, 2500);
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(
        err.response?.data?.error_description ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        src={image}
        alt="Background"
      />

      <div className="relative z-10 h-full w-[450px] px-20 py-12 flex flex-col items-center justify-center gap-4 bg-stone-900/95 backdrop-blur-sm shadow-2xl shadow-black/50">
        <h2 className="text-5xl mb-6 text-white font-bold tracking-tight">
          Sign in
        </h2>

        <div className="w-full">
          <h2 className="text-lg mb-2 text-white font-semibold">Email</h2>
          <input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg w-full p-3 px-4 bg-stone-950/80 text-white placeholder:text-gray-500 border-2 border-stone-800 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-stone-700"
          />
        </div>

        <div className="w-full">
          <h2 className="text-lg mb-2 text-white font-semibold">Password</h2>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg w-full p-3 px-4 bg-stone-950/80 text-white placeholder:text-gray-500 border-2 border-stone-800 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-stone-700"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-bold rounded-lg p-3 px-4 flex gap-2 items-center justify-center transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn className="w-5 h-5" /> {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-gray-400 text-sm">
          Need support? Join the{" "}
          <a
            href={Config.DISCORD_LINK}
            className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors duration-200 cursor-pointer"
          >
            Discord Server
          </a>
        </p>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-[450px] top-0 h-full w-[300px] bg-gradient-to-r from-stone-900 via-stone-900/20 to-transparent" />
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-stone-900/90 px-12 py-10 rounded-2xl shadow-2xl border border-stone-700 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to {Config.NAME},
              </h1>
              <p className="text-xl text-blue-400 font-semibold">
                {profile.displayName}!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
