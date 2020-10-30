import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

function ConfirmModal({ open, onConfirm, onCancel, message, isLoading }) {
    return (
        <Modal confirmLoading={isLoading} visible={open} title="Confirm" onOk={onConfirm} onCancel={onCancel}>
            <p>{message}</p>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string,
    isLoading: PropTypes.bool,
};

ConfirmModal.defaultProps = {
    message: "Do you want to keep processing?",
    isLoading: false,
};

export default ConfirmModal;
