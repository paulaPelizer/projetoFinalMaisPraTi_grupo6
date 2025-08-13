"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Users } from "lucide-react"
import { Link } from 'react-router-dom'

const projects = [
  {
    id: 1,
    name: "Projeto Alpha",
    client: "Empresa ABC",
    documentsCount: 24,
    lastUpdated: "2 horas atrás",
    status: "Em andamento",
  },
  {
    id: 2,
    name: "Expansão Sede",
    client: "Construtora XYZ",
    documentsCount: 18,
    lastUpdated: "1 dia atrás",
    status: "Em andamento",
  },
  {
    id: 3,
    name: "Reforma Unidade 3",
    client: "Indústria 123",
    documentsCount: 32,
    lastUpdated: "3 dias atrás",
    status: "Em revisão",
  },
  {
    id: 4,
    name: "Projeto Beta",
    client: "Empresa DEF",
    documentsCount: 15,
    lastUpdated: "1 semana atrás",
    status: "Concluído",
  },
]

export function RecentProjects() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{project.name}</h3>
              <Badge
                variant={
                  project.status === "Em andamento"
                    ? "default"
                    : project.status === "Em revisão"
                      ? "secondary"
                      : "outline"
                }
              >
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{project.documentsCount} documentos</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground text-right">{project.lastUpdated}</div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Mais opções</span>
            </Button>
          </div>
        </div>
      ))}
      <Link href="/projects">
        <Button variant="outline" className="w-full">
          Ver todos os projetos
        </Button>
      </Link>
    </div>
  )
}
