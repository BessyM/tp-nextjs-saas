import * as React from "react"

type Op = "+" | "-" | "*" | "/" | "%"

function isOp(c: string): c is Op {
  return c === "+" || c === "-" || c === "*" || c === "/" || c === "%"
}

function tokenize(expr: string): (number | Op)[] | null {
  const s = expr.replace(/\s+/g, "")
  if (!s) return [0]

  const tokens: (number | Op)[] = []
  let i = 0

  const pushNumber = (str: string) => {
    if (str === "-" || str === "" || str === ".") return false
    const n = Number(str)
    if (!Number.isFinite(n)) return false
    tokens.push(n)
    return true
  }

  while (i < s.length) {
    const ch = s[i]

    if (ch === "-" && (i === 0 || isOp(s[i - 1]))) {
      let num = "-"
      i++
      while (i < s.length && (/\d/.test(s[i]) || s[i] === ".")) {
        num += s[i++]
      }
      if (!pushNumber(num)) return null
      continue
    }

    if (/\d/.test(ch) || ch === ".") {
      let num = ""
      while (i < s.length && (/\d/.test(s[i]) || s[i] === ".")) {
        num += s[i++]
      }
      if ((num.match(/\./g) || []).length > 1) return null
      if (!pushNumber(num)) return null
      continue
    }

    if (isOp(ch)) {
      tokens.push(ch)
      i++
      continue
    }

    return null
  }

  return tokens
}

function toRpn(tokens: (number | Op)[]): (number | Op)[] | null {
  const output: (number | Op)[] = []
  const ops: Op[] = []
  const prec: Record<Op, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 }

  for (const t of tokens) {
    if (typeof t === "number") {
      output.push(t)
    } else {
      while (ops.length) {
        const top = ops[ops.length - 1]
        if (prec[top] >= prec[t]) output.push(ops.pop() as Op)
        else break
      }
      ops.push(t)
    }
  }

  while (ops.length) output.push(ops.pop() as Op)
  return output
}

function evalRpn(rpn: (number | Op)[]): number | null {
  const st: number[] = []
  for (const t of rpn) {
    if (typeof t === "number") {
      st.push(t)
      continue
    }
    const b = st.pop()
    const a = st.pop()
    if (a === undefined || b === undefined) return null

    let v: number
    switch (t) {
      case "+":
        v = a + b
        break
      case "-":
        v = a - b
        break
      case "*":
        v = a * b
        break
      case "/":
        v = b === 0 ? NaN : a / b
        break
      case "%":
        v = b === 0 ? NaN : a % b
        break
    }
    if (!Number.isFinite(v)) return null
    st.push(v)
  }
  return st.length === 1 ? st[0] : null
}

function formatNumber(n: number): string {
  const s = String(Number(n.toPrecision(12)))
  return s
}

export function utiliserCalculatrice() {
  const [display, setDisplay] = React.useState<string>("0")
  const [error, setError] = React.useState<string | null>(null)

  const clearDisplay = React.useCallback(() => {
    setDisplay("0")
    setError(null)
  }, [])

  const deleteLast = React.useCallback(() => {
    setError(null)
    setDisplay((prev) => {
      if (prev.length <= 1) return "0"
      const next = prev.slice(0, -1)
      return next === "-" ? "0" : next
    })
  }, [])

  const appendNumber = React.useCallback((n: number) => {
    setError(null)
    setDisplay((prev) => {
      const digit = String(n)
      if (prev === "0") return digit
      return prev + digit
    })
  }, [])

  const appendDoubleZero = React.useCallback(() => {
    setError(null)
    setDisplay((prev) => {
      if (prev === "0") return "0"
      return prev + "00"
    })
  }, [])

  const appendOperator = React.useCallback((op: Op) => {
    setError(null)
    setDisplay((prev) => {
      if (prev === "0" && op === "-") return "-"
      if (prev === "0") return "0"

      const last = prev[prev.length - 1]
      if (isOp(last)) return prev.slice(0, -1) + op

      return prev + op
    })
  }, [])

  const appendDecimal = React.useCallback(() => {
    setError(null)
    setDisplay((prev) => {
      const last = prev[prev.length - 1]
      if (isOp(last)) return prev + "0."

      let i = prev.length - 1
      while (i >= 0 && !isOp(prev[i])) i--
      const current = prev.slice(i + 1)
      if (current.includes(".")) return prev

      return prev + "."
    })
  }, [])

  const calculate = React.useCallback(() => {
    setError(null)
    setDisplay((prev) => {
      const trimmed = prev.trim()
      if (!trimmed) return "0"

      const last = trimmed[trimmed.length - 1]
      if (isOp(last)) {
        setError("Expression incomplète.")
        return prev
      }

      const tokens = tokenize(trimmed)
      if (!tokens) {
        setError("Expression invalide.")
        return prev
      }
      const rpn = toRpn(tokens)
      if (!rpn) {
        setError("Expression invalide.")
        return prev
      }
      const value = evalRpn(rpn)
      if (value === null) {
        setError("Calcul impossible.")
        return prev
      }
      return formatNumber(value)
    })
  }, [])

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key
      if (k >= "0" && k <= "9") return appendNumber(Number(k))
      if (k === ".") return appendDecimal()
      if (k === "Backspace") return deleteLast()
      if (k === "Escape") return clearDisplay()
      if (k === "Enter" || k === "=") return calculate()
      if (k === "+" || k === "-" || k === "*" || k === "/" || k === "%") return appendOperator(k as Op)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [appendNumber, appendDecimal, deleteLast, clearDisplay, calculate, appendOperator])

  return {
    display,
    error,
    clearDisplay,
    deleteLast,
    appendNumber,
    appendDoubleZero,
    appendDecimal,
    appendOperator,
    calculatrice,
  }
}
