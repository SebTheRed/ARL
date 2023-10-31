import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit,getDocs,doc,setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Adjust the import according to your project structure
import { useUID } from './UIDContext'; // Adjust the import according to your project structure

const NotificationContextProvider = createContext({});

export const useNotifications = () => {
  const context = useContext(NotificationContextProvider);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }:any) => {
  const { uid }:any = useUID(); // Assuming you have a UID context or some other way to get the user's uid
  const [currentNotifications, setCurrentNotifications] = useState<any>([]);
  const [activeNotif,setActiveNotif] = useState<boolean>(false)
  const [lastVisible, setLastVisible] = useState<any>(null);
  const PAGE_SIZE = 5;

  useEffect(() => {
    const notificationRef = collection(db, `users/${uid}/notifications`);
    const q = query(notificationRef, orderBy('timeStamp', 'desc'), limit(PAGE_SIZE));
    
    const unsubscribe = onSnapshot(q, snapshot => {
      let notifications:any = [];
      snapshot.forEach(doc => {
        // Include the document ID in each notification item
        notifications.push({ id: doc.id, ...doc.data() });
      });
      const hasUnread = notifications.some((notif: any) => notif.read === false);
      setActiveNotif(hasUnread);
      setCurrentNotifications(notifications);
      if (!snapshot.empty) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [uid]);
  const updateNotificationReadStatus = async(notificationId:string) => {
    try {
      const notificationRef = doc(db, 'users', `${uid}`, 'notifications', notificationId); // Replace 'userId' with the actual user ID
      await setDoc(notificationRef, { read: true }, { merge: true }); // Merge to avoid overwriting other fields
    } catch (error) {
      console.error('Error updating notification read status: ', error);
    }
  }
  const paginateNotifications = async () => {
    if (!lastVisible) return;
    const notificationRef = collection(db, `users/${uid}/notifications`);
    const q = query(notificationRef, orderBy('timeStamp', 'desc'), startAfter(lastVisible), limit(PAGE_SIZE));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setCurrentNotifications((prev:any) => [
        ...prev, 
        ...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Include the document ID in each notification item
      ]);
    }
  };

  return (
    <NotificationContextProvider.Provider value={{ activeNotif,currentNotifications, paginateNotifications,updateNotificationReadStatus }}>
      {children}
    </NotificationContextProvider.Provider>
  );
};