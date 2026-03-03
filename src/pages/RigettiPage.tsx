export function RigettiPage() {
  return (
    <>
      {/* Salient Features Section */}
      <section className="bg-bg-base pt-28 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[600px] px-6">
          <h1 className="mb-12 text-center text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[44px]">
            Salient Features
          </h1>

          <ul className="space-y-6 text-[16px] leading-relaxed text-text-primary sm:text-[18px]">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-text-primary" />
              <span>Light Cone Decomposition for Graph Partitioning</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-text-primary" />
              <span>Preconditioning QAOA for solving 10x faster</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-text-primary" />
              <span>Warm-Started QAOA for Problem B using Simulated Annealing ansatz</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-text-primary" />
              <span>Calculated efficiency metric and sustainability factor</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-text-primary" />
              <span>Using "QAOA parameter transferability" we can at least for large graphs train only the most frequent subgraph and use it's params for all other.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Partitioned Graph Section */}
      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="mb-10 text-[22px] font-bold leading-[1.3] text-text-primary sm:text-[26px]">
            Partitioned the graph into subgraphs
          </h2>
          <img
            src="a.png"
            alt="Representative Light-Cone Subgraph"
            className="mx-auto block w-full max-w-[500px] h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Resource Estimation Section */}
      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="mb-10 text-[22px] font-bold leading-[1.3] text-text-primary sm:text-[26px]">
            Resource estimation
          </h2>
          <img
            src="b.png"
            alt="Max-Cut: Exact (NP-Hard) vs. Approximation (n=100)"
            className="mx-auto block w-full max-w-[550px] h-auto rounded-lg"
          />
        </div>
      </section>
    </>
  );
}
