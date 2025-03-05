import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSignIn(event) {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            console.log('이메일과 비밀번호를 확인해주세요')
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h2>로그인</h2>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />

                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />

                <button type="submit">로그인</button>
            </form>
            <p>계정이 없으신가요? <Link to='/signUp'>회원가입</Link></p>
        </div>
    );
}