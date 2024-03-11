import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import "../css-pages/ListProduct.css"

function ListProduct() {
    const navigate = useNavigate()
    const {slug} = useParams()
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = () => {
        axios
        .get("http://localhost:9999/api/product/getAll")
        .then(res => {
            setListProduct(res.data.data)
            console.log(res.data.data);
        })
        .catch(err => console.log(err))
      };



    const handleDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    const handleDelete = (productId) => {
        axios
            .delete(`http://localhost:9999/api/product/delete/${productId}`)
            .then((response) => {
                console.log('Product deleted successfully');
                fetchProducts();
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    };
    const handleUpdate = (productId) => {
        // Navigate to the UpdateProduct component with the product's ID
        navigate(`/update/${productId}`);
    };
 





    return (<>
        <h1 > List Products</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Comment</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
            {listProduct.map(item => {
                return (
                    <tr key={item?._id}>
                        <td onClick={() => handleDetail(item?._id)} style={{ cursor: "pointer" }}>{item?.name}</td>
                        <td>{item?.price}</td>
                        <td>
                            <ul>
                                {item?.image.map(i => {
                                    return <img src={i?.url} alt='' style={{ width: 100 }} />
                                })}
                            </ul>
                        </td>
                        <td>
                            <ul className="cmt">
                                {item?.comments.map(i => {
                                    return <li>{i?._id.user}:{i?._id.text}</li>
                                })}
                            </ul>
                        </td>
                        <td>
                            {item?.category?.name}
                        </td>
                        <td>
                            <a href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(item?._id);
                                }}
                            >
                                Delete
                            </a>
                           
                        </td>
                        <td>
                        <button style={{ width: 100 }} onClick={() => handleUpdate(item?._id)}  >update</button>
                            </td>


                    </tr>
                )
            })}


        </table>
        <button style={{ width: 100 }} onClick={() => navigate('/addProduct')} >Add More</button>
        

    </>)
}



export default ListProduct