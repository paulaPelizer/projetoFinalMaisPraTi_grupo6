import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FolderKanban, MoreHorizontal, Plus, Search, Users, Edit } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ProjectsPage() {
  const router = useNavigate()
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])

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
    {
      id: 5,
      name: "Modernização Planta",
      client: "Indústria XYZ",
      documentsCount: 28,
      lastUpdated: "2 semanas atrás",
      status: "Em andamento",
    },
    {
      id: 6,
      name: "Ampliação Fábrica",
      client: "Manufatura ABC",
      documentsCount: 42,
      lastUpdated: "1 mês atrás",
      status: "Concluído",
    },
  ]

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([])
    } else {
      setSelectedProjects(projects.map((project) => project.id))
    }
  }

  const handleEditSelected = () => {
    if (selectedProjects.length === 0) return
    navigate(`/projects/edit?ids=${selectedProjects.join(",")}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/projects" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Projetos" description="Gerencie todos os projetos e suas documentações">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar projetos..." className="w-full md:w-[250px] pl-8" />
              </div>
              {selectedProjects.length > 0 && (
                <Button onClick={handleEditSelected} variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar {selectedProjects.length} Projeto{selectedProjects.length === 1 ? "" : "s"}
                </Button>
              )}
              <Link to="/projects/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Projeto
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Projetos</CardTitle>
              <CardDescription>Todos os projetos cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProjects.length === projects.length && projects.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Selecionar todos"
                      />
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={() => handleSelectProject(project.id)}
                          aria-label={`Selecionar ${project.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FolderKanban className="h-4 w-4 text-muted-foreground" />
                          {project.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {project.client}
                        </div>
                      </TableCell>
                      <TableCell>{project.documentsCount}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={`/projects/${project.id}`} className="flex w-full">
                                Ver detalhes
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/projects/${project.id}/documents`} className="flex w-full">
                                Lista de documentos
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/projects/${project.id}/planning`} className="flex w-full">
                                Planejamento
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/projects/${project.id}/routing`} className="flex w-full">
                                Tramitações
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/projects/${project.id}/edit`} className="flex w-full">
                                Editar
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
