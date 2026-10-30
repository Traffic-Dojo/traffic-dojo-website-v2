import { leadNotifications } from '../../utils/lead-notifications';

// Vercel Cron calls GET and supplies Authorization: Bearer CRON_SECRET.
export default defineEventHandler((event) => leadNotifications(event, process.env.CRON_SECRET));
