import dynamic from 'next/dynamic'
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import type { ReactQuillProps } from 'react-quill'
const ReactQuill = dynamic(() => import('react-quill') as any, { ssr: false }) as React.ComponentType<ReactQuillProps>;
import 'react-quill/dist/quill.snow.css';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  rich?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  rich,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {
        textarea
          ? <Textarea {...field} placeholder={props.placeholder ?? ""} />
          : rich
            ? <ReactQuill
              value={field.value}
              onChange={field.onChange(field.name)}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' },
                  { 'indent': '-1' }, { 'indent': '+1' }],
                ]
              }} />
            : <Input {...field} {...props} autoComplete="off" />
      }
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
