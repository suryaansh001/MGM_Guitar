import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Users } from "lucide-react"

const jobOpenings = [
  {
    id: 1,
    title: "Guitar Instructor",
    location: "New York, NY",
    type: "Full-time",
    salary: "$45,000 - $60,000",
    description:
      "Teach guitar to students of all ages and skill levels. Experience with both acoustic and electric guitar required.",
    requirements: ["5+ years teaching experience", "Music degree preferred", "Excellent communication skills"],
  },
  {
    id: 2,
    title: "Workshop Coordinator",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$25 - $35/hour",
    description: "Organize and coordinate guitar workshops and events. Help with student registration and logistics.",
    requirements: ["Event planning experience", "Music background helpful", "Strong organizational skills"],
  },
  {
    id: 3,
    title: "Online Content Creator",
    location: "Remote",
    type: "Contract",
    salary: "$40 - $60/hour",
    description: "Create video tutorials and educational content for our online platform.",
    requirements: ["Video production skills", "Guitar expertise", "Creative mindset"],
  },
]

export default function CareerPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Join Our Team</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Be part of a passionate team dedicated to sharing the joy of music. We're always looking for talented
            individuals to help students achieve their musical dreams.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {jobOpenings.map((job) => (
            <Card
              key={job.id}
              className="bg-black/50 border-amber-900/30 hover:border-amber-400/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-amber-400 text-xl mb-2 md:mb-0">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 mb-4">{job.description}</p>

                <div className="mb-6">
                  <h4 className="text-amber-400 font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Users className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-black/50 border-amber-900/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Don't See a Perfect Match?</h3>
              <p className="text-gray-300 mb-6">
                We're always interested in hearing from talented musicians and educators. Send us your resume and let us
                know how you'd like to contribute to our mission.
              </p>
              <Button
                variant="outline"
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
              >
                Send Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
