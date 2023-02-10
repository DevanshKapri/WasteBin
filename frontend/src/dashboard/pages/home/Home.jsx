import React from 'react'
import Chart from '../../components/chart/Chart'
import Nav from '../../components/navbar/Nav'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widgets/Widget'
import './Home.css'

const Home = () => {
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Nav />

          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>

          <div className="charts">
            
            <Chart title="Last 2 quarters (Revenue)" aspect={2 / 1} />
          </div>

          <div className="listContainer">
            <div className="listTitle">Lastest Transactions</div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
