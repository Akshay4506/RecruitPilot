$features = @(
    "recruiter-jobs|jobs|Job",
    "recruiter-applications|applications|Application",
    "recruiter-candidates|candidates|Candidate",
    "admin-users|users|User",
    "admin-rbac|roles|Role",
    "recruiter-analytics|analytics|Analytics",
    "recruiter-interviews|interviews|Interview"
)

foreach ($item in $features) {
    $parts = $item.Split("|")
    $featureDir = $parts[0]
    $entityName = $parts[1]
    $typeName = $parts[2]

    $basePath = "d:\projects\RecruitPilot\apps\frontend\features\$featureDir"
    
    if (-not (Test-Path $basePath)) {
        continue
    }

    $servicesPath = "$basePath\services"
    $hooksPath = "$basePath\hooks"
    
    New-Item -ItemType Directory -Force -Path $servicesPath | Out-Null
    New-Item -ItemType Directory -Force -Path $hooksPath | Out-Null

    # DTO
    $dtoContent = @"
export interface ${typeName}DTO {
  id: string;
  [key: string]: any; // Scaffolded DTO
}
"@
    Set-Content -Path "$servicesPath\$($entityName).dto.ts" -Value $dtoContent

    # Interface
    $interfaceContent = @"
import { ${typeName}DTO } from './$($entityName).dto';

export interface ${typeName}Service {
  getAll(): Promise<${typeName}DTO[]>;
  getById(id: string): Promise<${typeName}DTO>;
}
"@
    Set-Content -Path "$servicesPath\$($entityName).service.ts" -Value $interfaceContent

    # Mock Service
    $mockContent = @"
import { ${typeName}Service } from './$($entityName).service';
import { ${typeName}DTO } from './$($entityName).dto';

export const mock${typeName}Service: ${typeName}Service = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
"@
    Set-Content -Path "$servicesPath\mock-$($entityName).service.ts" -Value $mockContent

    # API Service
    $apiContent = @"
import { ${typeName}Service } from './$($entityName).service';
import { ${typeName}DTO } from './$($entityName).dto';

export const api${typeName}Service: ${typeName}Service = {
  getAll: async () => {
    throw new Error('Not implemented');
  },
  getById: async (id: string) => {
    throw new Error('Not implemented');
  }
};
"@
    Set-Content -Path "$servicesPath\api-$($entityName).service.ts" -Value $apiContent

    # Hook
    $hookContent = @"
import { useState, useEffect } from 'react';
import { mock${typeName}Service } from '../services/mock-$($entityName).service';
import { api${typeName}Service } from '../services/api-$($entityName).service';

// Use mock service by default for Milestone 4, will swap in Milestone 5
const service = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false' 
  ? mock${typeName}Service 
  : api${typeName}Service;

export function use${typeName}() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const result = await service.getAll();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
    isFetching: isLoading
  };
}
"@
    Set-Content -Path "$hooksPath\use-$($entityName).ts" -Value $hookContent
}

Write-Host "Scaffolding complete!"
