import { useState } from 'react';

import { SiApple, SiPaypal } from '@icons-pack/react-simple-icons'
import { CheckIcon, ChevronsUpDownIcon, CreditCardIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import * as Card from '~/components/ui/card'
import * as FormLabel from '~/components/ui/form-label'
import * as Input from '~/components/ui/input'
import * as RadioButtonGroup from '~/components/ui/radio-button-group'
import * as Select from '~/components/ui/select'


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const years = ['2023', '2024', '2025']

const Payment = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Payment Method</Card.Title>
        <Card.Description>
          Add a payment method to your account to start your subscription.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <RadioButtonGroup.Root defaultValue="card" variant="outline">
          {[
            { value: 'card', label: 'Card', icon: CreditCardIcon },
            { value: 'paypal', label: 'Paypal', icon: SiPaypal },
            { value: 'apple', label: 'Apple', icon: SiApple },
          ].map((option, id) => (
            <RadioButtonGroup.Item key={id} value={option.value} height="auto" py="4">
              <RadioButtonGroup.ItemControl />
              <RadioButtonGroup.ItemText>
                <option.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                {option.label}
              </RadioButtonGroup.ItemText>
            </RadioButtonGroup.Item>
          ))}
        </RadioButtonGroup.Root>
        <Select.Root items={months} positioning={{ sameWidth: true }}>
          <Select.Label>Month</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Month" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {months.map((month) => (
                <Select.Item key={month} item={month}>
                  <Select.ItemText>{month}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <Select.Root items={years} positioning={{ sameWidth: true }}>
          <Select.Label>Year</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Year" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {years.map((year) => (
                <Select.Item key={year} item={year}>
                  <Select.ItemText>{year}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Card.Body>
      <Card.Footer>
        <Button width="full">Continue</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default Payment;
