import { Result } from "@/types/Result";
import { Web3 } from "web3";
import ABI from "./ABI.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CONTRACT_ADDRESS = "0xb9b1dDbCa05630883D5A458481ab1E3692c2059c";

function getContract() {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const from = localStorage.getItem("wallet");

  if (!from) return { error: true, message: "Carteira não encontrada!" };

  const web3 = new Web3(window.ethereum);

  // ABI - application binary interface, especifiação técnica do contrato
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function doLogin(): Promise<Result<string, string>> {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const web3 = new Web3(window.ethereum);

  // Endereço da carteira no navegador
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    return { error: true, message: "Carteira não permitida!" };

  localStorage.setItem("wallet", accounts[0].toLowerCase());
  return { error: false, value: accounts[0] };
}

export async function getOpenRequests(lastId = 0): Promise<Result<[], string>> {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const from = localStorage.getItem("wallet");

  if (!from) return { error: true, message: "Carteira não encontrada!" };

  const web3 = new Web3(window.ethereum);

  // ABI - application binary interface, especifiação técnica do contrato
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });

  // Acessa os métodos do contrato, por exemplo getOpenRequest()
  const requests: [] = await contract.methods
    .getOpenRequests(lastId + 1, 10)
    .call();

  return {
    error: false,
    value: requests.filter((request) => request.title !== ""),
  };
}

export async function openRequest({
  title,
  description,
  contact,
  goal,
}: {
  title: string;
  description: string;
  contact: string;
  goal: number;
}): Promise<Result<string, string>> {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const from = localStorage.getItem("wallet");

  if (!from) return { error: true, message: "Carteira não encontrada!" };

  const web3 = new Web3(window.ethereum);

  // ABI - application binary interface, especifiação técnica do contrato
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });

  const operation = await contract.methods
    .openRequest(title, description, contact, Web3.utils.toWei(goal, "ether"))
    .send();
  // call leitura, send escrita na blockchain

  // if (operation || !operation) {
  //   return { error: true, message: JSON.stringify(operation) };
  // }

  return {
    error: false,
    value:
      "Pedido enviado com sucesso. Em alguns minutos estará disponível na página inicial.",
  };
}

export async function closeRequest(
  id: string
): Promise<Result<string, string>> {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const from = localStorage.getItem("wallet");

  if (!from) return { error: true, message: "Carteira não encontrada!" };

  const web3 = new Web3(window.ethereum);

  // ABI - application binary interface, especifiação técnica do contrato
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });

  await contract.methods.closeRequest(id).send();

  return {
    error: false,
    value:
      "Pedido fechado com sucesso. O fechamento será computado dentre de alguns minutos.",
  };
}

export async function donate(
  id: string,
  donationInBnb: string
): Promise<Result<string, string>> {
  if (!window.ethereum)
    return { error: true, message: "MetaMask não está instalada!" };

  const from = localStorage.getItem("wallet");

  if (!from) return { error: true, message: "Carteira não encontrada!" };

  const web3 = new Web3(window.ethereum);

  // ABI - application binary interface, especifiação técnica do contrato
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });

  await contract.methods
    .closeRequest(id)
    .send({ value: Web3.utils.toWei(donationInBnb, "ether") });

  return {
    error: false,
    value:
      "Doação feita com sucesso. A doação será computada dentre de alguns minutos.",
  };
}
