import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FilterOption {
  value: string
  label: string
}

interface FilterRadioGroupProps {
  title: string
  name: string // radios with the same name belong to one group
  options: FilterOption[]
  selected: string // the value that is currently chosen
  onChange: (value: string) => void
}

export function FilterRadioGroup({
  title,
  name,
  options,
  selected,
  onChange,
}: FilterRadioGroupProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{title}</legend>

      <div className="space-y-1">
        {options.map((option) => {
          const isSelected = option.value === selected

          return (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm focus-within:ring-2 focus-within:ring-ring hover:bg-accent"
            >
              {/* The real radio is hidden. The square below is what people see. */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded border",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input"
                )}
              >
                {isSelected && <Check className="size-3.5" />}
              </span>

              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
