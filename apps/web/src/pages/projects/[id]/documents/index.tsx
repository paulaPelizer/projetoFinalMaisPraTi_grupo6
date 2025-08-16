import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Plus, FileText } from "lucide-react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function ProjectDocumentsPage() {
  const params = useParams()

  const documents = [
    {
      id: 1,
      code: "DOC-001",
      name: "Planta Baixa - Térreo",
      type: "Planta Baixa",
      revision: "Rev. 2",
      status: "Aprovado",
      milestone: "Entrega Inicial",
      lastUpdated: "12/04/2025",
    },
    {
      id: 2,
      code: "DOC-002",
      name: "Memorial Descritivo",
      type: "Memorial",
      revision: "Rev. 1",
      status: "Em revisão",
      milestone: "Entrega Inicial",
      lastUpdated: "18/04/2025",
    },
    {
      id: 3,
      code: "DOC-003",
      name: "Projeto Estrutural",
      type: "Projeto Estrutural",
      revision: "Rev. 3",
      status: "Aguardando aprovação",
      milestone: "Projetos Complementares",
      lastUpdated: "20/04/2025",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "default"
      case "Em revisão":
        return "secondary"
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
          <PageHeader title="Documentos - Projeto Alpha" description="Lista de documentos do projeto">
            <div className="flex gap-2">
              <Link to="/projects">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar documentos..." className="w-[250px] pl-8" />
              </div>
              <Link to="/documents/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Documento
                </Button>
              </Link>
            </div>
          </PageHeader>

          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Lista de Documentos</CardTitle>
              <CardDescription>Todos os documentos relacionados ao projeto</CardDescription>
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
                    <TableHead>Última Atualização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {doc.code}
                        </div>
                      </TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.revision}</TableCell>
                      <TableCell>{doc.milestone}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>{doc.lastUpdated}</TableCell>
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
