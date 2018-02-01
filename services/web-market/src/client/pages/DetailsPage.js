import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDetails } from '../actions';

class DetailsPage extends Component {
  componentDidMount() {
    this.props.fetchDetails()
  }

  renderDetails(){
    return this.props.details.map((d,i) => {
      return <li key={i}>{d.code}</li>
    })
  }

  render(){
    return (
      <div>
        List of details
        <ul>{this.renderDetails()}</ul> 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { details: state.details}
}

function loadData(store) {
  return store.dispatch(fetchDetails());
}

export default{
  loadData,
  component: connect(mapStateToProps, { fetchDetails })(DetailsPage)
};
