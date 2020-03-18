import firebase from 'react-native-firebase';

class Fire {
    constructor() {
        //this.init();
        this.checkAuth();
    }


    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {  //onAuthStateChanged:  User對像中獲取匿名用戶的帳號數據
            if (!user) {
                console.log('沒有註冊過');
                firebase.auth().signInAnonymously();    //註冊一個匿名帳號
            } else {
                console.log('有註冊過');
            }
        })
    };

    send = messages => {    //messages 是使用者輸入的東西
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message)   //push是react native firebase的方法 能把數據存入資料庫
        });
    }


    parse = message => {
        console.log('parse message',message);
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp)
        console.log('_id', _id);
        console.log('user', user);
        return {
            _id,
            createdAt,
            text,
            user,
        }
    }


    get = callback => {
        //this.db.on開始監聽 當資料庫有數據增加 child_added觸發 snapshot是傳回來的資料  傳回來的資料經過this.parse方法轉成我們要用的格式
        //轉完後把資料傳給callback函式（從chat.js傳過來的方法） 拿到資料，整理完後資料就會以message傳進去 繼續執行函式 Fire.get(message=>{})
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));

        // child_added 該事件將在此位置為每個初始子項觸發一次，並且每次添加新子項時都會再次觸發。
        // 傳遞給回調的DataSnapshot將反映相關子級的數據。出於排序目的，它傳遞了第二個參數，該參數是一個字符串，
        // 該字符串按排序順序包含先前的同級子級的鍵；如果為第一個子級，則為null。
    }

    off() {
        this.db.off();  //停止監聽資料庫
    }


    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get db() {
        return firebase.database().ref('messages');    //若沒有會自己新增 不用擔心
    }

}

export default new Fire();