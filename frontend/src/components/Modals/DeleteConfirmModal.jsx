import { X, AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#18181B] w-[400px] rounded-xl p-6 border border-gray-800 shadow-2xl transform transition-all scale-100">
        
        {/* Warning Icon & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Move to Scrap?</h2>
          <p className="text-gray-400 text-sm">
            Are you sure you want to delete <span className="text-white font-semibold">"{itemName}"</span>? 
            <br />
            This item will be sent to scrap and removed from inventory permanently.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-green-500 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
          >
            No, Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-bold transition shadow-lg shadow-red-900/20"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.body // <-- Attached to body
  );
};

export default DeleteConfirmModal;