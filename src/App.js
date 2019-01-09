import React, { Component } from 'react';
import Select from './Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { getIndustries, getTerritories, createOpportunity } from './apiAdapter'
import './App.css';
library.add(fas);

let API_URL
const REACT_APP_STAGE = 'prod'

REACT_APP_STAGE === 'dev'
  ? API_URL = 'http://localhost:5000'
  : API_URL = 'https://opportunity-server.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunity: {
        territory: '',
        industry: '',
      },
      territories: [],
      industries: [],
      submitted: false,
      loading: false,
      message:'',
      salesforce:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTerritories = this.getTerritories.bind(this);
    this.getIndustries = this.getIndustries.bind(this);
    this.createOpportunity = this.createOpportunity.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  componentDidMount(){
    const that = this;
    this.getIndustries().then(function (response) {
      that.setState({ industries: response });
    });
    this.getTerritories().then(function (response) {
      that.setState({ territories: response });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { opportunity } = this.state;
    this.setState({
      opportunity: {
        ...opportunity,
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true, loading: true });
    const { opportunity } = this.state;
    const that = this
    if (opportunity.territory && opportunity.industry) {
      this.createOpportunity(opportunity).then(function (response) {
        that.setState({ salesforce: response });
        that.setState({ loading: false });
      });
      //that.setState({ loading: true });
    } 
      
  }

getIndustries() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(`${API_URL}/industry/findAll`, requestOptions).then(this.handleResponse);
}

getTerritories() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch(`${API_URL}/territory/findAll`, requestOptions).then(this.handleResponse);
}

createOpportunity(opportunity) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opportunity)
  };
  return fetch(`${API_URL}/opportunity/create`, requestOptions).then(this.handleResponse);
}

handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
      }
      const error = (data && data.message) || response.statusText;
      error && this.setState({message: error});
      console.log(this.state.message);
      return Promise.reject(error);
    }
    return data;
  });
}


  // getIndustries() {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   return fetch(`https://opportunity-server.herokuapp.com/industry/findAll`, requestOptions).then(this.handleResponse);
  // }

  // getTerritories() {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   return fetch(`https://opportunity-server.herokuapp.com/territory/findAll`, requestOptions).then(this.handleResponse);
  // }

  // createOpportunity(opportunity) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(opportunity)
  //   };
  //   return fetch(`https://opportunity-server.herokuapp.com/opportunity/create`, requestOptions).then(this.handleResponse);
  // }


  render() {
    const { salesforce, industries, loading, opportunity, submitted, territories } = this.state
    return (
      <div classNmae="container d-flex h-100">
        <div className='row justify-content-center align-self-center'>
          <div className="card" style={{width: 800}}>
            <div className="card-header" style={{ textAlign: 'center'}}>
              <h5>Generate a new code</h5>
          </div>
          <div className="card-body">
          <form name="form" onSubmit={this.handleSubmit}>
                {this.state.territories &&
                  <Select
                    title="Territory"
                    name="territory"
                    options={territories}
                    value={opportunity.territory}
                    onChange={this.handleChange}
                    placeholder=""
                    submitted={submitted}
                    inline={false}
                    required={true}
                  />
                }
                {this.state.industries &&
                  <Select
                    title="Industry"
                    name="industry"
                    options={industries}
                    value={opportunity.industry}
                    onChange={this.handleChange}
                    placeholder=""
                    submitted={submitted}
                    inline={false}
                    required={true}
                  />
                }

            <hr />
            <div>
                  <blockquote className="blockquote text-center"><p className="mb-0" style={{ fontSize: 30, fontWeight: 'bold' }}>{salesforce.code}</p></blockquote>     
            </div>
            <hr />
            <button 
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              style={{ backgroundColor: "#A8052C"}}
            >
              {loading && <FontAwesomeIcon icon="spinner" className="fa-pulse fa-1x fa-fw" />}
              Apply
            </button>
          </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
