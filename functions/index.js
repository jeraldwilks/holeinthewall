/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp();
const db = getFirestore(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.checkAdmin = onRequest(
  { region: "northamerica-northeast1", cors: true },
  async (req, res) => {
    const adminsRef = db.collection("admins");
    const snapshot = await adminsRef
      .where("email", "==", req.query.email)
      .where("isActive", "==", true)
      .get();
    if (snapshot.empty) {
      res.send(false);
    }
    res.send(true);
  }
);

exports.getCountries = onRequest(
  { region: "northamerica-northeast1", cors: true },
  async (req, res) => {
    const countriesRef = db.collection("countries").orderBy("name");
    const snapshot = await countriesRef.get();
    let countriesData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      DOC_ID: doc.id,
    }));
    res.send(countriesData);
  }
);

exports.getCities = onRequest(
  { region: "northamerica-northeast1", cors: true },
  async (req, res) => {
    const docRef = db.doc("countries/" + req.query.country);
    const citiesRef = db
      .collection("cities")
      .where("country", "==", docRef)
      .orderBy("name");
    const snapshot = await citiesRef.get();
    let citiesData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      DOC_ID: doc.id,
    }));
    res.send(citiesData);
  }
);
