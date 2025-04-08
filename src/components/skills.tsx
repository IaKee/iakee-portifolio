'use client';

import { useLanguage } from '@/context/language-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import SkillsChart from './skills-chart';
import BlogPreview from './blog-preview';
import { Button } from './ui/button';
import { ArrowRight, Badge, Link, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactForm from './contact-form';
            


export default function Skills() {
  const { t } = useLanguage();

  return(
    <main className="flex min-h-screen flex-col">
      <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Skills & Technologies
              </h2>
              
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The tools and technologies I use to bring ideas to life.
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-5xl py-12">
            <Tabs defaultValue="frontend" className="w-full">
            
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="frontend">
                  Frontend
                </TabsTrigger>

                <TabsTrigger value="backend">
                  Backend
                </TabsTrigger>

                <TabsTrigger value="tools">
                  Tools
                </TabsTrigger>

                <TabsTrigger value="soft">
                  Soft Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frontend" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {
                    [
                      "React",
                      "Next.js",
                      "TypeScript",
                      "JavaScript",
                      "HTML5",
                      "CSS3",
                      "Tailwind CSS",
                      "Framer Motion",
                      "Redux",
                    ].map(
                      (skill) => (
                        <Card key={skill} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <h3 className="font-medium">
                                {skill}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  }
                </div>   
              </TabsContent>
                  
              <TabsContent value="backend" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {
                    [
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "PostgreSQL",
                      "GraphQL",
                      "REST API",
                      "Firebase",
                      "AWS",
                      "Docker",
                    ].map(
                      (skill) => (
                        <Card key={skill} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />

                                <h3 className="font-medium">
                                  {skill}
                                </h3>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  }
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {
                    [
                      "Git", 
                      "GitHub", 
                      "VS Code", 
                      "Figma", 
                      "Adobe XD", 
                      "Webpack", 
                      "Jest", 
                      "Cypress", 
                      "CI/CD"
                    ].map(
                      (skill) => (
                        <Card key={skill} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                                <h3 className="font-medium">
                                  {skill}
                                </h3>
                              </div>
                          </CardContent>
                        </Card>
                      ),
                    )
                  }
                </div>
              </TabsContent>

              <TabsContent value="soft" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {
                    [
                      "Problem Solving",
                      "Communication",
                      "Teamwork",
                      "Time Management",
                      "Adaptability",
                      "Creativity",
                      "Critical Thinking",
                      "Leadership",
                      "Attention to Detail",
                    ].map(
                      (skill) => (
                        <Card key={skill} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              
                              <h3 className="font-medium">
                                {skill}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )
                  }
                </div>
              </TabsContent>

            </Tabs>
            
            <div className="mt-12">
              <SkillsChart />
            </div>
          </div>  
        </div>
      </section>

     
    </main>
  )
}