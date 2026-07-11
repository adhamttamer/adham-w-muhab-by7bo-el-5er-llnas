import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <main className="max-w-md text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Cosy Cart Commerce
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The storefront is ready for its first product experience.
        </p>
      </main>
    </div>
  );
}
