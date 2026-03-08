export function AccuracyPage() {
  return (
    <>
      <section className="bg-bg-base pt-28 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2 className="mb-10 text-[20px] font-bold leading-[1.4] text-text-secondary sm:text-[24px]">
            Preconditioning <span className="text-accent-primary">QAOA results via forest SDK QVM results</span> in the benchmarking and the novelty section
          </h2>
          <img
            src="/charts/qaoa-preconditioned.jpeg"
            alt="QAOA Preconditioned — Cut Contribution per Edge"
            className="mx-auto block w-full max-w-[700px] h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2 className="mb-10 text-[20px] font-bold leading-[1.4] text-text-secondary sm:text-[24px]">
            <span className="text-accent-primary">Probabilistic results</span> simulated annealing in benchmarking section
          </h2>
          <img
            src="/charts/simulated-annealing.jpeg"
            alt="Simulated Annealing — Cut Contribution per Edge"
            className="mx-auto block w-full max-w-[700px] h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2 className="mb-10 text-[20px] font-bold leading-[1.4] text-text-secondary sm:text-[24px]">
            <span className="text-accent-primary">Classical GS results</span> in the benchmarking section
          </h2>
          <img
            src="/charts/gw-sdp.jpeg"
            alt="GW SDP — Cut Contribution per Edge"
            className="mx-auto block w-full max-w-[700px] h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2 className="mb-10 text-[20px] font-bold leading-[1.4] text-text-primary sm:text-[24px]">
            Comparison of all Results
          </h2>
          <img
            src="/charts/comparison-all.jpeg"
            alt="Final Results — All Methods Problem B: South Carolina Grid"
            className="mx-auto block w-full max-w-[700px] h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <h2 className="mb-10 text-[20px] font-bold leading-[1.4] text-text-primary sm:text-[24px]">
            Hardware execution section
          </h2>
          <img
            src="/charts/hardware-execution.jpeg"
            alt="Figure F — Ankaa-3 vs QVM Correlation Comparison"
            className="mx-auto block w-full max-w-[700px] h-auto rounded-lg"
          />
        </div>
      </section>
    </>
  );
}
