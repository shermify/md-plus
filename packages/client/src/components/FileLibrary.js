import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileUpload } from 'redux-file-upload';
import FlipMove from 'react-flip-move';
import { loadPatient } from '../actions/index';

class FileList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.fileUpload.fileCount !== nextProps.fileUpload.fileCount) {
      this.props.loadPatient(this.props.patient._id);
    }
  }
  render() {
    return (
      <div>
        <div className="bg-primary" style={{ fontSize: '20px', padding: '10px', marginTop: '20px' }}>
          <div className="row">
            <div className="col-xs-6">
              Patient Files
            </div>
            <div className="col-xs-6 text-right">
              <div className="file-upload">
                <FileUpload
                  dropzoneId="fileUpload"
                  url={`http://localhost:3000/api/patients/${this.props.patient._id}/files`}
                >
                  <span className="glyphicon glyphicon-upload" aria-hidden="true" />
                </FileUpload>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group file-list">
          <FlipMove enterAnimation="accordionVertical" duration={500} easing="ease-out">
            {this.props.patient.files.map(file =>
              <li key={file._id} className="list-group-item" style={{ fontSize: '15px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '3px' }}>
                <a href={`http://localhost:3000/api/files/${file._id}`} download role="button" className="btn btn-default btn-sm" style={{ marginRight: '10px' }} >
                  <span className="glyphicon glyphicon-download-alt" aria-hidden="true" />
                </a>
                {file.fileName}
              </li>)}
          </FlipMove>
        </ul></div>
    );
  }
}

FileList.propTypes = {
  fileUpload: PropTypes.objectOf(PropTypes.number).isRequired,
  loadPatient: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    _id: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      fileName: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = state => ({
  ...{ patient: state.patient.response, fileUpload: state.fileUpload },
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPatient }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileList);
