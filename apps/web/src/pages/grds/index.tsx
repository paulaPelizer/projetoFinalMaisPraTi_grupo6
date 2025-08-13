import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Eye, Download, Printer, Filter } from "lucide-react"
import { Link } from 'react-router-dom'
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function GRDsPage() {
  const grds = [
    {
      id: 1,
      grdNumber: "GRD-ABC-XYZ-2025001",
      project: "Projeto Alpha",
      origin: "Empresa ABC (Cliente)",
      destination: "Construtora XYZ (Fornecedor)",
      direction: "to-supplier",
      documentsCount: 3,
      date: "10/05/2025",
      status: "Concluída",
    },
    {
      id: 2,
      grdNumber: "GRD-XYZ-ABC-2025001",
      project: "Expansão Sede",
      origin: "Construtora XYZ (Fornecedor)",
      destination: "Empresa ABC (Cliente)",
      direction: "from-supplier",
      documentsCount: 2,
      date: "08/05/2025",
      status: "Concluída",
    },
    {
      id: 3,
      grdNumber: "GRD-IND-XYZ-2025001",
      project: "Reforma Unidade 3",
      origin: "Indústria 123 (Cliente)",
      destination: "Construtora XYZ (Fornecedor)",
      direction: "to-supplier",
      documentsCount: 5,
      date: "05/05/2025",
      status: "Concluída",
    },
    {
      id: 4,
      grdNumber: "GRD-INT-DEF-2025001",
      project: "Projeto Beta",
      origin: "Interno",
      destination: "Empresa DEF (Cliente)",
      direction: "to-client",
      documentsCount: 4,
      date: "03/05/2025",
      status: "Concluída",
    },
    {
      id: 5,
      grdNumber: "GRD-ABC-XYZ-2025002",
      project: "Projeto Alpha",
      origin: "Empresa ABC (Cliente)",
      destination: "Construtora XYZ (Fornecedor)",
      direction: "to-supplier",
      documentsCount: 2,
      date: "01/05/2025",
      status: "Concluída",
    },
    {
      id: 6,
      grdNumber: "GRD-MAN-IND-2025001",
      project: "Modernização Planta",
      origin: "Manufatura ABC (Fornecedor)",
      destination: "Indústria XYZ (Cliente)",
      direction: "from-supplier",
      documentsCount: 1,
      date: "28/04/2025",
      status: "Concluída",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/grds" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Relatório
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader
            title="Guias de Remessa de Documentação"
            description="Gerencie todas as GRDs e protocolos de tramitação"
          >
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar GRDs..." className="w-full md:w-[250px] pl-8" />
              </div>
            </div>
          </PageHeader>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="to-client">Para Cliente</TabsTrigger>
              <TabsTrigger value="from-client">De Cliente</TabsTrigger>
              <TabsTrigger value="to-supplier">Para Fornecedor</TabsTrigger>
              <TabsTrigger value="from-supplier">De Fornecedor</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Todas as GRDs</CardTitle>
                  <CardDescription>Listagem completa de todas as guias de remessa geradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Direção</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grds.map((grd) => (
                        <TableRow key={grd.id}>
                          <TableCell className="font-medium">{grd.grdNumber}</TableCell>
                          <TableCell>{grd.project}</TableCell>
                          <TableCell>{grd.origin}</TableCell>
                          <TableCell>{grd.destination}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                grd.direction === "to-client" && "border-blue-500 text-blue-500",
                                grd.direction === "from-client" && "border-green-500 text-green-500",
                                grd.direction === "to-supplier" && "border-purple-500 text-purple-500",
                                grd.direction === "from-supplier" && "border-pink-500 text-pink-500",
                              )}
                            >
                              {grd.direction === "to-client"
                                ? "Para Cliente"
                                : grd.direction === "from-client"
                                  ? "De Cliente"
                                  : grd.direction === "to-supplier"
                                    ? "Para Fornecedor"
                                    : "De Fornecedor"}
                            </Badge>
                          </TableCell>
                          <TableCell>{grd.documentsCount}</TableCell>
                          <TableCell>{grd.date}</TableCell>
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
                                  <Link to={`/documents/routing/${grd.id}/grd`} className="flex w-full">
                                    Visualizar GRD
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to="#" className="flex w-full">
                                    Exportar PDF
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to="#" className="flex w-full">
                                    Imprimir
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/requests/${grd.id}`} className="flex w-full">
                                    Ver Solicitação
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
            <TabsContent value="to-client">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>GRDs Para Cliente</CardTitle>
                  <CardDescription>Guias de remessa enviadas para clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grds
                        .filter((grd) => grd.direction === "to-client")
                        .map((grd) => (
                          <TableRow key={grd.id}>
                            <TableCell className="font-medium">{grd.grdNumber}</TableCell>
                            <TableCell>{grd.project}</TableCell>
                            <TableCell>{grd.origin}</TableCell>
                            <TableCell>{grd.destination}</TableCell>
                            <TableCell>{grd.documentsCount}</TableCell>
                            <TableCell>{grd.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon" asChild>
                                  <Link to={`/documents/routing/${grd.id}/grd`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Visualizar</span>
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Exportar</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="from-client">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>GRDs De Cliente</CardTitle>
                  <CardDescription>Guias de remessa recebidas de clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grds
                        .filter((grd) => grd.direction === "from-client")
                        .map((grd) => (
                          <TableRow key={grd.id}>
                            <TableCell className="font-medium">{grd.grdNumber}</TableCell>
                            <TableCell>{grd.project}</TableCell>
                            <TableCell>{grd.origin}</TableCell>
                            <TableCell>{grd.destination}</TableCell>
                            <TableCell>{grd.documentsCount}</TableCell>
                            <TableCell>{grd.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon" asChild>
                                  <Link to={`/documents/routing/${grd.id}/grd`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Visualizar</span>
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Exportar</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="to-supplier">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>GRDs Para Fornecedor</CardTitle>
                  <CardDescription>Guias de remessa enviadas para fornecedores</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grds
                        .filter((grd) => grd.direction === "to-supplier")
                        .map((grd) => (
                          <TableRow key={grd.id}>
                            <TableCell className="font-medium">{grd.grdNumber}</TableCell>
                            <TableCell>{grd.project}</TableCell>
                            <TableCell>{grd.origin}</TableCell>
                            <TableCell>{grd.destination}</TableCell>
                            <TableCell>{grd.documentsCount}</TableCell>
                            <TableCell>{grd.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon" asChild>
                                  <Link to={`/documents/routing/${grd.id}/grd`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Visualizar</span>
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Exportar</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="from-supplier">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>GRDs De Fornecedor</CardTitle>
                  <CardDescription>Guias de remessa recebidas de fornecedores</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Documentos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grds
                        .filter((grd) => grd.direction === "from-supplier")
                        .map((grd) => (
                          <TableRow key={grd.id}>
                            <TableCell className="font-medium">{grd.grdNumber}</TableCell>
                            <TableCell>{grd.project}</TableCell>
                            <TableCell>{grd.origin}</TableCell>
                            <TableCell>{grd.destination}</TableCell>
                            <TableCell>{grd.documentsCount}</TableCell>
                            <TableCell>{grd.date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon" asChild>
                                  <Link to={`/documents/routing/${grd.id}/grd`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Visualizar</span>
                                  </Link>
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Exportar</span>
                                </Button>
                              </div>
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
