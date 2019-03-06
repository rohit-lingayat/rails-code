import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ConfirmationBox from 'components/confirmation-box'

export default function CustomForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          firstname:
          <input type="text" value={props.data.firstname} onChange={props.handleChange.bind(this, 'firstname')} />
        </label>
        <br/>
        <label>
          lastname:
          <input type="text" value={props.data.lastname} onChange={props.handleChange.bind(this, 'lastname')} />
        </label>
        <br/>
        <label>
          favoritefood:
          <input type="text" value={props.data.favoritefood} onChange={props.handleChange.bind(this, 'favoritefood')} />
        </label>
        <br/>
        <label>
          favoritecolor:
          <input type="text" value={props.data.favoritecolor} onChange={props.handleChange.bind(this, 'favoritecolor')} />
        </label>
        <br/>
        <label>
          favoritemovie:
          <input type="text" value={props.data.favoritemovie} onChange={props.handleChange.bind(this, 'favoritemovie')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {props.errors != '' && props.modalPopOpen === true &&
        <ConfirmationBox
        errors={props.errors}
        cancel={props.cancel}
        />
      }
    </div>
  );
}