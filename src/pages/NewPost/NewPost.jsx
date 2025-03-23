import { useState } from "react"
import styles from "./NewPost.module.css"
import { v4 as uuidv4 } from "uuid"
import { storage, db, auth } from "../../config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { serverTimestamp, addDoc, updateDoc, collection, doc, Timestamp } from "firebase/firestore"


export default function NewPost() {

    //임시 파이어베이스 요금 폭탄 방지 - 1초제한
    let lastWriteTime = 0;

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sellLocation, setSellLocation] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState(null)

    //추가할 기능!
    //사진 압축기능 추가하기 - 비용절감


    async function handleNewPost(event) {
        event.preventDefault()


        if (!images) {
            alert('사진을 추가하세요!')
            return
        }

        //임시 파이어베이스 요금 폭탄 방지 - 1초제한
        const now = Date.now()
        if (now - lastWriteTime < 1000) {
            console.log("too many requests! please wait")
            return;
        }
        lastWriteTime = now

        try {
            const uploadPromises = images.map(async (file) => {
                const uniqueFileName = `${uuidv4()}`; // 🔥 UUID로 파일명 생성
                const storageRef = ref(storage, `posts/${uniqueFileName}`);
                await uploadBytes(storageRef, file);
                return getDownloadURL(storageRef); // 🔥 업로드 후 URL 반환
            })

            const imageUrls = await Promise.all(uploadPromises); // ✅ 모든 이미지 URL 가져오기

            const postRef = await addDoc(collection(db, "joonggo_posts"), {
                images: imageUrls, // 🔥 한 번에 저장
                createdAt: serverTimestamp(),
                title: title,
                description: description,
                location: sellLocation,
                price: price,
                sellerId: auth.currentUser.uid,
                lastUpdatedAt: serverTimestamp()
            });

            // ✅ Firestore에서 생성된 문서 ID 가져오기
            const postUid = postRef.id;

            // ✅ 생성된 문서 내부에 postUid 저장
            await updateDoc(doc(db, "posts", postUid), { postUid });
        }


        catch (err) {
            console.log(err)
        }
    }

    return (<div>
        <div>NewPost</div>
        <form onSubmit={handleNewPost}>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />

            <label htmlFor="description">제품설명</label>
            <textarea type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />

            <label htmlFor="sellLocation">거래장소</label>
            <input type="text" id="sellLocation" value={sellLocation} onChange={e => setSellLocation(e.target.value)} />
            {/* 상품 상태 체크박스 */}
            {/* 카테고리 */}
            {/* 사진 */}

            <label htmlFor="price">가격</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} />

            <input type="file" multiple onChange={(e) => setImages([...e.target.files])} required />

            <button type="submit">게시글 올리기</button>
        </form>
    </div>
    )
}
