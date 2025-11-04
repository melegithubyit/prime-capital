"use client"

import { useState, useEffect, useMemo } from "react"
import { useGetVacancyQuery } from "@/hooks/queries/useVacancyQuery"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MapPin, Briefcase, AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Job {
  id:string
  job_title: string
  info_tags: { items: string }[]
  level: string
  period: string
  creation_time: string
  location?: string
  overview: string
  key_responsibilities: { items: string }[]
  requirements: { items: string }[]
  what_we_offer: { items: string }[]
  apply_link: string
}

const JobSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const JobDetailSkeleton = () => (
    <Card className="h-full flex flex-col">
        <CardHeader className="border-b">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex gap-2 mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6 pt-6">
            <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-20 w-full" />
            </div>
            <div>
                <Skeleton className="h-6 w-48 mb-3" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                </div>
            </div>
            <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
            </div>
        </CardContent>
        <div className="p-6 border-t">
            <Skeleton className="h-12 w-full" />
        </div>
    </Card>
)


export function JobOpportunities() {
  // The published vacancies API returns language-agnostic content.
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 5

  // The published vacancies API returns a VacancyResponse shape.
  // Map it into the component's `Job` shape so the rest of the component can remain unchanged.
  // map UI values to API-expected unions
  const levelMap: Record<string, "junior" | "intermediate" | "senior"> = {
    Junior: "junior",
    Intermediate: "intermediate",
    Senior: "senior",
  }

  const periodMap: Record<string, "fulltime" | "part-time"> = {
    FullTime: "fulltime",
    PartTime: "part-time",
  }

  const levelParam = selectedLevel === "All" ? undefined : levelMap[selectedLevel]
  const periodParam = selectedType === "All" ? undefined : periodMap[selectedType]

  const { data, error, isLoading } = useGetVacancyQuery({
    page: currentPage,
    limit: jobsPerPage,
    level: levelParam,
    period: periodParam,
  })

  const jobs = useMemo(() => {
    const vacancies = data?.data?.vacancies ?? []
    return vacancies.map((v) => ({
      id: v._id,
      job_title: v.job_title,
      info_tags: (v.info_tags || []).map((t) => ({ items: t })),
      level: v.level,
      period: v.period,
      creation_time: v.createdAt,
      location: v.location,
      overview: v.overview,
      key_responsibilities: (v.responsibilities || []).map((r) => ({ items: r })),
      requirements: (v.requirements || []).map((r) => ({ items: r })),
      what_we_offer: (v.offer || []).map((o) => ({ items: o })),
      apply_link: v.apply,
    }))
  }, [data])

  const meta = useMemo(() => {
    const pagination = data?.data?.pagination
    if (!pagination) return null
    return {
      total: pagination.total,
      pageCount: pagination.totalPages,
      page: pagination.page,
      limit: pagination.limit,
    }
  }, [data])

  useEffect(() => {
    if (jobs.length > 0) {
      // Keep the previous selection if it still exists, otherwise pick first
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedJob((prev) => {
        if (!prev) return jobs[0]
        const existing = jobs.find((j: Job) => String(j.id) === String(prev.id))
        return existing || jobs[0]
      })
    } else {
      setSelectedJob(null)
    }
  }, [jobs])

  const handleReadMore = (job: Job) => {
    setSelectedJob(job)
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= (meta?.pageCount || 1)) {
      setCurrentPage(page)
    }
  }

  const levels = ["All", "Junior", "Intermediate", "Senior"]
  const types = ["All", "FullTime", "PartTime"]

  return (
    <section className="relative py-20 px-4 bg-white text-gray-900">
      {/* soft pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/back-grid.jpg')] opacity-5 bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading + Filters - blue card */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0E0066]">Job Opportunities</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedLevel} onValueChange={handleLevelChange}>
              <SelectTrigger className="w-48 bg-white text-gray-900 border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-blue-200">
                {levels.map((level) => (
                  <SelectItem key={level} value={level} className="hover:bg-blue-50 focus:bg-blue-50">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-48 bg-white text-gray-900 border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-blue-200">
                {types.map((type) => (
                  <SelectItem key={type} value={type} className="hover:bg-blue-50 focus:bg-blue-50">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-full">
            {isLoading ? (
              <JobSkeleton />
            ) : error ? (
              <div className="text-red-500">Failed to load jobs.</div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full bg-white border border-blue-200 rounded-2xl shadow-md p-8 text-center">
                  <Briefcase className="w-16 h-16 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">No Open Positions</h3>
                  <p className="text-gray-600 mt-2">There are currently no open positions that match your criteria. Please check back later.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {jobs.map((job: Job) => (
                    <Card
                      key={job.id}
                      className="cursor-pointer transition-all hover:shadow-lg border-blue-200 bg-blue-50 text-gray-900 hover:bg-blue-100"
                      onClick={() => handleReadMore(job)}
                    >
                      <CardHeader className="pb-3 border-b border-blue-200">
                        <CardTitle className="text-lg font-semibold text-[#0E0066]">{job.job_title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.info_tags.map(tag => (
                            <Badge key={tag.items} className="bg-blue-200 text-blue-800 border border-blue-300">
                              {tag.items}
                            </Badge>
                          ))}
                          <Badge className="bg-blue-200 text-blue-800 border border-blue-300">{job.level}</Badge>
                          <Badge className="bg-blue-200 text-blue-800 border border-blue-300">{job.period}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{new Date(job.creation_time).toLocaleDateString()}</span>
                          <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-200 p-0 h-auto font-medium"
                            onClick={() => handleReadMore(job)}
                          >
                            Read More →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {meta && meta.pageCount > 1 && (
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent className="text-gray-900">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                          />
                        </PaginationItem>
                        {Array.from({ length: meta.pageCount }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer hover:bg-blue-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={currentPage === meta.pageCount ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-blue-50"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="h-full">
            {isLoading ? (
              <JobDetailSkeleton />
            ) : selectedJob ? (
              <Card className="h-full flex flex-col border-blue-200 bg-blue-50 text-gray-900">
                <CardHeader className="border-b border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-[#0E0066] mb-2">{selectedJob.job_title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedJob.info_tags.map(tag => <Badge key={tag.items} className="bg-blue-200 text-blue-800 border border-blue-300">{tag.items}</Badge>)}
                        <Badge className="bg-blue-200 text-blue-800 border border-blue-300">{selectedJob.level}</Badge>
                        <Badge className="bg-blue-200 text-blue-800 border border-blue-300">{selectedJob.period}</Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(selectedJob.creation_time).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" /> {selectedJob.location || "Addis Ababa, Ethiopia"}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#0E0066] mb-2">Overview</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.overview}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E0066] mb-3">Key Responsibilities</h3>
                    {selectedJob.key_responsibilities.length > 0 ? (
                      <ul className="space-y-2 list-disc list-inside">
                        {selectedJob.key_responsibilities.map((resp, index) => (
                          <li key={index} className="text-gray-700 text-sm">{resp.items}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>No responsibilities listed yet.</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E0066] mb-3">Requirements</h3>
                    {selectedJob.requirements.length > 0 ? (
                      <ul className="space-y-2 list-disc list-inside">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="text-gray-700 text-sm">{req.items}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>No requirements listed yet.</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E0066] mb-3">What We Offer</h3>
                    {selectedJob.what_we_offer.length > 0 ? (
                      <ul className="space-y-2 list-disc list-inside">
                        {selectedJob.what_we_offer.map((offer, index) => (
                          <li key={index} className="text-gray-700 text-sm">{offer.items}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>No offers listed yet.</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="p-6 border-t border-blue-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    <a href={selectedJob.apply_link} target="_blank" rel="noopener noreferrer">Apply for Position</a>
                  </Button>
                </div>
              </Card>
            ) : !isLoading && (
                <div className="flex items-center justify-center h-full bg-white border border-blue-200 rounded-2xl shadow-md p-6">
                    <p className="text-gray-600">Select a job to see the details.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
