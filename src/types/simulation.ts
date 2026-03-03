export interface MetricsData {
  oneQubitGates: number;
  twoQubitGates: number;
  meps: string;
  depth: number;
}

export interface MeasurementEntry {
  bitstring: string;
  count: number;
}

export interface MeasurementData {
  entries: MeasurementEntry[];
  optimal: number;
  iterations: number;
}

export interface StateEntry {
  name: string;
  value: number;
  color: string;
}

export type SimulationStatus = "idle" | "loading" | "completed";

export interface SimulationData {
  metrics: MetricsData;
  measurements: MeasurementData;
  stateDistribution: StateEntry[];
}

export const INITIAL_SIMULATION: SimulationData = {
  metrics: {
    oneQubitGates: 22,
    twoQubitGates: 29,
    meps: "0.774",
    depth: 26,
  },
  measurements: {
    entries: [
      { bitstring: "11001011", count: 435 },
      { bitstring: "00111100", count: 380 },
      { bitstring: "10110000", count: 340 },
      { bitstring: "10001101", count: 310 },
      { bitstring: "01011010", count: 275 },
      { bitstring: "01101110", count: 260 },
      { bitstring: "11000000", count: 240 },
      { bitstring: "10011110", count: 210 },
      { bitstring: "01011100", count: 185 },
      { bitstring: "01101000", count: 160 },
    ],
    optimal: -12.7,
    iterations: 210,
  },
  stateDistribution: [
    { name: "State 01101110", value: 435, color: "#38BDF8" },
    { name: "State 11001011", value: 380, color: "#22D3EE" },
    { name: "State 10001010", value: 340, color: "#06B6D4" },
    { name: "State 10001101", value: 310, color: "#0891B2" },
    { name: "State 01011010", value: 275, color: "#0E7490" },
    { name: "State 11010010", value: 240, color: "#155E75" },
    { name: "State 01001100", value: 210, color: "#164E63" },
    { name: "State Others", value: 510, color: "#1E3A5F" },
  ],
};

export const COMPLETED_SIMULATION: SimulationData = {
  metrics: {
    oneQubitGates: 46,
    twoQubitGates: 25,
    meps: "0.731",
    depth: 38,
  },
  measurements: {
    entries: [
      { bitstring: "..0000111", count: 520 },
      { bitstring: "000100001", count: 430 },
      { bitstring: "001010001", count: 380 },
      { bitstring: "11111000", count: 310 },
      { bitstring: "10101010", count: 260 },
      { bitstring: "01011010", count: 220 },
      { bitstring: "01111000", count: 185 },
      { bitstring: "10001001", count: 155 },
      { bitstring: "00110110", count: 130 },
      { bitstring: "01010010", count: 100 },
    ],
    optimal: -10.57,
    iterations: 73,
  },
  stateDistribution: [
    { name: "State 0000111", value: 520, color: "#38BDF8" },
    { name: "State 000100001", value: 430, color: "#22D3EE" },
    { name: "State 001010001", value: 380, color: "#06B6D4" },
    { name: "State 11111000", value: 310, color: "#0891B2" },
    { name: "State 10101010", value: 260, color: "#0E7490" },
    { name: "State 01011010", value: 220, color: "#155E75" },
    { name: "State Others", value: 570, color: "#164E63" },
  ],
};
