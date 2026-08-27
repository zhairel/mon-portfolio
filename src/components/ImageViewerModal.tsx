import React from 'react';
import { Icons } from './icons/Icons';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageTitle: string;
  imageCaption?: string;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageTitle,
  imageCaption
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white font-heading">{imageTitle}</h3>
            {imageCaption && <p className="text-xs text-slate-400 mt-0.5">{imageCaption}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer border-0"
            aria-label="Close image preview"
          >
            <Icons.X size={18} />
          </button>
        </div>

        {/* Image Container */}
        <div className="flex items-center justify-center bg-black/50 rounded-xl overflow-hidden max-h-[75vh]">
          <img
            src={imageSrc}
            alt={imageTitle}
            className="max-h-[70vh] w-auto object-contain rounded-lg shadow-md"
            onError={(e) => {
              // Graceful fallback placeholder if file isn't uploaded yet
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};
