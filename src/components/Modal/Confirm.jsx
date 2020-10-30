import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

function ConfirmModal({ open, onConfirm, onCancel, message }) {
    return (
        <Modal visible={open} title="Confirm" onOk={onConfirm} onCancel={onCancel}>
            <p>{message}</p>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string,
}

ConfirmModal.defaultProps = {
    message: "Do you want to keep processing?"
}

export default ConfirmModal;
