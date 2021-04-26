import Benchmark from "benchmark";
import baseline from "@babel/core-baseline/lib/transformation/block-hoist-plugin.js";
import current from "../lib/transformation/block-hoist-plugin.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();
let LOADED_PLUGIN;
function benchCases(implementation, name) {
  suite.add(name + " load block-hoist plugin", () => {
    LOADED_PLUGIN = implementation.default();
  });
}

benchCases(current, "current");
benchCases(baseline, "baseline");

suite.on("cycle", report).run({ async: false });
