require('dotenv').config({ path: '.env' });

const port = process.env.PORT || '8080';
const server_url = process.env.SERVER_URL || `localhost:${port}`;
const target = server_url.startsWith('http') ? server_url : `http://${server_url}`;

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
