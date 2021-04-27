import Benchmark from "benchmark";
import current from "../lib/index.js";
import { report } from "./util.mjs";

const suite = new Benchmark.Suite();

function benchCases(implementation, name) {
  suite.add(name + " on 2 short ASCII words", () => {
    implementation("aforementioned");
    implementation("zap cannon");
  });

  suite.add(name + " on 1 long ASCII words", () => {
    implementation("Pneumonoultramicroscopicsilicovolcanoconiosis");
  });

  suite.add(name + " on 3 non-ASCII words", () => {
    implementation("مذكور أعلاه");
    implementation("cañón de zap");
    implementation("𠡦𠧋𡆠囝〇𠁈𢘑𤯔𠀑埊");
  });
}

benchCases(current.isIdentifierName2, "current#isIdentifierName2");

suite.on("cycle", report).run();
