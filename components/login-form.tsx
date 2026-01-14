"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Code envoyé à lemail')
        sessionStorage.setItem('otp-email', email)
        setTimeout(() => {
          window.location.href = "/otp"
        }, 1000)
      } else {
        toast.error(data.error || 'Erreur lors de lenvoi du code')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Connexion à votre compte</CardTitle>
          <CardDescription>
            Entrez votre email pour recevoir un code de vérification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domaine.com"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <Button 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Envoi en cours...' : 'Se connecter'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
