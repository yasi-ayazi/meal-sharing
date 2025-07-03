import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

export default function Modal({ message, onClose }) {
  return (
    <>
      <div className={styles.darkBG} onClick={onClose} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>{message}</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.cancelBtn} onClick={onClose}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
