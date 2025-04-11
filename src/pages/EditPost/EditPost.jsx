import { useParams } from 'react-router-dom'
import styles from './EditPost.module.css'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function EditPost() {
    const [title , setTitle] = useState('')
    const [sellLocation , setSellLocation] = useState('')
    const [price , setPrice] = useState('')
    const [description , setDescription] = useState('')
    const [images , setImages] = useState([])
    
    const handleNewPost = () => {}

    const { postId } = useParams()

    useEffect(() => {
        try {
            const getExistingDoc = async () => {
                const docRef = doc(db, 'joonggo_posts', postId)
                const docSnap = await getDoc(docRef)
                const postData = docSnap.data()
                setTitle(postData.title)
                setSellLocation(postData.location)
                setPrice(postData.price)
                setDescription(postData.description)
            }
            getExistingDoc()
            } catch (err) {
                console.log(err)
        }
    }, [])

    return (<div className={styles.newPostPage}>
            <div className={styles.newPostContainer}>
                <div className={styles.heading}>게시물 수정</div>
                <form className={styles.newPostForm} onSubmit={handleNewPost}>
                    
                    <div className={styles.labelInputContainer}>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
    
                    <div className={styles.labelInputContainer}>
                    <label htmlFor="sellLocation">거래장소</label>
                    <input type="text" id="sellLocation" value={sellLocation} onChange={e => setSellLocation(e.target.value)} />
                    </div>
                    {/* 상품 상태 체크박스 */}
                    {/* 카테고리 */}
                    {/* 사진 */}
                    
                    <div className={styles.labelInputContainer}>
                    <label htmlFor="price">가격</label>
                    <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
    
                    <div className={`${styles.labelInputContainer} ${styles.two}`}>
                    <label htmlFor="description">제품설명</label>
                    <textarea type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
    
                    <div className={`${styles.labelInputContainer} ${styles.two}`}>
                    <label htmlFor="images">사진첨부</label>
                    <input type="file" id="images" multiple onChange={(e) => setImages([...e.target.files])} required />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.newPostButton} type="submit">게시글 올리기</button>
                    </div>
                </form>
            </div>
        </div>
        )
}