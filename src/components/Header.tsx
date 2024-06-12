"use client";

import { doLogin } from "@/services/Web3Service";
import { useEffect, useState } from "react";

export function Header() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setWallet(localStorage.getItem("wallet") || "");
  }, []);

  async function handleLogin() {
    const result = await doLogin();

    if (result.error) {
      return alert(result.message);
    }

    setWallet(result.value);
  }

  return (
    <header className="min-w-full bg-slate-950 py-4">
      <div className="max-w-screen-md m-auto">
        <div className="flex justify-between items-end">
          <a href="/">
            <h1 className="font-bold text-3xl text-slate-100">FloodHelp</h1>
          </a>
          <div className="flex gap-4">
            {wallet ? (
              <a
                href="/create"
                className="px-4 py-2 bg-yellow-400 border border-yellow-400 text-slate-950 rounded-lg"
              >
                Pedir ajuda
              </a>
            ) : (
              <button
                className="flex gap-2 border border-slate-100 text-slate-100 px-4 py-2 rounded-lg"
                onClick={handleLogin}
              >
                <img
                  src="/logos_metamask-icon.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
