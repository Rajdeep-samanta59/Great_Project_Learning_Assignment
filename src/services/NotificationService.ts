import PushNotification from 'react-native-push-notification';

export const setupNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

export const sendNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    title,
    message,
    playSound: true,
    soundName: 'default',
  });
};

export const scheduleNotification = (title: string, message: string, date: Date) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    date,
    playSound: true,
    soundName: 'default',
  });
};