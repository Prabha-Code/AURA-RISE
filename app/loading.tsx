export default function Loading() {
  return (
    <main
      className="px-5 pb-16 pt-24 md:px-10"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-6 w-28 bg-brand-earth/10" />
        <div className="h-14 w-full max-w-3xl bg-brand-earth/10" />
        <div className="h-5 w-full max-w-2xl bg-brand-earth/10" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-56 bg-brand-earth/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
