import React, { Component } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../static/UserList.css'

export class UserList extends Component {

  constructor(props) {
        super(props);
        this.state = {
          persons: [],
          storeUser: [],
          offset: 0,
          perPage: 3,
          flag: 0,
          currentPage: 0
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleonClick = this.handleonClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    renderData(){
      const slice = this.state.persons.slice(this.state.offset, this.state.offset + this.state.perPage)
      const postData = slice.map(user => 
                <React.Fragment>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>  
                </React.Fragment>)
                this.setState({
            pageCount: Math.ceil(this.state.persons.length / this.state.perPage), postData
        })
  }

  async handleonClick(e){
    e.preventDefault()
    this.setState({ flag : 1 })
    this.setState({persons: this.state.persons.sort((a, b) => (a.name > b.name) ? 1 : -1)}) 
    this.renderData()
  }
  
  async handleonRefresh(e){
    this.receivedData()
  }

  async handleOnChange(e) {
    await this.setState({persons: this.state.storeUser})
    const sub = e.target.value
    this.setState({ flag : 1 })
    this.setState({persons: this.state.persons.filter(o => o.name.toLowerCase().includes(sub.toLowerCase()))})
    this.renderData()
  }

  receivedData(){
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
      this.setState({storeUser: persons})
      this.renderData()
    })
}

  componentDidMount() {
    this.receivedData()
  }

  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    if (this.state.flag === 1){
      this.setState({
        currentPage: selectedPage,
        offset: offset}, () => {
        this.renderData()
      });
    }
    else{
    this.setState({
      currentPage: selectedPage,
      offset: offset}, () => {
      this.receivedData()
    });
  }
};

  render() {
    return (
      <div class="container">
          <h2>User Table</h2>
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">        
                      <label className = 'users'> Enter Name : </label>
                      <hr/>
                      <input type="text" onChange = {this.handleOnChange}></input>
                </div>
              </div>
              <div className="col-md-4">
                <button className="btn btn-success" onClick = {this.handleonClick}>Sort UserList</button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-warning" onClick = {this.handleonRefresh}>Refresh</button>
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
            {this.state.postData}
          </table>
          <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      </div>
    )
  }
}

export default UserList
