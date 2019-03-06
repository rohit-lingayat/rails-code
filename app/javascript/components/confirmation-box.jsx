import React from "react";
import PropTypes from "prop-types";
import { AlertDialog, AlertDialogLabel, AlertDialogDescription, AlertDialogOverlay, AlertDialogContent }from "@reach/alert-dialog";

export default function ConfirmationBox(props) {
  let cancelRef = React.createRef();
  return (
    <div>
      <AlertDialog leastDestructiveRef={cancelRef}>
        <AlertDialogLabel>
          {(props.errors && props.errors != '')
            ? 'Failed'
            : 'Please Confirm!'
          }
        </AlertDialogLabel>
        <AlertDialogDescription>
          {
            (props.errors && props.errors != '')
              ? 'unsuccessful to Add the record'
              : 'Are you sure you want to delete something?'
          }
        </AlertDialogDescription>
        <div className="alert-buttons">
          {(!props.errors) &&
            <button onClick={props.deleteRecord}>
              Yes
            </button>
          }
          <button ref={cancelRef} onClick={props.cancel}>
            Cancel
          </button>
        </div>
      </AlertDialog>
    </div>
  )
}