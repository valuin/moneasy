"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import Spinner from "./ui/spinner";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={isPending}>
      {isPending ? <div className="flex justify-center items-center"><Spinner /></div> : children}
    </button>
  );
}