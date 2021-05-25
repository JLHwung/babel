import Benchmark from "benchmark";
import baseline from "@babel-baseline/types";
import current from "../../lib/index.js";
import { report } from "../util.mjs";

const suite = new Benchmark.Suite();
function benchCases(name, implementation, options) {
  suite.add(`${name} stringLiteral builder`, () => {
    implementation("foo", options);
  });
}
benchCases("baseline", input => baseline.stringLiteral(input));
benchCases("current", input => current.stringLiteral(input));

suite.on("cycle", report).run();
