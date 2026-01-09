import { auth, googleProvider } from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { use, useEffect } from "react"
import {addDoc, getDocs} from 'firebase/firestore'
import OpenAI from 'openai'

import { collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'

export default function Auth(props) {
    const ogState = React.useRef(false)

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isNotFound, setIsNotFound] = React.useState(false)
    const [signUp, setSignUp] = React.useState(false)
    const [userName, setUserName] = React.useState("")
    const [isSafe, setIsSafe] = React.useState(false)
    const [currFile, setCurrFile] = React.useState({})
    const [imgData, setImgData] = React.useState([])
    const [linear, setLinear] = React.useState([])
    const [leaving, setLeaving] = React.useState(false)

    const [alreadyIn, setAlreadyIn] = React.useState(false)

    //const [user, setUser] = React.useState(null)

    //console.log(email)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Signed in...")
            setAlreadyIn(true)
        }
        else {
            setAlreadyIn(false)
        }
    })

    useEffect(() => {
        if (!ogState.current) {
          ogState.current = true
          return
        }
    
        console.log("Ready.")
    
        signOut(auth)
      }, [props.toSign])

    console.log(props.toSign)

    const signIn = async () => {
        try {
            let found = false
            for (let i = 0; i < props.userList.length; i++)
            {
                if (email === props.userList[i].email && password === props.userList[i].password)
                {
                    found = true
                    props.handleSign(props.userList[i].username)
                    props.handleMail(props.userList[i].email)
                    const signIn = await signInWithEmailAndPassword(auth, email, password)
                    console.log("Signed in as: " + signIn.user.email)
                    //setUser(signIn.user)
                }
            }
            setIsNotFound(!found)
            //await createUserWithEmailAndPassword(auth, email, password)
        } catch(err) {
            console.error(err)
        }
    }

    //auth?.currentUser?.displayName)

    const signInWithGoogle = () => {
        try {
            setSignUp(prev => !prev)
            //await signInWithPopup(auth, googleProvider)
        } catch(err) {
            console.error(err)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch(err) {
            console.error(err)
        }
    }

    const signUpFunc = async () => {
        let wrong = false
        for (let i = 0; i < props.userList.length; i++)
        {
            if (email === props.userList[i].email || userName === props.userList[i].username)
            {
                wrong = true
            }
        }
        if (!wrong) {
            await addDoc(props.coll, {username: userName, email: email, password: password, likes: []})
            props.handleSign(userName)
            props.handleMail(email)
            await createUserWithEmailAndPassword(auth, email, password)
        }
        setIsSafe(wrong)
    }

    /*if (props.toSign) {
        setLeaving(true)
    }*/

    if (alreadyIn) {
        const emailToCheck = auth.currentUser.email
        getDocs(collection(db, "users")).then(data => data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))).then((docs) => {
        for (let i = 0; i < docs.length; i++) {
            if (docs[i].email === emailToCheck) {
                console.log("Si")
                props.handleSign(docs[i].username)
                props.handleMail(docs[i].email)
            }
        }
    })
    }

    return (
        <div className="mainpage">
            {!signUp && <div className="signinform">
                <h1>Please Sign In</h1>

                <input
                    placeholder="Email..."
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signIn}>Sign In</button>

                {isNotFound && <h3>Email or Password not found</h3>}

                <div className="horizontal_line"></div>

                <button onClick={signInWithGoogle}>Or, sign up...</button>

                {false && <button onClick={logOut}>Log Out</button>}
            </div>}
            {signUp && <div className="signinform">
                <h1>Sign Up!</h1>
                <input
                    placeholder="Username..."
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    placeholder="Email..."
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                

                <button onClick={signUpFunc}>Sign up</button>

                {isSafe && <h3>Username and/or email is in use already.</h3>}

                <div className="horizontal_line"></div>
                <button onClick={signInWithGoogle}>Sign in</button>
            </div>}
        </div>
    )
}