import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Building, Phone, Mail, Users } from "lucide-react"
import { Link } from 'react-router-dom'
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function SuppliersPage() {
  const suppliers = [
    {
      id: 1,
      name: "Construtora XYZ",
      contact: "Carlos Mendes",
      email: "carlos@construtoraXYZ.com",
      phone: "(11) 5555-5555",
      category: "Construção",
      services: ["Projetos Estruturais", "Construção Civil"],
      projectsCount: 4,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Engenharia ABC",
      contact: "Lucia Ferreira",
      email: "lucia@engenhariaabc.com",
      phone: "(11) 4444-4444",
      category: "Engenharia",
      services: ["Projetos Hidráulicos", "Projetos Elétricos"],
      projectsCount: 2,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Arquitetura DEF",
      contact: "Roberto Lima",
      email: "roberto@arquiteturadef.com",
      phone: "(11) 3333-3333",
      category: "Arquitetura",
      services: ["Projetos Arquitetônicos"],
      projectsCount: 1,
      status: "Ativo",
    },
    {
      id: 4,
      name: "Consultoria 123",
      contact: "Fernanda Rocha",
      email: "fernanda@consultoria123.com",
      phone: "(11) 2222-2222",
      category: "Consultoria",
      services: ["Consultoria", "Projetos Estruturais"],
      projectsCount: 3,
      status: "Ativo",
    },
    {
      id: 5,
      name: "Manufatura ABC",
      contact: "José Santos",
      email: "jose@manufaturaabc.com",
      phone: "(11) 1111-1111",
      category: "Manufatura",
      services: ["Construção Civil"],
      projectsCount: 0,
      status: "Inativo",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/suppliers" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <PageHeader title="Fornecedores" description="Gerencie todos os fornecedores cadastrados">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar fornecedores..." className="w-full md:w-[250px] pl-8" />
              </div>
              <Link to="/suppliers/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Fornecedor
                </Button>
              </Link>
            </div>
          </PageHeader>

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
                    <TableHead>Categoria</TableHead>
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
                      <TableCell>
                        <Badge variant="outline">{supplier.category}</Badge>
                      </TableCell>
                      <TableCell>{supplier.projectsCount}</TableCell>
                      <TableCell>
                        <Badge variant={supplier.status === "Ativo" ? "default" : "secondary"}>{supplier.status}</Badge>
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
        </div>
      </main>
    </div>
  )
}
