import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/registry/default/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Micros",
  description: "Reusable micro-services components for your applications.",
}

export default function MicrosPage() {
  return (
    <div className="container max-w-6xl py-10">
      <div className="mx-auto flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Micros
          </h1>
          <p className="text-xl text-muted-foreground">
            Reusable micro-services built on shadcn/ui.
          </p>
          <div className="space-x-4">
            <Link
              href="/micros/invoice"
              className={cn(
                buttonVariants({ variant: "default" })
              )}
            >
              Invoice Management
            </Link>
            <Link
              href="/micros/reports"
              className={cn(
                buttonVariants({ variant: "outline" })
              )}
            >
              Report Generator
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">Invoice Management</h3>
              <p className="text-sm text-muted-foreground">
                Complete invoice creation, management, and payment tracking system.
              </p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">Report Generator</h3>
              <p className="text-sm text-muted-foreground">
                Dynamic report generation and export tools with customizable templates.
              </p>
            </div>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">User Analytics</h3>
              <p className="text-sm text-muted-foreground">
                User behavior tracking and analytics dashboard with visualization tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}