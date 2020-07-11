import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyC9QLbAxIly6iGXmhDi6ugr6IqvLKY8_so",
      authDomain: "buyers-app-12b18.firebaseapp.com",
      databaseURL: "https://buyers-app-12b18.firebaseio.com",
      projectId: "buyers-app-12b18",
      storageBucket: "buyers-app-12b18.appspot.com",
      messagingSenderId: "538601542352",
      appId: "1:538601542352:web:a81bbb756242d90c8ec4d5",
      measurementId: "G-N0FQPVC3EC"
    };

    firebase.initializeApp(firebaseConfig);
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get ref() {
    //return firebase.database().ref(`messages/${this.publicId}`);
    return (
      firebase
        .database()
        // .ref(`threads/${this.userId}/${this.publicId}/messages`);
        .ref(`threads/${this.publicId}/messages`)
    );
  }

  get threadRef() {
    return (
      firebase
        .database()
        // .ref(`threads/${this.userId}/${this.publicId}/messages`);
        .ref(`threads`)
    );
  }

  on = (callback, limit = 20) =>
    this.ref
      .limitToLast(limit)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  onThread = callback => {
    this.threadRef
      .orderByChild("request_id")
      .equalTo(parseInt(this.requestId))
      .on("child_added", snapshot => callback(this.parseThread(snapshot)));
  };

  onThreadByBuyerId = (callback, buyerId) => {
    this.threadRef
      .orderByChild("buyer_id")
      .equalTo(parseInt(buyerId))
      .on("child_added", snapshot => callback(this.parseThread(snapshot)));
  };

  parseThread = snapshot => {
    const {
      id: threadId,
      public_id: threadUid,
      created_at: createdAt,
      request
    } = snapshot.val();

    return {
      threadId,
      threadUid,
      createdAt,
      request
    };
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user, attachment } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      text,
      createdAt,
      user,
      attachment
    };
    return message;
  };

  off() {
    this.ref.off();
  }

  setPublicId(id) {
    this.publicId = id;
  }

  setUserId(id) {
    this.userId = id;
  }

  setRequestId(id) {
    this.requestId = id;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user, attachment } = messages[i];
      const message = {
        text,
        user,
        ...(attachment && { attachment }),
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);
}

Fire.shared = new Fire();
export default Fire;
