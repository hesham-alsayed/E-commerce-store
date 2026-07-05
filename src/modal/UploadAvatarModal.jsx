import { Button } from "@/components/ui/button";
import { useModalBehavior } from "@/hooks/useModalBeahavior";
import { X } from "lucide-react";
import { motion as _motion, AnimatePresence } from "framer-motion";

export default function UploadAvatarModal({
  preview,
  loading,
  handleSaveImage,
  handleCancelImage,
  showModal,
  onClose,
}) {
  const { overlayRef, handleOverlayClick } = useModalBehavior(
    showModal,
    onClose,
  );

  return (
    <AnimatePresence>
      {showModal && (
        <_motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {}
          <_motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center space-y-5"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {}
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            {}
            <img
              src={preview}
              className="w-52 h-52 mx-auto rounded-full object-cover border"
            />

            {}
            <div className="flex justify-center gap-3 pt-2">
              <Button onClick={handleSaveImage} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancelImage}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </_motion.div>
        </_motion.div>
      )}
    </AnimatePresence>
  );
}
