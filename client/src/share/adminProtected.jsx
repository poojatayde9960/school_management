import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminProtected = ({ compo }) => {
    // const { employee } = useSelector(state => state.Adminauth)
    const { admin } = useSelector(state => state.Adminauth)

    return <>
        {admin ? <>{compo}</> : <>
            <div className="container 100-vh">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div>
                            <h1>admin Not Login</h1>
                            <p>Please Login to access Admin Dashboard</p>
                            <Link to="/adminLogin" type="button" class="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }
    </>
}

export default AdminProtected