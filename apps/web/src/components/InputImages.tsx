import { FC } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Label } from './ui/label';
import { Image } from 'lucide-react';

interface DropzoneProps {
  label: string;
  isError: boolean;
  onDrop: (files: FileWithPath[]) => void;
  Ref?: any;
}

export const InputImages: FC<DropzoneProps> = ({
  isError,
  label,
  onDrop,
  Ref,
}) => {
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });
  return (
    <div className="space-y-1.5">
      <Label className="text-base">{label}</Label>
      <div
        {...getRootProps({
          className:
            'p-4 border-2 border-slate-300 border-dashed flex flex-col items-center gap-2 justify-center rounded-md',
        })}
        ref={Ref}
      >
        <input {...getInputProps()} />
        <Image size={70} className="text-blue-500" />
        <Label className="text-sm">Drag & drop images here</Label>
      </div>
      {isError && (
        <div className="text-xs text-red-500">{label} is Required</div>
      )}
    </div>
  );
};
