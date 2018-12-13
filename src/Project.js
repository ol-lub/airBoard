import React, { Component } from 'react'
import BoardDepartures from './components/BoardDepartures'
import BoardArrivals from './components/BoardArrivals'

const styles = {
  container: {
    display: 'flex'
  },
  name: {
    color: '#ffac02',
    fontSize: '100px',
    margin: '20px',
  },
  table: {
    margin: '20px'
  }
}

class Project extends Component {
  state = {
    isBoard: true,
  }

  arrivalsClick = () => {
    this.setState({isBoard: false})
  }

  departuresClick = () => {
    this.setState({isBoard: true})
  }

    render() {
      const isBoard = this.state

      return (
        <div>
          <div style={styles.container}>
            <p style={styles.name} onClick={this.departuresClick}>
              Вылет
            </p>
            <p style={styles.name} onClick={this.arrivalsClick}>
              Прилет
            </p>
          </div>
          <div style={styles.table}>
            {this.state.isBoard 
              ? (<BoardDepartures />) 
              : (<BoardArrivals />)}
          </div>
        </div>
      );
    }
  }
  
export default Project;
 