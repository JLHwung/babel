import { declare } from "@babel/helper-plugin-utils";
import {
  NATIVES,
  declareSupport,
} from "@babel/helper-create-class-features-plugin";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "preset-env/internal/declare-public-class-properties-support",
    pre() {
      declareSupport(this.file, NATIVES.publicProperties);
    },
  };
});
