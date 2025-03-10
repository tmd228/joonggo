import { useState } from 'react'
import styles from './SignUp.module.css'
import { auth, db } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { serverTimestamp, setDoc, doc, addDoc, collection, deleteDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

//추가할 항목
//이메일 중복 확인
//비밀번호 최소 길이 또는 조합조건
//닉네임 중복 확인

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSignUp(event) {
        event.preventDefault();
        try {
            //firebase auth를 이용해 가입
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            //firebase firestore에 가입 즉시 user data 추가
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
                nickname: nickname
            })

            //가입할때 selling_posts 빈 collection 추가
            const docRef = await addDoc(collection(db, "users", user.uid, "selling_posts"), {
                initialized: true // 빈 문서를 추가하여 컬렉션이 생성되도록 함
            });

            //빈문서 바로 삭제
            // await deleteDoc(doc(db, "users", user.uid, "selling_posts", docRef.id));

            //회원가입이 성공적이면 홈페이지로 이동
            navigate('/')
            //나중에 로그인페이지로 넘어가기 전 페이지로 이동하게 만들기
            
        } catch (err) {
            console.log(`error! ${err}`)
        }

    }

    return (
        <div>
           <h2>회원가입</h2>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email">이메일</label>
                <input type="email" id='email' value={email} placeholder='example@domain.com' onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="nickname">닉네임</label>
                <input type="text" id='nickname' value={nickname} placeholder='김또깡' onChange={(e) => setNickname(e.target.value)} required/>

                <label htmlFor="password">비밀번호</label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button type='submit'>회원가입</button>
            </form>
        </div>
    )

}
