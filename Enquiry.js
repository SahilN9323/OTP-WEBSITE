import {useState} from "react";
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {set,ref} from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAk29_5a_QF5rpRaiaGKSZVK_EU090akv8",
  authDomain: "enterotp30dec.firebaseapp.com",
  databaseURL: "https://enterotp30dec-default-rtdb.firebaseio.com",
  projectId: "enterotp30dec",
  storageBucket: "enterotp30dec.appspot.com",
  messagingSenderId: "633784396322",
  appId: "1:633784396322:web:fd8eb652c95ec2da6cb87b"
};


const app = firebase.initializeApp(firebaseConfig);
const db=getDatabase(app);
function Enquiry()
{
const [name,setName]=useState("");
const [query,setQuery]=useState("");
const [phone,setPhone]=useState("");
const [otp,setOtp]=useState("");
const [ans,setAns]=useState("");
const [code,setCode]=useState("");


const hName=(event)=>{setName(event.target.value);}
const hQuery=(event)=>{setQuery(event.target.value);}
const hPhone=(event)=>{setPhone(event.target.value);}
const hOtp=(event)=>{setOtp(event.target.value);}
const configureCaptcha=()=>{
window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('sign-in-button',{
'size':'invisible',
'callback':(response)=>{
generate();
console.log("Recaptcha Varified");
},
defaultCountry:"IN"
});
}
const generate=(event)=>{
event.preventDefault();
configureCaptcha();
let pn="+91"+phone;
let av=window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(pn,av)
.then(res=>{
setCode(res);
console.log(res);
console.log("OTP Sent ");
alert("OTP SENT")
})
.catch(err=>{
console.log(err);
})
}
const check=(event)=>{
event.preventDefault();
code.confirm(otp)
.then(res=>{
const d=new Date().toString();
const n=name+"-->"+d;
const data={name,phone,query,d}
set(ref(db,"visitors/"+n),data)
.then(res=>{
console.log(res);
alert("will call you later on")
window.location.reload()
})
.catch(err=>console.log(err))
})
.catch(err=>{
console.log(err);
alert("invalid data");
window.location.reload()
})
}

return(
<>
<center>
<h1>Fill The Enquiry Form</h1>
<form onSubmit={generate}>
<div id="sign-in-button"></div>
<input type="text" placeholder="enter ur name" onChange={hName}/>
<br/><br/>
<textarea placeholder="enter query" rows={3} cols={30} onChange={hQuery}></textarea>
<br/><br/>
<input type="number" placeholder="enter ur no" onChange={hPhone}/>
<br/><br/>
<input type="submit"/>
</form>
<form onSubmit={check}>
<br/><br/>
<input type="number" placeholder="enter otp" onChange={hOtp}/>
<br/><br/>
<input type="submit"/>
</form>
<h1>{ans}</h1>
</center>
</>
);

}
export default Enquiry;