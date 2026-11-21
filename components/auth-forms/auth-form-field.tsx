import type { ComponentProps } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type AuthFormFieldProps = ComponentProps<typeof Input> & {
  label: string
  description?: string
}

export function AuthFormField({
  label,
  description,
  id,
  ...inputProps
}: AuthFormFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} {...inputProps} />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  )
}
