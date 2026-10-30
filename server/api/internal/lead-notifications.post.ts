import { leadNotifications } from '../../utils/lead-notifications';

// Manual operator calls keep an independent secret from the scheduled caller.
export default defineEventHandler((event) => leadNotifications(event, process.env.LEAD_RETRY_SECRET));
