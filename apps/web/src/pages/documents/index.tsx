import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, ArrowRightLeft } from "lucide-react"
import { Link } from 'react-router-dom'
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"

export default function DocumentsPage() {
  const documents = [
    {
      id: 1,
      code: "DOC-001",
      name: "Planta Baixa - Térreo",
      project: "Projeto Alpha",
      revision: "Rev. 2",
      format: "A1",
      status: "Aguardando cliente",
      lastLocation: "Cliente",
      lastUpdated: "2 dias atrás",
    },
    {
      id: 2,
      code: "DOC-002",
      name: "Memorial Descritivo",
      project: "Expansão Sede",
      revision: "Rev. 1",
      format: "A4",
      status: "Em revisão",
      lastLocation: "Cliente interno",
      lastUpdated: "1 dia atrás",
    },
    {
      id: 3,
      code: "DOC-003",
      name: "Projeto Estrutural",
      project: "Reforma Unidade 3",
      revision: "Rev. 3",
      format: "A2",
      status: "Aguardando fornecedor",
      lastLocation: "Fornecedor",
      lastUpdated: "5 horas atrás",
    },
    {
      id: 4,
      code: "DOC-004",
      name: "Cronograma Executivo",
      project: "Projeto Alpha",
      revision: "Rev. 1",
      format: "A4",
      status: "Concluído",
      lastLocation: "Cliente interno",
      lastUpdated: "1 semana atrás",
    },
    {
      id: 5,
      code: "DOC-005",
      name: "Projeto Hidráulico",
      project: "Expansão Sede",
      revision: "Rev. 2",
      format: "A1",
      status: "Rejeitado",
      lastLocation: "Cliente interno",
      lastUpdated: "3 dias atrás",
    },
  ]

  const routings = [
    {
      id: 1,
      grdNumber: "GRD-ABC-XYZ-2025001",
      project: "Projeto Alpha",
      origin: "Empresa ABC",
      destination: "Construtora XYZ",
      documentsCount: 3,
      date: "10/05/2025",
      status: "Aguardando fornecedor",
    },
    {
      id: 2,
      grdNumber: "GRD-XYZ-ABC-2025001",
      project: "Expansão Sede",
      origin: "Construtora XYZ",
      destination: "Empresa ABC",
      documentsCount: 2,
      date: "08/05/2025",
      status: "Aguardando cliente interno",
    },
    {
      id: 3,
      grdNumber: "GRD-IND-XYZ-2025001",
      project: "Reforma Unidade 3",
      origin: "Indústria 123",
      destination: "Construtora XYZ",
      documentsCount: 5,
      date: "05/05/2025",
      status: "Concluído",
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    if (status.includes("Aguardando cliente")) return "outline"
    if (status.includes("Em revisão")) return "secondary"
    if (status.includes("Aguardando fornecedor")) return "outline"
    if (status === "Concluído") return "default"
    if (status === "Rejeitado") return "destructive"
    return "outline"
  }

  const getStatusBadgeClass = (status: string) => {
    if (status.includes("Aguardando cliente")) return "border-blue-500 text-blue-500"
    if (status.includes("Aguardando fornecedor")) return "border-purple-500 text-purple-500"
    if (status.includes("Aguardando cliente interno")) return "border-green-500 text-green-500"
    return ""
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/documents" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Documentos" description="Gerencie documentos e tramitações">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar documentos..." className="w-full md:w-[250px] pl-8" />
              </div>
              <Link to="/documents/new">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Documento
                </Button>
              </Link>
              <Link to="/documents/routing/new">
                <Button className="neon-border">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Nova Tramitação
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="routings">Tramitações</TabsTrigger>
            </TabsList>
            <TabsContent value="documents">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Lista de Documentos</CardTitle>
                  <CardDescription>Todos os documentos cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Revisão</TableHead>
                        <TableHead>Formato</TableHead>
                        <TableHead>Localização Atual</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Atualização</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.code}</TableCell>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc.project}</TableCell>
                          <TableCell>{doc.revision}</TableCell>
                          <TableCell>{doc.format}</TableCell>
                          <TableCell>{doc.lastLocation}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(doc.status)}
                              className={cn(getStatusBadgeClass(doc.status))}
                            >
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.lastUpdated}</TableCell>
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
                                  <Link to={`/documents/${doc.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/documents/${doc.id}/history`} className="flex w-full">
                                    Histórico de revisões
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/documents/${doc.id}/edit`} className="flex w-full">
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
            </TabsContent>
            <TabsContent value="routings">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Tramitações</CardTitle>
                  <CardDescription>Histórico de tramitações de documentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>GRD</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {routings.map((routing) => (
                        <TableRow key={routing.id}>
                          <TableCell className="font-medium">{routing.grdNumber}</TableCell>
                          <TableCell>{routing.project}</TableCell>
                          <TableCell>{routing.origin}</TableCell>
                          <TableCell>{routing.destination}</TableCell>
                          <TableCell>{routing.documentsCount}</TableCell>
                          <TableCell>{routing.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(routing.status)}
                              className={cn(getStatusBadgeClass(routing.status))}
                            >
                              {routing.status}
                            </Badge>
                          </TableCell>
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
                                  <Link to={`/documents/routing/${routing.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/documents/routing/${routing.id}/grd`} className="flex w-full">
                                    Visualizar GRD
                                  </Link>
                                </DropdownMenuItem>
                                {routing.status !== "Concluído" && (
                                  <DropdownMenuItem>
                                    <Link to={`/documents/routing/${routing.id}/validate`} className="flex w-full">
                                      Validar
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
