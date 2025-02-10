import ReservationForm from "@/components/ReservationForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Reserva tu Evento</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ReservationForm />
        </div>
      </div>
    </div>
  )
}

