import React from "react";
import { Modal, Button } from 'antd';

function StoreModal({open, onConfirm, onCancel, store}) {
    return (
        <Modal title="Store" visible={open} onOk={onConfirm} onCancel={onCancel}>

        </Modal>
    );
}

export default StoreModal;