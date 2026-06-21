import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

/**
 * ConfirmDialog — destructive-action confirmation built on Modal.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   onConfirm: () => void,
 *   title?: string,
 *   message?: string,
 *   confirmLabel?: string,
 *   isLoading?: boolean,
 * }} props
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  isLoading = false,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm" showClose={false}>
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
        <AlertTriangle size={22} className="text-error" aria-hidden="true" />
      </div>

      <div>
        <h2 className="font-display font-semibold text-charcoal text-lg">{title}</h2>
        <p className="text-sm text-muted mt-1">{message}</p>
      </div>

      <div className="flex gap-3 w-full">
        <Button
          variant="outline"
          size="md"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="md"
          onClick={onConfirm}
          loading={isLoading}
          className="flex-1"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
