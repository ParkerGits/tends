import firebase from './firebase';
import getStripe from './stripe';
const firestore = firebase.firestore();
const app = firebase.app()

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IbUmiArDRrpiyf4jzeuoE4g',
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function goToBillingPortal() {
    const functionRef = app
      .functions('us-central1')
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')
    const { data } = await functionRef({
      returnUrl: `${window.location.origin}/profile`,
    })
    window.location.assign(data.url)
  }

export function createUser(uid, data) {
    return firestore
        .collection("users")
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createTend(data) {
    const tend = firestore.collection('tends').doc();
    tend.set(data)
    return tend;
}

export function createTrend(data) {
    return firestore.collection("trends").add(data);
}

export function updateTendQuantity(id, newQuantity) {
    return firestore.collection("tends").doc(id).update({ quantity: newQuantity })
}

export function updateTimerTendRunning(id, isRunning) {
    return firestore.collection("tends").doc(id).update({ isRunning: isRunning })
}

export function updateTimerTendStartEndTime(id, newStartTime, newEndTime) {
    return firestore.collection("tends").doc(id).update({ beginTime: newStartTime, endTime: newEndTime })
}

export function deleteTend(id) {
    firestore.collection("tends").doc(id).delete();
    // delete associated trends
    const trendQuery = firestore.collection("trends").where("tendId", "==", id);
    trendQuery.get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
            doc.ref.delete();
        })
    })
}

