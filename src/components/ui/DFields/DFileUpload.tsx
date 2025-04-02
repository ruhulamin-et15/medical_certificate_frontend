"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  id?: string;
  title?: string;
  description?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  onFileChange?: (file: File | null) => void;
  className?: string;
  icon?: React.ReactNode;
  browseText?: string;
  uploadHint?: string;
  error?: string;
  disabled?: boolean;
  value?: File | null;
}

export default function DFileUpload({
  id,
  title = "File Upload",
  description = "Please upload a file",
  required = false,
  accept = "*/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  onFileChange,
  className,
  icon = <Upload className="h-12 w-12 text-gray-400" />,
  browseText = "Browse Files",
  uploadHint = "Click here to upload file",
  error,
  disabled = false,
  value,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(value || null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = React.useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size must be less than ${Math.round(
          maxSize / 1024 / 1024
        )}MB`;
      }

      if (accept !== "*/*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file.type || "";

        // Extract file extension in a safer way
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        // const computedMimeType = fileExtension
        //   ? `application/${fileExtension}`
        //   : "";

        const isAccepted = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            return fileType.startsWith(type.replace("/*", "")); // Matches category types (e.g., "image/*")
          }
          return type === fileType || type === `.${fileExtension}`; // Matches specific types or extensions
        });

        if (!isAccepted) {
          return `File type must be ${acceptedTypes.join(" or ")}`;
        }
      }

      return null;
    },
    [accept, maxSize]
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        const error = validateFile(droppedFile);

        if (error) {
          alert(error);
          return;
        }

        setFile(droppedFile);
        onFileChange?.(droppedFile);
      }
    },
    [disabled, validateFile, onFileChange]
  );

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        const error = validateFile(selectedFile);

        if (error) {
          alert(error);
          e.target.value = "";
          return;
        }

        setFile(selectedFile);
        onFileChange?.(selectedFile);
      }
    },
    [disabled, validateFile, onFileChange]
  );

  const handleClick = React.useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleRemove = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onFileChange?.(null);
    },
    [onFileChange]
  );

  return (
    <div className={cn("w-full mt-8", className)}>
      {title && (
        <h2 className="text-2xl font-bold mb-4">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h2>
      )}

      {description && (
        <p className="mb-4 text-muted-foreground">{description}</p>
      )}

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300",
          !disabled && "cursor-pointer hover:border-primary hover:bg-primary/5",
          disabled && "opacity-60 cursor-not-allowed",
          error && "border-red-500 bg-red-50",
          "relative"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          required={required}
          disabled={disabled}
          aria-label={`Upload ${title}`}
        />

        <div className="flex flex-col items-center gap-4">
          {icon}
          <h3 className="text-lg font-semibold">{browseText}</h3>
          <p className="text-sm text-muted-foreground">
            {file ? file.name : uploadHint}
          </p>
        </div>

        {file && (
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
