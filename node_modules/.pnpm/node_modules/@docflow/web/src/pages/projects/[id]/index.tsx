import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, FileText, Users, Calendar, Building, Clock } from "lucide-react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ProjectDetailPage() {
  const params = useParams()

  // Dados simulados do projeto
  const project = {
    id: params.id,
    name: "Projeto Alpha",
    code: "PROJ-2025-001",
    description: "Expansão da sede principal com novas instalações administrativas e técnicas.",
    client: "Empresa ABC",
    status: "Em andamento",
    startDate: "01/03/2025",
    endDate: "30/09/2025",
    progress: 65,
    documentsCount: 24,
    milestonesCount: 4,
    suppliers: ["Construtora XYZ", "Engenharia ABC"],
  }

  const milestones = [
    {
      id: 1,
      name: "Entrega Inicial",
      description: "Plantas baixas e memoriais descritivos",
      dueDate: "15/04/2025",
      status: "Concluído",
      documentsCount: 6,
    },
    {
      id: 2,
      name: "Projetos Complementares",
      description: "Projetos estruturais, hidráulicos e elétricos",
      dueDate: "30/05/2025",
      status: "Em andamento",
      documentsCount: 8,
    },
    {
      id: 3,
      name: "Documentação Executiva",
      description: "Detalhamentos e especificações técnicas",
      dueDate: "15/07/2025",
      status: "Pendente",
      documentsCount: 6,
    },
    {
      id: 4,
      name: "Entrega Final",
      description: "As-built e documentação final",
      dueDate: "30/09/2025",
      status: "Pendente",
      documentsCount: 4,
    },
  ]

  const documents = [
    {
      id: 1,
      code: "DOC-001",
      name: "Planta Baixa - Térreo",
      type: "Planta Baixa",
      revision: "Rev. 2",
      status: "Aprovado",
      milestone: "Entrega Inicial",
    },
    {
      id: 2,
      code: "DOC-002",
      name: "Memorial Descritivo",
      type: "Memorial",
      revision: "Rev. 1",
      status: "Em revisão",
      milestone: "Entrega Inicial",
    },
    {
      id: 3,
      code: "DOC-003",
      name: "Projeto Estrutural",
      type: "Projeto Estrutural",
      revision: "Rev. 3",
      status: "Aguardando aprovação",
      milestone: "Projetos Complementares",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
      case "Aprovado":
        return "default"
      case "Em andamento":
      case "Em revisão":
        return "secondary"
      case "Pendente":
      case "Aguardando aprovação":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/projects" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <PageHeader title={project.name} description={`Código: ${project.code}`}>
            <div className="flex gap-2">
              <Link to="/projects">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <Link to={`/projects/${params.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
            </div>
          </PageHeader>

          <div className="space-y-6">
            {/* Informações Gerais */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Início</p>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Previsão</p>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="milestones" className="space-y-4">
              <TabsList>
                <TabsTrigger value="milestones">Marcos Contratuais</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
              </TabsList>

              <TabsContent value="milestones">
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle>Marcos Contratuais</CardTitle>
                    <CardDescription>Cronograma de entregas e marcos do projeto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{milestone.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                              <span className="text-sm text-muted-foreground">{milestone.dueDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {milestone.documentsCount} documentos
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle>Documentos do Projeto</CardTitle>
                    <CardDescription>Lista de todos os documentos relacionados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Revisão</TableHead>
                          <TableHead>Marco</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.code}</TableCell>
                            <TableCell>{doc.name}</TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.revision}</TableCell>
                            <TableCell>{doc.milestone}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suppliers">
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle>Fornecedores</CardTitle>
                    <CardDescription>Fornecedores envolvidos no projeto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.suppliers.map((supplier, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{supplier}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
