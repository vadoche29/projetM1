const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "notif-65177",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCuWsFrPwANWMEG\nljJ9i55vWKryQjUvtsLUty9fCffn55cfWXyvw7M3eRMtrrjyKH+iCwkV1uHQ5/+F\nyjsektd9gMnh9l0RuwEo/5U52iMvsxotR4nVVtbknXOjuWvwOZpWJJbsPVlSpGMP\n1+MXn4l6WNgW2MgUMzUZsxDZBYgvRJqb3Q5TQ0wzp8ZcC14VqrNKtTQ8yawhUDIY\nfeDufnEogWbjUgth7lSQKeWQsAl/NmTq3e1GmGNy9YaNBCOxS5T3kHYVlUSuombX\ng7EH0bG57RdtJt8+zawUGvpWmvibFobk+COWRrZMvtQNy8YAz//cO6mfZqn2kRTh\nsWuQaZkpAgMBAAECgf9j8iJuF+8vt3DvFapbzW1E5s8XkFxsvZdx2JCPKmexyFAY\n6HNRTh2t7vnPdhkOt6hye2D54/QOjO8tAoBhRkvA5dLUdSVkxI4lsl0YjLMe5Mxc\nqGWape0JoDhp4iC91EdkmhTp10Ec3p7qtha3s/xa5hL5BcuryK7nzH4b6c/nR7gi\ntl4cNJy3sk+bBmleG2tAT9QPd8jY98k4OxFNonn1GKc+rwHrsy7kxIpHs6uOl1zE\ngNc6vxqpaxTFVjhnQcnmdOX+4XGrd5fmnb+sqv7qtDUBEhNeq5AjPScCb3GTeFli\nyvRqFVEZ9/gjCtMzA1TuwhrUgVMDrGo1pxOj+g0CgYEA8C9TSNKp5BiAhVg2fe6o\niIigd8WO/Vn81vTEAagnwQcW1wwu4vTLg40VnBGspAyhr0gdfgQo565hNQn3FvrF\nHl31yEA2BJhg3QONTJ8NLnVrlBlxcNckRHzv5UDlW52/zQWOd9Yv7T/zuj8aXXq2\nwz1fzipDEoHGvxfEIpMKyq0CgYEAudXC5aX6Rcl/TLMABWjUT6OWH6/X9HFoDn35\nC0NefIIbbolbaalk7MKepr3T8kwuzI9cYAaJEYP+vjYAau5jPTHRG9FldhPLU/rY\n6VqFakLZZG+SZxhLwcP/ZqQqkvBn3XMCJz7usgy7Rvq4c+CoOojlYu9+6BqErhaQ\nw+Yps+0CgYEAqUBQKhL5URjLCCwfSiKxdHUCzyPSHUoaV8dnj9tVGDrMp4GYUKo7\n91mmDrKNu5SDIydoUPLReGFzcpKxIepYmYuQtSo6ZoaSS2xDV+kEuuZXhqdfPyr8\nDZ8U1bIjban+DJWLzXqLj13vfCEXjSP6Qh6vsnIpjZMR4Hr45XxEsIkCgYAElRDJ\nON6C+gT5jzBg8cTKce4xudRJYsJ+GP0bGf4qc8rZXumyIUsry2C+G9AuGVLOGHre\no0qd8/NEHXDFMjugNqpBVVh7IOHSoEzY9DJ1/E//+gBSKnczv/F8RnAGT4dAHqXe\n8d5Q5Z94kJYbxV5gkx+U4PLwJjc/U68eJX7BwQKBgDrQ3+nFpogEvqjGKZ57QpBo\nzF6u3ZvB5ggVs3he4qWbUCcCe2HPSO1Ht9oCXinAgQpE7UHlO8BrxlHnFrtEwJyQ\npzHxF6EoMApF7f1udIjNS6uCgGcBxE5kT6RakVyAStp9RxidRe5H9C/traQIUeTk\nzqYWjlbbTY4JY24/oe+x\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-qcecc@notif-65177.iam.gserviceaccount.com",
  }),
});

const db = admin.firestore();

const topic = 'brest';

const message = {
  data: {
    score: '850',
    time: '2:45',
  },
  topic: topic,
};

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

admin.messaging().onMessage((payload) => {
  console.log('Received message:', payload);
});