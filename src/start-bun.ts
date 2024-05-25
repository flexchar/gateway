import app from './index';

// Explicitly start the server
const PORT = process.env.PORT || 8787;
const HOSTNAME = process.env.HOSTNAME;

const server = Bun.serve({
  port: PORT,
  hostname: HOSTNAME,
  fetch: app.fetch,
});
// console.log(server);

console.log(`Your AI Gateway is now running on ${server.url.toString()} 🚀`);

// Listen for SIGINT and SIGTERM
process.on('SIGINT', () => {
  server.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.stop();
  process.exit(0);
});
