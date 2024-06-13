import * as React from 'react'
import MarkdownPrimitive from 'react-markdown'

const Markdown = ({
  components,
  ...markdownProps
}: React.ComponentPropsWithoutRef<typeof MarkdownPrimitive>) => {
  return (
    <MarkdownPrimitive
      components={{
        h1({ node, ...props }) {
          return <h1 className="text-2xl font-bold pb-2 mb-4 border-b" {...props} />
        },
        h2({ node, ...props }) {
          return <h2 className="text-xl font-bold mt-2 mb-2" {...props} />
        },
        h3({ node, ...props }) {
          return <h3 className="text-lg font-bold mb-2" {...props} />
        },
        h4({ node, ...props }) {
          return <h4 className="text-base font-bold mb-2" {...props} />
        },
        p({ node, ...props }) {
          return <p className="mb-4" {...props} />
        },
        a({ node, ...props }) {
          return <a className="underline animate-glow" {...props} />
        },
        ...components,
      }}
      {...markdownProps}
    />
  )
}

export { Markdown }
