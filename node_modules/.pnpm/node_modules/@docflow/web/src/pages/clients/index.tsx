import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Users, Building, Phone, Mail } from "lucide-react"
import { Link } from 'react-router-dom'
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: "Empresa ABC",
      type: "Cliente",
      contact: "João Silva",
      email: "joao@empresaabc.com",
      phone: "(11) 9999-9999",
      projectsCount: 3,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Indústria 123",
      type: "Cliente",
      contact: "Maria Santos",
      email: "maria@industria123.com",
      phone: "(11) 8888-8888",
      projectsCount: 2,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Empresa DEF",
      type: "Cliente",
      contact: "Pedro Costa",
      email: "pedro@empresadef.com",
      phone: "(11) 7777-7777",
      projectsCount: 1,
      status: "Ativo",
    },
    {
      id: 4,
      name: "Corporação XYZ",
      type: "Cliente",
      contact: "Ana Oliveira",
      email: "ana@corporacaoxyz.com",
      phone: "(11) 6666-6666",
      projectsCount: 0,
      status: "Inativo",
    },
  ]

  const suppliers = [
    {
      id: 1,
      name: "Construtora XYZ",
      type: "Fornecedor",
      contact: "Carlos Mendes",
      email: "carlos@construtoraXYZ.com",
      phone: "(11) 5555-5555",
      projectsCount: 4,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Engenharia ABC",
      type: "Fornecedor",
      contact: "Lucia Ferreira",
      email: "lucia@engenhariaabc.com",
      phone: "(11) 4444-4444",
      projectsCount: 2,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Arquitetura DEF",
      type: "Fornecedor",
      contact: "Roberto Lima",
      email: "roberto@arquiteturadef.com",
      phone: "(11) 3333-3333",
      projectsCount: 1,
      status: "Ativo",
    },
    {
      id: 4,
      name: "Consultoria 123",
      type: "Fornecedor",
      contact: "Fernanda Rocha",
      email: "fernanda@consultoria123.com",
      phone: "(11) 2222-2222",
      projectsCount: 3,
      status: "Ativo",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/clients" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Clientes e Fornecedores" description="Gerencie todos os clientes e fornecedores">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar..." className="w-full md:w-[250px] pl-8" />
              </div>
              <Link to="/clients/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Cliente
                </Button>
              </Link>
              <Link to="/suppliers/new">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Fornecedor
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Tabs defaultValue="clients" className="space-y-4">
            <TabsList>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
            </TabsList>
            <TabsContent value="clients">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Lista de Clientes</CardTitle>
                  <CardDescription>Todos os clientes cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Projetos</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {client.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {client.contact}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {client.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {client.phone}
                            </div>
                          </TableCell>
                          <TableCell>{client.projectsCount}</TableCell>
                          <TableCell>
                            <Badge variant={client.status === "Ativo" ? "default" : "secondary"}>{client.status}</Badge>
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
                                  <Link to={`/clients/${client.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/clients/${client.id}/edit`} className="flex w-full">
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/clients/${client.id}/projects`} className="flex w-full">
                                    Ver projetos
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
            <TabsContent value="suppliers">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Lista de Fornecedores</CardTitle>
                  <CardDescription>Todos os fornecedores cadastrados no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Projetos</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              {supplier.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {supplier.contact}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {supplier.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {supplier.phone}
                            </div>
                          </TableCell>
                          <TableCell>{supplier.projectsCount}</TableCell>
                          <TableCell>
                            <Badge variant={supplier.status === "Ativo" ? "default" : "secondary"}>
                              {supplier.status}
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
                                  <Link to={`/suppliers/${supplier.id}`} className="flex w-full">
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/suppliers/${supplier.id}/edit`} className="flex w-full">
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link to={`/suppliers/${supplier.id}/projects`} className="flex w-full">
                                    Ver projetos
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
