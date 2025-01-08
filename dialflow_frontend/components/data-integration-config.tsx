import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DataIntegrationConfigProps {
  config: {
    crmSystem: string
    outputFormat: string
    customApiEndpoint?: string
  }
  onConfigChange: (config: DataIntegrationConfigProps['config']) => void
}

export function DataIntegrationConfig({ config, onConfigChange }: DataIntegrationConfigProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>CRM System</Label>
        <Select
          value={config.crmSystem}
          onValueChange={(value) => onConfigChange({ ...config, crmSystem: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select CRM system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="salesforce">Salesforce</SelectItem>
            <SelectItem value="hubspot">HubSpot</SelectItem>
            <SelectItem value="custom">Custom API</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.crmSystem === 'custom' && (
        <div className="space-y-2">
          <Label>Custom API Endpoint</Label>
          <Input
            value={config.customApiEndpoint || ''}
            onChange={(e) => onConfigChange({ ...config, customApiEndpoint: e.target.value })}
            placeholder="https://api.example.com/crm"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Output Format</Label>
        <Select
          value={config.outputFormat}
          onValueChange={(value) => onConfigChange({ ...config, outputFormat: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

