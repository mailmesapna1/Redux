import React,{useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Menu from '@mui/material/Menu';
import './style.css';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import { DLT } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";


const Header = () => {

  const [price,setPrice] = useState(0);
  console.log(price)

  const getdata = useSelector((state)=>state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dlt =(id) =>{
      dispatch(DLT(id))
    }

    const total = () =>{
      let price=0;
      getdata.map((ele,k)=>{
        price= ele.price*ele.qnty+price
      });
      setPrice(price);
    };
    useEffect(()=>{
      total();
    },[total])
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to cart</NavLink>
          <Nav className="me-auto d-flex justify-content-between " style={{ }}>
            <NavLink to="/home" className="text-decoration-none text-light">Home</NavLink>
            <NavLink to="/todo" className="text-decoration-none text-light">   ToDo</NavLink>
            <NavLink to="/about" className="text-decoration-none text-light">   About</NavLink>
          </Nav>
          
            
          
          <Badge badgeContent={getdata.length} color="primary"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
          <i
            class="fa fa-shopping-cart text-light"
            style={{ fontSize: 25, cursor: "pointer" }}
            aria-hidden="true"
          ></i>
          </Badge>

        
        </Container>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        {
          getdata.length ?
          <div className="card_details" style={{width:"24rem",padding:10}}>
            <Table>
              <thead>
                <tr>
                  <td>Photos</td>
                  <td>Restaurant Name</td>
                </tr>
                </thead>
              <tbody>
                {
                  getdata.map((e)=>{
                    return(
                      <>
                      <tr>
                        <td>
                         <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" /></NavLink> 
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price : ₹ {e.price}</p>
                          <p>Quantity : {e.qnty}</p>
                          <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                            <i className="fas fa-trash smalltrash" ></i>
                          </p>
                        </td>
                        <td className="mt-5" style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                          <i className="fas fa-trash largetrash" ></i>
                          </td>
                      </tr>
                      </>
                    )
                  })
                }
                <p className="text-center">Total : ₹ {price}</p>
              </tbody>
            </Table>
          </div>:
          <div className="card_details d-flex justify-content-center align-item-center" style={{width:"20rem",padding:10,position:"relative"}}>
        <i className="fas fa-close smallclose"
        onClick={handleClose}
        style={{position:"absolute", top:2,right:20,fontSize:23,cursor:"pointer"}}></i>
        <p style={{fontSize:22}}>Your cart is Empty</p>
        <img src="https://gifimage.net/wp-content/uploads/2018/05/shopping-cart-gif-8.gif" alt="" className="emptycart_img" style={{width:"5rem",padding :10}}/>
      </div>

        }


      
      </Menu>
      </Navbar>
    </>
  );
};

export default Header;

//rafce =shortcut to create a function
