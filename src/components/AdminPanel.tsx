"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

const initialReservations = [
  { id: 1, date: "2025-02-15", services: ["Catering", "DJ"], cost: 1900, paymentStatus: "Por pagar" },
  { id: 2, date: "2025-03-25", services: ["Decoración"], cost: 1300, paymentStatus: "Pagado" },
]

type PaymentStatus = "Por pagar" | "Pagado" | "Reserva pagada"

export default function AdminPanel() {
  const [reservations, setReservations] = useState(initialReservations)

  const handleDelete = (id: number) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id))
  }

  const handlePaymentStatusChange = (id: number, newStatus: PaymentStatus) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, paymentStatus: newStatus } : reservation,
      ),
    )
  }

//   const getStatusBadge = (status: PaymentStatus) => {
//     switch (status) {
//       case "Por pagar":
//         return (
//           <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
//             Por pagar
//           </Badge>
//         )
//       case "Pagado":
//         return (
//           <Badge variant="outline" className="bg-green-100 text-green-800">
//             Pagado
//           </Badge>
//         )
//       case "Reserva pagada":
//         return (
//           <Badge variant="outline" className="bg-blue-100 text-blue-800">
//             Reserva pagada
//           </Badge>
//         )
//     }
//   }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas Actuales</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fecha del Evento</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Costo</TableHead>
              <TableHead>Estado del Pago</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.services.join(", ")}</TableCell>
                <TableCell>${reservation.cost}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handlePaymentStatusChange(reservation.id, value as PaymentStatus)}
                    defaultValue={reservation.paymentStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado del pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Por pagar">Por pagar</SelectItem>
                      <SelectItem value="Pagado">Pagado</SelectItem>
                      <SelectItem value="Reserva pagada">Reserva pagada</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(reservation.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

