import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ProjectPlanningPage() {
  const params = useParams()

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluído":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Em andamento":
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
        return "default"
      case "Em andamento":
        return "secondary"
      case "Atrasado":
        return "destructive"
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
          <PageHeader title="Planejamento - Projeto Alpha" description="Cronograma e marcos contratuais do projeto">
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
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
