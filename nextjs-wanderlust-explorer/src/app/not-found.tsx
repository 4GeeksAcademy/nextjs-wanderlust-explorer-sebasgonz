import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="experiences-page empty-state not-found-page">
        <p className="eyebrow eyebrow-dark">PÁGINA NO DISPONIBLE</p>
        <h1>No encontramos este destino.</h1>
        <p>Puede que el enlace haya cambiado o que la experiencia ya no exista.</p>
        <Link className="button button-primary" href="/experiences">Explorar experiencias <span aria-hidden="true">→</span></Link>
      </main>
    </>
  );
}