import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  FileText,
  FolderKanban,
  Users,
  Briefcase,
  ArrowRightLeft,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";

export default function ProjectsPage() {
  const navigate = useNavigate(); // hook invocado dentro do componente

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl neon-text">
                  Sistema de Gestão de Documentos Técnicos
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Gerencie projetos, documentos técnicos e tramitações entre
                  clientes e fornecedores de forma eficiente.
                </p>
              </div>

              {/* escolha UMA das abordagens abaixo */}
              {/* A) usando navigate */}
              <div className="space-x-4">
                <Button className="neon-border" onClick={() => navigate("/dashboard")}>
                  Acessar Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate("/projects/new")}>
                  Novo Projeto
                </Button>
              </div>

              {/* B) OU, se preferir, use Links (remova o bloco A acima)
              <div className="space-x-4">
                <Link to="/dashboard">
                  <Button className="neon-border">Acessar Dashboard</Button>
                </Link>
                <Link to="/projects/new">
                  <Button variant="outline">Novo Projeto</Button>
                </Link>
              </div>
              */}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gestão de Projetos</CardTitle>
                  <FolderKanban className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Projetos</div>
                  <p className="text-xs text-muted-foreground">
                    Cadastre e gerencie projetos com suas respectivas listas de
                    documentos.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes e Fornecedores</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Cadastros</div>
                  <p className="text-xs text-muted-foreground">
                    Gerencie clientes e fornecedores envolvidos nos projetos.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documentos Técnicos</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Documentação</div>
                  <p className="text-xs text-muted-foreground">
                    Crie listas de documentos e gerencie suas tramitações.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tramitação</CardTitle>
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Fluxo de Documentos</div>
                  <p className="text-xs text-muted-foreground">
                    Tramite documentos entre clientes e fornecedores com validação.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Requests</div>
                  <p className="text-xs text-muted-foreground">
                    Gerencie solicitações de tramitação de documentos.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GRD</CardTitle>
                  <Briefcase className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Guias de Remessa</div>
                  <p className="text-xs text-muted-foreground">
                    Gere e gerencie GRDs para cada pacote de documentos tramitados.
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Análise</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Relatórios</div>
                  <p className="text-xs text-muted-foreground">
                    Visualize estatísticas e relatórios sobre os documentos e projetos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 DocFlow. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
