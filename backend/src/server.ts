import app from './app';
import { env } from './config/env';
import { testConnection } from './config/db';

async function start() {
  try {
    await testConnection();
    app.listen(env.port, () => {
      console.log(
        `🚀 InstaBizWeb API running on port ${env.port} [${env.nodeEnv}]`,
      );
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
