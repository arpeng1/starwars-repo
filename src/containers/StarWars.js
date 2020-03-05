import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import starWarsService from '../services/starWarsService';
import './StarWars.css'
import StarWarsBarGraph from './StarWarsBarGraph';
import StarWarsTable from './StarWarsTable';

function StarWars() {
  const tabStyle = {
    margin: '1em'
  }

  const [planetData, setPlanetData] = useState([]);

  useEffect(() => {
    starWarsService.getAllPlanets()
      .then(response => setPlanetData(parseData(response)));
    function parseData(data) {
      return data.sort((a,b) => a.name.localeCompare(b.name));
    }
  }, [])

  if (planetData.length === 0) {
    return (
      <div>Loading data...</div>
    )
  }

  return (
    <div>
      <Tabs defaultActiveKey='bar'>
        <Tab eventKey='bar' title='bar' style={tabStyle}>
          <StarWarsBarGraph planets={planetData}/>
        </Tab>
        <Tab eventKey='table' title='table' style={tabStyle}>
          <StarWarsTable planets={planetData} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default StarWars;