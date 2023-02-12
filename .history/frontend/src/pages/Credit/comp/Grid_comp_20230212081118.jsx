import "./Grid_comp.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Button } from "@mui/material";
import waste_about from "../../../Assets/waste_about.jpg"
import { useEffect } from "react";
import { async } from "@firebase/util";
import axios from "axios";

const Grid_comp = (props) => {

    
     
    



    return (
        <div className="widget" style={{ height: "33rem" }}>
            <div className="left">

                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "1rem" }}>{props.title}</span>
                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "0.7rem" , position: "relative",bottom: "4.1rem" }}>{props.desc}</span>



                <div className="image" style={{ width: "250px", marginLeft: "6.3rem", marginTop: "-2rem" , width: "200px" , height: "100px" , alignItems: "center" }}>
                    <img src={props.imgurl} alt="" />
                </div>

                <div className="buttons" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                    <Button loading variant="solid" style={{ backgroundColor: "rgba(21, 205, 116, 0.2)", width: "8rem", marginLeft: "2rem" }}>
                        Buy Now!
                    </Button>

                    <Button loading variant="solid" style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", width: "8rem", marginLeft: "5rem" }}>
                        price: {props.price} credits
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
