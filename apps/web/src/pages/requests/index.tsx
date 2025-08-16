import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Eye, UserCheck } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function RequestsPage() {
  const navigate = useNavigate()
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const requests = [
    {
      id: 1,
      requestNumber: "REQ-2025001",
      project: "Projeto Alpha",
      origin: "Empresa ABC (Cliente)",
      destination: "Construtora XYZ (Fornecedor)",
      purpose: "Aprovação inicial",
      documentsCount: 3,
      date: "10/05/2025",
      status: "Pendente",
    },
    {
      id: 2,
      requestNumber: "REQ-2025002",
      project: "Expansão Sede",
      origin: "Construtora XYZ (Fornecedor)",
      destination: "Empresa ABC (Cliente)",
      purpose: "Revisão de projeto",
      documentsCount: 2,
      date: "08/05/2025",
      status: "Em análise",
    },
    {
      id: 3,
      requestNumber: "REQ-2025003",
      project: "Reforma Unidade 3",
      origin: "Indústria 123 (Cliente)",
      destination: "Construtora XYZ (Fornecedor)",
      purpose: "Entrega final",
      documentsCount: 5,
      date: "05/05/2025",
      status: "Aprovada",
    },
    {
      id: 4,
      requestNumber: "REQ-2025004",
      project: "Projeto Beta",
      origin: "Interno",
      destination: "Empresa DEF (Cliente)",
      purpose: "Envio de documentação técnica",
      documentsCount: 4,
      date: "03/05/2025",
      status: "Pendente",
    },
    {
      id: 5,
      requestNumber: "REQ-2025005",
      project: "Modernização Planta",
      origin: "Manufatura ABC (Fornecedor)",
      destination: "Indústria XYZ (Cliente)",
      purpose: "Atualização de cronograma",
      documentsCount: 1,
      date: "01/05/2025",
      status: "Rejeitada",
    },
  ]

  const completedRequests = [
    {
      id: 6,
      requestNumber: "REQ-2025006",
      project: "Ampliação Fábrica",
      origin: "Empresa ABC (Cliente)",
      destination: "Manufatura ABC (Fornecedor)",
      purpose: "Aprovação de orçamento",
      documentsCount: 2,
      date: "28/04/2025",
      status: "Concluída",
      grdNumber: "GRD-ABC-MAN-2025004",
    },
    {
      id: 7,
      requestNumber: "REQ-2025007",
      project: "Projeto Alpha",
      origin: "Construtora XYZ (Fornecedor)",
      destination: "Empresa ABC (Cliente)",
      purpose: "Entrega parcial",
      documentsCount: 3,
      date: "25/04/2025",
      status: "Concluída",
      grdNumber: "GRD-XYZ-ABC-2025005",
    },
    {
      id: 8,
      requestNumber: "REQ-2025008",
      project: "Expansão Sede",
      origin: "Interno",
      destination: "Construtora XYZ (Fornecedor)",
      purpose: "Solicitação de revisão",
      documentsCount: 1,
      date: "20/04/2025",
      status: "Concluída",
      grdNumber: "GRD-INT-XYZ-2025006",
    },
  ]

  const pendingRequests = requests.filter((req) => req.status === "Pendente" || req.status === "Em análise")

  const handleSelectRequest = (requestId: number) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId],
    )
  }

  const handleSelectAll = () => {
    if (selectedRequests.length === pendingRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(pendingRequests.map((req) => req.id))
    }
  }

  const handleAttendRequests = async () => {
    if (selectedRequests.length === 0) return

    setIsProcessing(true)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)

    // Redirecionar para página de atendimento
    navigate(`/requests/attend?ids=${selectedRequests.join(",")}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/requests" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Solicitações" description="Gerencie solicitações de tramitação de documentos">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar solicitações..." className="w-full md:w-[250px] pl-8" />
              </div>
              <Link to="/requests/new">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Solicitação
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <Card className="neon-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Solicitações Pendentes</CardTitle>
                      <CardDescription>Solicitações que aguardam análise ou aprovação</CardDescription>
                    </div>
                    {selectedRequests.length > 0 && (
                      <Button onClick={handleAttendRequests} disabled={isProcessing} className="neon-border" size="sm">
                        <UserCheck className="mr-2 h-4 w-4" />
                        {isProcessing
                          ? "Processando..."
                          : `Atender ${selectedRequests.length} Solicitaç${selectedRequests.length === 1 ? "ão" : "ões"}`}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRequests.length === pendingRequests.length && pendingRequests.length > 0}
                            onCheckedChange={handleSelectAll}
                            aria-label="Selecionar todas"
                          />
                        </TableHead>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Propósito</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedRequests.includes(request.id)}
                              onCheckedChange={() => handleSelectRequest(request.id)}
                              aria-label={`Selecionar ${request.requestNumber}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{request.requestNumber}</TableCell>
                          <TableCell>{request.project}</TableCell>
                          <TableCell>{request.origin}</TableCell>
                          <TableCell>{request.destination}</TableCell>
                          <TableCell>{request.purpose}</TableCell>
                          <TableCell>{request.documentsCount}</TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "Pendente"
                                  ? "outline"
                                  : request.status === "Em análise"
                                    ? "secondary"
                                    : request.status === "Aprovada"
                                      ? "default"
                                      : request.status === "Rejeitada"
                                        ? "destructive"
                                        : "outline"
                              }
                            >
                              {request.status}
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
                                  <Link to={`/requests/${request.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                {(request.status === "Pendente" || request.status === "Em análise") && (
                                  <>
                                    <DropdownMenuItem>
                                      <Link to={`/requests/${request.id}/process`} className="flex w-full">
                                        Processar
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link to={`/requests/${request.id}/approve`} className="flex w-full">
                                        Aprovar
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link to={`/requests/${request.id}/reject`} className="flex w-full">
                                        Rejeitar
                                      </Link>
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {request.status === "Aprovada" && (
                                  <DropdownMenuItem>
                                    <Link to={`/requests/${request.id}/generate-grd`} className="flex w-full">
                                      Gerar GRD
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
                  {pendingRequests.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhuma solicitação pendente encontrada.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Solicitações Concluídas</CardTitle>
                  <CardDescription>Solicitações que já foram processadas e concluídas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Propósito</TableHead>
                        <TableHead>GRD</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestNumber}</TableCell>
                          <TableCell>{request.project}</TableCell>
                          <TableCell>{request.origin}</TableCell>
                          <TableCell>{request.destination}</TableCell>
                          <TableCell>{request.purpose}</TableCell>
                          <TableCell>
                            <Link to={`/documents/routing/${request.id}/grd`}
                              className="flex items-center gap-1 text-primary hover:underline neon-text"
                            >
                              {request.grdNumber}
                              <Eye className="h-3 w-3" />
                            </Link>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>
                            <Badge variant="default">{request.status}</Badge>
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
                                  <Link to={`/requests/${request.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/documents/routing/${request.id}/grd`} className="flex w-full">
                                    Visualizar GRD
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}
