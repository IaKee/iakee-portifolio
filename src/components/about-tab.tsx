'use client';

export default function AboutTab() {
    return(
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm a passionate developer with a hunger for innovation and creative problem-solving. With over 5
                years of experience building web applications, I specialize in creating performant, accessible, and
                visually appealing digital experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Full-Stack Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Building end-to-end solutions with modern frameworks and technologies.
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">UI/UX Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating intuitive and beautiful user interfaces with attention to detail.
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Performance Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring applications are fast, responsive, and efficient.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Frontend Development</h3>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Backend Development</h3>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">UI/UX Design</h3>
                  <span className="text-sm text-muted-foreground">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">DevOps</h3>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A selection of my recent work. Each project represents a unique challenge and solution.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-featured online store with cart, checkout, and payment processing."
              image="/placeholder.svg?height=300&width=400"
              tags={["Next.js", "Stripe", "Tailwind CSS"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="AI Content Generator"
              description="An application that uses AI to generate marketing content and social media posts."
              image="/placeholder.svg?height=300&width=400"
              tags={["React", "OpenAI", "Node.js"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management tool with real-time updates and notifications."
              image="/placeholder.svg?height=300&width=400"
              tags={["Vue.js", "Firebase", "Sass"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Portfolio Website"
              description="A creative portfolio website for a photographer with image gallery and contact form."
              image="/placeholder.svg?height=300&width=400"
              tags={["React", "Framer Motion", "Sanity CMS"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A weather application with location detection, forecasts, and historical data."
              image="/placeholder.svg?height=300&width=400"
              tags={["JavaScript", "Weather API", "Chart.js"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Fitness Tracker"
              description="A mobile-first application for tracking workouts, nutrition, and progress."
              image="/placeholder.svg?height=300&width=400"
              tags={["React Native", "GraphQL", "MongoDB"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
          </div>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/projects">
                View all projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        </section>

        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Technologies</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The tools and technologies I use to bring ideas to life.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="frontend" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Redux",
                  ].map((skill) => (
                    <Card key={skill} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <h3 className="font-medium">{skill}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="backend" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "PostgreSQL",
                    "GraphQL",
                    "REST API",
                    "Firebase",
                    "AWS",
                    "Docker",
                  ].map((skill) => (
                    <Card key={skill} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <h3 className="font-medium">{skill}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tools" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {["Git", "GitHub", "VS Code", "Figma", "Adobe XD", "Webpack", "Jest", "Cypress", "CI/CD"].map(
                    (skill) => (
                      <Card key={skill} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <h3 className="font-medium">{skill}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </TabsContent>
              <TabsContent value="soft" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Problem Solving",
                    "Communication",
                    "Teamwork",
                    "Time Management",
                    "Adaptability",
                    "Creativity",
                    "Critical Thinking",
                    "Leadership",
                    "Attention to Detail",
                  ].map((skill) => (
                    <Card key={skill} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <h3 className="font-medium">{skill}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-12">
              <SkillsChart />
            </div>
          </div>
        </div>
        </section>

        <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Thoughts, insights, and tutorials on web development and design.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <BlogPreview
              title="Building Accessible Web Applications"
              excerpt="Learn how to make your web applications accessible to all users, including those with disabilities."
              date="March 15, 2023"
              image="/placeholder.svg?height=200&width=300"
              slug="/blog/building-accessible-web-applications"
            />
            <BlogPreview
              title="The Future of Frontend Development"
              excerpt="Exploring upcoming trends and technologies that will shape the future of frontend development."
              date="February 28, 2023"
              image="/placeholder.svg?height=200&width=300"
              slug="/blog/future-of-frontend-development"
            />
            <BlogPreview
              title="Optimizing React Performance"
              excerpt="Practical tips and techniques for improving the performance of your React applications."
              date="January 20, 2023"
              image="/placeholder.svg?height=200&width=300"
              slug="/blog/optimizing-react-performance"
            />
          </div>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/blog">
                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to collaborate? I'd love to hear from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out through the form or directly via email or social media.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:hello@example.com" className="text-sm hover:underline">
                    hello@example.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm hover:underline">
                    linkedin.com/in/username
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-primary" />
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sm hover:underline">
                    @username
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Current Status</h3>
                <Badge variant="outline" className="text-sm">
                  Available for freelance work
                </Badge>
                <p className="text-muted-foreground">
                  I'm currently taking on new projects and open to both short and long-term opportunities.
                </p>
              </div>
            </div>
            <ContactForm />
            </div>
          </div>
    )    
}