import Image from "next/image"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
// import { CardsDemo } from "@/components/cards"
// import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/new-york/ui/button"

export default function IndexPage() {
  const categories = [
    {
      src: "/codebase/atom.png",
      title: "Atom",
      description: "Atomic components for larger structures",
    },
    {
      src: "/codebase/template.png",
      title: "Template",
      description: "Pre-designed layouts for quick setup",
    },
    {
      src: "/codebase/block.png",
      title: "Block",
      description: "Reusable blocks for project assembly",
    },
    {
      src: "/codebase/micro.png",
      title: "Micro",
      description: "Ready-to-use micro serivces",
    },
  ];
  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Index your code library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Made with Nextjs. Open source.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/blocks">Browse Blocks</Link>
          </Button>
        </PageActions>
      </PageHeader>
      {/* <div className="border-grid border-b">
        <div className="container-wrapper">
          <div className="container py-4">
            <ExamplesNav className="[&>a:first-child]:text-primary" />
          </div>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container py-6">
          <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
            <Image
              src="/examples/cards-light.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="block dark:hidden"
            />
            <Image
              src="/examples/cards-dark.png"
              width={1280}
              height={1214}
              alt="Cards"
              className="hidden dark:block"
            />
          </section>
          <section className="hidden md:block [&>div]:p-0">
            <CardsDemo />
          </section>
        </div>
      </div> */}
      <div className="">
          {categories.map((category, index) => (
            <div
              key={index}
              className=""
            >
              <Image
                src={category.src}
                alt={category.title}
                width={70}
                height={70}
                className=""
              />
              <h3 className="">{category.title}</h3>
              <p className="max-w-[80%] md:max-w-[70%] text-muted-foreground text-[13px] sm:text-sm sm:leading-6">
                {category.description}
              </p>
            </div>
          ))}
        </div>
    </>
  )
}