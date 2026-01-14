"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculatrice } from "@/hooks/calculatrice"

type Props = React.HTMLAttributes<HTMLDivElement>

export function Calculatrice({ className, ...props }: Props) {
  const {
    display,
    error,
    clearDisplay,
    deleteLast,
    appendNumber,
    appendDoubleZero,
    appendDecimal,
    appendOperator,
    calculate,
  } = utiliserCalculatrice()

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="space-y-2">
          <Input
            value={display}
            readOnly
            className="h-16 text-right text-3xl font-semibold tracking-tight"
          />
          {error ? <div className="text-sm text-destructive">{error}</div> : <div className="h-5" />}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Button variant="secondary" className="h-12" onClick={clearDisplay}>AC</Button>
          <Button variant="secondary" className="h-12" onClick={deleteLast}>DEL</Button>
          <Button variant="secondary" className="h-12" onClick={() => appendOperator("%")}>%</Button>
          <Button variant="secondary" className="h-12" onClick={() => appendOperator("/")}>÷</Button>

          <Button className="h-12" variant="outline" onClick={() => appendNumber(7)}>7</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(8)}>8</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(9)}>9</Button>
          <Button variant="secondary" className="h-12" onClick={() => appendOperator("*")}>×</Button>

          <Button className="h-12" variant="outline" onClick={() => appendNumber(4)}>4</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(5)}>5</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(6)}>6</Button>
          <Button variant="secondary" className="h-12" onClick={() => appendOperator("-")}>-</Button>

          <Button className="h-12" variant="outline" onClick={() => appendNumber(1)}>1</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(2)}>2</Button>
          <Button className="h-12" variant="outline" onClick={() => appendNumber(3)}>3</Button>
          <Button variant="secondary" className="h-12" onClick={() => appendOperator("+")}>+</Button>

          <Button className="h-12" variant="outline" onClick={() => appendNumber(0)}>0</Button>
          <Button className="h-12" variant="outline" onClick={appendDoubleZero}>00</Button>
          <Button className="h-12" variant="outline" onClick={appendDecimal}>.</Button>
          <Button className="h-12" onClick={calculate}>=</Button>
        </div>
      </div>
    </div>
  )
}
