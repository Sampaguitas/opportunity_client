import React, { Component } from 'react';
import Select from './Select';
import './App.css';

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
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({ submitted: true });
    const { opportunity } = this.state;
    if (opportunity.territory && opportunity.industry) {
      console.log('do something');
    }
  }
  render() {
    const { opportunity, territories, industries, submitted } = this.state
    return (
      <div classNmae="container d-flex h-100">
        <div className='row justify-content-center align-self-center'>
          <div className="card" style={{width: 800}}>
            <div className="card-header" style={{ backgroundColor: '#180F5E', height: '4em', textAlign: 'center'}}>
              <h5 style={{ color: '#FFFFFF'}}>Generate a new code</h5>
          </div>
          <div className="card-body">
          <form name="form" onSubmit={this.handleSubmit}>
                  <Select
                    title="Territory"
                    name="territory"
                    options={territories.items}
                    value={opportunity.territories}
                    onChange={this.handleChange}
                    placeholder=""
                    submitted={submitted}
                    inline={false}
                    required={true}
                  />
                  <Select
                    title="Industry"
                    name="industry"
                    options={industries.items}
                    value={opportunity.industry}
                    onChange={this.handleChange}
                    placeholder=""
                    submitted={submitted}
                    inline={false}
                    required={true}
                  />
          </form>

          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
