import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import { ADD_IMAGE, ADD_AVATAR } from './mutations'
import { useMutation } from '@apollo/client'

const API_KEY = import.meta.env.VITE_API_KEY
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_APP_ID

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
}

export const app = initializeApp(firebaseConfig)

export function useFileUpload() {
    const [addImage] = useMutation(ADD_IMAGE);
    const fileUpload = (file: File) => {
    // Points to the root reference
    const storageRef = firebase.storage().ref();
  
    // Create the file metadata
    const metadata = {
      contentType: file.type,
    };
  
    var uploadTask = storageRef.child("images/" + file.name).put(file, metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("No upload currently");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("No upload currently");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          try {
            addImage({
              variables: {downloadURL},
            });
            window.location.href = "/home"
          } catch (e) {
            console.error(e);
          }
        });
      }
    );}
    return { fileUpload };
  }

  export function useFileUploadAvatar() {
    const [addAvatar] = useMutation(ADD_AVATAR);
    const fileUpload = (file: File) => {
    // Points to the root reference
    var storageRef = firebase.storage().ref();
  
    // Create the file metadata
    var metadata = {
      contentType: file.type,
    };
  
    var uploadTask = storageRef.child("avatars/" + file.name).put(file, metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("No upload currently");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("No upload currently");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          try {
            addAvatar({
              variables: {downloadURL},
            });
            window.location.href = "/home"
          } catch (e) {
            console.error(e);
          }
        });
      }
    );}
    return { fileUpload };
  }