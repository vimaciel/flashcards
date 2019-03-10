import { Notifications, Permissions } from 'expo'
import { getNotificationConfig, setNotificationConfig, removeNotificationConfig } from './storage'

export function setLocalNotification() {
  getNotificationConfig().then(data => {
    if (data === null) {
      createNewNotification()
    }
  });
}

export function clearLocalNotification() {
  return removeNotificationConfig().then(Notifications.cancelAllScheduledNotificationsAsync)
}

const notificationObject = {
  title: 'Hey you from flashcards',
  body: "😜 don't forget to test yourself on flashcards' app",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}

const createNewNotification = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

  if (status === 'granted') {
    Notifications.cancelAllScheduledNotificationsAsync()

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(20)
    tomorrow.setMinutes(0)

    Notifications.scheduleLocalNotificationAsync(
      notificationObject,
      {
        time: tomorrow,
        repeat: 'day',
      }
    )

    setNotificationConfig()
  }
}