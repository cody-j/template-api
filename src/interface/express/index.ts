import 'module-alias/register'
import { createApp } from './server';
import Database from '@/database/index';

async function main () {
  const db = new Database();
  await db.initialize();
  const app = createApp(db);
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
  
  const server = app.listen(3333, () => {
    console.log(`Server running on port ${3333}`);
  });
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server shutting down');
      process.exit(0);
    });
  });
  
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
