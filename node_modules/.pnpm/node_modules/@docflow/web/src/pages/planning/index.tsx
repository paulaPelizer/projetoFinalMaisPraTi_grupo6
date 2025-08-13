import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, AlertTriangle, CheckCircle, Clock, TrendingDown, TrendingUp } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function PlanningPage() {
  const [selectedProject, setSelectedProject] = useState("projeto-alpha")

  const projects = [
    { id: "projeto-alpha", name: "Projeto Alpha" },
    { id: "expansao-sede", name: "Expansão Sede" },
    { id: "reforma-unidade-3", name: "Reforma Unidade 3" },
    { id: "projeto-beta", name: "Projeto Beta" },
  ]

  const milestones = [
    {
      id: 1,
      name: "Entrega Inicial",
      dueDate: "15/04/2025",
      status: "Concluído",
      progress: 100,
      documentsTotal: 6,
      documentsDelivered: 6,
      daysUntilDue: -5,
    },
    {
      id: 2,
      name: "Projetos Complementares",
      dueDate: "30/05/2025",
      status: "Em andamento",
      progress: 75,
      documentsTotal: 8,
      documentsDelivered: 6,
      daysUntilDue: 15,
    },
    {
      id: 3,
      name: "Documentação Executiva",
      dueDate: "15/07/2025",
      status: "Atrasado",
      progress: 25,
      documentsTotal: 6,
      documentsDelivered: 1,
      daysUntilDue: -3,
    },
    {
      id: 4,
      name: "Entrega Final",
      dueDate: "30/09/2025",
      status: "Pendente",
      progress: 0,
      documentsTotal: 4,
      documentsDelivered: 0,
      daysUntilDue: 120,
    },
  ]

  const documents = [
    {
      id: 1,
      code: "DOC-001",
      name: "Planta Baixa - Térreo",
      milestone: "Entrega Inicial",
      dueDate: "15/04/2025",
      deliveredDate: "12/04/2025",
      status: "Entregue",
      daysDelay: 0,
    },
    {
      id: 2,
      code: "DOC-002",
      name: "Memorial Descritivo",
      milestone: "Entrega Inicial",
      dueDate: "15/04/2025",
      deliveredDate: "18/04/2025",
      status: "Entregue",
      daysDelay: 3,
    },
    {
      id: 3,
      code: "DOC-003",
      name: "Projeto Estrutural",
      milestone: "Projetos Complementares",
      dueDate: "30/05/2025",
      deliveredDate: null,
      status: "Em elaboração",
      daysDelay: 0,
    },
    {
      id: 4,
      code: "DOC-004",
      name: "Cronograma Executivo",
      milestone: "Documentação Executiva",
      dueDate: "15/07/2025",
      deliveredDate: null,
      status: "Atrasado",
      daysDelay: 3,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluído":
      case "Entregue":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Em andamento":
      case "Em elaboração":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Atrasado":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
      case "Entregue":
        return "default"
      case "Em andamento":
      case "Em elaboração":
        return "secondary"
      case "Atrasado":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDelayTrend = (daysDelay: number) => {
    if (daysDelay > 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    } else if (daysDelay < 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    }
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/planning" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Planejamento" description="Cronograma de entregas e marcos contratuais">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar..." className="w-full md:w-[200px] pl-8" />
              </div>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Selecionar projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PageHeader>

          <Tabs defaultValue="timeline" className="space-y-4">
            <TabsList>
              <TabsTrigger value="timeline">Cronograma</TabsTrigger>
              <TabsTrigger value="analytics">Análise de Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              {/* Resumo do Projeto */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="neon-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Marcos</CardTitle>
                    <Calendar className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">1 concluído, 2 em andamento</p>
                  </CardContent>
                </Card>
                <Card className="neon-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documentos</CardTitle>
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">13/24</div>
                    <p className="text-xs text-muted-foreground">54% entregues</p>
                  </CardContent>
                </Card>
                <Card className="neon-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Próximo Marco</CardTitle>
                    <Clock className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15 dias</div>
                    <p className="text-xs text-muted-foreground">Projetos Complementares</p>
                  </CardContent>
                </Card>
                <Card className="neon-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Marco em atraso</p>
                  </CardContent>
                </Card>
              </div>

              {/* Cronograma de Marcos */}
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Marcos Contratuais</CardTitle>
                  <CardDescription>Cronograma de entregas e status atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(milestone.status)}
                            <h3 className="font-medium">{milestone.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                            <span className="text-sm text-muted-foreground">{milestone.dueDate}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>
                              {milestone.documentsDelivered}/{milestone.documentsTotal} documentos
                            </span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                          <span>{milestone.progress}% concluído</span>
                          <span>
                            {milestone.daysUntilDue > 0
                              ? `${milestone.daysUntilDue} dias restantes`
                              : milestone.daysUntilDue < 0
                                ? `${Math.abs(milestone.daysUntilDue)} dias de atraso`
                                : "Vence hoje"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Documentos */}
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Documentos por Marco</CardTitle>
                  <CardDescription>Status de entrega de cada documento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <p className="font-medium">
                              {doc.code} - {doc.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{doc.milestone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-right">
                            <p className="font-medium">Prazo: {doc.dueDate}</p>
                            {doc.deliveredDate && (
                              <p className="text-muted-foreground">Entregue: {doc.deliveredDate}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                            {doc.daysDelay !== 0 && getDelayTrend(doc.daysDelay)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Métricas de Performance */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Taxa de Entrega no Prazo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">67%</div>
                    <p className="text-sm text-muted-foreground">8 de 12 documentos</p>
                  </CardContent>
                </Card>
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Atraso Médio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-500">2.3 dias</div>
                    <p className="text-sm text-muted-foreground">Para documentos atrasados</p>
                  </CardContent>
                </Card>
                <Card className="neon-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Marcos em Risco</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-500">1</div>
                    <p className="text-sm text-muted-foreground">Documentação Executiva</p>
                  </CardContent>
                </Card>
              </div>

              {/* Gráfico de Entregas */}
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Análise de Entregas por Marco</CardTitle>
                  <CardDescription>Comparativo entre datas previstas e entregas realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{milestone.name}</h4>
                          <span className="text-sm text-muted-foreground">{milestone.dueDate}</span>
                        </div>
                        <div className="grid grid-cols-10 gap-1 h-8">
                          {Array.from({ length: milestone.documentsTotal }, (_, i) => (
                            <div
                              key={i}
                              className={`rounded ${
                                i < milestone.documentsDelivered
                                  ? "bg-green-500"
                                  : milestone.status === "Atrasado"
                                    ? "bg-red-500"
                                    : "bg-gray-300"
                              }`}
                              title={
                                i < milestone.documentsDelivered
                                  ? "Documento entregue"
                                  : milestone.status === "Atrasado"
                                    ? "Documento atrasado"
                                    : "Documento pendente"
                              }
                            />
                          ))}
                          {Array.from({ length: 10 - milestone.documentsTotal }, (_, i) => (
                            <div key={`empty-${i}`} className="rounded bg-gray-100" />
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {milestone.documentsDelivered} entregues de {milestone.documentsTotal}
                          </span>
                          <span>{milestone.progress}% concluído</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Identificação de Erosões */}
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Identificação de Erosões</CardTitle>
                  <CardDescription>Documentos e marcos com risco de atraso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-medium text-red-700">Alto Risco</h4>
                      <p className="text-sm text-muted-foreground">
                        Marco "Documentação Executiva" com 3 dias de atraso e apenas 25% de progresso
                      </p>
                      <div className="mt-2">
                        <Badge variant="destructive">Ação Imediata Necessária</Badge>
                      </div>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <h4 className="font-medium text-yellow-700">Médio Risco</h4>
                      <p className="text-sm text-muted-foreground">
                        Marco "Projetos Complementares" com 15 dias restantes e 75% de progresso
                      </p>
                      <div className="mt-2">
                        <Badge variant="secondary">Monitoramento Necessário</Badge>
                      </div>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-medium text-green-700">Baixo Risco</h4>
                      <p className="text-sm text-muted-foreground">
                        Marco "Entrega Final" com 120 dias restantes e cronograma adequado
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline">No Prazo</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
