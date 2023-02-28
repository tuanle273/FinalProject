import { Modal } from "antd";
export default function DeleteModal(isModalOpen, handleOk, handleModalShow) {
  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
