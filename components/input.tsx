import { ComponentPropsWithoutRef } from "react";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input className="p-1 w-full" {...props} />;
}
