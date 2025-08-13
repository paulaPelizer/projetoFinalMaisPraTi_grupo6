import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { BarChart, FileText, FolderKanban, Users, ArrowRightLeft, Clock } from "lucide-react"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { PendingDocuments } from "@/components/dashboard/pending-documents"
import { DocumentStats } from "@/components/dashboard/document-stats"
import { PendingRequests } from "@/components/dashboard/pending-requests"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/dashboard" />
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Atividade Recente
            </Button>
            <Button size="sm" className="neon-border">
              <FileText className="mr-2 h-4 w-4" />
              Nova Tramitação
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <PageHeader title="Dashboard" />
            <div className="flex gap-2">
              <Link to="/projects/new">
                <Button variant="outline">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  Novo Projeto
                </Button>
              </Link>
              <Link to="/requests/new">
                <Button className="neon-border">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Nova Solicitação
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
            <Card className="neon-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
                <FolderKanban className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 no último mês</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos Tramitados</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">+22 na última semana</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GRDs Geradas</CardTitle>
                <ArrowRightLeft className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">+5 nos últimos 7 dias</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes/Fornecedores</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/18</div>
                <p className="text-xs text-muted-foreground">Total de cadastros ativos</p>
              </CardContent>
            </Card>
            <Card className="neon-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Análise</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 neon-border">
                  <CardHeader>
                    <CardTitle>Projetos Recentes</CardTitle>
                    <CardDescription>Últimos projetos atualizados ou criados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentProjects />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 neon-border">
                  <CardHeader>
                    <CardTitle>Documentos Pendentes</CardTitle>
                    <CardDescription>Documentos aguardando validação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PendingDocuments />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 neon-border">
                  <CardHeader>
                    <CardTitle>Solicitações Pendentes</CardTitle>
                    <CardDescription>Solicitações aguardando processamento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PendingRequests />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-3 neon-border">
                  <CardHeader>
                    <CardTitle>Estatísticas de Documentos</CardTitle>
                    <CardDescription>Distribuição por tipo e status</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <DocumentStats />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-4 neon-border">
                  <CardHeader>
                    <CardTitle>Últimas GRDs Geradas</CardTitle>
                    <CardDescription>Guias de remessa recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">GRD-ABC-XYZ-{2025000 + i}</p>
                            <p className="text-sm text-muted-foreground">Projeto Alpha - Rev. {i}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">
                              {i} dia{i > 1 ? "s" : ""} atrás
                            </p>
                            <p className="text-sm text-muted-foreground">{3 + i} documentos</p>
                          </div>
                        </div>
                      ))}
                      <Link to="/grds">
                        <Button variant="outline" className="w-full">
                          Ver todas as GRDs
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Análise de Documentos</CardTitle>
                  <CardDescription>Estatísticas e métricas de documentos por projeto</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <BarChart className="h-16 w-16 text-primary" />
                    <h3 className="text-xl font-bold">Análise de Documentos</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Visualize estatísticas detalhadas sobre tramitações, tempos de aprovação e distribuição de
                      documentos por projeto.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Relatórios</CardTitle>
                  <CardDescription>Gere relatórios personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {["Tramitações por Projeto", "Status de Documentos", "Tempo de Aprovação", "GRDs por Período"].map(
                      (report) => (
                        <Card key={report} className="p-4 hover:bg-muted/50 cursor-pointer">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-medium">{report}</h3>
                            <p className="text-sm text-muted-foreground">Gerar relatório</p>
                          </div>
                        </Card>
                      ),
                    )}
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
