import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomForm from 'components/custom-form'

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: '',
        lastname: '',
        favoritefood: '',
        favoritecolor: '',
        favoritemovie: ''
      },
      errors: '',
      modalPopOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.getStudent();
  }

  handleChange(fieldname, event) {
    let data  = this.state.data;
    data[fieldname] = event.target.value;
    this.setState({ data, });
  }

  handleSubmit() {
    event.preventDefault();
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1)
    let student_data = this.state.data;
    $.ajax({
      method: 'PUT',
      url: `/students/${id}`,
      dataType: 'JSON',
      data: { student_data }
    }).done(function(response) {
      this.props.history.push('/students/js');
    }.bind(this)).fail(function(xhr, status, err) {
      this.setState({
        errors: xhr.responseJSON.errors,
        modalPopOpen: true
      });
    }.bind(this));
  }

  getStudent() {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1)
    $.ajax({
      method: 'GET',
      url: `/students/${id}`,
      dataType: 'JSON',
    }).done(function(response) {
      this.setState({ data: response });
    }.bind(this)).fail(function(xhr, status, err) {
      alert('Failed to create student')
    }.bind(this));
  }

  cancel() {
    this.setState({ modalPopOpen: false });
  }

  render() {
    return (
      <CustomForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={this.state.data}
        errors={this.state.errors}
        cancel={this.cancel}
        modalPopOpen={this.state.modalPopOpen}
      />
    );
  }
}

export default AddStudent;
