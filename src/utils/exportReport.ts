import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { SimulationData } from "@/types/simulation";

interface ExportOptions {
  simData: SimulationData;
  nodeCount: number;
  edgeCount: number;
  filename: string;
}

async function captureElement(id: string): Promise<HTMLCanvasElement | null> {
  const el = document.getElementById(id);
  if (!el) return null;
  return html2canvas(el, {
    backgroundColor: "#0B0F19",
    scale: 2,
    useCORS: true,
    logging: false,
  });
}

export async function exportReport({ simData, nodeCount, edgeCount, filename }: ExportOptions) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 16;
  const contentW = pageW - margin * 2;

  // ── Colors ──
  const bgDark = "#0B0F19";
  const bgCard = "#111827";
  const cyan = "#38BDF8";
  const white = "#F1F5F9";
  const gray = "#94A3B8";
  const darkGray = "#475569";

  // ── Helper Functions ──
  function drawBackground() {
    pdf.setFillColor(bgDark);
    pdf.rect(0, 0, pageW, pageH, "F");
  }

  function drawText(text: string, x: number, y: number, size: number, color: string, style: "normal" | "bold" = "normal") {
    pdf.setFontSize(size);
    pdf.setTextColor(color);
    pdf.setFont("helvetica", style);
    pdf.text(text, x, y);
  }

  function drawLine(y: number) {
    pdf.setDrawColor("#1E293B");
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageW - margin, y);
  }

  function drawMetricCard(x: number, y: number, w: number, h: number, label: string, value: string) {
    pdf.setFillColor(bgCard);
    pdf.roundedRect(x, y, w, h, 3, 3, "F");
    drawText(value, x + w / 2, y + h / 2 - 1, 20, cyan, "bold");
    pdf.setFontSize(20);
    const valW = pdf.getTextWidth(value);
    drawText(value, x + (w - valW) / 2, y + h / 2 - 1, 20, cyan, "bold");
    drawText(label, x + w / 2, y + h / 2 + 8, 8, gray, "normal");
    // center label
    pdf.setFontSize(8);
    const lblW = pdf.getTextWidth(label);
    pdf.text(label, x + (w - lblW) / 2, y + h / 2 + 8);
  }

  // ════════════════════════════════════════
  // PAGE 1 — Cover + Summary
  // ════════════════════════════════════════
  drawBackground();

  // Accent bar at top
  pdf.setFillColor(cyan);
  pdf.rect(0, 0, pageW, 1.5, "F");

  // Title
  drawText("QAOA Simulation Report", margin, 32, 26, white, "bold");
  drawText("Ele-Q-tric  ·  Quantum Optimization for Energy Grid Resilience", margin, 42, 10, gray);

  // Metadata
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  drawText(`Generated: ${dateStr} at ${timeStr}`, margin, 52, 9, darkGray);
  drawText(`Graph: ${filename || "demo-graph.gml"}  ·  ${nodeCount} nodes  ·  ${edgeCount} edges`, margin, 59, 9, darkGray);

  drawLine(66);

  // ── Technical Metrics Grid ──
  drawText("Technical Metrics", margin, 78, 14, white, "bold");

  const cardW = (contentW - 9) / 4;
  const cardH = 32;
  const cardY = 84;

  drawMetricCard(margin, cardY, cardW, cardH, "1-Qubit Gates", String(simData.metrics.oneQubitGates));
  drawMetricCard(margin + cardW + 3, cardY, cardW, cardH, "2-Qubit Gates", String(simData.metrics.twoQubitGates));
  drawMetricCard(margin + (cardW + 3) * 2, cardY, cardW, cardH, "MEPS", simData.metrics.meps);
  drawMetricCard(margin + (cardW + 3) * 3, cardY, cardW, cardH, "Circuit Depth", String(simData.metrics.depth));

  // ── Simulation Results ──
  drawLine(124);
  drawText("Simulation Results", margin, 136, 14, white, "bold");

  const { measurements } = simData;
  const totalShots = measurements.entries.reduce((s, e) => s + e.count, 0);

  const rows = [
    ["Optimal Cut Value", String(measurements.optimal)],
    ["Optimization Iterations", String(measurements.iterations)],
    ["Total Shots", String(totalShots)],
    ["QAOA Layers (p)", "2"],
    ["Backend", "Rigetti QPU (Ankaa-3)"],
    ["Energy Savings", "~10% vs classical"],
    ["Carbon Avoided", "0.12 kg CO₂e per run"],
  ];

  let rowY = 144;
  for (const [label, value] of rows) {
    pdf.setFillColor(rowY % 2 === 0 ? bgCard : bgDark);
    pdf.rect(margin, rowY - 4, contentW, 9, "F");
    drawText(label, margin + 4, rowY + 2, 9, gray);
    drawText(value, pageW - margin - 4, rowY + 2, 9, white, "bold");
    pdf.setFontSize(9);
    const vw = pdf.getTextWidth(value);
    pdf.text(value, pageW - margin - 4 - vw, rowY + 2);
    rowY += 9;
  }

  // ── Top Bitstrings Table ──
  drawLine(rowY + 4);
  drawText("Measurement Results — Top Bitstrings", margin, rowY + 16, 14, white, "bold");

  // Table header
  let tY = rowY + 24;
  pdf.setFillColor("#1E293B");
  pdf.rect(margin, tY - 4, contentW, 8, "F");
  drawText("Rank", margin + 4, tY + 1, 8, cyan, "bold");
  drawText("Bitstring", margin + 24, tY + 1, 8, cyan, "bold");
  drawText("Count", margin + 80, tY + 1, 8, cyan, "bold");
  drawText("Percentage", margin + 110, tY + 1, 8, cyan, "bold");
  tY += 9;

  measurements.entries.forEach((entry, i) => {
    if (i % 2 === 0) {
      pdf.setFillColor(bgCard);
      pdf.rect(margin, tY - 4, contentW, 8, "F");
    }
    const pct = ((entry.count / totalShots) * 100).toFixed(1) + "%";
    drawText(`#${i + 1}`, margin + 4, tY + 1, 8, darkGray);
    drawText(entry.bitstring, margin + 24, tY + 1, 8, white);
    drawText(String(entry.count), margin + 80, tY + 1, 8, white);
    drawText(pct, margin + 110, tY + 1, 8, gray);
    tY += 8;
  });

  // ════════════════════════════════════════
  // PAGE 2 — Dashboard Charts
  // ════════════════════════════════════════
  pdf.addPage();
  drawBackground();
  pdf.setFillColor(cyan);
  pdf.rect(0, 0, pageW, 1.5, "F");

  drawText("Dashboard Visualizations", margin, 20, 14, white, "bold");
  drawText("Captured from the live quantum dashboard", margin, 28, 9, gray);

  let chartY = 36;

  // Capture each chart panel
  const panels = [
    { id: "chart-graph", label: "Graph Visualization" },
    { id: "chart-sustainability", label: "Sustainability Scorecard" },
    { id: "chart-distribution", label: "State Distribution" },
    { id: "chart-measurements", label: "Measurement Results" },
  ];

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const canvas = await captureElement(panel.id);

    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const ratio = canvas.height / canvas.width;
      const imgW = (contentW - 4) / 2;
      const imgH = imgW * ratio;

      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = margin + col * (imgW + 4);
      const y = chartY + row * (imgH + 14);

      // Check if we need a new page
      if (y + imgH + 10 > pageH) {
        pdf.addPage();
        drawBackground();
        pdf.setFillColor(cyan);
        pdf.rect(0, 0, pageW, 1.5, "F");
        chartY = 16;
      }

      drawText(panel.label, x, chartY + (row * (imgH + 14)) - 2, 9, cyan, "bold");
      pdf.addImage(imgData, "PNG", x, chartY + (row * (imgH + 14)) + 1, imgW, imgH);
    }
  }

  // ── AI Analysis Summary (last section on page 2 or new page) ──
  const aiY = chartY + 2 * (((contentW - 4) / 2) * 0.7 + 14) + 10;

  if (aiY + 30 < pageH) {
    drawLine(aiY);
    drawText("AI Analysis Summary", margin, aiY + 10, 12, white, "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(gray);
    const summary = `The QAOA circuit with p=2 layers converged in ${measurements.iterations} iterations on the Rigetti QPU. Optimal cut value: ${measurements.optimal} with MEPS ${simData.metrics.meps}. Circuit compiled to ${simData.metrics.oneQubitGates + simData.metrics.twoQubitGates} total gates (depth ${simData.metrics.depth}). Energy savings: ~10% vs classical.`;
    const lines = pdf.splitTextToSize(summary, contentW);
    pdf.text(lines, margin, aiY + 18);
  }

  // ── Footer on each page ──
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    drawText(`Ele-Q-tric  ·  Quantum Optimization Report`, margin, pageH - 8, 7, darkGray);
    drawText(`Page ${p} of ${totalPages}`, pageW - margin - 20, pageH - 8, 7, darkGray);
  }

  // ── Save ──
  pdf.save(`QAOA-Report-${now.toISOString().slice(0, 10)}.pdf`);
}
