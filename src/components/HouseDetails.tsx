import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HouseDetails() {
  return (
    <Card className="overflow-hidden">
      <Image
        src="/placeholder.svg"
        alt="Casa para Eventos"
        width={800}
        height={400}
        className="w-full h-64 object-cover"
      />
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Casa de Eventos </h2>
        <p className="text-gray-600 mb-4">
          Espacio perfecto para tus celebraciones y eventos especiales. Un lugar único donde crear recuerdos
          inolvidables.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">Capacidad: 100 personas</Badge>
          <Badge variant="secondary">Amplio jardín</Badge>
          <Badge variant="secondary">Cocina equipada</Badge>
          <Badge variant="secondary">Sistema de sonido</Badge>
          <Badge variant="secondary">Estacionamiento</Badge>
        </div>
        <p className="text-sm text-gray-500">
          Nuestra casa de eventos ofrece el ambiente ideal para bodas, cumpleaños, reuniones corporativas y cualquier
          ocasión especial. Con amplios espacios tanto interiores como exteriores, y todas las comodidades necesarias
          para hacer de tu evento un éxito.
        </p>
      </CardContent>
    </Card>
  )
}

