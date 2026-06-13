/**
 * Helper utilities for managing and sending browser Web Notifications.
 */

/**
 * Gets the current user preference for notifications from localStorage.
 * Defaults to true if not explicitly set.
 */
export const getNotificationsPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('keleo-notifications-enabled') !== 'false';
};

/**
 * Saves the user preference for notifications in localStorage.
 */
export const setNotificationsPreference = (enabled: boolean): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('keleo-notifications-enabled', String(enabled));
  }
};

/**
 * Sends a native browser Web Notification if supported, enabled by the user,
 * and if browser permission has been granted.
 */
export const sendWebNotification = (title: string, options?: NotificationOptions) => {
  if (typeof window === 'undefined') return;

  // 1. Check if the browser supports notifications
  if (!('Notification' in window)) {
    return;
  }

  // 2. Check if notifications are enabled in local preferences
  if (!getNotificationsPreference()) {
    return;
  }

  // 3. Check if browser permission has been granted
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        icon: '/vite.svg', // Default icon from the public folder
        ...options,
      });
    } catch (error) {
      console.error('Error triggering Web Notification:', error);
    }
  }
};
