import { closeRequest, donate } from "@/services/Web3Service";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import Web3 from "web3";

interface Props {
  data: {
    id: string;
    title: string;
    contact: string;
    author: string;
    description: string;
    balance: string;
    goal: string;
  };
}

export function Request({ data }: Props) {
  async function btnCloseClick() {
    if (!confirm("Tem certeza que deseja fechar este pedido?")) return;

    const result = await closeRequest(data.id);

    if (result.error) {
      return result.message;
    }

    window.location.reload();
    // return result.value
  }

  async function btnHelpClick() {
    const donationInBnb = prompt("O quanto deseja doar (em BNB)?") || "0";

    const result = await donate(data.id, donationInBnb);

    if (result.error) {
      return result.message;
    }

    window.location.reload();
    // return result.value;
  }

  return (
    <>
      <div className="">
        <img src={generateAvatarURL(data.author)} alt="" />
        <div className="flex gap-2 w-full justify-between">
          <div>
            <h6>
              {data.title} &rsaquo;&rsaquo; Contato: {data.contact}{" "}
            </h6>
          </div>
          <div>
            {localStorage.getItem("wallet") === data.author.toLowerCase() ? (
              <button onClick={btnCloseClick}>Fechar pedido</button>
            ) : (
              <button onClick={btnHelpClick}>&#36; Ajudar</button>
            )}
          </div>
        </div>
        <p>{data.description}</p>
        <span>Meta:</span>{" "}
        {data.balance
          ? `BNB ${Web3.utils.fromWei(
              data.balance,
              "ether"
            )} obtidos de ${Web3.utils.fromWei(data.goal, "ether")}`
          : `BNB ${Web3.utils.fromWei(data.balance, "ether")}`}
      </div>
    </>
  );
}
