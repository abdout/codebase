# MDX File Generation and Structure

This document explains how MDX documentation files are generated, organized, and maintained in the `content/docs` directory.

## Directory Structure Overview

The documentation content is organized in a hierarchical structure under `apps/www/content/docs/`:

```
content/docs/
├── components/         # Component documentation
├── installation/       # Installation guides
├── registry/           # Registry documentation
├── dark-mode/          # Dark mode documentation
├── about.mdx           # About page
├── cli.mdx             # CLI documentation
├── components-json.mdx # Components JSON documentation
├── index.mdx           # Home/landing page for docs
└── ...                 # Other top-level documentation files
```

This structure directly maps to URL paths in the documentation website. For example:
- `content/docs/index.mdx` → `/docs`
- `content/docs/components/button.mdx` → `/docs/components/button`

## MDX File Structure

### File Naming and Organization

1. **Naming Convention**:
   - Files use kebab-case: `file-name.mdx`
   - Index files (`index.mdx`) serve as section landing pages

2. **Organization Principles**:
   - Related content is grouped in directories
   - Component documentation is under `/components/`
   - Installation guides are under `/installation/`
   - Standalone topics use root-level MDX files

### MDX File Anatomy

Each MDX file follows this structure:

```mdx
---
title: "Document Title"
description: "A brief description of the document"
published: true
---

# Main Heading

Content goes here...

## Subheading

More content...
```

#### Required Front Matter Fields

- `title`: Document title (appears in browser tab, navigation, etc.)
- `description`: Brief description (used for SEO and previews)
- `published`: Boolean that controls visibility (default: true)

#### Optional Front Matter Fields

- `links`: External references (documentation, API)
- `featured`: Boolean to mark as featured content
- `component`: Boolean to indicate it's a component doc
- `toc`: Boolean to enable/disable table of contents

## Content Creation Workflow

1. **Creating New Documentation**:
   - Determine the appropriate location based on content type
   - Create a new `.mdx` file with required front matter
   - Add to navigation config if needed (`config/docs.ts`)

2. **Directory Creation**:
   - New sections require:
     - A new directory in `content/docs/`
     - An `index.mdx` file as the section landing page
     - Updates to navigation configuration

3. **Updating Navigation**:
   - New sections need to be added to `apps/www/config/docs.ts`
   - Structure in this file determines sidebar navigation

## Content Discoverability

The documentation structure is designed for:

1. **Logical Organization**: Related content is grouped together
2. **Hierarchy**: Content follows a clear information hierarchy
3. **Predictable URLs**: URLs match content organization
4. **Navigation**: Sidebar navigation reflects the directory structure

## Building and Processing

During the build process:

1. **Content Discovery**: Contentlayer scans the `content/docs` directory
2. **Validation**: Front matter is validated against schema defined in `contentlayer.config.js`
3. **Transformation**: MDX content is processed with remark and rehype plugins
4. **Route Generation**: Next.js generates routes based on file paths
5. **Static Generation**: Pages are pre-rendered at build time

## Relationship with Navigation

The `config/docs.ts` file defines the navigation structure, which may not mirror the directory structure exactly. This allows for:

- Custom ordering of navigation items
- Grouping items from different directories
- Adding external links
- Creating logical sections that don't exist in the filesystem

## Adding New Content Types

To add a new type of documentation section:

1. Create a new directory in `content/docs/`
2. Add an `index.mdx` with appropriate front matter
3. Add content MDX files
4. Update `config/docs.ts` to include the new section
5. If needed, update `contentlayer.config.js` for any special handling

## Generation vs. Manual Creation

The documentation files are primarily created and maintained manually, rather than being auto-generated. However, some tooling might be used to:

1. Generate starter templates for new component documentation
2. Update API references from source code
3. Keep examples in sync with the codebase
4. Validate links and references

This manual approach ensures high-quality documentation with proper explanations, examples, and best practices rather than just API references. 