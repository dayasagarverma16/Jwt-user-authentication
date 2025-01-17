import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [isLoading, setIsLoading] = useState(false);

 

    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await login(username, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);

    };
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
                                        <h3 className="text-center">Login</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handleLogin}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            name="username"
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            className="form-control"

                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginPassword">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <button className='btn btn-primary w-100' type="submit" disabled={isLoading}>
                                                        {isLoading ? (
                                                            <>
                                                                <span className="mr-2 ">Processing...</span>
                                                                <i className="fas fa-spinner fa-spin" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="mr-2">Sign In </span>
                                                                <i className="fas fa-sign-in-alt" />
                                                            </>
                                                        )}
                                                    </button>

                                                    <div className="text-center">
                                                        <p className='mt-4'>
                                                            Don't have an account? <Link to="/register">Register</Link>
                                                        </p>
                                                        <p className='mt-0'>
                                                             <Link to="/forgot-password" className='text-danger'>Forgot Password?</Link>
                                                        </p>
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
    );
};

export default Login;



// by chat gpt
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { login } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/auth';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
//     const navigate = useNavigate();

//     const resetForm = () => {
//         setEmail('');
//         setPassword('');
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const { error } = await login(email, password);
//         if (error) {
//             alert(error);
//         } else {
//             navigate('/');
//             resetForm();
//         }
//         setIsLoading(false);
//     };

//     return (
//         <div className="container min-vh-100 d-flex justify-content-center align-items-center">
//             <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
//                 {/* Login Header */}
//                 <div className="text-center mb-4">
//                     <h1>Welcome Back</h1>
//                     <p className="text-muted">Continue login</p>
//                 </div>

//                 {/* Login Form */}
//                 <form onSubmit={handleLogin}>
//                     {/* Email Input */}
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="form-control"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>

//                     {/* Login Button */}
//                     <button
//                         type="submit"
//                         className={`btn btn-primary w-100 py-2 ${isLoading ? 'disabled' : ''}`}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Logging in...' : 'Login'}
//                     </button>

//                     {/* Forgot Password Link */}
//                     <div className="text-center mt-3">
//                         <Link to="/forgot-password" className="text-decoration-none text-muted">Forgot password?</Link>
//                     </div>

//                     {/* Register Link */}
//                     <hr />
//                     <div className="text-center">
//                         <p className="mb-0">New to our site? <Link to="/register" className="text-decoration-none">Create an account</Link></p>
//                         <p className="mb-0">Forget-password? <Link to="/forgot-password" className="text-decoration-none">Forget-password</Link></p>

//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;






// by deshfix
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { login } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/auth';



// const Login = () => {
//     const [email, setemail] = useState('')
//     const [password, setpassword] = useState('')
//     const [isLoading, setisLoading]=useState('')
//     const isLoggedIn=useAuthStore((state)=>state.isLoggedIn)
//     const navigate = useNavigate();

//     console.log(email)
    
//     console.log(password)
//     useEffect(() => {
//       if (isLoggedIn()) {
//           navigate('/');
//       }
//     })


    
//     const resetForm = () => {
//       setemail('');
//       setpassword('');
//     };


//     const handleLogin = async (e) => {
//       e.preventDefault();
//       setisLoading(true);

//       const { error } = await login(email, password);
//       if (error) {
//           alert(error);
//        } else {
//           navigate('/');
//           resetForm();
//        }
//       setisLoading(false);

//     };

    

//     return (
//        <>
//          <h1>wel come to back</h1>
//          <p>continue login</p>
//          <form onSubmit={handleLogin}>
//             <input 
//              type="text" 
//              name="email"
//              id="email"
//              value={email}
//              onChange={(e) => setemail(e.target.value) }
//             />
// <br />
// <br />
//             <input
//              type="password"
//              name="password"
//              id="password"
//              className='form-control'
//              value={password}
//              onChange={(e) => setpassword(e.target.value)}
//             />  
//              <br />
//              <br />

//             <button type="submit">
//                   Login 
//             </button>
//             <hr />

//             <Link to={"/forgot-password"}>Forgot password </Link>
//             <div className="text-center">
//                    <p className='mt-4'>
//                      create new account? <Link to="/register/">Register</Link>
//                     </p>
//             </div>


//          </form>
    
//        </>
//     )
// }

// export default Login;