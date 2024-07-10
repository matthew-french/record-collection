import React from 'react'
import * as Select from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import '@/styles/select.css'

interface SelectItemProps {
  children: React.ReactNode
  className?: string
  value: string
}

interface Props {
  label?: string
  placeholder?: string
  options: string[]
  onValueChange: (value: string) => void
}

const SelectOptions = (props: Props) => {
  const {
    label = 'Select..',
    placeholder = 'Select..',
    options,
    onValueChange = () => {},
  } = props

  return (
    <Select.Root onValueChange={(value) => onValueChange(value)}>
      <Select.Trigger className="SelectTrigger" aria-label="Food">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">{label}</Select.Label>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn('SelectItem', className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)

export default SelectOptions
