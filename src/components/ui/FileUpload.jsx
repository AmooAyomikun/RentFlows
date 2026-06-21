import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FileUpload / PhotoDropzone — drag-and-drop or click-to-upload,
 * image preview, mocked upload progress.
 *
 * @param {{
 *   onFile?: (file: File) => void,
 *   accept?: string,
 *   label?: string,
 *   className?: string,
 * }} props
 */
const FileUpload = ({
  onFile,
  accept = 'image/*',
  label = 'Upload photo',
  className = '',
}) => {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    simulateUpload();
    onFile?.(file);
  };

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setUploading(false);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="relative rounded border border-border overflow-hidden"
          >
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-44 object-cover"
            />
            <button
              type="button"
              onClick={clearPreview}
              aria-label="Remove photo"
              className="absolute top-2 right-2 w-7 h-7 bg-charcoal/70 text-white rounded-full flex items-center justify-center hover:bg-charcoal transition-colors"
            >
              <X size={14} aria-hidden="true" />
            </button>
            {uploading && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                <div
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={[
              'border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 p-8 cursor-pointer transition-colors',
              dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-warm',
            ].join(' ')}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
            aria-label={label}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload size={18} className="text-primary" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-charcoal">{label}</p>
              <p className="text-xs text-muted mt-0.5">Drag & drop or click to browse</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default FileUpload;
