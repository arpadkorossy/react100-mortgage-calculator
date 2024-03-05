import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
      rate: '0',
      term: '0',
      payment: ''
    };

    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }

  updateRate(e) {
    this.setState({
      rate: e.target.value
    });
  }

  updateTerm(e) {
    this.setState({
      term: e.target.value
    });
  }

  calculate(balance, rate, term) {
      const n = term * 12; // number of payments
      const r = rate / 100 / 12; // monthly interest rate converted from percentage
      const monthlyPayment = balance * (r * ((1 + r) ** n) ) / (((1 + r) ** n) - 1);
      return monthlyPayment.toFixed(2);
  }

  handleClick(e) {
    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;
    
    const payment = this.calculate(balance, rate, term);
    console.log(`Payment is $${payment}.`)
    this.setState({
      payment: `$${payment} is your payment.`
    });
  }

  render() {
    return (
      <div className='container'>

        <div className='page-header'>
            <h3>Mortgage Calculator</h3>
        </div>

        <div className="row mb-3">
            <label for="balance" className="col-sm-2 col-form-label">Loan Balance</label>
            <div className="col-sm-10">
                <input 
                name="balance" 
                type="number"
                value={ this.state.balance }
                onChange={ this.updateBalance }
                step="10000" 
                className="form-control" 
                id="balance"
                />
            </div>
        </div>
        
        <div className="row mb-3">
            <label for="rate" className="col-sm-2 col-form-label">APR</label>
            <div className="col-sm-10">
                <input 
                name="rate" 
                type="number" 
                value={ this.state.rate }
                onChange={ this.updateRate }
                step="0.01" 
                className="form-control" 
                id="rate"
                />
            </div>
        </div>

        <div className="row mb-3">
            <label for="term">Loan term:</label>
            <div className="col-sm-10">
                <select 
                name="term" 
                id="term" 
                value={ this.state.term }
                onChange={ this.updateTerm }>
                <option value="">--Please choose an option--</option>
                <option value="15">15 years</option>
                <option value="30">30 years</option>
                </select>         
            </div>
        </div>
        
        <div className="row mb-3">
            <div className="col-sm-10">
                <button 
                name="submit" 
                className="btn btn-primary"
                onClick={ this.handleClick }>Calculate</button>
            </div>
        </div>
        
        <div id="output" name="output" className="d-print-inline-block">{ this.state.payment }</div>

      </div>
      
    );
  }
}