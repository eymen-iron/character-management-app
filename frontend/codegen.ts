import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "src/graphql/generated/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
      ],
      config: {
        enumsAsTypes: false,
        scalars: {
          ID: "number",
        },
      },
    },
  },
};

export default config;
