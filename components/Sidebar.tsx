import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, Users, Zap } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Active Forms</span>
            </div>
            <Badge variant="secondary">12</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Submissions</span>
            </div>
            <Badge variant="secondary">1,247</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Conversion</span>
            </div>
            <Badge variant="secondary">87%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">AI Optimizations</span>
            </div>
            <Badge variant="secondary">34</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}