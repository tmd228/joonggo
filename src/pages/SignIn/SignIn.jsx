import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    //비정상적인 루트로 로그인이 돼있는 상태로 로그인 페이지로 갔을경우 다시 홈페이지 이동
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/');
            }
        });
        return () => unsubscribe(); // Cleanup (안전하게 메모리 정리)
    }, []);

    //임시 파이어베이스 요금폭탄 방지
    let lastWriteTime = useRef(0)

    async function handleSignIn(event) {
        event.preventDefault();

        //이메일 비밀번호 치지않고 로그인 버튼 눌렀을때 에러메세지
        if (!email || !password) {
            setErrorMessage("이메일과 비밀번호를 입력하세요.");
            return;
        }

        //이메일 형식 틀렸을때 로그인 버튼 누르면 에러 메세지
        if (!isValidEmail(email)) {
            setErrorMessage("올바른 이메일 형식이 아닙니다.");
            return;
        }

        //임시 파이어베이스 요금폭탄 방지
        const now = Date.now()
        if (now - lastWriteTime.current < 1000) {
            console.log('too many requests! pleaes wait')
            return;
        }
        lastWriteTime.current = now

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setErrorMessage("이메일 주소와 비밀번호를 확인해 주세요.")
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
    }


    return (
        <div className={styles.signinContainer}>
            <div className={styles.signinBox}>
                <h2 className={styles.heading}>로그인</h2>
                <form className={styles.signinForm} onSubmit={handleSignIn}>
                    <label htmlFor="email">이메일</label>
                    <input placeholder="example@domain.com" type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />

                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <p className={styles.forgotPassword}><Link to='/findPassword'>비밀번호 찾기</Link></p>
                    {/* 에러 메시지 출력 */}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                    <button className={styles.signInButton} type="submit">로그인</button>
                </form>
                <p className={styles.signUp}>계정이 없으신가요? <Link to='/signUp'>회원가입</Link></p>
            </div>
        </div>
    );
}