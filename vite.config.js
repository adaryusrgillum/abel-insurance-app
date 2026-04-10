import { defineConfig } from 'vite';

const githubPagesRepo = 'abel-insurance-app';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${githubPagesRepo}/` : '/',
});
