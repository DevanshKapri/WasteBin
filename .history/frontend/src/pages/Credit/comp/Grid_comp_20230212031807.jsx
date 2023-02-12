import "./Grid_comp.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Button } from "@mui/material";
import waste_about from "../../../Assets/waste_about.jpg"
import useE

const Grid_comp = () => {

    let data = [{}]

    //temporary
    const amount = 100;
    const diff = 20;


    



    return (
        <div className="widget" style={{ height: "32rem" }}>
            <div className="left">

                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "1rem" }}>Product Name</span>
                <span className="title" style={{ textAlign: "center", marginLeft: "3rem", fontSize: "0.7rem" }}>lorem ispsum dolor
                    imit lorem ispsum dolor imit lorem ispsum dolor imitlorem ispsum dolor
                    imitlorem ispsum dolor imitlorem ispsum dolor imit
                    imitlorem ispsum dolor imitlorem ispsum dolor imit
                    imitlorem ispsum dolor imitlorem ispsum dolor imit
                    imitlorem ispsum dolor imitlorem ispsum dolor imit
                    imitlorem ispsum dolor imitlorem ispsum dolor imit</span>



                <div className="image" style={{ width: "250px", marginLeft: "5rem", marginTop: "-2rem" }}>
                    <img src={waste_about} alt="" />
                </div>

                <div className="buttons" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                    <Button loading variant="solid" style={{ backgroundColor: "rgba(21, 205, 116, 0.2)", width: "8rem", marginLeft: "2rem" }}>
                        Buy Now!
                    </Button>

                    <Button loading variant="solid" style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", width: "8rem", marginLeft: "5rem" }}>
                        Price: 1500
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
