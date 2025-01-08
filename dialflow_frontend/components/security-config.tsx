import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SecurityConfigProps {
  config: {
    enableEncryption: boolean
    gdprCompliant: boolean
    dataRetentionPeriod: number
  }
  onConfigChange: (config: SecurityConfigProps['config']) => void
}

export function SecurityConfig({ config, onConfigChange }: SecurityConfigProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="enable-encryption">Enable End-to-End Encryption</Label>
        <Switch
          id="enable-encryption"
          checked={config.enableEncryption}
          onCheckedChange={(checked) => onConfigChange({ ...config, enableEncryption: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="gdpr-compliant">GDPR Compliant</Label>
        <Switch
          id="gdpr-compliant"
          checked={config.gdprCompliant}
          onCheckedChange={(checked) => onConfigChange({ ...config, gdprCompliant: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="data-retention">Data Retention Period (days)</Label>
        <Input
          id="data-retention"
          type="number"
          value={config.dataRetentionPeriod}
          onChange={(e) => onConfigChange({ ...config, dataRetentionPeriod: parseInt(e.target.value) })}
        />
      </div>
    </div>
  )
}

