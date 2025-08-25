import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Plus, ArrowRightLeft } from "lucide-react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ProjectRoutingPage() {
  const params = useParams()

  const routings = [
    {
      id: 1,
      grdNumber: "GRD-ABC-XYZ-2025001",
      origin: "Empresa ABC",
      destination: "Construtora XYZ",
      documentsCount: 3,
      date: "10/05/2025",
      status: "Concluída",
    },
    {
      id: 2,
      grdNumber: "GRD-XYZ-ABC-2025001",
      origin: "Construtora XYZ",
      destination: "Empresa ABC",
      documentsCount: 2,
      date: "08/05/2025",
      status: "Em andamento",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "default"
      case "Em andamento":
        return "secondary"
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
          <PageHeader title="Tramitações - Projeto Alpha" description="Histórico de tramitações do projeto">
            <div className="flex gap-2">
              <Link to="/projects">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar tramitações..." className="w-[250px] pl-8" />
              </div>
              <Link to="/documents/routing/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Tramitação
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Histórico de Tramitações</CardTitle>
              <CardDescription>Todas as tramitações realizadas no projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>GRD</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routings.map((routing) => (
                    <TableRow key={routing.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                          {routing.grdNumber}
                        </div>
                      </TableCell>
                      <TableCell>{routing.origin}</TableCell>
                      <TableCell>{routing.destination}</TableCell>
                      <TableCell>{routing.documentsCount}</TableCell>
                      <TableCell>{routing.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(routing.status)}>{routing.status}</Badge>
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
