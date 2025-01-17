import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Swal from 'sweetalert2'


function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)

    const axios = apiInstance
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const otp = searchParams.get('otp');
    const uidb64 = searchParams.get('uidb64');
    const reset_token = searchParams.get('reset_token');




    const handleNewPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNewPasswordConfirmChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError(true);
            console.log("Password Does Not Match");
        } else {
            setError(false);

            console.log("otp ======", otp);
            console.log("uidb64 ======", uidb64);
            console.log("reset_token ======", reset_token);
            console.log("password ======", password);

            const formdata = new FormData()

            formdata.append("otp", otp)
            formdata.append("uidb64", uidb64)
            formdata.append("reset_token", reset_token)
            formdata.append("password", password)

            try {
                axios.post(`user/password-change/`, formdata).then((res) => {
                    console.log(res.data.code);
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Changed Successfully',
                    })
                    navigate("/login")
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured Try Again',
                })
                // console.log(error);
            }
        }


    }
    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Create New Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handlePasswordSubmit}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Enter New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="email"
                                                            required
                                                            name="password"
                                                            className="form-control"
                                                            onChange={handleNewPasswordChange}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="email"
                                                            required
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            onChange={handleNewPasswordConfirmChange}
                                                        />
                                                        {error !== null &&
                                                            <>
                                                                {error === true

                                                                    ? <p className='text-danger fw-bold mt-2'>Password Does Not Match</p>
                                                                    : <p className='text-success fw-bold mt-2'>Password Matched</p>
                                                                }
                                                            </>
                                                        }
                                                    </div>


                                                    <div className="text-center">
                                                        <button type='submit' className='btn btn-primary w-100'>Reset Password</button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    )
}

export default CreatePassword



// import React, { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import apiInstance from '../../utils/axios';

// const CreatePassword = () => {
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const otp = searchParams.get("otp");
//     const uidb64 = searchParams.get("uidb64");

//     const handlePasswordSubmit = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         const data = {
//             password,
//             otp,
//             uidb64,
//         };

//         try {
//             const response = await apiInstance.post('user/password-change/', data);
//             alert("Password changed successfully");
//             navigate('/login');
//         } catch (error) {
//             alert("An error occurred while trying to change the password: " + error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <>
//             <h1>Create New Password</h1>
//             <form onSubmit={handlePasswordSubmit}>
//                 <input
//                     type="password"
//                     placeholder='Enter new password'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <br />
//                 <br />
//                 <input
//                     type="password"
//                     placeholder='Confirm new password'
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <br />
//                 <br />
//                 <button type='submit'>Save New Password</button>
//             </form>
//         </>
//     );
// };

// export default CreatePassword;






// // import React from 'react'
// // import { useState } from 'react'
// // import { useSearchParams } from 'react-router-dom'
// // import { useNavigate } from 'react-router-dom';

// // import apiInstance from '../../utils/axios'
// // const CreatePassword = () => {
// //     const [password,setPassword]=useState("")
// //     const [confermPassword,setConfermPassword]=useState("")
// //     const [searchParams] = useSearchParams()
    
// //     const navigate = useNavigate();
// //     //const axios = apiInstance


// //     const otp = searchParams.get("otp")
// //     const uidb64 = searchParams.get("uidb64")
// //     //const reset_token = searchParams.get('reset_token');

   

// //     // console.log(password)
// //     // console.log(confermPassword)
// //     const handlePasswordSubmit = async  (e)  => {
// //         e.preventDefault()
// //     //     console.log(password)
// //     //  console.log(confermPassword)
    

// //         if (password !== confermPassword){
// //            alert("password does not match")
// //         }else{
// //        // alert("password is processing")
// //                const formdata = new FormData();
// //                formdata.append('password', password);
// //                formdata.append('otp', otp);
// //                formdata.append('uidb64', uidb64);

// //          try {
// //                 await apiInstance.post('user/password-change/',formdata).then((res)=>{
// //                 console.log(res.data);
// //                 alert("password change successfully")
// //                 navigate('/login')
// //              })


// //             } catch (error) {
        
// //               alert("an error occured while trying to change the password")
// //             }
// //         }

// //     }


// //   return (
// //       <>
// //          <h1>create new password</h1>
// //          <form onSubmit={handlePasswordSubmit} >
// //             <input
// //              type="paaword" 
// //              id=''
// //              name=''
// //              placeholder='enter new password'
// //              value={password}

// //              onChange={(e)=>setPassword(e.target.value)}

// //             />
// //             <br />
// //             <br />

// //             <input
// //              type="paaword" 
// //              id=''
// //              name=''
// //              placeholder='conferm new password'
// //              value={confermPassword}

// //              onChange={(e)=>setConfermPassword(e.target.value)}

// //             />
// //             <br />
// //             <br />
// //             <button type='submit'>save new pasword</button>
// //          </form>
      

// //       </>
// //   )
// // }

// // export default CreatePassword