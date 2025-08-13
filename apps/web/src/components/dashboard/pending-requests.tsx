"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock } from "lucide-react"
import { Link } from 'react-router-dom'

const pendingRequests = [
  {
    id: 1,
    requestNumber: "REQ-2025001",
    project: "Projeto Alpha",
    origin: "Empresa ABC (Cliente)",
    purpose: "Aprovação inicial",
    waitingTime: "3 dias",
  },
  {
    id: 2,
    requestNumber: "REQ-2025002",
    project: "Expansão Sede",
    origin: "Construtora XYZ (Fornecedor)",
    purpose: "Revisão de projeto",
    waitingTime: "2 dias",
  },
  {
    id: 3,
    requestNumber: "REQ-2025003",
    project: "Reforma Unidade 3",
    origin: "Indústria 123 (Cliente)",
    purpose: "Entrega final",
    waitingTime: "1 dia",
  },
  {
    id: 4,
    requestNumber: "REQ-2025004",
    project: "Projeto Beta",
    origin: "Interno",
    purpose: "Envio de documentação técnica",
    waitingTime: "5 horas",
  },
]

export function PendingRequests() {
  return (
    <div className="space-y-4">
      {pendingRequests.map((req) => (
        <div key={req.id} className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <h3 className="font-medium">{req.requestNumber}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{req.project}</span>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{req.origin}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{req.purpose}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{req.waitingTime}</span>
            </Badge>
            <Button size="sm" variant="secondary">
              Processar
            </Button>
          </div>
        </div>
      ))}
      <Link href="/requests">
        <Button variant="outline" className="w-full">
          Ver todas solicitações
        </Button>
      </Link>
    </div>
  )
}
