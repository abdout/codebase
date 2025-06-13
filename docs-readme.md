# Documentation Structure and Flow

This document provides an overview of how documentation is handled in this project.

## Project Structure

The documentation system follows a Next.js-based approach with Contentlayer for managing MDX content. Here's the overall structure:

```
/
├── apps/
│   └── www/                        # Website application
│       ├── app/                    # Next.js app directory
│       │   └── (app)/              # Main app routes
│       │       └── docs/           # Documentation routes
│       │           ├── layout.tsx  # Layout for all docs pages
│       │           └── [[...slug]]/ # Dynamic route handling for docs
│       │               └── page.tsx # Page component for rendering docs
│       ├── components/             # Shared components
│       │   ├── docs-nav.tsx        # Documentation navigation
│       │   ├── mdx-components.tsx  # MDX rendering components
│       │   ├── pager.tsx           # Pagination for docs
│       │   └── toc.tsx             # Table of contents component
│       ├── config/
│       │   └── docs.ts             # Documentation configuration
│       ├── content/
│       │   └── docs/               # MDX documentation files
│       │       ├── index.mdx       # Main documentation page
│       │       ├── about.mdx       # About page
│       │       └── ...             # Other documentation files
│       ├── lib/
│       │   └── toc.ts              # Table of contents generation
│       └── contentlayer.config.js  # Contentlayer configuration
```

## Documentation Flow

### 1. Content Creation

Documentation content is written in MDX format and stored in the `apps/www/content/docs/` directory. Each MDX file represents a page in the documentation:

- **Front Matter**: Each MDX file includes metadata at the top:
  ```mdx
  ---
  title: "Page Title"
  description: "Page description"
  published: true
  ---
  ```
- **Optional fields**:
  - `links`: External links related to the document
  - `featured`: Boolean to mark as featured
  - `component`: Boolean to mark as component documentation
  - `toc`: Boolean to control table of contents visibility

### 2. Content Processing

Content is processed using **Contentlayer**, which is configured in `contentlayer.config.js`:

1. **Doc Type Definition**: Defines the schema for documentation files
2. **Content Transformation**: MDX content is transformed with plugins:
   - `rehype-slug`: Adds IDs to headings
   - `rehype-autolink-headings`: Adds links to headings
   - `rehype-pretty-code`: Code syntax highlighting
   - `remark-gfm`: GitHub-flavored markdown support
   - Custom plugins for components and npm commands

### 3. Routing

The Next.js application uses dynamic routing via `[[...slug]]` to handle all documentation pages:

1. **Route Handling**: The `apps/www/app/(app)/docs/[[...slug]]/page.tsx` component handles all doc routes
2. **Parameter Extraction**: The slug from the URL is used to find the corresponding doc content
3. **Static Generation**: `generateStaticParams` pre-renders all doc pages at build time
4. **Metadata Generation**: Each page generates appropriate metadata for SEO

### 4. Content Rendering

Documentation is rendered using several key components:

1. **Layout**: `apps/www/app/(app)/docs/layout.tsx` provides the sidebar and layout structure
2. **Page Component**: Renders the actual content and provides navigation
3. **Navigation**: `docs-nav.tsx` renders the sidebar navigation based on `config/docs.ts`
4. **MDX Rendering**: `Mdx` component transforms the MDX code into React components
5. **Table of Contents**: Generated dynamically from the content headings
6. **Pagination**: `DocsPager` component provides next/previous navigation

### 5. Configuration

Documentation navigation is configured in `apps/www/config/docs.ts`:

1. **Main Navigation**: Defines the top-level navigation items
2. **Sidebar Navigation**: Defines the hierarchical structure of documentation
3. **Organization**: Content is organized into sections like "Getting Started", "Components", etc.

## Adding New Documentation

To add new documentation:

1. Create a new MDX file in the appropriate directory under `apps/www/content/docs/`
2. Include the required front matter (title, description)
3. Write content using MDX (markdown with React components)
4. Update `config/docs.ts` if it should appear in the navigation

## Documentation Features

- **Table of Contents**: Automatically generated from headings
- **Navigation**: Hierarchical sidebar navigation
- **Code Highlighting**: Syntax highlighting for code blocks
- **External Links**: Support for external documentation and API references
- **Responsive Design**: Adapts to different screen sizes 