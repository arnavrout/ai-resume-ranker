// import React, {useCallback, useState} from 'react'
// import {useDropzone} from 'react-dropzone'

// export function formatSize(bytes: number): string {
//   if (!isFinite(bytes) || bytes <= 0) return '0 KB'

//   const KB = 1024
//   // Only using KB, MB, GB (and TB as fallback)
//   const units = ['KB', 'MB', 'GB', 'TB']

//   if (bytes < KB) return '<1 KB'

//   let size = bytes / KB
//   let unitIndex = 0

//   while (size >= KB && unitIndex < units.length - 1) {
//     size = size / KB
//     unitIndex++
//   }

//   const formatted = size >= 100 ? Math.round(size).toString() : size.toFixed(1)
//   return `${formatted} ${units[unitIndex]}`
// }

// interface FileUploaderprops {
//     onFileSelect?: (file: File | null) => void;
// }


// const FileUploader = ({onFileSelect}: FileUploaderprops) => {

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0] || null;

//     onFileSelect?.(file);

//   }, [onFileSelect]);

//   const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
//   useDropzone({
//     onDrop,
//     multiple: false,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     maxSize: 20 * 1024 * 1024,
//   });

//   const file = acceptedFiles[0] || null;

  

//   return (
//     <div className='w-full gradient-border'>
//       <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <div className='space-y-4 cursor-pointer'>

//         {file ? (
//             <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
//             <img src="/images/pdf.png" alt='pdf' className='size-10'/>
//             <div className='flex items-center space-x-3'>
//                 <div>
//                 <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>
//                 {file.name}
//                 </p>
//                 <p className='text-sm text-gray-500'>
//                     {formatSize(file.size)}
//                 </p>
//                 </div>
//             </div>
//             <button className='p-2 cursor-pointer' onClick={(e) => {
//                 onFileSelect?.(null);
//             }}>
//                 <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
//             </button>
//             </div>

//         ) : (
//             <div>
//                 <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
//                     <img src="/icons/info.svg" alt="upload" className='size-20'/>
//                 </div>
//                 <p className='text-lg text-gray-500'>
//                     <span className='font-semibold'>
//                         Click To Upload
//                     </span> or drag and drop
//                 </p>
//                 <p className='text-lg text-gray-500'>
//                     PDF (max 20 MB)
//                 </p>
//             </div>
//         )}
//       </div>
//       </div>

//     </div>
//   )
// }

// export default FileUploader
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_FILE_SIZE,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/images/pdf.png"
                alt="pdf"
                className="size-10"
              />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4"
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img
                  src="/icons/info.svg"
                  alt="upload"
                  className="size-20"
                />
              </div>

              <p className="text-lg text-gray-500">
                <span className="font-semibold">
                  Click To Upload
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-lg text-gray-500">
                PDF (max {formatSize(MAX_FILE_SIZE)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
