"use strict";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
/**
 * Collection reference to the 'users' collection in Firestore.
 * @type {CollectionReference<DocumentData>}
 */
const checkpointsRef = collection(db, "chackpoints");
/**
 * Creates a new user document in Firestore.
 * @param {Object} checkpointData - The data of the user to be created.
 * @returns {Promise<DocumentReference>} A promise that resolves with the reference to the newly created user document.
 */
const createCheckpoint = async (checkpointData) => {
    try {
        const res = await addDoc(checkpointsRef, checkpointData);
        return res;
    } catch (error) {
        return error;
    }
};
/**
 * Reads the data of a user from Firestore based on their email.
 * @param {string} userEmail - The email of the user to be read.
 * @param {string} levelName - The email of the user to be read.
 * @returns {Promise<{ success: boolean, checkpointData?: Object, message?: string }>} A promise that resolves with an object containing the success status, user data if found, and an optional message.
 */
const readCheckpoint = async (userEmail,levelName) => {
    try {
        const checkpointSnapshot = await getDocs(query(checkpointsRef, where("user", "==", userEmail), where("level", "==", levelName)));

        if (checkpointSnapshot.empty) {
            return { success: false, message: "checkpoint not found" };
        }

        const checkpointData = checkpointSnapshot.docs.map((doc) => doc.data());
        return { success: true, checkpointData: checkpointData };
    } catch (error) {
        return error;
    }
};
/**
 * Updates the data of a user in Firestore.
 * @param {string} userEmail - The email of the user to be updated.
 * @param {Object} checkpointData - The updated data of the user.
 * @returns {Promise<{ success: boolean, message?: string }>} A promise that resolves with an object containing the success status and an optional message.
 */
const updateCheckpoint = async (userEmail, checkpointData) => {
    try {
        const userSnapshot = await getDocs(query(checkpointsRef, where("email", "==", userEmail)));

        const userDoc = userSnapshot.docs[0];
        await userDoc.ref.update(checkpointData);
        return { success: true, message: "Checkpoint updated successfully" };
    } catch (error) {
        return error;
    }
};

export { createCheckpoint, readCheckpoint, updateCheckpoint };
