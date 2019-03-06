import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import StudentList from 'components/StudentList'
import AddStudent from 'components/add-student'
import EditStudent from 'components/edit-student'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class Student extends React.Component {

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
        <Router>
          <Switch>
            <Route path="/students/js" exact component={StudentList}/>
            <Route path="/students/js/new" exact component={AddStudent} />
            <Route path="/students/js/edit/:id" exact component={EditStudent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Student
