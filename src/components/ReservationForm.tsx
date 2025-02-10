"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const additionalServices = [
  { id: 1, name: "Servicio de catering", price: 500 },
  { id: 2, name: "Decoración", price: 300 },
  { id: 3, name: "DJ", price: 400 },
]

// Días ya reservados (ejemplo)
const reservedDays = [new Date(2025, 1, 4), new Date(2025, 3, 20), new Date(2023, 5, 25)]

export default function ReservationForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [totalCost, setTotalCost] = useState(0)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    // Reiniciar el costo total cuando se selecciona una nueva fecha
    setTotalCost(1000) // Precio base por día
  }

  const handleServiceChange = (serviceId: number, checked: boolean) => {
    setSelectedServices((prev) => (checked ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)))
    calculateTotalCost(serviceId, checked)
  }

  const calculateTotalCost = (serviceId: number, add: boolean) => {
    const service = additionalServices.find((s) => s.id === serviceId)
    if (service) {
      setTotalCost((prev) => (add ? prev + service.price : prev - service.price))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reserva enviada:", { selectedDate, selectedServices, totalCost, paymentStatus: "Por pagar" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="date" className="text-lg font-medium text-gray-700 mb-2 block">
          Selecciona la fecha del evento
        </Label>
        <Calendar
          id="date"
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
          locale={es}
          disabled={(date) => {
            // Deshabilitar fechas pasadas y días ya reservados
            return (
              date < new Date() ||
              reservedDays.some(
                (reservedDate) =>
                  reservedDate.getDate() === date.getDate() &&
                  reservedDate.getMonth() === date.getMonth() &&
                  reservedDate.getFullYear() === date.getFullYear(),
              )
            )
          }}
          modifiers={{
            booked: reservedDays,
          }}
          modifiersStyles={{
            booked: { color: "white", backgroundColor: "red" },
          }}
        />
      </div>
      {selectedDate && (
        <Badge variant="outline" className="text-sm">
          {format(selectedDate, "dd MMMM, yyyy", { locale: es })}
        </Badge>
      )}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Servicios adicionales</h3>
          <div className="space-y-2">
            {additionalServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service.id}`}
                    onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                  />
                  <Label htmlFor={`service-${service.id}`} className="text-sm text-gray-600">
                    {service.name}
                  </Label>
                </div>
                <span className="text-sm font-medium text-gray-500">${service.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div>
        <Label htmlFor="total-cost" className="text-lg font-medium text-gray-700 mb-2 block">
          Costo Total
        </Label>
        <Input id="total-cost" type="text" value={`$${totalCost}`} readOnly className="text-lg font-bold" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Estado del Pago</h3>
        <Badge variant="secondary" className="text-yellow-600 bg-yellow-100">
          Por pagar
        </Badge>
      </div>
      <Button type="submit" className="w-full" disabled={!selectedDate}>
        Confirmar Reserva
      </Button>
    </form>
  )
}

