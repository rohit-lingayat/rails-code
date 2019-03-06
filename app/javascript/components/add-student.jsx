import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';
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

  handleChange(fieldname, event) {
    let data  = this.state.data;
    data[fieldname] = event.target.value;
    this.setState({ data, });
  }

  handleSubmit(event) {
    event.preventDefault();
    let student_data = this.state.data;
    $.ajax({
      method: 'POST',
      url: '/students',
      dataType: 'JSON',
      data: { student_data },
    }).done(function(response) {
      this.props.history.push('/students/js');
    }.bind(this)).fail(function(xhr, status, err) {
      this.setState({
        errors: xhr.responseJSON.errors,
        modalPopOpen: true
      });
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
