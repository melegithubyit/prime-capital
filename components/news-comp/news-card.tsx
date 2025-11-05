import { Card, CardContent } from "@/components/ui/card"
import Image, { StaticImageData } from "next/image"

interface NewsCardProps {
  title: string
  description: string
  image: string | StaticImageData
  category: string
  date: string
}

export function NewsCard({ title, description, image, category, date }: NewsCardProps) {
  return (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full flex flex-col bg-blue-200 border border-blue-200">
      <div className="relative aspect-[4/3] overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-1 text-gray-900">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors min-h-13">
          {title}
        </h3>

  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 min-h-14">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-blue-200 mt-auto">
          <span className="text-xs font-medium bg-blue-200 text-blue-800 px-2 py-1 rounded border border-blue-300">{category}</span>
          <span className="text-xs text-gray-600">{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
