import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  close = () => this.setState({ open: false });
  open = () => this.setState({ open: true });

  render() {
    return (
      <div>
        <Modal dialogClassName="dialog" show={this.props.open} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              {this.props.children}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
ModalContainer.defaultProps = {
  doctors: [],
};

export default ModalContainer;
