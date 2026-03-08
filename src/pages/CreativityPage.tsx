export function CreativityPage() {
  return (
    <>
      <section className="bg-bg-base pt-28 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="mb-3 text-[12px] font-semibold tracking-wide text-accent-primary">
            Use of Rigetti Features
          </div>
          <h2 className="mb-10 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[28px]">
            Rigetti Resources Used
          </h2>

          <div className="mb-10 space-y-3 text-[16px] leading-relaxed text-text-primary sm:text-[18px]">
            <p>1. PyQuil</p>
            <p>2. Quil (quilc --S P)</p>
            <p>3. QCM (qvm -S)</p>
            <p>3. QCS</p>
            <p>4. Forest SDK</p>
            <p>5. Ankaa-3 (The 84 bit Quantum computer)</p>
            <p>6. Rigetti's Research and Documentation.</p>
          </div>

          <p className="text-[16px] text-text-primary sm:text-[18px]">
            Impressed by everything! 🤩
          </p>
        </div>
      </section>

      <section className="bg-bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[800px] space-y-10 px-6">
          <img
            src="/rigetti/9.jpeg"
            alt="Connecting to Ankaa-3 — Mode: REAL QPU, 84 Qubits available"
            className="mx-auto block w-full max-w-[600px] h-auto rounded-lg"
          />
          <img
            src="/rigetti/6.jpeg"
            alt="PyQuil import — get_qc Ankaa-3 connection"
            className="mx-auto block w-full max-w-[600px] h-auto rounded-lg"
          />
          <img
            src="/rigetti/7.jpeg"
            alt="Jupyter notebook — Forest environment setup"
            className="mx-auto block w-full max-w-[600px] h-auto rounded-lg"
          />
          <img
            src="/rigetti/8.jpeg"
            alt="Jupyter notebook — Forest environment setup"
            className="mx-auto block w-full max-w-[600px] h-auto rounded-lg"
          />
        </div>
      </section>
    </>
  );
}
