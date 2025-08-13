import { Link } from 'react-router-dom'
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
  currentPath?: string
}

export function MainNav({ className, currentPath = "" }: MainNavProps) {
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projetos" },
    { href: "/planning", label: "Planejamento" },
    { href: "/clients", label: "Clientes" },
    { href: "/suppliers", label: "Fornecedores" },
    { href: "/documents", label: "Documentos" },
    { href: "/requests", label: "Solicitações" },
    { href: "/grds", label: "GRDs" },
  ]

  return (
    <div className={cn("flex items-center", className)}>
      <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
        <FileText className="h-6 w-6 text-primary animate-glow" />
        <span className="neon-text">DocFlow</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              currentPath.startsWith(item.href)
                ? "text-primary underline underline-offset-4"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
