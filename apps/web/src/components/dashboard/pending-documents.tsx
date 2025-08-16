"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock } from "lucide-react"
import { Link } from 'react-router-dom'

const pendingDocuments = [
  {
    id: 1,
    name: "Planta Baixa - Térreo",
    project: "Projeto Alpha",
    format: "A1",
    revision: "Rev. 2",
    waitingTime: "3 dias",
  },
  {
    id: 2,
    name: "Memorial Descritivo",
    project: "Expansão Sede",
    format: "A4",
    revision: "Rev. 1",
    waitingTime: "2 dias",
  },
  {
    id: 3,
    name: "Projeto Estrutural",
    project: "Reforma Unidade 3",
    format: "A2",
    revision: "Rev. 3",
    waitingTime: "1 dia",
  },
  {
    id: 4,
    name: "Cronograma Executivo",
    project: "Projeto Alpha",
    format: "A4",
    revision: "Rev. 1",
    waitingTime: "5 horas",
  },
]

export function PendingDocuments() {
  return (
    <div className="space-y-4">
      {pendingDocuments.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <h3 className="font-medium">{doc.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{doc.project}</span>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>
                  {doc.format} - {doc.revision}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{doc.waitingTime}</span>
            </Badge>
            <Button size="sm" variant="secondary">
              Validar
            </Button>
          </div>
        </div>
      ))}
      <Link href="/documents/pending">
        <Button variant="outline" className="w-full">
          Ver todos pendentes
        </Button>
      </Link>
    </div>
  )
}
