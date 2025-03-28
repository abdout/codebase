import * as React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import { getAllTemplateIds } from "@/lib/templates"
import { absoluteUrl, cn } from "@/lib/utils"
import { Style, styles } from "@/registry/registry-styles"

import "@/styles/mdx.css"
import { getRegistryComponent, getRegistryItem } from "@/lib/registry"

const getCachedRegistryItem = React.cache(
  async (name: string, style: Style["name"]) => {
    return await getRegistryItem(name, style)
  }
)

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: {
    style: Style["name"]
    name: string
  }
}): Promise<Metadata> {
  const { name, style } = params
  const item = await getCachedRegistryItem(name, style)

  if (!item) {
    return {}
  }

  const title = item.name
  const description = item.description

  return {
    title: `${item.name}${item.description ? ` - ${item.description}` : ""}`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/templates/${style}/${item.name}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}

export async function generateStaticParams() {
  const templateIds = await getAllTemplateIds()
  return styles
    .map((style) =>
      templateIds.map((name) => ({
        style: style.name,
        name,
      }))
    )
    .flat()
}

export default async function TemplatePage({
  params,
}: {
  params: {
    style: Style["name"]
    name: string
  }
}) {
  const { name, style } = params
  const item = await getCachedRegistryItem(name, style)
  const Component = getRegistryComponent(name, style)

  if (!item || !Component) {
    return notFound()
  }

  return (
    <>
      <div className={cn("themes-wrapper bg-background", item.meta?.container)}>
        <Component />
      </div>
    </>
  )
}
