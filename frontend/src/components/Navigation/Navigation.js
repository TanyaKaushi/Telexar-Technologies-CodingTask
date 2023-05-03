import React, { useEffect, useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/icons.js'
import { menuItems } from '../../utils/menuItems'
import { UserContext } from '../../App'
import { Link, useNavigate } from "react-router-dom";

function Navigation({ active, setActive }) {

    const [mypics, setPics] = useState([])
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:5000/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
            })
    }, [])


    return (
        <NavStyled>
            <div style={{ margin: '0px auto', textAlign: 'center' }}>
                <hr />
                <h4><b><u>My Profile</u></b></h4>
                <div className='row'>
                    <div className='col'>
                        <div style={{
                            display: 'flex',
                            justifyContent: "space-around",
                            margin: '18px 0px',
                            padding: '10px',
                            textAlign: 'center'
                        }}>
                            <div>
                                <img style={{ width: '120px', height: '120px', borderRadius: '80px', marginRight: '50%' }}
                                    src={state ? state.pic : "loading"} />
                            </div>
                        </div>
                    </div>
                    <div className='col'>

                        <h5>Hello {state ? state.name : "loading"} !</h5>
                        <div style={{ display: 'flex', justifyContent: "space-between", width: '108%', padding: '5px' }}></div>
                        <h5>Your email: {state ? state.email : "loading"}</h5>
                        <div style={{ display: 'flex', justifyContent: "space-between", width: '108%', padding: '5px', }}></div>



                    </div>
                </div>
                <hr />
                <div className='gallery'>
                    {
                        mypics.map(item => {
                            return (
                                <img key={item._id} className='item' src={item.photo} alt={item.title} />
                            )
                        })
                    }
                </div>

            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="menu-items" >
                <li style={{cursor: "pointer"}} onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                navigate("/signin");
                                
                            }}>
                    {/* <li>
                        <i
                            className="material-icons" style={{ color: "white" }}
                           
                        >
                            power_settings_new
                        </i>
                    </li>, */}
                    {signout} Sign Out
                </li>
            </div>



        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation