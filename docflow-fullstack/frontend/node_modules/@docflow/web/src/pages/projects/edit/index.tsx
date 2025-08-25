import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter, useSearchParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function EditMultipleProjectsPage() {
  const router = useNavigate()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<any[]>([])

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",").map(Number) || []

    // Simulação de dados dos projetos selecionados
    const mockProjects = [
      {
        id: 1,
        name: "Projeto Alpha",
        client: "Empresa ABC",
        status: "Em andamento",
      },
      {
        id: 2,
        name: "Expansão Sede",
        client: "Construtora XYZ",
        status: "Em andamento",
      },
      {
        id: 3,
        name: "Reforma Unidade 3",
        client: "Indústria 123",
        status: "Em revisão",
      },
    ]

    const filtered = mockProjects.filter((project) => ids.includes(project.id))
    setSelectedProjects(filtered)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento em lote
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    navigate("/projects")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/projects" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <PageHeader
            title="Editar Projetos em Lote"
            description={`Editar ${selectedProjects.length} projeto${selectedProjects.length === 1 ? "" : "s"} selecionado${selectedProjects.length === 1 ? "" : "s"}`}
          >
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Projetos Selecionados</CardTitle>
                <CardDescription>Projetos que serão editados em lote</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{project.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Alterações em Lote</CardTitle>
                  <CardDescription>As alterações serão aplicadas a todos os projetos selecionados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Alterar Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um novo status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planejamento">Planejamento</SelectItem>
                          <SelectItem value="em-andamento">Em Andamento</SelectItem>
                          <SelectItem value="em-revisao">Em Revisão</SelectItem>
                          <SelectItem value="pausado">Pausado</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Definir Prioridade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="critica">Crítica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      placeholder="Adicione observações que serão aplicadas a todos os projetos..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Link to="/projects">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="neon-border">
                  {isLoading ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações em Lote
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
