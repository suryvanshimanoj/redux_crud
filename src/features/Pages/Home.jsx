import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { showUser,deleteData,updateData } from '../userSlice'

function Home() {

    const { name, data } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showUser());
    });


    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        mobile: "",
        img: "",
    });

    const editdata=(id)=>{
        const singleData=data.filter((value)=>value.id==id); 
        setFormvalue(singleData[0]);       
    }
    
    const changeHandel = (e) => {
        setFormvalue({ ...formvalue,[e.target.name]:e.target.value});
        console.log(formvalue);
    }

    const vadidation = () => {
        var result = true;
        if (formvalue.name == "") {
            toast.error('Name Field is required !')
            result = false;
            return false;
        }
        if (formvalue.email == "") {
            toast.error('email Field is required !')
            result = false;
            return false;
        }

        if (formvalue.mobile == "") {
            toast.error('mobile Field is required !')
            result = false;
            return false;
        }
        if (formvalue.img == "") {
            toast.error('img Field is required !')
            result = false;
            return false;
        }
        return result;
    }
    const submitHandel = async (e) => {
        e.preventDefault();
        if (vadidation()) {
            dispatch(updateData(formvalue));
            toast.success('Update Success');
        }

    }



    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 align="center" className='mb-5'>Manage User</h2>
                        <Link to="/add_user" className='btn btn-primary float-end mb-5'>Add Data</Link>
                        <div className="container">
                            {name}
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Id.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Mobile</th>
                                        <th>Image</th>
                                        <th align="center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((value,index) => {
                                            return (
                                                <tr>
                                                    <td>{value.id}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.password}</td>
                                                    <td>{value.mobile}</td>
                                                    <td><img src={value.img} width="50px"></img></td>
                                                    <td align="center"><button onClick={()=>{
                                                            dispatch(deleteData(value.id));
                                                            toast.success('Data Delete success');
                                                            }}>Delete</button>
                                                    </td>
                                                    <td align="center"><button data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>editdata(value.id)}>Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                            <form action="" method='post'  >
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Name:</label>
                                    <input type="text" value={formvalue.name} onChange={changeHandel} className="form-control" placeholder="Enter Name" name="name" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="email" value={formvalue.email} onChange={changeHandel} className="form-control" placeholder="Enter email" name="email" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Mobile:</label>
                                    <input type="number" value={formvalue.mobile} onChange={changeHandel} className="form-control" placeholder="Enter Mobile" name="mobile" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Upload Image:</label>
                                    <input type="url" value={formvalue.img} onChange={changeHandel} className="form-control" name="img" />
                                </div>

                                <button type="submit" onClick={submitHandel} data-bs-dismiss="modal" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
                         
            <Footer />
        </>

    )
}

export default Home