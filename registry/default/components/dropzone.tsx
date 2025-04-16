"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import {
  type DropzoneProps as _DropzoneProps,
  type DropzoneState as _DropzoneState,
} from "react-dropzone";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { File, ImageIcon, Upload } from "lucide-react";

type DropzoneState = _DropzoneState;

interface Props extends Omit<_DropzoneProps, "children"> {
  containerClassName?: string;
  dropZoneClassName?: string;
  children?: (dropzone: DropzoneState) => React.ReactNode;
  showFilesList?: boolean;
  showErrorMessage?: boolean;
}

export function Dropzone({
  containerClassName,
  dropZoneClassName,
  children,
  showFilesList = true,
  ...props
}: Props) {
  const dropzone = useDropzone({
    ...props,
    onDrop(acceptedFiles, fileRejections, event) {
      if (props.onDrop) props.onDrop(acceptedFiles, fileRejections, event);
      else {
        setFilesUploaded((_filesUploaded) => [
          ..._filesUploaded,
          ...acceptedFiles,
        ]);
        if (fileRejections.length > 0) {
          let _errorMessage = `Could not upload ${fileRejections[0].file.name}`;
          if (fileRejections.length > 1)
            _errorMessage =
              _errorMessage + `, and ${fileRejections.length - 1} other files.`;
          setErrorMessage(_errorMessage);
        } else {
          setErrorMessage("");
        }
      }
    },
  });

  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  const deleteUploadedFile = (index: number) => {
    setFilesUploaded((_uploadedFiles) => [
      ..._uploadedFiles.slice(0, index),
      ..._uploadedFiles.slice(index + 1),
    ]);
  };

  return (
    <div className={cn("flex min-w-70 flex-col gap-2", containerClassName)}>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 transition-all select-none",
          dropZoneClassName,
        )}
      >
        <input {...dropzone.getInputProps()} />
        {children ? (
          children(dropzone)
        ) : dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your files here!</div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-row items-center gap-0.5 text-sm font-medium">
              <Upload className="mr-2 h-4 w-4" /> Upload files
            </div>
            {props.maxSize && (
              <div className="text-xs font-medium text-gray-400">
                Max. file size: {(props.maxSize / (1024 * 1024)).toFixed(2)} MB
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="mt-3 text-xs text-red-600">{errorMessage}</span>
      )}
      {showFilesList && filesUploaded.length > 0 && (
        <div
          className={`flex w-full flex-col gap-2 ${
            filesUploaded.length > 2 ? "h-48" : "h-fit"
          } mt-2 ${filesUploaded.length > 0 ? "pb-2" : ""}`}
        >
          <div className="w-full">
            {filesUploaded.map((fileUploaded, index) => (
              <div
                key={index}
                className="mt-2 flex h-16 w-full flex-row items-center justify-between rounded-lg border-2 border-solid border-gray-200 px-4 shadow-sm"
              >
                <div className="flex h-full flex-row items-center gap-4">
                  {fileUploaded.type === "application/pdf" ? (
                    <File className="h-6 w-6" />
                  ) : (
                    <ImageIcon className="h-6 w-6" />
                  )}
                  <div className="flex flex-col gap-0">
                    <div className="text-[0.85rem] leading-snug font-medium">
                      {fileUploaded.name.split(".").slice(0, -1).join(".")}
                    </div>
                    <div className="text-[0.7rem] leading-tight text-gray-500">
                      .{fileUploaded.name.split(".").pop()} •{" "}
                      {(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteUploadedFile(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
