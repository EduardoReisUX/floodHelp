"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Request } from "@/components/Request";
import { getOpenRequests } from "@/services/Web3Service";
import { useEffect, useState } from "react";

interface IRequest {
  id: string;
  title: string;
  contact: string;
  author: string;
  description: string;
  balance: string;
  goal: string;
}

export default function Home() {
  const [requests, setRequests] = useState<IRequest[]>([]);

  useEffect(() => {
    loadRequests(0);
  }, []);

  async function loadRequests(lastId: number) {
    const result = await getOpenRequests(lastId);

    if (result.error) return result.message;

    const { value } = result;
    console.log(value);

    if (lastId === 0) {
      setRequests(result.value);
      return;
    }

    requests.push(...value);
    setRequests(requests);
  }

  return (
    <>
      <Header />

      <main className="my-12 max-w-screen-md mx-auto flex flex-col gap-4">
        <div>
          <p>
            Ajude as vítimas das enchentes e demais desastres naturais do Brasil
          </p>
        </div>
        <div>
          <div>
            {requests && requests.length
              ? requests.map((rq) => <Request key={rq.id} data={rq} />)
              : "Conecte sua carteira MetaMask no botão 'Entrar' para ajudar ou pedir ajuda."}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
