import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'FlashCards:Notifications'

function createNotification () {
  return {
    title: 'Study!',
    body: '⚡ don\'t forget to study at least once a day for luck! ⚡',
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
}

export async function clearLocalNotification () {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  return Notifications.cancelAllScheduledNotificationsAsync()
}

function calcDate(when) {
  let date = new Date()

  if (when === 'tomorrow') {
    date.setDate(date.getDate() + 1)
    date.setHours(20)
    date.setMinutes(0)
  } else if (when === 'now') {
    // Not really ten seconds,¯\_(ツ)_/¯
    date.setTime(date.getTime() + 10000)
  } else if (when === 'today') {
    date.setHours(20)
    date.setMinutes(0)
  }

  return date
}

export function setLocalNotification (day='today') {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              const notiDate = calcDate(day)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: notiDate,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
