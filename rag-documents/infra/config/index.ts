import { getCurrentEnvironment } from '../helpers/get-current-environment'

const shared = {
  serviceName: 'rag-documents',
  projectName: 'rag-documents',
  secretArn: 'rag-documents-secret',

  observability: {
    logger: {
      enabled: true,
      level: 'INFO',
    },
    metrics: {
      enabled: true,
    },
    tracer: {
      enabled: true,
    },
  },
}

const dev = {
  envName: 'dev',
  account: process.env.DEV_ACCOUNT,
  region: 'us-east-1',
  defaultMemorySize: 1024,
  vpc: {
    default: {
      identity: 'devops-vpc',
    },
    shared: {
      identity: 'shared-vpc-workload',
      sgName: 'shared-vpc-security-group',
    },
  },
}

const stage = {
  envName: 'stage',
  account: process.env.STG_ACCOUNT,
  region: 'us-east-1',
  defaultMemorySize: 1024,
  vpc: {
    default: {
      identity: 'stage-vpc',
    },
    shared: {
      identity: 'shared-vpc-workload',
      sgName: 'shared-vpc-security-group',
    },
  },
}

const prod = {
  envName: 'prod',
  account: process.env.PROD_ACCOUNT,
  region: 'us-east-1',
  defaultMemorySize: 1024,
  vpc: {
    default: {
      identity: 'workload-vpc',
    },
    shared: {
      identity: 'shared-vpc-workload',
      sgName: 'shared-vpc-security-group',
    },
  },
}

export interface ConfigInterface {
  envName: string
  serviceName: string
  projectName: string
  account?: string
  region: string
  secretArn: string
  defaultMemorySize: number
  observability: {
    logger: {
      enabled: boolean
      level: string
    }
    metrics: {
      enabled: boolean
    }
    tracer: {
      enabled: boolean
    }
  }
  vpc: {
    default: {
      identity: string
    }
    shared: {
      identity: string
      sgName: string
    }
  }
}

export const makeConfig = (): ConfigInterface => {
  switch (getCurrentEnvironment()) {
    case 'prod':
      return { ...shared, ...prod, envName: 'prod' }
    case 'stage':
      return { ...shared, ...stage, envName: 'stage' }
    default:
      return { ...shared, ...dev, envName: 'dev' }
  }
}
