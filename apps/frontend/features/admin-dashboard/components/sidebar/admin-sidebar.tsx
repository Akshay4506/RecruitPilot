import * as React from "react";
import { SubscriptionOverview } from "../analytics/subscription-overview";
import { SystemHealth } from "../system/system-health";
import { StorageOverview } from "../analytics/storage-overview";
import { 
  mockSubscription, 
  mockSystemHealth,
  mockStorageDistribution,
  mockAdminMetrics
} from "../../mock/dashboard.mock";

export function AdminSidebar() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-none">
        <SubscriptionOverview subscription={mockSubscription} />
      </div>
      <div className="flex-1">
        <SystemHealth nodes={mockSystemHealth} />
      </div>
      <div className="flex-1">
        <StorageOverview 
          distribution={mockStorageDistribution} 
          usedGb={mockAdminMetrics.storageUsedGb} 
          limitGb={mockAdminMetrics.storageLimitGb} 
        />
      </div>
    </div>
  );
}
