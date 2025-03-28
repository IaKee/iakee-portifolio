import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPreviewProps {
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

export default function BlogPreview({ title, excerpt, date, image, slug }: BlogPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {date}
        </div>
        <Link href={slug} className="text-sm font-medium text-primary hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}

