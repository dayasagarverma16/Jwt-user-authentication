
import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'
import { logout } from '../../utils/auth';

const Dashboard = () => {
  const { isLoggedIn, user } = useAuthStore();
    
  return (
    <>
       {isLoggedIn()
           ?<div>
             <div>wel come in dashboard</div>
             <Link to='/logout'>Logout</Link>    
            </div>
           
           :<div>
              <h1>welcome dashboard page</h1>
              <div className="d-flex">
              <Link className='btn btn-primary' to='/login'>Login</Link>
              <Link className='btn btn-primary btn-success ms-4' to='/register'>Register</Link>

              </div>

            </div>
            
       }
   
    </>
  )
}

export default Dashboard