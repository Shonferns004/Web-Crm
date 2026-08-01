import { createApp } from './app';
import { config } from './config';
import { prisma } from './libs/prisma';

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect();
    const app = createApp();
    app.listen(config.port, () => {
      console.log(`🚀 WebCrm server running at ${config.appUrl} (${config.env})`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

void bootstrap();
