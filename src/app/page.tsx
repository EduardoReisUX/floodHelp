import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex">
        <div>
          <p>
            Ajude as vítimas das enchentes e demais desastres naturais do Brasil
          </p>
        </div>
        <div></div>
      </main>

      <Footer />
    </>
  );
}
