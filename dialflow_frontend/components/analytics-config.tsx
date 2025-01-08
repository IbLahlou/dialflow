import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface AnalyticsConfigProps {
  config: {
    enableRealTimeDashboard: boolean
    trackMetrics: string[]
  }
  onConfigChange: (config: AnalyticsConfigProps['config']) => void
}

const availableMetrics = [
  { id: 'call_success_rate', label: 'Call Success Rate' },
  { id: 'avg_call_duration', label: 'Average Call Duration' },
  { id: 'task_completion_time', label: 'Task Completion Time' },
  { id: 'customer_satisfaction', label: 'Customer Satisfaction Score' },
]

export function AnalyticsConfig({ config, onConfigChange }: AnalyticsConfigProps) {
  const toggleMetric = (metricId: string) => {
    const updatedMetrics = config.trackMetrics.includes(metricId)
      ? config.trackMetrics.filter(id => id !== metricId)
      : [...config.trackMetrics, metricId]
    onConfigChange({ ...config, trackMetrics: updatedMetrics })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="real-time-dashboard">Enable Real-Time Dashboard</Label>
        <Switch
          id="real-time-dashboard"
          checked={config.enableRealTimeDashboard}
          onCheckedChange={(checked) => onConfigChange({ ...config, enableRealTimeDashboard: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label>Track Metrics</Label>
        {availableMetrics.map((metric) => (
          <div key={metric.id} className="flex items-center space-x-2">
            <Checkbox
              id={metric.id}
              checked={config.trackMetrics.includes(metric.id)}
              onCheckedChange={() => toggleMetric(metric.id)}
            />
            <Label htmlFor={metric.id}>{metric.label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

