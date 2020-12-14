import React, { Component } from 'react'
import axios from 'axios';

export class UserList extends Component {

  constructor(props) {
        super(props);
        this.state = {
          persons: [],
          storeUser: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleonClick = this.handleonClick.bind(this);
    }

  async handleonClick(e){
    e.preventDefault()
    this.setState({persons: this.state.persons.sort((a, b) => (a.name > b.name) ? 1 : -1)}) 
  }  
  async handleOnChange(e) {
    await this.setState({persons: this.state.storeUser})
    const sub = e.target.value
    
    if(sub){
      let tempUsers = this.state.persons
      let temp = tempUsers.filter(o => o.name.toLowerCase().includes(sub.toLowerCase()))
      this.setState({persons: temp})
    }
    else{
      this.setState({persons: this.state.storeUser})
    }
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        this.setState({storeUser: persons})
      })
  }

  render() {
    return (
      <div class="container">
          <h2>User Table</h2>
          <form>
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">        
                      <label className = 'users' for="search"> Enter Name : </label>
                      <hr/>
                      <input type="text" id="search" name="user-search" onChange = {this.handleOnChange}></input>
                </div>
              </div>
              <div className="col-md-5">
                <button className="btn btn-success" onClick = {this.handleonClick}>Sort UserList</button>
              </div>
            </div>
          </form>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.persons.map( user => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>     
                )
              })
            }
            </tbody>
          </table>
      </div>
    )
  }
}

export default UserList
