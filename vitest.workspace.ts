import {defineWorkspace} from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      name: "integration",
      include: ["tests/integration/**/*.test.{ts,js}"],
    },
  },
  {
    extends: "vitest.config.ts",
    test: {
      name: "unit",
      include: ["tests/unit/**/*.test.{ts,js}"],
    },
  },
]);
