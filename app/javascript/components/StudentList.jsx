import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Link } from "react-router-dom";
import ConfirmationBox from 'components/confirmation-box';

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     data: [],
     deleteId: '',
     modalPopOpen: false,
    }
    this.studentList = this.studentList.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.cancel = this.cancel.bind(this);
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

  handleEdit(field) {
    this.props.history.push(`/students/js/edit/${field.id}`);
  }

  handleDelete(row) {
    event.preventDefault();
    this.setState({
      deleteId: row.id,
      modalPopOpen: true
    });
  }

  deleteRecord() {
    $.ajax({
      method: 'DELETE',
      url: `/students/${this.state.deleteId}`,
      dataType: 'JSON'
    }).done(function(response) {
      location.reload();
    }.bind(this)).fail(function(xhr, status, err) {
      this.setState({
        errors: xhr.responseJSON.errors,
        modalPopOpen: true
      });
    }.bind(this));
    this.setState({ modalPopOpen: false });
  }

  cancel() {
    this.setState({ modalPopOpen: false });
  }

  render () {
    const columns = [{
      Header: 'Name',
      accessor: 'firstname',
    }, {
      Header: 'FavoriteMovie',
      accessor: 'favoritemovie'
    }, {
      Header: 'Action',
      accessor: 'action',
      Cell: row => (
        <div>
          <button onClick={() => this.handleEdit(row.original)}>Edit</button>
          <button onClick={() => this.handleDelete(row.original)}>
            Delete
          </button>
        </div>
       )
    }]

    return (
      <div>
        <Link to="/students/js/new" replace>Add Student</Link>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={10}
        />
        {this.state.modalPopOpen &&
          <ConfirmationBox
          deleteRecord={this.deleteRecord}
          cancel={this.cancel}
          />
        }
      </div>
    );
  }
}

export default StudentList;
