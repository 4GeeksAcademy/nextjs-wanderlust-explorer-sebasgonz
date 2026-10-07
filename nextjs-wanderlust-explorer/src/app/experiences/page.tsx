import { Suspense } from "react";
import { ExperienceExplorer } from "@/components/experience-explorer";
import { Navbar } from "@/components/navbar";

function ExplorerFallback() {
  return (
    <main className="experiences-page explorer-loading" aria-live="polite">
      <p className="eyebrow eyebrow-dark">PREPARANDO TU EXPLORACIÓN</p>
      <h1>Experiencias que se quedan contigo.</h1>
      <p>Cargando experiencias...</p>
    </main>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<ExplorerFallback />}>
        <ExperienceExplorer />
      </Suspense>
    </>
  );
}