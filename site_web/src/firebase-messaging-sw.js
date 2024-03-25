importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyBieV4tJY8gsIpQz4iMnxpywLzilQZYTFE",
	authDomain: "geo-notifaction.firebaseapp.com",
	databaseURL: "https://geo-notifaction-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "geo-notifaction",
	storageBucket: "geo-notifaction.appspot.com",
	messagingSenderId: "629788510536",
	appId: "1:629788510536:web:d92151c88c9fe89b384b7d",
	measurementId: "G-S19EEXF80M"
  });
const messaging = firebase.messaging();