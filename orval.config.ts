import { defineConfig } from 'orval';

export default defineConfig({
    useService: {
        input: "./src/api/backend-api.yaml",
        output: {
            mode: 'split',
            target: "./src/api/backend/backend-types.generated.ts",
            mock: true
        },
    },
});
