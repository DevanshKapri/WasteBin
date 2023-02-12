import "./Grid_comp.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Button } from "@mui/material";
import waste_about from "../../../Assets/waste_about.jpg"
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import axios from "axios";

const Grid_comp = (props) => {



    const [realprice , setRealPrice] = useState(props.price)
    const [realquantity,setRealQuantity] = useState(props.quantity)
    const [realscore , setRealScore] = useState(props.score)

      const handleQuantity = () => {
        setRealQuantity(realquantity-1)
      }

      const handlePrice = () => {
         if(realscore > realprice){
            setRealScore()
         }
      }




    return (
        <div className="widget" style={{ height: "33rem" }}>
            <div className="left">

                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "1rem" }}>{props.title}</span>
                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "0.7rem", position: "relative", bottom: "8.5rem" }}>{props.desc}</span>



                <div className="image" style={{ width: "250px", marginLeft: "14.8rem", marginTop: "-17rem", width: "200px", height: "100px", alignItems: "center" }}>
                    <img src={props.imgurl} alt="" style={{ height: "200px", width: "280px", borderRadius: "15px" }} />
                </div>

                <div className="buttons" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                    <Button loading variant="solid" style={{ backgroundColor: "rgba(21, 205, 116, 0.2)", width: "8rem", marginLeft: "2rem" }}>
                        Buy Now!
                    </Button>

                    <Button onClick={handleQuantity} loading variant="solid" style={{ backgroundColor: "rgba(173, 166, 19, 0.2)", width: "8rem", marginLeft: "5rem" }}>
                        Quantity: {realquantity} 
                    </Button>

                    <Button onClick={handlePrice} loading variant="solid" style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", width: "8rem", marginLeft: "5rem" }}>
                        price: {realprice} credits
                    </Button>

                </div>


            </div>
            <div className="right">

                <AccountBalanceWalletOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(128, 0, 128, 0.2)",
                        color: "purple",
                    }}
                />
            </div>
        </div >
    );
};

export default Grid_comp;
