// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0Yb4iZTSetk0fd29Z7YOrSGPEzxax0lA",
  authDomain: "test-test-2-98227.firebaseapp.com",
  databaseURL: "https://test-test-2-98227-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-test-2-98227",
  storageBucket: "test-test-2-98227.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "897250245173",
  appId: "1:897250245173:web:bdf64a25d0bf88f6460f7c",
  measurementId: "G-GYDQS31511"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Database
const database = getDatabase(app);

// Reference to the "qr_codes" node
const databaseRef = ref(database, "qr_codes");

// Reference to the table body
const tableBody = document.getElementById("logTableBody");

if (tableBody) {
    console.log("Found logTableBody in the DOM.");
} else {
    console.error("logTableBody not found in the DOM.");
}

// Fetch QR code data from Firebase
onValue(databaseRef, (snapshot) => {
    console.log("Listener triggered!");

    const data = snapshot.val();
    console.log("Data snapshot:", snapshot.val());

    // Clear the table
    tableBody.innerHTML = "";

    if (data) {
        let counter = 1;
        for (let key in data) {
            const qrData = data[key].qr_data;
            const timeLogged = new Date(data[key].time_logged).toLocaleString();

            // Add a new table row
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${counter++}</td>
                <td>${qrData}</td>
                <td>${timeLogged}</td>
            `;
            tableBody.appendChild(tr);
        }
    } else {
        console.log("No data found in Firebase.");
        tableBody.innerHTML = `<tr><td colspan="3">No QR code data found.</td></tr>`;
    }
}, (error) => {
    console.error("Error fetching data:", error);
});


    