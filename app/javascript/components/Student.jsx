import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     data: []
    }
    this.studentList = this.studentList.bind(this);
  }

  componentDidMount() {
    this.studentList();
  }

  studentList() {
    $.ajax({
      method: 'GET',
      url: '/students',
      dataType: 'JSON'
    }).done(function(studentList) {
      this.setState({ data: studentList });
    }.bind(this)).fail(function(xhr, status, err) {
      console.log('Error')
    }.bind(this));
  }


  render () {
    const columns = [{
      Header: 'Name',
      accessor: 'firstname'
    }, {
      Header: 'FavoriteMovie',
      accessor: 'favoritemovie'
    }]

    return (
      <div>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Student
