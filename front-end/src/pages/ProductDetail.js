import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import "../css-pages/DetailProduct.css" 

function DetailProduct(){
    const {slug} = useParams()
    const [product, setProduct] =useState({})
    const [user, setUser] = useState('')
    const [text, setText] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        axios
        .get(`http://localhost:9999/api/product/${slug}`)
        .then(res => {
            setProduct(res.data.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleComment = () => {
        const newComment = {
            user: user,
            text: text
        }
        axios
        .post(`http://localhost:9999/api/comment/${slug}/createComment`, newComment)
        .then(res => {
            toast.success("Comment Successfully!")
            setUser('')
            setText('')
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Detail Product</h1>
             <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>
                         <tr >
                            <td >{product?.name}</td>
                            <td>{product?.price}</td>
                            <td>
                                <ul>
                                    {product?.image !== undefined?product?.image.map(p => {
                                        return <img src={p?.url} alt="" style={{width: 100}}/>
                                    }):''}
                                </ul>
                            </td>
                        </tr>
               
               
            </table>
            <div className="comment">
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter username"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Comment"
        />
        <button onClick={() => handleComment()} style={{ width: 100 }}>
          Comment
        </button>
      </div>
            <button onClick={() => navigate('/')} style={{width: 100}}>Home</button>
        </div>
    )
}

export default DetailProduct