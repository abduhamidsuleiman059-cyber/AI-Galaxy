const { defineConfig } = require('vite');
const path = require('node:path');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        trending: path.resolve(__dirname, 'trending.html'),
        learn: path.resolve(__dirname, 'learn.html'),
        tools: path.resolve(__dirname, 'tools.html'),
        community: path.resolve(__dirname, 'community.html'),
        contact: path.resolve(__dirname, 'contact.html')
      }
    }
  }
});