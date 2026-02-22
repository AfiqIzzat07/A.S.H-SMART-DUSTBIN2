import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBD990zggrFpi5Z2DwAOLShTjJUDN8ydBo",
  databaseURL: "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const percentEl = document.getElementById("percent");
const statusEl = document.getElementById("status");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

let notified = false;

// Update UI from Firebase
onValue(ref(db, "dustbin/fullness"), snap => {
  percentEl.innerText = snap.val() + "%";
});

onValue(ref(db, "dustbin/status"), snap => {
  const val = snap.val();
  statusEl.innerText = val;

  // Trigger Netlify function for notification
  if(val === "FULL" && !notified){
    fetch("/.netlify/functions/notify-full");
    notified = true;
  }

  if(val === "NOT FULL") notified = false;
});

// Buttons
openBtn.addEventListener("click", () => set(ref(db, "dustbin/servo"), "OPEN"));
closeBtn.addEventListener("click", () => set(ref(db, "dustbin/servo"), "CLOSE"));