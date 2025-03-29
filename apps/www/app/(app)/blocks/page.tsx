import React from 'react'

const page = () => {
  return (
    <div className="space-y-6 ">

      <div className="mx-auto px-4 py-12 grid gap-4 justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 32 32" className="h-10 w-10 fill-current">
              <path d="m12.807 10.906l5.865-8.505C19.787.802 21.214 0 22.974 0q2.148.001 3.719 1.526c1.047 1.021 1.568 2.234 1.568 3.651c0 1.042-.276 1.969-.833 2.771l-5.286 7.693l6.469 8.203c.646.818.969 1.776.969 2.865c0 1.448-.505 2.693-1.526 3.734Q26.531 31.998 24.361 32q-2.382 0-3.63-1.547l-7.922-9.891v5.453q0 2.335-.813 3.63c-.979 1.568-2.401 2.354-4.281 2.354c-1.708 0-3.036-.583-3.974-1.734q-1.319-1.596-1.318-4.229V5.817c0-1.656.448-3.031 1.339-4.109C4.694.573 5.986 0 7.637 0c1.573 0 2.88.573 3.927 1.708c.583.635.953 1.271 1.109 1.922c.094.401.141 1.141.141 2.24v5.036z" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Starter Kit</h3>
              <p className="text-sm text-muted-foreground">
                App dir, Routing, Layouts, Loading UI and API routes.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M13 4a1 1 0 0 1 .993.883L14 5a1 1 0 0 0 1.993.117L16 5a1 1 0 0 1 1-1h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2a1 1 0 0 1-.993-.883L16 19a1 1 0 0 0-1.993-.117L14 19a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm2 9a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1m0-5a1 1 0 0 0-.993.883L14 9v1a1 1 0 0 0 1.993.117L16 10V9a1 1 0 0 0-1-1" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                Onboarding using Server Actions and Zod.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 32 32"><path fill="currentColor" d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v1a5 5 0 0 0 10 0v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707M19 25a3 3 0 0 1-6 0v-1h6Z" /></svg>
            <div className="space-y-2">
              <h3 className="font-bold">Notification</h3>
              <p className="text-sm text-muted-foreground">
                Notifications using Pusher and web sockets.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" stroke="#000" stroke-width="2.146" d="M-2.482.404A1.93 1.93 0 0 1-.16.427l6.967 5.356a1.93 1.93 0 0 1 0 3.058L4.15 10.883l2.7 2.171c.983.79.956 2.294-.053 3.048l-7.152 5.344a1.93 1.93 0 0 1-2.439-.106l-5.596-4.996l-.782-.672c-3.492-3-3.062-8.526.845-10.951zm5.6 9.65L-.13 7.444a1.93 1.93 0 0 0-2.384-.026l-2.403 1.848a1.93 1.93 0 0 0 0 3.058l2.42 1.86a1.93 1.93 0 0 0 2.352 0l3.246-2.494l2.944 2.366a.643.643 0 0 1-.018 1.016l-7.152 5.344a.64.64 0 0 1-.813-.035l-5.6-5l-.796-.684c-2.839-2.439-2.482-6.935.705-8.896l.023-.014l5.888-4.349a.64.64 0 0 1 .774.008l6.967 5.356a.643.643 0 0 1 0 1.02zm-1.049.807l-2.998 2.304a.64.64 0 0 1-.783 0l-2.421-1.86a.643.643 0 0 1 0-1.02l2.403-1.848a.64.64 0 0 1 .795.009z" clip-rule="evenodd" transform="matrix(.5949 0 0 .61208 9.182 1.311)" /></svg>
            <div className="space-y-2">
              <h3 className="font-bold">Contentlayer</h3>
              <p className="text-sm text-muted-foreground">
                Content using Contentlayer and MDX.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-12 w-12 fill-current"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Authentication using Auth.js and middlewares.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Subscriptions</h3>
              <p className="text-sm text-muted-foreground">
                Free and paid subscriptions using Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page