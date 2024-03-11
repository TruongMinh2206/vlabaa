import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import "../css-pages/AddProduct.css" 
function AddProduct(){
    const [name, setName] = useState() 
    const [price, setPrice] = useState() 
    const [category, setCategory] = useState([])
    const [cate, setCate] = useState()
    const [images,setImages] = useState([{}]);
    const [imagesRes,setImagesRef] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios
        .get("http://localhost:9999/api/category/getAll")
        .then(res => {
            setCategory(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleAdd = async() => {
        const formData = new FormData();
        formData.append("upload_preset", "dinhhoan");
        let url = [];
        for(let i = 0; i < images.length; i++){
            console.log(images[i]);
            formData.append("file",images[i]);
            try {
                const res = await axios.post(
                  "https://api.cloudinary.com/v1_1/db7xtr0t6/image/upload",
                  formData,{
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                  }
                );
                console.log(res?.data);
                url.push({
                    name : images[i].name,
                    url : res?.data?.url,
                })
              } catch (error) {
                console.log(error);
                return;
              } 
    }
    const product = {
            name: name,
            price: +price,
            category: cate,
            image: url
        }
        console.log(product);
        axios
        .post("http://localhost:9999/api/product/createProduct",product)
        .then(res => {
            toast("Add successfully!")
            setName('')
            setPrice()
            setCate()
            navigate("/")
        })
        .catch(err => console.log(err))
}
  
   
    return (
        <div >
                <h1>Add Product</h1>
           <div className="containAdd">
             <div className="addProduct">
                <div className="inputRow">
                    <span >Name</span>
                    <input 
                        value={name}
                         onChange={e => setName(e.target.value)}
                         placeholder="Enter Name"/>
                </div>
                <div className="inputRow">
                    <span >Price</span>
                    <input 
                        value={price}
                        type='number'
                         onChange={e => setPrice(e.target.value)}
                         placeholder="Enter Price"/>
                </div>
                
                <div className="inputRow">
                    <span >Category</span>
                    <select className='inputType' 
                            id='inputType' 
                            value={cate}
                            onChange={e => setCate(e.target.value)}>
                                <option value="">Choose a category</option>
                            {category?.map((e) => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            } )}
                    </select>
                    Image<input type="file" multiple onChange={(e) => setImages(e.target.files)}/> 
                    
                </div>
                <button onClick={() => handleAdd()}>Add Product</button>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
          
           </div>
            

            
        </div>
    )
}

export default AddProduct