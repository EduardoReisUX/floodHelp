import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Create() {
  return (
    <>
      <Header />

      <main className="my-12 max-w-screen-md mx-auto flex flex-col gap-4">
        <h3 className="font-medium text-slate-900 text-2xl tracking-tight">
          Preencha todos os campos abaixo para nos dizer o que precisa.
        </h3>
        <form action="">
          <section className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="title">Resumo do que precisa</label>
              <input type="text" id="title" maxLength={150} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="description">
                Escreva em detalhes o que precisa e onde você está (para
                entregas presenciais)
              </label>
              <textarea id="description" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="contact">Contato (telefone ou e-mail)</label>
              <input type="text" id="contact" maxLength={150} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="goal">
                Meta em BNB (deixe em branco caso não deseje receber doação em
                criptomoeda)
              </label>
              <input type="text" id="goal" />
            </div>
            <div className="flex gap-4 font-medium">
              <a
                href="/"
                className="border border-slate-950 text-slate-950 rounded-md py-2 px-4"
              >
                Voltar
              </a>
              <button className="w-full border border-slate-950 bg-slate-950 text-slate-100 rounded-md  py-2 px-4">
                Enviar Pedido
              </button>
            </div>
          </section>
        </form>
      </main>

      <Footer />
    </>
  );
}
