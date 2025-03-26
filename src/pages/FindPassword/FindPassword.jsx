import { useState } from "react"
import { auth } from "../../config/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import styles from "./FindPassword.module.css"
import { Link, useNavigate } from "react-router-dom"



export default function FindPassword() {

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()


    async function handleFindPassword(event) {
        event.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('비밀번호 재설정 이메일 전송 완료')
            setSubmitted(true)

        } catch (err) {
            console.log('비밀번호 재설정 이메일 보내기 실패', err)
        }
    }

    console.log(email)

    return <div className={styles.container}>
        <div className={styles.findPWBox}>
            <p className={styles.heading}>비밀번호 찾기</p>
            {submitted 
            ? <div>
                <p>이메일 전송완료</p>
            <p>비밀번호 재설정 이메일이 전송되었습니다. 이메일 수신함을 확인해 주세요.</p>
            <button className={styles.findPWButton} onClick={() => navigate('/signIn')}>로그인페이지로 돌아가기</button>
            </div>
            : <form className={styles.findPWForm} onSubmit={handleFindPassword}>
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                <button className={styles.findPWButton} type="submit">비밀번호 재설정</button>
            </form>}
            
        </div>
    </div>
}